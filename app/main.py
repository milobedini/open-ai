from fastapi import FastAPI, HTTPException

from open_ai import generate_branding_snippet, generate_keywords

# API File

app = FastAPI()

max_length = 32


def validate_input_length(prompt: str):
    if len(prompt) >= max_length:
        raise HTTPException(
            status_code=400, detail=f"Input length is too long, please enter under {max_length} characters."
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
