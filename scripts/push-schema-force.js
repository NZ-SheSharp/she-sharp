const { spawn } = require('child_process');

console.log('Starting drizzle-kit push with auto-confirm...');

const child = spawn('pnpm', ['drizzle-kit', 'push'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let output = '';

child.stdout.on('data', (data) => {
  output += data.toString();
  process.stdout.write(data);
  
  // Check if we're at the confirmation prompt
  if (output.includes('Do you still want to push changes?')) {
    setTimeout(() => {
      console.log('\n\nAuto-selecting "Yes"...');
      child.stdin.write('\x1B[B'); // Down arrow
      setTimeout(() => {
        child.stdin.write('\n'); // Enter
      }, 500);
    }, 1000);
  }
});

child.stderr.on('data', (data) => {
  process.stderr.write(data);
});

child.on('exit', (code) => {
  console.log(`\nProcess exited with code ${code}`);
  process.exit(code);
});