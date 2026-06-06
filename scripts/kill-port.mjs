#!/usr/bin/env node
// Kills any process listening on the given port (default: 3000).
const port = process.argv[2] || "3000";
import { execSync } from "child_process";

try {
  const stdout = execSync(`netstat -ano | findstr ":${port}"`, {
    encoding: "utf8",
    stdio: "pipe",
    shell: true,
  });
  const lines = stdout.trim().split("\n");
  for (const line of lines) {
    // Match LISTENING followed by a PID
    const match = line.match(/LISTENING\s+(\d+)/i);
    if (match) {
      const pid = match[1];
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "pipe", shell: true });
        console.log(`Killed process ${pid} on port ${port}`);
      } catch {
        // Process may have already exited
      }
    }
  }
} catch {
  // netstat found nothing — port is free
}
