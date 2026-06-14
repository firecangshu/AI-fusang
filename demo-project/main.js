// main.js
// 程序入口
const { initDB } = require('./utils/db');
const apiRouter = require('./routes/api');

function main() {
  console.log('=== 程序启动 ===');
  
  // 1. 初始化数据库（这里会触发 Bug）
  let db;
  try {
    db = initDB();
  } catch (e) {
    console.error('启动失败:', e.message);
    // Bug 暴露：Redis 连接失败，程序卡在这里
    process.exit(1);
  }

  // 2. 启动 API 服务（因上面的 Bug 永远不会执行到这里）
  startServer(apiRouter);
  
  console.log('=== 启动完成 ===');
}

function startServer(router) {
  // 预留：启动 Express 服务
  console.log('API 服务启动...');
}

// 执行入口
main();
