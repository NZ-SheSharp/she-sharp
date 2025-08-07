const { spawn } = require('child_process');

const child = spawn('pnpm', ['drizzle-kit', 'generate'], {
  stdio: ['pipe', 'inherit', 'inherit']
});

// Automatically answer the prompt by sending Enter
setTimeout(() => {
  child.stdin.write('\n');
  child.stdin.end();
}, 1000);

child.on('exit', (code) => {
  process.exit(code);
});