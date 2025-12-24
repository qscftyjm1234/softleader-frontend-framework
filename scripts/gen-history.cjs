const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

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
    /\/\*\*[\s\S]*?@history[\s\S]*?\*\/[\s\S]*?(?:function\s+([a-zA-Z0-9_]+)|const\s+([a-zA-Z0-9_]+)\s*=\s*(?:async)?\s*(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>)/g

  let match
  while ((match = regex.exec(content)) !== null) {
    const funcName = match[1] || match[2]
    if (funcName) {
      generateHistory(filePath, funcName)
    }
  }
}

/**
 * Generate history markdown for a function.
 * @param {string} filePath - Path to the file
 * @param {string} funcName - Name of the function
 */
function generateHistory(filePath, funcName) {
  console.log(`Generating history for ${funcName} in ${filePath}...`)

  try {
    // git log -L :funcName:filePath --pretty=format:"%h|%ad|%an|%s" --date=short
    // Note: Windows path separator needs to be forward slash for git
    const gitPath = filePath.replace(/\\/g, '/')
    const cmd = `git log -L :${funcName}:${gitPath} --pretty=format:"%H|%h|%ad|%an|%s" --date=iso`

    const output = execSync(cmd).toString().trim()
    const commits = parseGitLog(output)

    writeMarkdown(filePath, funcName, commits)
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
 */
function writeMarkdown(filePath, funcName, commits) {
  const outName = `${path.basename(filePath, path.extname(filePath))}-${funcName}.md`
  const outPath = path.join(OUTPUT_DIR, outName)

  let md = `# History: \`${funcName}\`\n\n`
  md += `**File**: \`${filePath}\`\n`
  md += `**Generated**: ${new Date().toLocaleString()}\n\n`

  md += `## Summary\n\n`
  md += `| Date | Version/Commit | Author | Message |\n`
  md += `|------|----------------|--------|---------|\n`

  commits.forEach((c) => {
    const url = `https://github.com/qscftyjm1234/frontier_project/commit/${c.hash}`
    md += `| ${c.date.split('T')[0]} | [${c.shortHash}](${url}) | ${c.author} | ${c.message} |\n`
  })

  md += `\n## Detailed Changes\n\n`

  commits.forEach((c) => {
    md += `### [${c.shortHash}] ${c.date.split('T')[0]} - ${c.message}\n`
    md += '```diff\n'
    md += c.diff
    md += '```\n\n'
  })

  fs.writeFileSync(outPath, md)
  console.log(`Created ${outPath}`)
}
