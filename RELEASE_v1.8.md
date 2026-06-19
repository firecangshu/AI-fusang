## v1.8 - 外部系统完整接入支持（2026-06-19）

### 🎯 版本定位

**MVP 阶段关键版本**：让外部系统能完整控制扶桑树节点状态，同时定好程序边界，防止无限制膨胀。

---

### ✨ 新增功能

#### 1. 外部系统完整接入支持

**问题描述**：之前外部系统只能控制"故障/修复"，无法控制"搭建"，导致节点状态不完整。

**解决方案**：新增 `FUSANG_BUILD_NODE` 信号，外部系统可完整控制 9 种节点状态。

**使用方式**：
```javascript
// 外部系统发消息
fusang.postMessage({
  type: 'FUSANG_BUILD_NODE',
  nodeId: 'api',
  secret: 'fusang-2026'
}, '*');
```

**代码位置**：`index.html` 第 2497-2520 行（`addEventListener('message')` 中）

---

#### 2. API.md（外部系统接入文档）

**问题描述**：外部开发者不知道怎么接入扶桑树，导致"来一个用不了，来一个用不了"。

**解决方案**：写了一份完整的接入文档，包含：
- 5 分钟快速接入（复制粘贴就能跑）
- 握手流程说明
- 9 种控制信号列表
- 消息格式示例（JSON）
- 完整接入代码示例（HTML 页面，直接打开就能用）
- 常见问题（FAQ）

**文件位置**：`API.md`

**使用方式**：外部开发者只看这一个文件，5 分钟看懂，10 分钟接入成功。

---

#### 3. CONTRIBUTING.md（程序大小原则）

**问题描述**：程序越写越大，单文件无限制膨胀，导致维护困难。

**解决方案**：定了程序大小原则，不设硬上限，但设"重构触发点"（1500 行）。

**核心原则**：
- MVP 优先：能砍的功能就砍，不追求大而全
- 复用优先：新增功能前，先检查是否能复用已有函数
- 重构触发点：`index.html` 超过 1500 行时，做一次重构评估

**文件位置**：`CONTRIBUTING.md`

---

### 🐛 Bug 修复

#### 1. pendingAcks 内存泄漏

**根因**：每次点击节点都创建一个 `setTimeout` 放进 `pendingAcks[messageId]`，但收到 ACK 后没有 `clearTimeout`，`pendingAcks` 对象只增不删（除非超时）。

**修复方案**：在收到 `FUSANG_NODE_CLICK_ACK` 时，执行 `clearTimeout(pendingAcks[messageId])` 并 `delete`。

**代码位置**：`index.html` 第 2498-2507 行

---

#### 2. 故障节点点"搭建"导致下游全变绿

**根因**：`liveBuild()` 中没有检查节点是否故障，导致故障节点被强制设为 `done`，`getEffectiveStatus()` 自动把所有下游依赖节点都显示成绿色。

**修复方案**：在 `liveBuild()` 中新增故障检查：
```javascript
if(task.status==='blocked'){
  liveLog(i18n[lang].liveLogNodeFaulted+nid);
  return;  // 阻止搭建
}
```

**代码位置**：`index.html` 第 611-615 行

---

#### 3. 英文版切换后功能消失

**根因**：上次改日志 i18n 时，错误用了 `t('liveLog...')` 写法，但 `index.html` 里根本没有 `t()` 函数，导致 JS 报错，整个页面功能失效。

**修复方案**：
1. 所有 `t('liveLog...')` → `i18n[lang].liveLog...`（与项目现有代码风格一致）
2. 在 `i18n` 对象结尾处补上 `t()` 函数，防止未来再出现同样问题

**代码位置**：`index.html` 第 667-675 行（`t()` 函数定义）

---

#### 4. `sendStatusChange` 硬编码旧状态 `'todo'`

**根因**：`liveBuild()` 中 `sendStatusChange(nid,'todo','done')` 硬编码了旧状态 `'todo'`，导致状态传导错误。

**修复方案**：改为 `var oldSt=task.status; sendStatusChange(nid,oldSt,'done')`，动态获取真实旧状态。

**代码位置**：`index.html` 第 618-620 行

---

#### 5. 重复搭建无提示

**根因**：`liveBuild()` 中没有检查节点是否已搭建，导致重复搭建无提示，用户不知道操作是否生效。

**修复方案**：新增 `if(task.status==='done')` 检查，日志输出"⚠️ 节点已搭建，无需重复"。

**代码位置**：`index.html` 第 616-620 行

---

### 🔧 改进

#### 1. 接入面板日志 i18n 全覆盖

**改进说明**：之前接入面板的消息日志是硬编码中文，切换英文后依然显示中文。

**改进方案**：
1. 新增 11 个 i18n 键（`liveLogNodeNotFound`、`liveLogBuild`、`liveLogNodeNotBuilt` 等）
2. 替换所有 11 处硬编码日志调用（`liveLog('⚠️ 节点不存在: '+nid)` → `liveLog(i18n[lang].liveLogNodeNotFound+nid)`）

**代码位置**：`index.html` 第 448-470 行（i18n 键定义）

---

#### 2. 程序大小原则文档化

**改进说明**：之前没有程序大小限制，导致代码越写越大。

**改进方案**：写 `CONTRIBUTING.md`，明确：
- 程序大小原则（MVP 优先、复用优先、重构触发点）
- 新增功能审查清单（5 个问题）
- 外部信号限制（只支持 postMessage，固定 9 种信号类型）
- 代码风格（命名规范、注释语言、文件结构）

---

### 📊 完整改动

**Commit**: `f26e310`  
**Tag**: `v1.8`  
**改动文件**：5 个  
**改动行数**：+1177 / -64

| 文件 | 改动说明 |
|------|---------|
| `index.html` | 新增 `FUSANG_BUILD_NODE` 信号、修复 5 个 Bug、i18n 全覆盖 |
| `test-parent.html` | 补充 `logRecvMessage` i18n 键 |
| `API.md` | 新增（外部系统接入文档） |
| `CONTRIBUTING.md` | 新增（程序大小原则） |
| `debug-test.html` | 新增（调试测试页面，不提交） |

---

### 🔗 GitHub Release 创建链接

https://github.com/firecangshu/AI-fusang/releases/new?tag=v1.8

**操作步骤**：
1. 打开上面的链接
2. 复制本 Release notes 的内容
3. 粘贴到 "Describe this release" 文本框
4. 点击 "Publish release"

---

**最后更新**：2026-06-19  
**版本**：v1.8
