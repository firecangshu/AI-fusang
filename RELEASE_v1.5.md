## v1.5 - Bug修复版本（2026-06-16）

### 🐛 Bug修复

1. **注入故障无效**
   - 根因：演示状态机在用户注入故障后继续运行，`resetToAllGreen()` 清除用户注入的故障
   - 修复：`menuInjectFault()` 注入故障后设置 `demoState=-1`（暂停演示）+ `currentMode='interactive'`（切换调试模式）
   - 代码位置：`menuInjectFault()` 函数（约第 2148 行）

2. **InfoCard 按钮点击无效**
   - 根因：InfoCard 上的「AI Fix / Manual Fix / 注入故障」按钮是 Canvas 绘制的，没有绑定点击事件
   - 修复：在 Canvas click handler 中添加 InfoCard 按钮区域点击检测（约第 2022-2058 行）
   - 代码位置：`cv.addEventListener('click', ...)` 处理函数

3. **演示模式 S10→退出**
   - 根因：演示结束（S10）后直接退出到调试模式，用户体验不连贯
   - 修复：演示结束（S10）改为循环回 S0（继续演示）
   - 代码位置：`draw()` 函数中的 `demoState===10` 分支（约第 710 行）

### 🔧 改进

- `tasks.json` 加载失败时，使用内置 fallback 数据（防止 file:// 协议下加载失败）
- 代码位置：`fetchTasks()` 函数（约第 264 行）

---

**完整改动**：`3c28c67`（APP_VERSION 更新）+ `6c8b049`（Bug修复）  
**Tag**：`v1.5`  
**Commit 数**：2 个 commit，74 行新增，5 行删除
