const { spawn } = require('child_process');

const child = spawn('pnpm', ['drizzle-kit', 'push'], {
  stdio: ['pipe', 'inherit', 'inherit']
});

// Wait for the prompt and then send down arrow and enter to select "Yes"
setTimeout(() => {
  child.stdin.write('\x1B[B'); // Down arrow to select "Yes"
  setTimeout(() => {
    child.stdin.write('\n'); // Enter to confirm
    child.stdin.end();
  }, 100);
}, 2000);

child.on('exit', (code) => {
  process.exit(code);
});