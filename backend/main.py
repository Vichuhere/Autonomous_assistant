from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from researcher import ResearchAssistant
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

app = FastAPI(title="Autonomous Research Assistant API")

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

researcher = ResearchAssistant()

class ResearchRequest(BaseModel):
    topic: str

@app.post("/api/research")
async def conduct_research(request: ResearchRequest):
    try:
        result = await researcher.conduct_research(request.topic)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Research Assistant Backend Running"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
