# Tasks

- [x] Task 1: real 模式拦截（wheel + mousedown + mouseup）
  - [x] wheel 监听器开头加 `if(currentMode==='real') return;`
  - [x] mousedown 监听器开头加 `if(currentMode==='real') return;`
  - [x] mouseup 监听器开头加 `if(currentMode==='real') return;`
  - [x] 不改 mousemove（已有 line 3752 拦截）

- [x] Task 2: 拖动光标锁定
  - [x] 在 mousemove 监听器（line 3706 之后）开头加 `if(isPanning) return;`（让光标保持 grabbing）
  - [x] mouseup 监听器末尾恢复 cursor（已有 line 799 设回 default）
  - [x] 测试：拖动期间光标不闪烁

- [x] Task 3: 双击重置视图
  - [x] cv 上加 dblclick 监听器
  - [x] 实现重置函数 `resetTreeView()`：treeScale=0.95, offsets=0, userZoomed=false
  - [x] 只在空白处响应（避免节点上双击也重置）—— 复用 hitTest 检测

- [x] Task 4: Esc 退出拖动
  - [x] keydown 监听器（已有 line ?，处理 Escape 关 legend/detail）加 if(isPanning) { isPanning=false; cv.style.cursor='default'; return; }
  - [x] 注意：只中断拖动，不关闭 legend/detail

- [x] Task 5: 模式切换重置视图（auto 时重置）
  - [x] 找 setMode 函数定义
  - [x] 在 mode==='auto' 分支加 resetTreeView() 调用
  - [x] 在 build/probe 切换时**不**调用（保留用户偏好）

- [ ] Task 6: 全面回归测试
  - [ ] 启动服务器 + 截 baseline
  - [ ] 滚轮缩放 + 拖动 + Esc 退出 + 双击重置 5 个场景
  - [ ] 验证光圈跟着树动
  - [ ] 验证边界保护（缩到 min 居中 + 放到 max 不丢）

# Task Dependencies
- Task 1-5 相互独立（无依赖）
- Task 6 在 1-5 全部完成后执行
