#!/usr/bin/env node

const https = require('https');
const http = require('http');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

let previousMetrics = null;

function formatNumber(num) {
  return num.toLocaleString();
}

function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${(ms / 60000).toFixed(1)}m`;
}

function getNgrokMetrics() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:4040/api/tunnels', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

function displayMetrics(data) {
  console.clear();
  
  const now = new Date();
  console.log(`${colors.bright}${colors.cyan}🚀 Loop Services - ngrok Monitor${colors.reset}`);
  console.log(`${colors.yellow}Last updated: ${now.toLocaleTimeString()}${colors.reset}\n`);
  
  if (!data.tunnels || data.tunnels.length === 0) {
    console.log(`${colors.red}❌ No active tunnels found${colors.reset}`);
    return;
  }
  
  data.tunnels.forEach((tunnel, index) => {
    console.log(`${colors.bright}${colors.blue}📡 Tunnel ${index + 1}: ${tunnel.name}${colors.reset}`);
    console.log(`${colors.green}🌐 Public URL: ${tunnel.public_url}${colors.reset}`);
    console.log(`${colors.cyan}🎯 Local Address: ${tunnel.config.addr}${colors.reset}`);
    console.log(`${colors.magenta}🔗 Protocol: ${tunnel.proto}${colors.reset}\n`);
    
    const metrics = tunnel.metrics;
    
    // Connection metrics
    console.log(`${colors.bright}📊 Connection Metrics:${colors.reset}`);
    console.log(`  Active Connections: ${colors.green}${formatNumber(metrics.conns.gauge)}${colors.reset}`);
    console.log(`  Total Connections: ${colors.blue}${formatNumber(metrics.conns.count)}${colors.reset}`);
    console.log(`  Conn Rate (1m): ${colors.yellow}${metrics.conns.rate1.toFixed(2)}/sec${colors.reset}`);
    console.log(`  Conn Rate (5m): ${colors.yellow}${metrics.conns.rate5.toFixed(2)}/sec${colors.reset}`);
    
    // HTTP metrics
    console.log(`\n${colors.bright}🌐 HTTP Metrics:${colors.reset}`);
    console.log(`  Total Requests: ${colors.blue}${formatNumber(metrics.http.count)}${colors.reset}`);
    console.log(`  Request Rate (1m): ${colors.yellow}${metrics.http.rate1.toFixed(2)}/sec${colors.reset}`);
    console.log(`  Request Rate (5m): ${colors.yellow}${metrics.http.rate5.toFixed(2)}/sec${colors.reset}`);
    
    // Response time percentiles
    console.log(`\n${colors.bright}⚡ Response Times:${colors.reset}`);
    console.log(`  50th percentile: ${colors.green}${formatDuration(metrics.http.p50)}${colors.reset}`);
    console.log(`  90th percentile: ${colors.yellow}${formatDuration(metrics.http.p90)}${colors.reset}`);
    console.log(`  95th percentile: ${colors.yellow}${formatDuration(metrics.http.p95)}${colors.reset}`);
    console.log(`  99th percentile: ${colors.red}${formatDuration(metrics.http.p99)}${colors.reset}`);
    
    // Show rate changes if we have previous data
    if (previousMetrics && previousMetrics.tunnels[index]) {
      const prevMetrics = previousMetrics.tunnels[index].metrics;
      const connDelta = metrics.conns.count - prevMetrics.conns.count;
      const httpDelta = metrics.http.count - prevMetrics.http.count;
      
      if (connDelta > 0 || httpDelta > 0) {
        console.log(`\n${colors.bright}📈 Since last update:${colors.reset}`);
        if (connDelta > 0) {
          console.log(`  New connections: ${colors.green}+${connDelta}${colors.reset}`);
        }
        if (httpDelta > 0) {
          console.log(`  New requests: ${colors.green}+${httpDelta}${colors.reset}`);
        }
      }
    }
    
    console.log('\n' + '─'.repeat(60) + '\n');
  });
  
  console.log(`${colors.cyan}💡 Tip: Visit http://localhost:4040 for the ngrok web interface${colors.reset}`);
  console.log(`${colors.cyan}🔄 Monitoring updates every 2 seconds... Press Ctrl+C to stop${colors.reset}`);
}

async function monitor() {
  try {
    const data = await getNgrokMetrics();
    displayMetrics(data);
    previousMetrics = data;
  } catch (error) {
    console.clear();
    console.log(`${colors.red}❌ Error fetching ngrok metrics: ${error.message}${colors.reset}`);
    console.log(`${colors.yellow}🔄 Retrying in 2 seconds...${colors.reset}`);
  }
}

// Initial display
console.log(`${colors.bright}${colors.cyan}🚀 Starting ngrok monitor...${colors.reset}`);

// Start monitoring
monitor();
setInterval(monitor, 2000);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log(`\n${colors.yellow}👋 Stopping ngrok monitor...${colors.reset}`);
  process.exit(0);
}); 