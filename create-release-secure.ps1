# Create GitHub Release via API (Secure PAT Input)
# PAT: AsSecureString (chars not echoed) -> used in memory only -> zeroed after

$ErrorActionPreference = "Stop"
chcp 65001 > $null  # UTF-8 console output

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Release Publisher (v1.9.2)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Validate preconditions
if (-not (Test-Path "release-payload.json")) {
  Write-Host "[ERROR] release-payload.json not found" -ForegroundColor Red
  Write-Host "        Run first: powershell -ExecutionPolicy Bypass -File gen-payload.ps1" -ForegroundColor Yellow
  exit 1
}
$tag = git tag -l v1.9.2
if (-not $tag) {
  Write-Host "[ERROR] git tag v1.9.2 not found locally" -ForegroundColor Red
  Write-Host "        Run first: git tag -a v1.9.2 -m '...' && git push origin v1.9.2" -ForegroundColor Yellow
  exit 1
}
Write-Host "[1/4] Preconditions OK (tag v1.9.2 + release-payload.json)" -ForegroundColor Green

# 2. Read PAT securely (chars not echoed)
Write-Host ""
Write-Host "[2/4] Reading GitHub PAT securely (chars hidden)..." -ForegroundColor Cyan
$secure = Read-Host "        Paste your PAT (repo scope) and press Enter" -AsSecureString
if (-not $secure) {
  Write-Host "[ERROR] PAT empty" -ForegroundColor Red
  exit 1
}
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
$token = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
[System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR)
[System.GC]::Collect()
Write-Host "        PAT loaded into memory (length: $($token.Length) chars)" -ForegroundColor Gray

# 3. Call GitHub API
Write-Host ""
Write-Host "[3/4] Calling GitHub API..." -ForegroundColor Cyan
$headers = @{
  "Authorization"        = "token $token"
  "Accept"               = "application/vnd.github+json"
  "X-GitHub-Api-Version" = "2022-11-28"
  "User-Agent"           = "AI-Fusang-Release-Tool"
}
$body = Get-Content "release-payload.json" -Raw -Encoding UTF8

try {
  $response = Invoke-RestMethod `
    -Uri "https://api.github.com/repos/firecangshu/AI-fusang/releases" `
    -Method Post `
    -Headers $headers `
    -Body $body `
    -ContentType "application/json"

  Write-Host "        HTTP 201 Created" -ForegroundColor Green
}
catch {
  $code = $_.Exception.Response.StatusCode.value__
  Write-Host "        HTTP $code Failed" -ForegroundColor Red
  Write-Host ""
  Write-Host "        Error details:" -ForegroundColor Yellow
  try {
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $errBody = $reader.ReadToEnd() | ConvertFrom-Json
    Write-Host "        Message: $($errBody.message)" -ForegroundColor Red
    if ($errBody.errors) {
      $errBody.errors | ForEach-Object { Write-Host "        Field: $($_.field) - $($_.message)" -ForegroundColor Red }
    }
  } catch {
    Write-Host "        $($_.Exception.Message)" -ForegroundColor Red
  }
  $token = $null
  [System.GC]::Collect()
  exit 1
}

# 4. Show result + cleanup
Write-Host ""
Write-Host "[4/4] Cleaning up..." -ForegroundColor Cyan
$token = $null
[System.GC]::Collect()

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  RELEASE PUBLISHED SUCCESSFULLY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Tag:     $($response.tag_name)" -ForegroundColor White
Write-Host "  Name:    $($response.name)" -ForegroundColor White
Write-Host "  URL:     $($response.html_url)" -ForegroundColor Cyan
Write-Host "  Author:  $($response.author.login)" -ForegroundColor White
Write-Host "  Created: $($response.created_at)" -ForegroundColor White
Write-Host ""
Write-Host "Open browser to: $($response.html_url)" -ForegroundColor Yellow
Write-Host ""
