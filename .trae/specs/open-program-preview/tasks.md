# Tasks

- [x] Task 1: 启动 HTTP 服务器
  - [x] 检查 8000 端口是否被占用
  - [x] 若无进程，启动 `python -m http.server 8000 --bind 127.0.0.1`（后台）
  - [x] 验证 `Test-NetConnection 127.0.0.1 8000` = True

- [x] Task 2: 截取搭建模式首屏
  - [x] 用 headless edge 加载 http://127.0.0.1:8000/index.html
  - [x] 截图存为 `preview-build-mode.png`（79900 bytes）

- [x] Task 3: 截取探伤模式首屏
  - [x] 用 headless edge 加载 `probe-preview.html`
  - [x] 截图存为 `preview-probe-mode.png`（151309 bytes）

- [ ] Task 4: 提供访问方式
  - [x] 告诉用户本地 URL（http://127.0.0.1:8000/）
  - [x] 提示滚轮操作方式（鼠标在 canvas 任意位置滚动即可）
  - [x] 提示两种模式切换方式（右上角按钮）

# Task Dependencies
无（顺序执行即可）
