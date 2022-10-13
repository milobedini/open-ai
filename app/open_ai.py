import argparse
import os
import re
from typing import List

import openai


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    if validate_length(user_input):
        generate_branding_snippet(user_input)
        generate_keywords(user_input)
    else:
        raise ValueError("Input length is too long (more than 10 characters).")


# Stop user from spamming us and using many credits.
def validate_length(prompt: str) -> bool:
    return len(prompt) <= 32


def generate_keywords(prompt: List[str]):

    openai.api_key = os.getenv("OPENAI_API_KEY")

    verbose_prompt = f"Generate related branding keywords for {prompt}"
    print(verbose_prompt)
    # NB you can change this prompt to absolutely any request!

    response = openai.Completion.create(engine="text-davinci-002", prompt=verbose_prompt, max_tokens=32)

    # Extract text response after stripping whitespace.
    keywords_text: str = response.choices[0].text

    # split results using regex to get results as a list.
    keywords_text = keywords_text.strip()
    keywords_list = re.split(",|\n|;", keywords_text)
    # Use comprehension to improve list formatting and remove space.
    keywords_list = [k.lower().strip() for k in keywords_list]
    keywords_list = [k for k in keywords_list if len(k) > 0]
    print(f"Keyword Result: {keywords_list}")

    return keywords_list


def generate_branding_snippet(prompt: str):

    openai.api_key = os.getenv("OPENAI_API_KEY")

    verbose_prompt = f"Generate a branding snippet for {prompt}"
    print(verbose_prompt)
    # NB you can change this prompt to absolutely any request!

    response = openai.Completion.create(engine="text-davinci-002", prompt=verbose_prompt, max_tokens=32)

    # Extract text response, and add ellipsis if the sentence is unfinished.
    branding_text = response.choices[0].text.strip()
    if branding_text[-1] not in {".", "!", "?"}:
        branding_text += "..."

    print(f"Branding Result: {branding_text}")
    return branding_text


if __name__ == "__main__":
    main()
