const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const crypto = require('crypto')

const SEARCH_DIRS = ['components', 'composables', 'utils', 'pages']
const OUTPUT_DIR = 'docs/history'

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Main execution
const target = process.argv[2] // Get command line argument if any
if (target) {
  console.log(`🔍 Filtering by: "${target}"`)
}

SEARCH_DIRS.forEach((dir) => processDirectory(dir, target))

/**
 * Recursively search for files in a directory.
 * @param {string} dir - Directory to search
 * @param {string} [filter] - Optional filter string
 */
function processDirectory(dir, filter) {
  if (!fs.existsSync(dir)) return

  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      processDirectory(filePath, filter)
    } else if (file.endsWith('.vue') || file.endsWith('.ts') || file.endsWith('.js')) {
      // If filter exists, file path OR filename must include the filter string
      if (!filter || filePath.includes(filter)) {
        processFile(filePath)
      }
    }
  })
}

/**
 * Process a file to find @history tags.
 * @param {string} filePath - Path to the file
 */
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  // Regex to match JSDoc with @history and capture the function name following it
  // Supports:
  // /** ... @history ... */
  // function name(...)
  // const name = (...)
  const regex =
    /\/\*\*([\s\S]*?@history[\s\S]*?)\*\/[\s\S]*?(?:function\s+([a-zA-Z0-9_]+)|const\s+([a-zA-Z0-9_]+)\s*=\s*(?:async)?\s*(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>)/g

  let match
  const updates = []

  while ((match = regex.exec(content)) !== null) {
    const jsDocContent = match[1]
    const funcName = match[2] || match[3]
    const fullMatch = match[0]
    const matchIndex = match.index

    if (funcName) {
      const metadata = parseJSDoc(jsDocContent)
      const uniqueId = generateUniqueId(filePath, funcName)

      // Check if @historyId already exists
      if (!jsDocContent.includes('@historyId')) {
        updates.push({ funcName, uniqueId, matchIndex, fullMatch, jsDocContent })
      }

      generateHistory(filePath, funcName, metadata)
    }
  }

  // Write back history IDs to file
  if (updates.length > 0) {
    updateFileWithHistoryIds(filePath, content, updates)
  }
}

/**
 * Parse JSDoc content to extract metadata.
 * @param {string} content - JSDoc content
 * @returns {Object} Metadata object
 */
function parseJSDoc(content) {
  const metadata = {
    author: null
  }

  const lines = content.split('\n')
  lines.forEach((line) => {
    const authorMatch = line.match(/@author\s+(.+)/)
    if (authorMatch) {
      metadata.author = authorMatch[1].trim()
    }
  })

  return metadata
}

/**
 * Generate a unique ID based on file path and function name.
 * @param {string} filePath - Path to the file
 * @param {string} funcName - Name of the function
 * @returns {string} Unique ID (8-character hash)
 */
function generateUniqueId(filePath, funcName) {
  const input = `${filePath}:${funcName}`
  return crypto.createHash('md5').update(input).digest('hex').substring(0, 8)
}

/**
 * Update source file with history IDs in JSDoc.
 * @param {string} filePath - Path to the file
 * @param {string} content - Original file content
 * @param {Array} updates - Array of update objects
 */
function updateFileWithHistoryIds(filePath, content, updates) {
  let newContent = content

  // Sort updates by index in reverse order to avoid offset issues
  updates.sort((a, b) => b.matchIndex - a.matchIndex)

  updates.forEach(({ uniqueId, matchIndex, fullMatch, jsDocContent }) => {
    // Find the position to insert @historyId (after @history)
    const historyTagMatch = jsDocContent.match(/@history(\s|$)/)
    if (historyTagMatch) {
      const insertPos = jsDocContent.indexOf(historyTagMatch[0]) + historyTagMatch[0].length
      const beforeInsert = jsDocContent.substring(0, insertPos)
      const afterInsert = jsDocContent.substring(insertPos)

      // Insert @historyId on a new line
      const newJsDocContent = beforeInsert + `\n * @historyId ${uniqueId}` + afterInsert
      const newFullMatch = fullMatch.replace(jsDocContent, newJsDocContent)

      // Replace in content
      newContent =
        newContent.substring(0, matchIndex) +
        newFullMatch +
        newContent.substring(matchIndex + fullMatch.length)
    }
  })

  // Write back to file
  fs.writeFileSync(filePath, newContent, 'utf-8')
  console.log(`Updated ${filePath} with history IDs`)
}

/**
 * Generate history markdown for a function.
 * @param {string} filePath - Path to the file
 * @param {string} funcName - Name of the function
 * @param {Object} metadata - JSDoc metadata
 */
function generateHistory(filePath, funcName, metadata) {
  console.log(`Generating history for ${funcName} in ${filePath}...`)

  try {
    // git log -L :funcName:filePath --pretty=format:"%h|%ad|%an|%s" --date=short
    // Note: Windows path separator needs to be forward slash for git
    const gitPath = filePath.replace(/\\/g, '/')
    const cmd = `git log -L :${funcName}:${gitPath} --pretty=format:"%H|%h|%ad|%an|%s" --date=iso`

    const output = execSync(cmd).toString().trim()
    const commits = parseGitLog(output)

    writeMarkdown(filePath, funcName, commits, metadata)
  } catch {
    console.warn(
      `Failed to get history for ${funcName} in ${filePath}. Git log -L might fail if the function is new or git cannot trace it.`
    )
  }
}

/**
 * Parse git log output into commit objects.
 * @param {string} output - Git log output
 * @returns {Array} Array of commit objects
 */
function parseGitLog(output) {
  const lines = output.split('\n')
  const commits = []
  let currentCommit = null

  lines.forEach((line) => {
    // Check if line looks like our format
    const parts = line.split('|')
    if (parts.length >= 5 && parts[0].length === 40) {
      // SHA1 length
      if (currentCommit) commits.push(currentCommit)
      currentCommit = {
        hash: parts[0],
        shortHash: parts[1],
        date: parts[2],
        author: parts[3],
        message: parts.slice(4).join('|'),
        diff: ''
      }
    } else if (currentCommit) {
      currentCommit.diff += line + '\n'
    }
  })
  if (currentCommit) commits.push(currentCommit)

  return commits
}

/**
 * Write generated history to a markdown file.
 * @param {string} filePath - Original file path
 * @param {string} funcName - Function name
 * @param {Array} commits - Array of commit objects
 * @param {Object} metadata - JSDoc metadata
 */
function writeMarkdown(filePath, funcName, commits, metadata) {
  const uniqueId = generateUniqueId(filePath, funcName)
  const outName = `${uniqueId}.md`
  const outPath = path.join(OUTPUT_DIR, outName)

  // Calculate version info
  const totalVersions = commits.length
  const latestCommit = commits[0] // Git log returns newest first

  let md = `# History: \`${funcName}\`\n\n`
  md += `**ID**: \`${uniqueId}\`\n`
  md += `**檔案**: \`${filePath}\`\n`
  if (metadata && metadata.author) {
    md += `**原作者（JSDoc）**: ${metadata.author}\n`
  }
  md += `**當前版本**: v${totalVersions}\n`
  md += `**最後異動者（Git）**: ${latestCommit.author}\n`
  md += `**最後異動時間**: ${latestCommit.date.split('T')[0]}\n`
  md += `**產生時間**: ${new Date().toLocaleString()}\n\n`

  md += `## 版本演進總覽\n\n`
  md += `| 版本 | 日期 | 作者 | 異動說明 | Commit |\n`
  md += `|------|------|------|----------|--------|\n`

  // Add version numbers (newest to oldest: v3, v2, v1)
  commits.forEach((c, index) => {
    const version = totalVersions - index
    const url = `https://github.com/qscftyjm1234/frontier_project/commit/${c.hash}`
    md += `| v${version} | ${c.date.split('T')[0]} | ${c.author} | ${c.message} | [${c.shortHash}](${url}) |\n`
  })

  md += `\n## 詳細變更記錄\n\n`

  commits.forEach((c, index) => {
    const version = totalVersions - index
    md += `### v${version} - ${c.date.split('T')[0]} - ${c.message}\n`
    md += `**作者**: ${c.author}\n\n`
    md += '```diff\n'
    md += c.diff
    md += '```\n\n'
  })

  fs.writeFileSync(outPath, md)
  console.log(`Created ${outPath}`)
}
