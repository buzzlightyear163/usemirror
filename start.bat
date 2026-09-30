@echo off
title MIRROR dev server
cd /d "%~dp0"

where node >/dev/null 2>nul
if errorlevel 1 (
  echo Node.js hittades inte. Installera det fran https://nodejs.org och kor start.bat igen.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installerar dependencies, forsta gangen tar det en minut...
  call npm install
  if errorlevel 1 (
    echo npm install misslyckades.
    pause
    exit /b 1
  )
)

echo Startar MIRROR pa http://localhost:5173
call npm run dev
pause
