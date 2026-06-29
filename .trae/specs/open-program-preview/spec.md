# 打开程序预览 Spec

## Why
用户已完成 v1.9.3 wheel zoom 功能（仿射变换 + 边界保护），需要实际打开程序浏览器看效果，确认实际运行与测试截图一致、滚轮可用、视觉效果符合预期。

## What Changes
- 启动本地 HTTP 服务器（端口 8000）
- 用 headless edge 截取搭建模式 + 探伤模式首屏
- 提供本地 URL 让用户在浏览器亲自体验
- 不修改任何代码（纯展示任务）

## Impact
- Affected specs: 无
- Affected code: 无（仅运维 + 截图）

## ADDED Requirements

### Requirement: 本地 HTTP 服务器
系统 SHALL 在 c:\Users\User\WorkBuddy\2026-06-13-20-53-10\AI-Fusang\ 目录启动 HTTP 服务器监听 8000 端口。

#### Scenario: 服务器存活
- **WHEN** 用户访问 http://127.0.0.1:8000/index.html
- **THEN** 返回 200 OK，Content-Length > 0

### Requirement: 截图证明
系统 SHALL 用 headless edge 截取程序首屏（1280x800），存为 PNG 展示给用户。

#### Scenario: 截图生成
- **WHEN** 截屏完成
- **THEN** 文件大小 > 50KB（说明页面真的渲染了）

### Requirement: 提供访问方式
系统 SHALL 告诉用户本地 URL 与操作步骤（如何打开浏览器测滚轮）。
