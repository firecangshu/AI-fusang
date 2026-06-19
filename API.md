# AI-Fusang 外部系统接入 API

> 让外部系统控制扶桑树的节点状态，5 分钟接入成功。

---

## 🚀 5 分钟快速接入

### 第 1 步：把扶桑树嵌入你的页面

```html
<!-- 你的页面.html -->
<iframe id="fusang" src="http://your-domain.com/index.html"></iframe>
```

### 第 2 步：握手（告诉树"我准备好了"）

```javascript
var fusang = document.getElementById('fusang').contentWindow;

fusang.postMessage({
  type: 'FUSANG_READY',
  secret: 'fusang-2026'
}, '*');
```

### 第 3 步：控制节点

```javascript
// 搭建节点
fusang.postMessage({
  type: 'FUSANG_BUILD_NODE',
  nodeId: 'api',
  secret: 'fusang-2026'
}, '*');

// 注入故障
fusang.postMessage({
  type: 'FUSANG_INJECT_FAULT',
  nodeId: 'db',
  secret: 'fusang-2026'
}, '*');
```

---

## 🤝 握手流程

外部系统接入扶桑树，必须先握手：

```
外部系统                   扶桑树
   |                           |
   |------- FUSANG_READY ----->|
   |<------ FUSANG_READY_ACK ---|
   |                           |
   |  (现在可以发控制信号了)     |
```

- 握手成功后，扶桑树进入**接入模式**，所有节点变灰（等待信号）
- 如果 3 分钟没有新信号，扶桑树自动退回**演示模式**

---

## 📡 控制信号列表（9 种）

| 信号类型 | 作用 | 必须字段 | 备注 |
|---------|------|---------|------|
| `FUSANG_READY` | 握手，通知树"我准备好了" | `secret` | 必须先发这个 |
| `FUSANG_DISCONNECT` | 断开，树退回演示模式 | `secret` | 可选 |
| `FUSANG_BUILD_NODE` | 搭建节点（设为已搭建） | `nodeId`, `secret` | 故障节点不允许 |
| `FUSANG_INJECT_FAULT` | 注入故障（设为故障） | `nodeId`, `secret` | 未搭建节点不允许 |
| `FUSANG_AI_FIX` | AI 修复（设为修复中） | `nodeId`, `secret` | 非故障节点不允许 |
| `FUSANG_MANUAL_FIX` | 人工修复（设为已修复） | `nodeId`, `secret` | 非故障节点不允许 |
| `FUSANG_SET_STATUS` | 通用状态设置 | `nodeId`, `status`, `secret` | 高级用法 |
| `FUSANG_HIGHLIGHT_NODE` | 高亮节点（闪烁金色） | `nodeId`, `secret` | 视觉效果 |
| `FUSANG_NODE_CLICK_ACK` | 确认节点点击（内部用） | `messageId`, `secret` | 一般不用 |

---

## 📋 消息格式示例

### 搭建节点

```json
{
  "type": "FUSANG_BUILD_NODE",
  "nodeId": "api",
  "secret": "fusang-2026"
}
```

### 注入故障

```json
{
  "type": "FUSANG_INJECT_FAULT",
  "nodeId": "db",
  "secret": "fusang-2026"
}
```

### AI 修复

```json
{
  "type": "FUSANG_AI_FIX",
  "nodeId": "db",
  "secret": "fusang-2026"
}
```

### 通用状态设置

```json
{
  "type": "FUSANG_SET_STATUS",
  "nodeId": "api",
  "status": "done",
  "secret": "fusang-2026"
}
```

**`status` 可选值**：
- `todo`：未搭建（灰色）
- `done`：已搭建（绿色）
- `blocked`：故障（红色）
- `fixed`：已修复（黄色）

---

## 📂 扶桑树节点 ID 列表

| nodeId | 中文名 | 说明 | 依赖节点 |
|--------|--------|------|---------|
| `entry` | 程序入口 | 根节点（树根） | 无 |
| `config` | 配置文件 | 树根 | 无 |
| `db` | 数据库 | | `config` |
| `cache` | 缓存 | | `db` |
| `api` | 接口层 | | `cache` |
| `auth` | 鉴权 | | `api` |
| `frontend` | 前端 | | `auth` |
| `tests` | 测试 | | `frontend` |
| `ci` | 持续集成 | | `tests` |
| `goal` | 程序出口 | 树顶（目标） | `ci` |

> **依赖关系说明**：扶桑树会自动显示依赖状态。  
> 例如：`api` 节点依赖 `cache`，如果 `cache` 故障，`api` 会自动显示红色（即使外部系统只发了 `INJECT_FAULT` 给 `cache`）。

---

## 📄 完整接入代码示例

### 示例 1：HTML 页面（直接打开就能用）

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>扶桑树接入示例</title>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    button { margin: 5px; padding: 10px; }
  </style>
</head>
<body>
  <h1>扶桑树接入示例</h1>

  <iframe id="fusang" src="http://your-domain.com/index.html" width="800" height="600"></iframe>

  <div>
    <button onclick="buildNode('api')">搭建 API 节点</button>
    <button onclick="injectFault('db')">注入 DB 故障</button>
    <button onclick="aiFix('db')">AI 修复 DB</button>
  </div>

  <script>
    var fusang = document.getElementById('fusang').contentWindow;

    // 握手
    function handshake() {
      fusang.postMessage({
        type: 'FUSANG_READY',
        secret: 'fusang-2026'
      }, '*');
      console.log('✅ 已发送握手信号');
    }

    // 搭建节点
    function buildNode(nodeId) {
      fusang.postMessage({
        type: 'FUSANG_BUILD_NODE',
        nodeId: nodeId,
        secret: 'fusang-2026'
      }, '*');
    }

    // 注入故障
    function injectFault(nodeId) {
      fusang.postMessage({
        type: 'FUSANG_INJECT_FAULT',
        nodeId: nodeId,
        secret: 'fusang-2026'
      }, '*');
    }

    // AI 修复
    function aiFix(nodeId) {
      fusang.postMessage({
        type: 'FUSANG_AI_FIX',
        nodeId: nodeId,
        secret: 'fusang-2026'
      }, '*');
    }

    // 页面加载后 3 秒自动握手
    setTimeout(handshake, 3000);
  </script>
</body>
</html>
```

### 示例 2：Python 脚本（模拟监控系统）

```python
import webbrowser
import time
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status', methods=['POST'])
def update_status():
    # 你的监控逻辑
    # 当检测到节点故障时，调用下面的 JS 函数
    pass

if __name__ == '__main__':
    app.run(port=8080)
```

> **注意**：Python 脚本需要借助一个中转 HTML 页面来发 `postMessage`。  
> 最简单的方式：用 Flask 输出上面的 HTML 示例，然后在浏览器里操作。

---

## 🔐 Secret 验证

所有控制信号**必须带** `"secret": "fusang-2026"`，否则扶桑树拒绝接收。

```javascript
// ✅ 正确
fusang.postMessage({
  type: 'FUSANG_BUILD_NODE',
  nodeId: 'api',
  secret: 'fusang-2026'  // ← 必须有
}, '*');

// ❌ 错误（缺少 secret）
fusang.postMessage({
  type: 'FUSANG_BUILD_NODE',
  nodeId: 'api'
}, '*');
// 结果：扶桑树忽略这条消息，控制台输出警告
```

---

## ❓ 常见问题（FAQ）

### Q1：扶桑树怎么知道我的页面准备好了？

**A**：你的页面加载完成后，发 `FUSANG_READY` 信号。扶桑树收到后，会：
1. 重置所有节点为"未搭建"（灰色）
2. 进入**接入模式**
3. 返回 `FUSANG_READY_ACK` 确认

---

### Q2：如果我的页面崩溃了，扶桑树会怎么样？

**A**：扶桑树有**3 分钟空闲超时**检测。如果 3 分钟没有新信号，自动退回**演示模式**。

---

### Q3：我可以搭建多个节点吗？

**A**：可以。每个节点独立发 `FUSANG_BUILD_NODE` 信号即可。

---

### Q4：故障节点能直接搭建吗？

**A**：不能。必须先用 `FUSANG_AI_FIX` 或 `FUSANG_MANUAL_FIX` 修复，再搭建。

---

### Q5：扶桑树的依赖关系是自动显示的吗？

**A**：是的。`getEffectiveStatus()` 函数会在渲染时自动检查依赖，外部系统不需要手动处理。

---

## 📞 联系我们

- GitHub Issues：https://github.com/firecangshu/AI-fusang/issues
- 邮箱：firecangshu@example.com（替换为真实邮箱）

---

**最后更新**：2026-06-19  
**版本**：v1.8
