#!/usr/bin/env node

const http = require('http');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function checkService(name, url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'GET',
      timeout: 3000
    };

    const req = http.request(options, (res) => {
      resolve({ name, status: 'online', statusCode: res.statusCode });
    });

    req.on('error', () => {
      resolve({ name, status: 'offline', statusCode: null });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ name, status: 'timeout', statusCode: null });
    });

    req.end();
  });
}

function getNgrokUrl() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:4040/api/tunnels', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.tunnels && parsed.tunnels.length > 0) {
            resolve(parsed.tunnels[0].public_url);
          } else {
            resolve(null);
          }
        } catch (err) {
          resolve(null);
        }
      });
    });
    
    req.on('error', () => resolve(null));
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

async function checkAllServices() {
  console.log(`${colors.bright}${colors.cyan}🚀 Loop Services - Status Check${colors.reset}\n`);

  const services = [
    { name: 'Frontend (Vite)', url: 'http://localhost:3000' },
    { name: 'Backend API', url: 'http://localhost:5001' },
    { name: 'ngrok Web Interface', url: 'http://localhost:4040' }
  ];

  const results = await Promise.all(
    services.map(service => checkService(service.name, service.url))
  );

  results.forEach(result => {
    const statusIcon = result.status === 'online' ? '✅' : '❌';
    const statusColor = result.status === 'online' ? colors.green : colors.red;
    const statusText = result.status === 'online' ? 'ONLINE' : result.status.toUpperCase();
    
    console.log(`${statusIcon} ${result.name}: ${statusColor}${statusText}${colors.reset}`);
    if (result.statusCode) {
      console.log(`   Status Code: ${result.statusCode}`);
    }
  });

  // Check ngrok public URL
  const ngrokUrl = await getNgrokUrl();
  if (ngrokUrl) {
    console.log(`\n${colors.bright}🌐 Public URLs:${colors.reset}`);
    console.log(`   Frontend: ${colors.blue}${ngrokUrl}${colors.reset}`);
    console.log(`   Local Frontend: ${colors.yellow}http://localhost:3000${colors.reset}`);
    console.log(`   Local Backend: ${colors.yellow}http://localhost:5001${colors.reset}`);
    console.log(`   ngrok Dashboard: ${colors.yellow}http://localhost:4040${colors.reset}`);
  } else {
    console.log(`\n${colors.red}❌ ngrok tunnel not found${colors.reset}`);
  }

  console.log(`\n${colors.cyan}💡 Run 'node monitor-ngrok.js' to monitor ngrok sessions and response times${colors.reset}`);
}

checkAllServices().catch(console.error); 