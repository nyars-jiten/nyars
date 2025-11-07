import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import v8 from 'node:v8'

// Shared utility function for taking heap snapshots
export function takeHeapSnapshot() {
  const snapshotsDir = path.join(process.cwd(), 'heap-snapshots')

  // Ensure the snapshots directory exists
  if (!fs.existsSync(snapshotsDir)) {
    fs.mkdirSync(snapshotsDir, { recursive: true })
  }

  try {
    const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\./g, '-')
    const filename = path.join(snapshotsDir, `heap-${timestamp}.heapsnapshot`)

    console.log(`[Heap Snapshot] Taking heap snapshot: ${filename}`)
    v8.writeHeapSnapshot(filename)
    console.log(`[Heap Snapshot] Heap snapshot saved successfully: ${filename}`)

    return {
      success: true,
      filename,
      timestamp,
    }
  }
  catch (error) {
    console.error('[Heap Snapshot] Error taking heap snapshot:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
