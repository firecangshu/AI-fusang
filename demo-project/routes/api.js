// routes/api.js
// API 路由定义（预留接口/Stub）
const express = require('express');
const router = express.Router();

// TODO: 用户认证接口（待实现）
router.post('/api/auth/login', (req, res) => {
  // Stub: 等待实现
  res.status(501).json({ error: 'Not implemented' });
});

// TODO: 数据查询接口（待实现）
router.get('/api/data/query', (req, res) => {
  // Stub: 等待实现
  res.status(501).json({ error: 'Not implemented' });
});

// 健康检查（已实现）
router.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

module.exports = router;
