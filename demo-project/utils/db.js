// utils/db.js
// 数据库连接模块
const { connectRedis } = require('../config/redis');

function initDB() {
  try {
    const redisClient = connectRedis();
    // 这里会失败，因为 redis.js 里的端口是错的
    redisClient.ping((err) => {
      if (err) {
        throw new Error('Redis连接失败: ' + err.message);
      }
    });
    return { redis: redisClient, status: 'ok' };
  } catch (e) {
    // 错误会被上层捕获，显示在扶桑树上
    throw e;
  }
}

module.exports = { initDB };
