@echo off
echo Starting AI Research Assistant...

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install it from nodejs.org
    pause
    exit /b
)

:: Check for Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Python is not installed.
    pause
    exit /b
)

echo Starting Backend...
start "AI Backend" cmd /k "cd backend && venv\Scripts\activate && python -m uvicorn main:app --reload"

echo Starting Frontend...
cd frontend
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)
echo Launching Frontend...
start "AI Frontend" cmd /k "npm run dev"

echo Done!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
pause
