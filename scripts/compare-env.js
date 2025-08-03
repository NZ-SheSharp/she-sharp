#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

// Function to parse .env file
function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const env = {};
  
  content.split('\n').forEach(line => {
    // Skip comments and empty lines
    if (line.trim().startsWith('#') || !line.trim()) {
      return;
    }
    
    const [key, ...valueParts] = line.split('=');
    if (key) {
      let value = valueParts.join('=');
      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '');
      env[key.trim()] = value.trim();
    }
  });
  
  return env;
}

// Function to mask sensitive values
function maskValue(key, value) {
  const sensitiveKeys = [
    'SECRET', 'KEY', 'TOKEN', 'PASSWORD', 'PASS', 
    'CLIENT_SECRET', 'AUTH_SECRET', 'WEBHOOK_SECRET'
  ];
  
  const shouldMask = sensitiveKeys.some(sensitive => 
    key.toUpperCase().includes(sensitive)
  );
  
  if (shouldMask && value && value.length > 10) {
    return value.substring(0, 6) + '...' + value.substring(value.length - 4);
  }
  return value;
}

// Main comparison function
function compareEnvConfigs() {
  console.log('\n' + colors.cyan + '=' .repeat(80) + colors.reset);
  console.log(colors.cyan + '📊 Environment Configuration Comparison Report' + colors.reset);
  console.log(colors.cyan + '=' .repeat(80) + colors.reset);
  console.log(`Generated: ${new Date().toISOString()}\n`);

  // Parse all environment files
  const configs = {
    '.env': parseEnvFile(path.join(process.cwd(), '.env')),
    '.env.local': parseEnvFile(path.join(process.cwd(), '.env.local')),
    'Vercel': parseEnvFile(path.join(process.cwd(), '.env.vercel.production'))
  };

  // Get all unique keys
  const allKeys = new Set();
  Object.values(configs).forEach(config => {
    Object.keys(config).forEach(key => allKeys.add(key));
  });

  // Sort keys for better readability
  const sortedKeys = Array.from(allKeys).sort();

  // Track statistics
  const stats = {
    total: sortedKeys.length,
    matched: 0,
    mismatched: 0,
    missingInVercel: 0,
    missingInLocal: 0,
    onlyInVercel: 0
  };

  // Group keys by category
  const categories = {
    'OAuth': ['GOOGLE_', 'GITHUB_', 'AUTH_', 'NEXTAUTH'],
    'Database': ['DATABASE_', 'PG', 'POSTGRES_', 'NEON_'],
    'Stripe': ['STRIPE_'],
    'Email': ['RESEND_', 'EMAIL_'],
    'Other': []
  };

  // Categorize keys
  const categorizedKeys = {};
  sortedKeys.forEach(key => {
    let category = 'Other';
    for (const [cat, patterns] of Object.entries(categories)) {
      if (patterns.some(pattern => key.includes(pattern))) {
        category = cat;
        break;
      }
    }
    if (!categorizedKeys[category]) {
      categorizedKeys[category] = [];
    }
    categorizedKeys[category].push(key);
  });

  // Compare by category
  for (const [category, keys] of Object.entries(categorizedKeys)) {
    if (keys.length === 0) continue;
    
    console.log('\n' + colors.yellow + `📁 ${category}` + colors.reset);
    console.log(colors.gray + '-'.repeat(60) + colors.reset);
    
    keys.forEach(key => {
      const localValue = configs['.env.local'][key] || configs['.env'][key];
      const vercelValue = configs['Vercel'][key];
      
      let status = '';
      let statusColor = '';
      
      if (!vercelValue && localValue) {
        status = '❌ Missing in Vercel';
        statusColor = colors.red;
        stats.missingInVercel++;
      } else if (vercelValue && !localValue) {
        status = '⚠️  Only in Vercel';
        statusColor = colors.yellow;
        stats.onlyInVercel++;
      } else if (localValue === vercelValue) {
        status = '✅ Matched';
        statusColor = colors.green;
        stats.matched++;
      } else {
        status = '🔄 Different';
        statusColor = colors.red;
        stats.mismatched++;
      }
      
      console.log(`${statusColor}${status.padEnd(20)}${colors.reset} ${key}`);
      
      if (status === '🔄 Different' || status === '❌ Missing in Vercel') {
        if (localValue) {
          console.log(`  ${colors.gray}Local:  ${maskValue(key, localValue)}${colors.reset}`);
        }
        if (vercelValue) {
          console.log(`  ${colors.gray}Vercel: ${maskValue(key, vercelValue)}${colors.reset}`);
        }
      }
    });
  }

  // Summary
  console.log('\n' + colors.cyan + '=' .repeat(80) + colors.reset);
  console.log(colors.cyan + '📈 Summary' + colors.reset);
  console.log(colors.cyan + '=' .repeat(80) + colors.reset);
  
  console.log(`${colors.green}✅ Matched:${colors.reset} ${stats.matched}`);
  console.log(`${colors.red}🔄 Different:${colors.reset} ${stats.mismatched}`);
  console.log(`${colors.red}❌ Missing in Vercel:${colors.reset} ${stats.missingInVercel}`);
  console.log(`${colors.yellow}⚠️  Only in Vercel:${colors.reset} ${stats.onlyInVercel}`);
  console.log(`📊 Total Keys: ${stats.total}`);

  // Critical issues
  console.log('\n' + colors.red + '⚠️  Critical Issues to Address:' + colors.reset);
  
  // Check specific critical keys
  const criticalChecks = [
    {
      key: 'GOOGLE_CLIENT_SECRET',
      expected: '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',
      current: configs['Vercel']['GOOGLE_CLIENT_SECRET']
    },
    {
      key: 'GITHUB_CLIENT_SECRET',
      expected: '89f8abf477356321c189c97fd43ded87c6560600',
      current: configs['Vercel']['GITHUB_CLIENT_SECRET']
    },
    {
      key: 'AUTH_SECRET',
      expected: '/qDlrpWHUVZ7mRaLNv6SYB8mMeTjClHaiXjqaJ8elPY=',
      current: configs['Vercel']['AUTH_SECRET']
    },
    {
      key: 'NEXTAUTH_SECRET',
      expected: '/qDlrpWHUVZ7mRaLNv6SYB8mMeTjClHaiXjqaJ8elPY=',
      current: configs['Vercel']['NEXTAUTH_SECRET']
    }
  ];

  let allCriticalOk = true;
  criticalChecks.forEach(check => {
    if (check.current === check.expected) {
      console.log(`${colors.green}✅ ${check.key} is correctly updated${colors.reset}`);
    } else {
      console.log(`${colors.red}❌ ${check.key} needs update${colors.reset}`);
      allCriticalOk = false;
    }
  });

  if (allCriticalOk) {
    console.log('\n' + colors.green + '🎉 All critical OAuth and Auth secrets are correctly updated in Vercel!' + colors.reset);
  } else {
    console.log('\n' + colors.red + '⚠️  Some critical secrets still need to be updated in Vercel Dashboard!' + colors.reset);
  }

  // Recommendations
  console.log('\n' + colors.yellow + '💡 Recommendations:' + colors.reset);
  if (stats.missingInVercel > 0) {
    console.log('1. Add missing environment variables to Vercel Dashboard');
  }
  if (stats.mismatched > 0) {
    console.log('2. Review and update mismatched values in Vercel');
  }
  console.log('3. Consider rotating the Stripe LIVE key (sk_live_...)');
  console.log('4. Update database password for better security');
  
  console.log('\n' + colors.cyan + '=' .repeat(80) + colors.reset + '\n');
}

// Run the comparison
compareEnvConfigs();