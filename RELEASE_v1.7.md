## v1.7 - 拖拽手柄+状态反馈+i18n全覆盖（2026-06-19）

### ✨ 新增功能

1. **右侧面板拖拽手柄（test-parent.html）**
   - left/right 面板之间加 10px 宽拖拽区域
   - 始终可见的抓握手柄指示线
   - 宽度可拖拽范围 180~800px
   - 代码位置：`test-parent.html:17-22`

2. **FUSANG_STATUS_CHANGE 状态变更反馈信号（index.html）**
   - 每次 `task.status` 变更后自动向父窗口发送 `FUSANG_STATUS_CHANGE`
   - 包含 `nodeId, oldStatus, newStatus, timestamp`
   - 覆盖：4个 V4 postMessage handler + 4个内部函数 + recalcAll 自动传导
   - 代码位置：`index.html:607-623`

3. **test-parent.html 日志复制按钮**
   - 消息日志标题栏新增 `[📋复制]` 按钮
   - 支持 Clipboard API + 兜底 `execCommand('copy')`
   - 代码位置：`test-parent.html:109`

### 🐛 Bug修复

1. **i18n 初始化不全（index.html）**
   - 根因：首次加载时 `updateLangButtons()` 不更新模式按钮文本，仅更新中英按钮样式
   - 修复：改为 `setLang(lang)`，自动初始化模式按钮、标题、Debug Console 标签
   - 代码位置：`index.html:370`

2. **test-parent.html i18n 全覆盖（原无中英切换）**
   - 新增完整的 `i18n` 对象（zh/en，共 50+ 翻译条目）
   - 新增 `applyLang()` 刷新所有 DOM 文本
   - 所有 log 消息改用 `t()` 翻译
   - 语言切换按钮与 index.html 共享 `localStorage('fusang-lang')`
   - 代码位置：`test-parent.html:132-285`

3. **Debug Console 标题硬编码**
   - 修复：`"Debug Console"` 加入 i18n，随语言切换
   - 代码位置：`index.html:412,456`

4. **Header 溢出（test-parent.html）**
   - 根因：padding 和间距过大导致状态栏文字超窗口
   - 修复：缩小 padding/gap，flex-wrap 换行兜底
   - 代码位置：`test-parent.html:10-12`

### 🔧 改进

- 新增 MEMORY.md「i18n 中英双语规范」规则：每次版本迭代必须同步覆盖中英翻译
- 状态栏布局紧凑化

---

**完整改动**：commit hash 待写入
**Tag**：`v1.7`
