# Generate release-payload.json
# Read release-notes.md -> build JSON -> write file

$ErrorActionPreference = "Stop"

if (-not (Test-Path "release-notes.md")) {
  Write-Host "[ERROR] release-notes.md not found" -ForegroundColor Red
  exit 1
}

# Read release notes (handle BOM)
$body = [System.IO.File]::ReadAllText("release-notes.md", [System.Text.UTF8Encoding]::new($false))
Write-Host ("release-notes.md: {0} chars" -f $body.Length) -ForegroundColor Gray

# Build JSON via PSCustomObject
$payload = [PSCustomObject]@{
  tag_name          = "v1.9.2"
  target_commitish  = "master"
  name              = "v1.9.2 Probe Mode Stage 2 Refactor"
  body              = $body
  draft             = $false
  prerelease        = $false
  make_latest       = "true"
}

# Convert to JSON and write (UTF-8 no BOM)
try {
  $json = $payload | ConvertTo-Json -Depth 10
  [System.IO.File]::WriteAllText("release-payload.json", $json, [System.Text.UTF8Encoding]::new($false))
  $size = (Get-Item "release-payload.json").Length
  Write-Host ("[OK] release-payload.json generated ({0} bytes)" -f $size) -ForegroundColor Green
  Write-Host ("     Path: {0}" -f (Resolve-Path 'release-payload.json').Path) -ForegroundColor Gray
} catch {
  Write-Host ("[ERROR] JSON generation failed: {0}" -f $_.Exception.Message) -ForegroundColor Red
  exit 1
}
