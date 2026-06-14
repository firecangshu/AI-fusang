# 🌳 AI-Fusang 使用手册

## 目录

1. [快速开始](#快速开始)
2. [界面总览](#界面总览)
3. [节点状态说明](#节点状态说明)
4. [交互操作](#交互操作)
5. [三大特效](#三大特效)
6. [工具栏按钮](#工具栏按钮)
7. [嵌入集成](#嵌入集成)
8. [消息 API 详解](#消息-api-详解)
9. [自定义数据](#自定义数据)
10. [常见问题](#常见问题)

---

## 快速开始

### 独立使用
直接用浏览器打开 `index.html`，无需安装任何依赖，无需构建工具。

```bash
# 克隆仓库后
cd AI-Fusang
open index.html   # macOS
start index.html  # Windows
# 或直接双击 index.html 文件
```

### 嵌入到你的应用
```html
<iframe src="index.html" id="fusang-frame" style="width:100%;height:100vh;border:none"></iframe>
```

---

## 界面总览

```
┌──────────────────────────────────────────────────────────┐
│ 🌳 AI-Fusang 扶桑 · 逻辑通天树    [初学者指南] [开发者视角] │  ← Header
├──────────────────────────────────────────────────────────┤
│                                                          │
│                    🌳 逻辑树区域                           │
│                                                          │
│        目标 → 需求 → 设计 → 开发 → 测试 → 部署            │  ← Cytoscape 画布
│                    ↗ 界面    ↗ 前端                        │     可拖拽/缩放
│                    ↘ 数据    ↘ 后端                        │
│                                                          │
│  ┌─────────┐                            ┌──────────┐     │
│  │ 🌳 图例  │                            │ 详情面板  │     │  ← 左下图例 / 右侧详情
│  └─────────┘                            └──────────┘     │
├──────────────────────────────────────────────────────────┤
│        [🌱 生长] [▶ 运行同步] [🔴 模拟阻塞] [🔄 重置]       │  ← 工具栏
└──────────────────────────────────────────────────────────┘
```

---

## 节点状态说明

| 颜色 | 状态 | 含义 |
|------|------|------|
| 🟢 绿色 `#3fb950` | **已完成 done** | 任务已完成，代码已提交 |
| 🔵 蓝色 `#58a6ff` | **进行中 in-progress** | 正在执行中 |
| ⚫ 灰色 `#6e7681` | **待办 todo** | 尚未开始 |
| 🔴 红色 `#f85149` | **阻塞 blocked** | 遇到问题，无法继续（脉冲闪烁） |
| 🟡 黄色 `#d29922` | **已跳过 skipped** | 任务被跳过 |
| 🟣 紫色 `#bc8cff` | **等待中 waiting** | 等待上游任务完成 |
| 🟡 金色 `#d4a72c` | **根节点** | 项目根目标，扶桑之根（特殊金色） |

### 特殊节点

- **根节点**：金色边框 + 发光效果，象征扶桑通天之根
- **菱形节点**：条件分支点（如"设计方案"），用菱形区分

---

## 交互操作

### 画布操作

| 操作 | 效果 |
|------|------|
| 鼠标拖拽空白区域 | 平移画布 |
| 鼠标滚轮 | 缩放画布 |
| 点击节点 | 弹出节点详情面板 |
| 点击边线 | 弹出边线衔接详情 |
| 点击空白区域 | 关闭详情面板 |

### 节点悬停

| 操作 | 效果 |
|------|------|
| 悬停节点 | 节点果冻弹跳膨胀 + 关联边线高亮变蓝 |
| 悬停边线 | 边线高亮变蓝变粗 |

### 节点详情面板

点击任意节点，右侧弹出详情面板，包含：

| 字段 | 说明 |
|------|------|
| 任务名称 | 节点的中文名称 |
| 状态 | 当前状态（带颜色标签） |
| 预估耗时 | 预计完成时间 |
| AI 处理 | AI 如何处理这一步 |
| 关联技能 | 对应的 AI Skill |
| 文件 | 关联的代码文件路径 |
| 代码行 | 对应的代码行号 |
| Commit | Git commit hash（如有） |
| ❌ 错误信息 | 仅 blocked 节点显示 |
| 🔴 跳转到代码 | 仅 blocked 节点显示，点击发送 postMessage |

### 边线详情面板

点击任意边线，右侧弹出衔接详情，包含：

| 字段 | 说明 |
|------|------|
| 衔接流 | 来源任务 → 目标任务 |
| 衔接说明 | 这条边代表什么关系 |
| 关联技能 | 衔接过程使用的 Skill |
| 使用工具 | 衔接过程使用的工具/技术 |
| 衔接描述 | 详细的衔接说明 |

### 初学者/开发者视角切换

点击右上角按钮切换：

- **初学者指南**：用通俗语言解释当前看到的逻辑树
- **开发者视角**：用技术语言描述系统架构和通信方式
- 两个互斥，开一个自动关另一个

---

## 三大特效

### ✨ 特效1：链路点亮

**触发条件**：一条从根到叶的完整路径上，所有节点都变成 `done`

**视觉效果**：
- 该路径上所有节点 → 金色边框发光
- 该路径上所有边线 → 金色高亮
- 多条链路可同时点亮，形成"金色树枝"效果

**情绪价值**：步步为营的成就感，看到自己走过的路被点亮

### ⚡ 特效2：阻塞暗淡

**触发条件**：某个节点变成 `blocked`

**视觉效果**：
- blocked 节点 → 红色脉冲闪烁（0.6 秒周期）
- blocked 节点的所有下游节点 → 透明度降为 0.3，变灰暗
- 下游边线同步暗淡

**情绪价值**：堵点影响可视化，紧迫感，一目了然哪里卡了

### 🎆 特效3：烟花庆祝

**触发条件**：所有节点都变成 `done`

**视觉效果**：
1. 全树链路点亮（金色光晕）
2. Canvas 粒子烟花：6 发，每发 60 粒子，金色/橙色/粉色/紫色/蓝色
3. 顶部横幅「🎆 扶桑之树，已尽璀璨！」，4 秒后淡出
4. 同时通过 postMessage 发送 `fusang:complete` 通知父窗口

**情绪价值**：顶级成就感！给足正反馈！

---

## 工具栏按钮

| 按钮 | 功能 | 说明 |
|------|------|------|
| 🌱 生长 | 树生长动画 | 初始只显示根节点，逐层 BFS 展开，每层 400ms |
| ▶ 运行同步 | BFS 状态动画 | 所有节点先重置为 todo，然后按层级依次：进行中(400ms)→已完成(400ms) |
| 🔴 模拟阻塞 | 演示阻塞效果 | 将 data 节点设为 blocked，触发暗淡效果 |
| 🔄 重置 | 恢复初始状态 | 所有节点恢复默认状态，重新布局 |

### 运行同步动画详解

1. 所有节点 → 灰色（todo）
2. 第 1 层（goal）→ 蓝色 400ms → 绿色
3. 第 2 层（breakdown）→ 蓝色 400ms → 绿色
4. 第 3 层（design/ui）→ 蓝色 400ms → 绿色
5. ...逐层推进
6. 全树变绿 → 链路点亮 → 烟花庆祝 🎆

---

## 嵌入集成

### iframe 嵌入

```html
<iframe 
  src="index.html" 
  id="fusang-frame" 
  style="width:100%; height:100vh; border:none"
></iframe>
```

### 与 AI 对话框联动

```
用户输入需求 → AI 分析 → 发送 fusang:update 消息 → 扶桑树节点状态更新
AI 执行代码 → 代码行完成 → 发送 fusang:update → 节点变 done → 链路点亮
AI 遇到错误 → 发送 fusang:update(blocked) → 节点红色脉冲 → 下游暗淡
```

### 与代码编辑器联动

```
用户点击 blocked 节点 → 扶桑发送 fusang:jump → 编辑器跳转到对应代码行
用户光标停在 // @task:xxx → 发送 fusang:highlight → 对应节点高亮
代码保存 → 发送 fusang:update → 节点状态更新
```

---

## 消息 API 详解

### 接收消息（父窗口 → 扶桑）

| 消息类型 | 字段 | 说明 |
|---------|------|------|
| `fusang:update` | taskId, status | 更新节点状态 |
| `fusang:highlight` | taskId | 高亮指定节点（居中显示） |
| `fusang:grow` | taskId | 展开指定节点（配合生长动画） |
| `fusang:reset` | — | 重置整棵树 |

#### 示例

```javascript
const fusang = document.getElementById('fusang-frame');

// 更新节点状态为 done
fusang.contentWindow.postMessage({
  type: 'fusang:update',
  taskId: 'design',
  status: 'done'
}, '*');

// 高亮某个节点
fusang.contentWindow.postMessage({
  type: 'fusang:highlight',
  taskId: 'data'
}, '*');

// 重置
fusang.contentWindow.postMessage({
  type: 'fusang:reset'
}, '*');
```

### 发送消息（扶桑 → 父窗口）

| 消息类型 | 字段 | 触发条件 |
|---------|------|---------|
| `fusang:jump` | taskId, codeLine, file | 点击 blocked 节点的"跳转到代码"按钮 |
| `fusang:select` | taskId | 点击任意节点 |
| `fusang:complete` | totalTasks | 全树完成（所有节点 done） |

#### 监听示例

```javascript
window.addEventListener('message', function(e) {
  var d = e.data;
  if (!d || !d.type) return;
  
  switch(d.type) {
    case 'fusang:jump':
      // 跳转到代码位置
      console.log('跳转到:', d.file, '第', d.codeLine, '行');
      // editor.openFile(d.file);
      // editor.setCursor(d.codeLine);
      break;
      
    case 'fusang:select':
      // 节点被选中
      console.log('选中任务:', d.taskId);
      break;
      
    case 'fusang:complete':
      // 项目完成！
      console.log('🎉 所有', d.totalTasks, '个任务已完成！');
      break;
  }
});
```

---

## 自定义数据

修改 `index.html` 中的 `tasks` 和 `edgeData` 数组即可自定义任务数据。

### 节点数据结构

```javascript
{
  id: 'unique-id',        // 唯一标识
  label: '任务名称',       // 显示名称
  status: 'todo',         // 状态：done/in-progress/todo/blocked/skipped/waiting
  duration: '2h',         // 预估耗时
  aiAction: 'AI 处理方式', // AI 如何处理
  skill: '关联技能',       // AI Skill
  commitHash: '',         // Git commit hash（可选）
  codeLine: 42,           // 代码行号（用于跳转）
  file: 'src/main.ts',    // 文件路径（用于跳转）
  error: '',              // 错误信息（仅 blocked）
  isDiamond: false        // 是否为菱形条件节点
}
```

### 边线数据结构

```javascript
{
  from: 'source-id',      // 来源节点 ID
  to: 'target-id',        // 目标节点 ID
  label: '衔接说明',       // 边线标签
  skill: '关联技能',       // 使用的 Skill
  tool: '使用工具',        // 使用的工具/技术
  desc: '衔接描述'         // 详细描述
}
```

### 根节点特殊处理

ID 为 `goal` 的节点会自动应用金色样式（扶桑之根）。

---

## 常见问题

### Q: Cytoscape.js 加载失败？
A: 检查网络连接。CDN 地址为 `cdnjs.cloudflare.com`，确保可以访问。

### Q: 如何修改主题颜色？
A: 修改 CSS 中 `body` 的 `background` 和 Cytoscape style 中各状态颜色值。

### Q: 如何添加更多节点？
A: 在 `tasks` 数组中添加新对象，同时在 `edgeData` 中添加对应的连接关系。

### Q: 烟花特效看不到？
A: 烟花只在所有节点都变成 `done` 时触发。点击"▶ 运行同步"可以观看完整流程。

### Q: postMessage 没有响应？
A: 确保 iframe 和父窗口同源，或正确配置 CORS。独立打开 index.html 时，postMessage 消息会输出到浏览器控制台（Console）。

### Q: 如何适配移动端？
A: 已内置响应式适配，768px 以下自动调整布局。详情面板会全宽显示。

---

## 🌳 关于扶桑

**扶桑**，中国古代神话中的通天神树，连接天地，日升月落皆由此经过。

AI-Fusang 以此为名，寓意**将代码的逻辑通到眼前**——

> 代码是地，逻辑是天，扶桑通天。

**代码写到哪，树就长到哪，演示面就展示到哪。**
