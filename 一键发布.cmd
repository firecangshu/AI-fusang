@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo   GitHub Release Publisher (v1.9.2)
echo ========================================
echo.

:: 1. 准备 JSON
echo [1/3] 生成 release-payload.json ...
powershell -ExecutionPolicy Bypass -NoProfile -File "gen-payload.ps1"
if errorlevel 1 (
  echo [失败] gen-payload.ps1 错误
  pause
  exit /b 1
)

:: 2. 调 API 创建 release
echo.
echo [2/3] 创建 Release （会提示输入 PAT，输入字符不显示）...
echo.
powershell -ExecutionPolicy Bypass -NoProfile -File "create-release-secure.ps1"
if errorlevel 1 (
  echo.
  echo [失败] Release 创建失败
  pause
  exit /b 1
)

:: 3. 完成
echo.
echo [3/3] 全部完成！
echo.
echo 下一步: 去 https://github.com/firecangshu/AI-fusang/releases 查看
echo.
pause
