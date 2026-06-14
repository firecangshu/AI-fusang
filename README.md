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
git clone https://github.com/YOUR_USERNAME/AI-Fusang.git
cd AI-Fusang
open index.html   # or just double-click it
```

No build tools. No npm install. Just open the file.

---

## 🔗 Integration (postMessage API)

Fusang is designed as an **embeddable panel** — drop it in an iframe and drive it from your app.

### Embed
```html
<iframe src="index.html" id="fusang-frame"></iframe>
```

### Send commands to Fusang
```javascript
const fusang = document.getElementById('fusang-frame');

// Replace all nodes (Host → Fusang)
fusang.contentWindow.postMessage({
  type: 'FUSANG_UPDATE_NODES',
  tasks: [/* array of task objects */]
}, '*');

// Notify AI fix result (Host → Fusang)
fusang.contentWindow.postMessage({
  type: 'FUSANG_AI_FIX_RESULT',
  nodeId: 'data',
  success: true,
  fixedCode: 'port: 6379 // fixed'
}, '*');
```

### Listen for Fusang events
```javascript
window.addEventListener('message', (e) => {
  const d = e.data;
  if(!d || !d.type) return;
  switch(d.type) {
    case 'FUSANG_JUMP_TO_CODE':
      // User clicked a blocked node → jump to code
      editor.openFile(d.file);
      editor.setCursorPosition(d.line);
      break;
    case 'FUSANG_REQUEST_AI_FIX':
      // User clicked "AI Fix" → host should run AI fix
      runAIFix(d.nodeId, d.error);
      break;
    case 'FUSANG_NODE_STATUS_CHANGED':
      // A node's status changed
      console.log('Node', d.nodeId, 'changed:', d.oldStatus, '→', d.newStatus);
      break;
  }
});
```

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

- 📋 **JSON Import**: Paste your own task data → auto-generate tree
- 🔄 **Real-time Sync**: Connect to AI assistant APIs (Cursor, Copilot, etc.)
- 🌐 **Multi-language**: i18n support
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
