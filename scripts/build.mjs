import net from 'node:net'
import { spawn } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const devPorts = [3000, 3001, 3002, 3003]
const localBuildDir = '.next-build-local'
const isCiBuild = Boolean(process.env.CI || process.env.VERCEL)
const hasExplicitDistDir = Boolean(process.env.NEXT_DIST_DIR)

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: '127.0.0.1', port })
    socket.setTimeout(350)
    socket.once('connect', () => {
      socket.destroy()
      resolve(true)
    })
    socket.once('timeout', () => {
      socket.destroy()
      resolve(false)
    })
    socket.once('error', () => resolve(false))
  })
}

async function getOpenDevPorts() {
  const checks = await Promise.all(devPorts.map(async (port) => [port, await isPortOpen(port)]))
  return checks.filter(([, open]) => open).map(([port]) => port)
}

const openDevPorts = isCiBuild ? [] : await getOpenDevPorts()
const useIsolatedBuild = openDevPorts.length > 0 && !hasExplicitDistDir
const env = {
  ...process.env,
  ...(useIsolatedBuild ? { NEXT_DIST_DIR: localBuildDir } : {}),
}
const filesToRestore = ['next-env.d.ts', 'tsconfig.json']
const restoreSnapshots = useIsolatedBuild
  ? filesToRestore
      .filter((file) => existsSync(file))
      .map((file) => [file, readFileSync(file, 'utf8')])
  : []

if (useIsolatedBuild) {
  console.log(`Detected local dev server on port(s): ${openDevPorts.join(', ')}`)
  console.log(`Running Next build with isolated distDir: ${localBuildDir}`)
  console.log('This avoids corrupting the active dev server .next runtime.')
}

const nextBin = process.platform === 'win32'
  ? join('node_modules', '.bin', 'next.cmd')
  : join('node_modules', '.bin', 'next')

const command = existsSync(nextBin) ? nextBin : 'next'
const child = spawn(command, ['build'], {
  env,
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

child.on('exit', (code, signal) => {
  for (const [file, content] of restoreSnapshots) {
    writeFileSync(file, content)
  }

  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 1)
})
