# AI Research Assistant

An autonomous AI Research Assistant built with a Python (FastAPI) backend and a React (Vite) frontend. It takes a topic as input and uses an AI agent to conduct research and generate a detailed report. 

## Features
- **FastAPI Backend**: Handles research requests and interacts with the AI agent.
- **React + Vite Frontend**: A modern, interactive user interface featuring Framer Motion animations and React Markdown for visualizing the research report.
- **Automated Startup**: Easily run the whole stack concurrently with a single Windows batch script (`start_app.bat`).

## Prerequisites

Ensure you have the following installed on your system:
- [Python 3.x](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/) (which includes npm)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd airesearch
   ```

2. **Backend Setup (Manual - if not using the batch script):**
   ```bash
   cd backend
   python -m venv venv
   source venv/Scripts/activate  # On Windows
   pip install -r requirements.txt
   ```
   *Make sure to configure any necessary environment variables like API keys in `backend/.env` according to the actual AI provider being used in `researcher.py`.*

3. **Frontend Setup (Manual - if not using the batch script):**
   ```bash
   cd frontend
   npm install
   ```

## Usage

The easiest way to start both the frontend and backend servers on Windows is by using the provided batch script.

1. Double-click on `start_app.bat` from your file explorer, OR run it from your terminal:
   ```cmd
   .\start_app.bat
   ```
2. The script will automatically:
   - Check if Node.js and Python are installed.
   - Activate the backend virtual environment and start the FastAPI server.
   - Install frontend dependencies if they are missing.
   - Start the Vite development server for the frontend.

3. Wait for both terminal windows to say they are ready, then open your browser and navigate to:
   - **Frontend UI:** [http://localhost:5173](http://localhost:5173)
   - **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

## Project Structure

```
airesearch/
│
├── backend/               # Python FastAPI server
│   ├── main.py            # API entry point
│   ├── researcher.py      # Core AI logic functionality
│   ├── requirements.txt   # Python dependencies
│   └── .env               # Environment configuration
│
├── frontend/              # Node.js React application (Vite)
│   ├── src/               # React source code (components, etc.)
│   ├── index.html         # Frontend entry point
│   ├── package.json       # JS dependencies and scripts
│   └── vite.config.js     # Vite configuration
│
└── start_app.bat          # Batch script to run the application easily
```

## Technologies Used
- **Backend:** Python, FastAPI, Uvicorn, Pydantic
- **Frontend:** React, Vite, TailwindCSS, Framer Motion, Axios, React Markdown
