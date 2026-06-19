# 🌳 AI-Fusang 扶桑 · 逻辑通天树

> **把代码的逻辑通到眼前来**

[Live Demo →](#)

---

## The Problem

**Code is linear. Logic is web-shaped.**

Traditional editors flatten the web into lines. Your brain spends more energy rebuilding the model than writing the code.

- 🧠 You're building 12 tasks — which ones can run in parallel? You can't tell from the editor.
- 🔴 Something's blocked — you scroll through logs trying to find where, clicking through files one by one.
- 📉 You've been coding for 4 hours — but it feels like nothing is done. No reward. No signal.

---

## What is AI-Fusang?

AI-Fusang is the **4th dimension** of AI-assisted development — a real-time logic tree that grows with your code.

| Component | Role | Status |
|-----------|------|--------|
| 🤖 AI Chat | Talk to AI | ✅ Exists |
| 💻 Code Editor | Write code | ✅ Exists |
| 📺 Preview | See results | ✅ Exists |
| **🌳 Fusang Logic Tree** | **See the logic** | **🆕 This** |

Named after **扶桑 (Fusang)** — the mythical world tree in Chinese mythology that connects heaven and earth. Fusang connects your code (the ground) to its logic (the sky).

**代码写到哪，树就长到哪，演示面就展示到哪** — Code it, grow it, see it. Three in one.

---

## ✨ Core Features

### 🌉 See the Logic — Not Just the Code
Your brain shouldn't have to rebuild the dependency graph. Fusang renders it in real-time: serial chains, parallel branches, conditional diamonds, convergence points — all visible at a glance.

### 🎯 Blocked? Jump Straight There
Red pulsing nodes = blocked tasks. Click → jump to the exact code line. No more scrolling through error logs.

### 🎮 Gamified Progress
- **Path Glow**: Complete a full root-to-leaf chain → it lights up gold 🌟
- **Blocked Dimming**: A blocked node dims everything downstream — you see the blast radius instantly
- **🎆 Fireworks**: Complete the entire project → fireworks celebration! Because you earned it.

---

## 🎬 Demo

![AI-Fusang Demo](https://via.placeholder.com/800x450?text=AI-Fusang+Screenshot)

---

## 🚀 Quick Start

```bash
git clone https://github.com/firecangshu/AI-fusang.git
cd AI-Fusang
open index.html   # or just double-click it
```

No build tools. No npm install. Just open the file.

---

## 🔗 Integration (postMessage API)

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

## 🎭 Dual Audience

| For AI Beginners | For Developers |
|-----------------|----------------|
| See how AI breaks down your goal | Track 50+ tasks without losing context |
| Understand what "in progress" really means | Spot blocked tasks and parallel opportunities |
| Learn AI's thinking process visually | Link tasks to Skills, Agents, and Git commits |

Toggle between **Beginner Guide** and **Developer View** in the top-right corner.

---

## The Gap

No AI coding assistant (Cursor, Copilot, Windsurf, etc.) provides a visual task graph. You see code changes, but never the big picture. **AI-Fusang fills this gap.**

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
- 🧩 **Custom Themes**: Light mode, custom color schemes

Open an issue or PR!

---

## ⭐ Found this useful?

Star this repo — it helps others discover it.

**代码写到哪，树就长到哪** — Code it, grow it, see it.

---

Built with pure Canvas 2D · Inspired by the missing piece in every AI assistant · Named after 扶桑，中国通天神树
