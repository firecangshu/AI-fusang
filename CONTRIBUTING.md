# AI-Fusang 贡献规范

> MVP 阶段：能跑、能用、准确，同时防止程序无限制膨胀。

---

## 📏 程序大小原则

### 核心原则

- **MVP 优先**：能砍的功能就砍，不追求大而全
- **复用优先**：新增功能前，先检查是否能复用已有函数
- **重构触发点**：单文件超过 **1500 行**时，做一次重构评估（拆分或砍功能）

### 不设硬上限的原因

- 小程序平均大小 ~500KB（微信小程序限制 2MB）
- 当前 `index.html` ~1800 行 / ~80KB，还很轻量
- 设硬上限容易导致"为了上限而砍必要功能"

---

## ✅ 新增功能审查清单（强制性）

每次新增功能前，必须回答以下问题：

- [ ] 这个功能 MVP 阶段真的需要吗？（能砍就砍）
- [ ] 是否可以复用已有函数？（避免重复代码）
- [ ] 是否 i18n 全覆盖？（中英双语，不允许硬编码中文）
- [ ] 外部信号是否只用了 postMessage？（不支持 HTTP/WebSocket）
- [ ] 是否更新了 `API.md`？（如果涉及外部信号变更）

---

## 📡 外部信号限制（强制性）

### 接入方式

- ✅ **只支持 postMessage**（iframe 嵌入 → 发消息）
- ❌ 不支持 HTTP Polling（过度工程，MVP 不需要）
- ❌ 不支持 WebSocket（过度工程，MVP 不需要）

### 信号类型

固定 **9 种**，不随意新增：

| 信号类型 | 作用 |
|---------|------|
| `FUSANG_READY` | 握手，通知树"我准备好了" |
| `FUSANG_DISCONNECT` | 断开，树退回演示模式 |
| `FUSANG_BUILD_NODE` | 搭建节点（设为已搭建） |
| `FUSANG_INJECT_FAULT` | 注入故障（设为故障） |
| `FUSANG_AI_FIX` | AI 修复（设为修复中） |
| `FUSANG_MANUAL_FIX` | 人工修复（设为已修复） |
| `FUSANG_SET_STATUS` | 通用状态设置 |
| `FUSANG_HIGHLIGHT_NODE` | 高亮节点（闪烁金色） |
| `FUSANG_NODE_CLICK_ACK` | 确认节点点击（内部用） |

### Secret 验证

所有控制信号**必须带** `"secret": "fusang-2026"`，否则扶桑树拒绝接收。

---

## 🎨 代码风格

### 命名规范

- 变量名：驼峰（`liveLog`, `taskById`）
- 常量：全大写（`SECRET`, `APP_VERSION`）
- 函数名：动词开头（`buildNode`, `injectFault`）

### 注释语言

- ✅ 用中文（方便维护）
- ❌ 不用英文（除非是专业术语）

### 文件结构

- `index.html`：核心文件（Canvas 渲染 + 逻辑 + UI）
- `test-parent.html`：信号模拟器（用于测试）
- `tasks.json`：节点数据（外部系统可修改）
- `API.md`：外部系统接入文档
- `CONTRIBUTING.md`：本文件（贡献规范）

---

## 🔄 重构计划

### 触发条件

- `index.html` 超过 **1500 行** → 做一次重构评估
- 新增功能导致代码重复率 > 20% → 立即重构

### 重构目标

- 把 `index.html` 拆成多个 JS 文件（模块化）
- 保持 MVP 心态：能砍就砍，不追求完美架构

---

## 📞 联系我们

- GitHub Issues：https://github.com/firecangshu/AI-fusang/issues
- 邮箱：firecangshu@example.com（替换为真实邮箱）

---

**最后更新**：2026-06-19  
**版本**：v1.8
