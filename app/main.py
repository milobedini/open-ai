from fastapi import FastAPI, HTTPException

from open_ai import generate_branding_snippet, generate_keywords
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

# API Source Code

app = FastAPI()
handler = Mangum(app)

max_length = 32

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def validate_input_length(prompt: str):
    if len(prompt) >= max_length:
        raise HTTPException(
            status_code=400,
            detail=f"Input length is too long, please enter under {max_length} characters.",
        )


@app.get("/tagline")
async def generate_tagline_api(prompt: str):
    validate_input_length(prompt)
    tagline = generate_branding_snippet(prompt)
    return {"tagline": tagline, "keywords": []}


@app.get("/keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    return {"tagline": None, "keywords": keywords}


# combined endpoint
@app.get("/branding")
async def generate_branding_api(prompt: str):
    validate_input_length(prompt)
    tagline = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    return {"tagline": tagline, "keywords": keywords}


# uvicorn main:app --reload
# http://127.0.0.1:8000/docs#/
