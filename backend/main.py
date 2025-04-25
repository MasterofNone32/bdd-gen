import os
from openai import OpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
async def generate_requirements(request: PromptRequest):
    prompt = request.prompt

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are an expert in Behavior Driven Development and Python code generation. Return BDD features and matching Python test code.",
            },
            {"role": "user", "content": f"Write a BDD feature and Python test code for: {prompt}"},
        ],
        temperature=0.3,
    )

    content = response.choices[0].message.content

    # Simple content split (can refine this logic)
    parts = content.split("```")
    bdd = parts[0].strip()
    code = parts[1].strip() if len(parts) > 1 else ""

    return {
        "feature": bdd,
        "code": code
    }
