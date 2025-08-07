#!/usr/bin/env python3
import subprocess
import time
import sys

proc = subprocess.Popen(
    ['pnpm', 'drizzle-kit', 'push'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
    bufsize=0
)

output = []
confirmation_sent = False

while True:
    line = proc.stdout.readline()
    if not line:
        break
    
    print(line, end='', flush=True)
    output.append(line)
    
    # Look for the confirmation prompt
    if 'Do you still want to push changes?' in line and not confirmation_sent:
        time.sleep(1)
        print('\n>>> Auto-confirming: Yes')
        # Send down arrow then enter
        proc.stdin.write('\x1B[B\n')
        proc.stdin.flush()
        confirmation_sent = True

proc.wait()
sys.exit(proc.returncode)