# UI 全覆盖审查与巩固 Spec（v1.9.3）

## Why
wheel zoom（滚轮缩放）+ 右键拖动 + 光圈修复 + 边界修复已落地，但对照项目硬约束（探伤模式 UI 规范）做全面审查，发现 5 处违反规范 / 漏点，需要在 1 个迭代内全部解决。

## What Changes
- **real 模式拦截**（合规性）：滚轮 / mousedown / mouseup 未拦截，real 模式用户可缩放和拖动——违反 "real 模式只观察不可交互" 原则
- **cursor 冲突修复**（视觉性）：拖动时 `cv.style.cursor='grabbing'` 与 mousemove 监听器（按节点 hover 改 cursor）冲突，导致光标闪烁
- **重置视图功能**（功能性）：缩放/拖动后无任何"回到默认视角"入口，用户偏离后无法快速恢复
- **跨模式状态隔离**（一致性）：从探伤切到搭建再切回，缩放/拖动状态保留——可能造成状态污染/视野混乱
- **键盘快捷键**（效率性）：Esc 键应能退出拖动/重置视角（与现有 Escape 处理 `probe-legend` / `probe-detail-overlay` 一致）

## Impact
- Affected specs: 探伤模式 UI 规范（hard constraints）、节点详情卡、演示模式状态机
- Affected code: `index.html:707-806`（wheel + 拖动模块）、`index.html:3706-3716`（mousemove cursor 监听）、`index.html:1526`（draw 强制重置）、`index.html:1480`（setMode 切换）

## ADDED Requirements

### Requirement: 1. real 模式完全只读
当 `currentMode==='real'` 时，wheel 缩放 + 右键拖动必须完全禁用，与现有 mousemove 拦截（line 3752）保持一致。

#### Scenario: real 模式无响应
- **WHEN** `currentMode==='real'` 且用户在画布上滚轮或右键拖动
- **THEN** 不修改 treeScale / treeOffsetX / treeOffsetY，isPanning 保持 false

### Requirement: 2. 拖动光标锁定
拖动期间（`isPanning===true`）mousemove 监听器（line 3706）必须**不**改 cursor，避免光标闪烁。

#### Scenario: 拖动无闪烁
- **WHEN** 用户按住右键拖动
- **THEN** cursor 始终是 `grabbing`，松开后恢复 `default`/`pointer`（按节点 hover）

### Requirement: 3. 双击重置视图
双击画布空白处（非节点、非按钮）→ treeScale=0.95, treeOffsetX=0, treeOffsetY=0, userZoomed=false。

#### Scenario: 双击恢复默认
- **WHEN** 用户在画布空白处双击（300ms 内两次点击，且中间无明显移动）
- **THEN** 树重置为默认 0.95 缩放 + 居中位置

### Requirement: 4. Esc 退出拖动
按 Esc 键时如果 `isPanning===true`，立即结束拖动（mousedown 状态清理），cursor 恢复。

#### Scenario: Esc 中断拖动
- **WHEN** 用户按住右键拖动时按 Esc
- **THEN** 拖动立即结束，isPanning=false，cursor 恢复

### Requirement: 5. 模式切换重置视图
`setMode('build'/'probe'/'real')` 切换时，如果新模式与旧模式不同，**不**重置 zoom/pan（保留用户偏好）；但 `setMode('auto')` 触发时（如超时 3 分钟）应重置。

#### Scenario: 主动切换保留偏好
- **WHEN** 用户点击 `[搭建] [探伤]` 按钮切换模式
- **THEN** 保留当前 treeScale / treeOffset（不重置）

#### Scenario: 自动切回 build 重置
- **WHEN** `setMode('auto')` 被调用（超时 / 外部信号）
- **THEN** treeScale=0.95, offsets=0, userZoomed=false（重置回默认）

## MODIFIED Requirements
无（保留所有现有功能，只补漏）

## REMOVED Requirements
无（不删任何功能）
