import fs from 'fs'
try {
  // PowerShell default > is utf16le
  const content = fs.readFileSync('error_log_v2.txt', 'utf16le')
  fs.writeFileSync('error_log_clean.txt', content, 'utf8')
} catch (e) {
  console.error(e)
}
