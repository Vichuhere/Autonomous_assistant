import os
from duckduckgo_search import DDGS
import google.generativeai as genai
import asyncio

class ResearchAssistant:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-pro')
        else:
            self.model = None

    async def search_web(self, query):
        # DDGS is synchronous, run in executor if needed for high load, 
        # but for this simple app direct call is okay or wrap in to_thread
        results = []
        try:
            with DDGS() as ddgs:
                # Get more results to ensure good context
                ddg_gen = ddgs.text(query, max_results=5)
                if ddg_gen:
                    results = list(ddg_gen)
        except Exception as e:
            print(f"Search error: {e}")
        return results

    async def conduct_research(self, topic):
        # 1. Search
        print(f"Searching for: {topic}")
        search_results = await self.search_web(topic)
        
        if not search_results:
             return {
                 "report": "No search results found.",
                 "sources": []
             }

        # 2. Extract context
        context = []
        for res in search_results:
            context.append(f"Source: {res.get('title', 'Unknown')}\nURL: {res.get('href', '#')}\nSummary: {res.get('body', '')}")
        
        full_context = "\n\n".join(context)

        # 3. Generate Brief with LLM
        if self.model:
            print("Generating brief with Gemini...")
            prompt = f"""
            You are an Autonomous Research Assistant.
            
            Topic: {topic}
            
            Goal: Generate a structured research brief based STRICTLY on the provided context.
            
            structure:
            1. Topic Overview (Executive Summary)
            2. Key Insights and Trends
            3. Important Statistics or Facts
            4. Challenges and Limitations
            5. Future Scope or Implications
            
            Format the output in Markdown.
            
            Context from Web Search:
            {full_context}
            """
            try:
                # Run sync call in thread if blocking
                response = await asyncio.to_thread(self.model.generate_content, prompt)
                return {"report": response.text, "sources": search_results}
            except Exception as e:
                return {"report": f"Error generating report: {str(e)}", "sources": search_results}
        else:
             return {
                 "report": "## AI Configuration Missing\n\nGemini API Key not found in environment variables. creating a brief is disabled.\n\n### Raw Search Results:\n" + full_context,
                 "sources": search_results
             }
