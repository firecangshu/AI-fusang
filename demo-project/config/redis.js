// config/redis.js
// ❌ Bug: Redis 连接配置错误 - 端口写成了 6380 而不是 6379
const redis = require('redis');

const RedisConfig = {
  host: 'localhost',
  port: 6380, // Bug: 应该是 6379
  retryStrategy: (times) => {
    if (times > 3) return null;
    return Math.min(times * 100, 2000);
  }
};

function connectRedis() {
  const client = redis.createClient(RedisConfig);
  client.on('error', (err) => {
    console.error('Redis连接失败:', err.message);
    // 这里会抛出 ECONNREFUSED，因为端口错了
  });
  return client;
}

module.exports = { RedisConfig, connectRedis };
