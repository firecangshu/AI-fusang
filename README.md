# 🌳 AI-Fusang — Code Visualization & Dependency Graph Tool · 逻辑通天树

> **Code Visualization · Dependency Graph · Real-time Task Tree** — See your code logic at a glance.

[Live Demo →](#)

---

## Why Developers Need Code Visualization

**Code is linear. Logic is web-shaped.** Traditional editors flatten the web into lines — you scroll through files trying to rebuild the mental model.

- 🧠 **12 tasks in progress** — which ones can run in parallel? Your editor can't show you.
- 🔴 **Something's blocked** — you dig through logs, click files one by one, guessing where the bottleneck is.
- 📉 **4 hours coding** — feels like nothing is done. No visual progress, no signal.

**AI-Fusang is the missing visual layer** — a real-time logic tree that grows with your code.

---

## What is AI-Fusang?

AI-Fusang fills the **4th dimension** of AI-assisted development:

| Component | Role | Status |
|-----------|------|--------|
| 🤖 AI Chat | Talk to AI | ✅ Exists |
| 💻 Code Editor | Write code | ✅ Exists |
| 📺 Preview | See results | ✅ Exists |
| **🌳 Fusang Logic Tree** | **Visualize code logic** | **🆕 This** |

Named after **扶桑 (Fusang)** — the mythical world tree in Chinese mythology that connects heaven and earth. Fusang connects your code (the ground) to its logic (the sky).

**Real-time code visualization** — code it, grow it, see it. Three in one.

---

## ✨ Core Features

### 🌉 Logic Visualization — Not Just Code
Your brain shouldn't have to rebuild the dependency graph. Fusang renders it in real-time: serial chains, parallel branches, conditional diamonds, convergence points — all visible at a glance.

**Use cases**: code review, architecture overview, onboarding new developers, technical debt visualization.

### 🎯 Blocked? Jump Straight There
Red pulsing nodes = blocked tasks. Click → jump to the exact code line. No more scrolling through error logs.

### 🎮 Gamified Progress — See Your Work
- **Path Glow**: Complete a full root-to-leaf chain → it lights up gold 🌟
- **Blocked Dimming**: A blocked node dims everything downstream — you see the blast radius instantly
- **🎆 Fireworks**: Complete the entire project → fireworks celebration! Because you earned it.

---

## 🎬 Demo (Screenshot / GIF)

![AI-Fusang Demo](https://via.placeholder.com/800x450?text=AI-Fusang+Screenshot)

---

## 🚀 Quick Start

```bash
git clone https://github.com/firecangshu/ai-fusang.git
cd ai-fusang
open index.html   # or just double-click it
```

No build tools. No npm install. Just open the file.

---

## 🔌 Integration (postMessage API)

Fusang is designed as an **embeddable panel** — drop it in an iframe and drive it from your app.

📖 **Full API Documentation**: See [API.md](./API.md) for complete signal reference, code examples, and integration guide.

### Quick Start

**Step 1**: Embed Fusang in your page
```html
<iframe src="index.html" id="fusang-frame"></iframe>
```

**Step 2**: Wait for Fusang to be ready
```javascript
window.addEventListener('message', (e) => {
  if(e.data.type === 'FUSANG_READY') {
    console.log('Fusang is ready!');
    // Now you can send commands
  }
});
```

**Step 3**: Send commands to control the tree
```javascript
const fusang = document.getElementById('fusang-frame');

// Inject a fault (turns node red)
fusang.contentWindow.postMessage({
  type: 'FUSANG_INJECT_FAULT',
  nodeId: 'db',
  secret: 'fusang-2026'
}, '*');

// Build a node (turns node green)
fusang.contentWindow.postMessage({
  type: 'FUSANG_BUILD_NODE',
  nodeId: 'db',
  secret: 'fusang-2026'
}, '*');
```

### Available Signals (9 total)

| Direction | Signal | Purpose |
|-----------|--------|---------|
| Host → Fusang | `FUSANG_READY` | Handshake: host tells Fusang it's ready |
| Host → Fusang | `FUSANG_INJECT_FAULT` | Turn a node red (blocked) |
| Host → Fusang | `FUSANG_BUILD_NODE` | Turn a node green (done) |
| Host → Fusang | `FUSANG_AI_FIX` | Trigger AI fix animation |
| Host → Fusang | `FUSANG_SET_STATUS` | Set any status directly |
| Host → Fusang | `FUSANG_HIGHLIGHT_NODE` | Highlight a node (gold glow) |
| Fusang → Host | `FUSANG_NODE_CLICK` | User clicked a node |
| Fusang → Host | `FUSANG_STATUS_CHANGE` | A node's status changed |
| Fusang → Host | `FUSANG_READY` | Fusang finished loading |

See [API.md](./API.md) for full details, security (secret), and code examples.

---

## 🎭 Who Is This For?

| For AI Beginners | For Developers |
|-----------------|----------------|
| See how AI breaks down your goal | Track 50+ tasks without losing context |
| Understand what "in progress" really means | Spot blocked tasks and parallel opportunities |
| Learn AI's thinking process visually | Link tasks to Skills, Agents, and Git commits |

Toggle between **Beginner Guide** and **Developer View** in the top-right corner.

---

## The Gap in AI Coding Assistants

No AI coding assistant (Cursor, Copilot, Windsurf, etc.) provides a **visual task graph**. You see code changes, but never the big picture. **AI-Fusang fills this gap.**

> 代码是线性的，逻辑是网状的。传统编辑器把网硬压成线，开发者只能在脑内还原建模。
> 
> Code is linear, logic is web-shaped. Traditional editors flatten the web — Fusang brings it back to life.

---

## 🗺️ Roadmap (Ideas Welcome!)

### ✅ Implemented (v1.8)
- ✅ **Multi-language**: i18n support (Chinese + English, full UI coverage)
- ✅ **External API**: Full postMessage API (9 signals, secret verification)
- ✅ **Three Modes**: Demo / Debug / Access (external control)
- ✅ **Zero Dependencies**: Pure Canvas 2D, no npm install needed

### 🔜 Next
- 📋 **JSON Import**: Paste your own task data → auto-generate tree
- 🔄 **Real-time Sync**: Connect to AI assistant APIs (Cursor, Copilot, etc.)
- 📐 **More Layouts**: Radial, timeline, kanban views
- 🔌 **IDE Plugins**: VS Code extension, JetBrains plugin
- 🎨 **Custom Themes**: Light mode, custom color schemes

Open an issue or PR!

---

## ⭐ Found This Useful?

Star this repo — it helps others discover it.

**Code visualization for AI-assisted development** — See your logic, grow your tree.

---

## 🔍 Keywords (for search engines)

`code visualization` · `dependency graph` · `task tree` · `real-time code feedback` · `AI coding assistant` · `developer tools` · `Canvas 2D` · `postMessage API` · `technical debt visualization` · `code review tool` · `AST visualization` · `逻辑树` · `代码可视化` · `依赖关系图` · `任务树` · `AI 编程可视化`

---

Built with pure Canvas 2D · Inspired by the missing piece in every AI assistant · Named after 扶桑，中国通天神树
