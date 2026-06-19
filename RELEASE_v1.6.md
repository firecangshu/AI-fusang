## v1.6 - V4 postMessage 信号系统+外接控制面板（2026-06-18）

### 🐛 Bug修复

1. **版本号不同步（i18n 写死 v1.4）**
   - 根因：index.html 中 zh/en 两处 versionTitle 写死字符串，未读 APP_VERSION 变量
   - 修复：改为 `'AI—FUSANG '+APP_VERSION` 动态拼接
   - 代码位置：`index.html:405` 第447行

2. **MANUAL_FIX handler 语法错误**
   - 根因：修改时误删了 handler 收尾代码（`requestAnimationFrame(draw); return; }`）
   - 修复：补全缺失的关闭代码
   - 代码位置：`index.html:2257-2260`

3.  **搭建瞬间全绿（recalcAll 过度传导）**
   - 根因：SET_STATUS 和修复 handler 中调用了 recalcAll()
   - 修复：搭建/故障不调 recalcAll，修复仅修目标节点不下传
   - 代码位置：`index.html:2238-2244`

### ✨ 新增功能

1. **外接信号三段式控制**
   - 信号检测器（被动检测扶桑树就绪）→ 外接信号开关（用户控制）→ 已连接（状态显示）
   - 文件：`test-parent.html`

2. **V4 postMessage 信号系统**
   - `FUSANG_SET_STATUS`：通用设置节点状态（done/blocked）
   - `FUSANG_INJECT_FAULT`：注入故障
   - `FUSANG_AI_FIX` / `FUSANG_MANUAL_FIX`：AI/人工修复
   - `FUSANG_DISCONNECT`：断开外部信号
   - 代码位置：`index.html:2208-2267`

3. **外接控制面板**
   - 下拉选择节点 + 搭建/故障/AI修复/人工修复按钮
   - 开关 ON 前面板禁用，ON 后解锁
   - 文件：`test-parent.html`

4. **模式权限管理**
   - 外接信号接入 → 演示/调试按钮灰禁用，接入按钮绿色常亮
   - 所有鼠标操作（节点菜单/InfoCard按钮）在接入模式下禁用
   - 代码位置：`index.html:2269-2310`

### 🔧 改进

- 节点状态校验：todo 不可故障、done 无需修复
- 状态错误格式统一为 `{message:{zh,en},file,line,callChain}`
- 控制面板精简为搭建/故障/修复三组，去掉高亮辅助
- 顶部状态栏工业风设计，单灯显示

---

**完整改动**：`8b31b02`（feat: V4 postMessage 信号系统 + 外接控制面板 + 模式权限管理）
**Tag**：`v1.6`
