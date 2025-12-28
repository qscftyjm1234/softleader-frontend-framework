import { spawn } from 'child_process'
// Helper to spawn a process and pipe output
/**
 * Run a shell command and pipe output
 * @param command - The command to run
 * @param args - Arguments for the command
 * @param name - Label for the output
 * @param color - Color code for the label
 * @returns The spawned child process
 */
function runCommand(command: string, args: string[], name: string, color: string) {
  const child = spawn(command, args, {
    stdio: 'pipe',
    shell: true,
    env: { ...process.env, FORCE_COLOR: 'true' } // Force color output
  })

  child.stdout.on('data', (data) => {
    const lines = data.toString().split('\n')
    lines.forEach((line: string) => {
      if (line.trim()) {
        console.log(`${color}[${name}] \x1b[0m${line}`)
      }
    })
  })

  child.stderr.on('data', (data) => {
    const lines = data.toString().split('\n')
    lines.forEach((line: string) => {
      if (line.trim()) {
        console.error(`${color}[${name}] \x1b[0m${line}`)
      }
    })
  })

  return child
}

console.log('\x1b[32m🚀 Starting Development Server & Module Watcher...\x1b[0m\n')

// 1. Start Module Watcher
const watcher = runCommand('npx', ['jiti', 'scripts/gen-module.ts', 'watch'], 'WATCHER', '\x1b[36m') // Cyan

// 2. Start Nuxt Dev Server
const nuxt = runCommand('nuxt', ['dev'], 'NUXT', '\x1b[35m') // Magenta

// Handle termination
const cleanup = () => {
  console.log('\n\x1b[33m🛑 Shutting down...\x1b[0m')
  watcher.kill()
  nuxt.kill()
  process.exit()
}

process.on('SIGINT', cleanup)
process.on('SIGTERM', cleanup)
process.on('exit', cleanup)
