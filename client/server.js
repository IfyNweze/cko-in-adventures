const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

console.log('Starting frontend server...');

app.use('/.well-known', createProxyMiddleware({
  target: 'https://api.flow-demo.store',
  changeOrigin: true,
  secure: true,
  onProxyReq: (proxyReq, req, res) => {
    console.log('Proxying request to:', proxyReq.path);
  }
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});