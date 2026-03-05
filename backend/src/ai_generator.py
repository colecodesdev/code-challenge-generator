import os
import json
from openai import OpenAI

MODEL = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")

PROMPT_TEMPLATE = """
Generate a multiple-choice programming challenge.

Difficulty: {difficulty}

Return ONLY valid JSON in this format:

{{
  "title": "short problem title",
  "options": [
    "answer option 1",
    "answer option 2",
    "answer option 3",
    "answer option 4"
  ],
  "correct_answer_id": 0,
  "explanation": "brief explanation of the correct answer"
}}
"""

def generate_challenge_with_ai(difficulty: str):
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")

    client = OpenAI(api_key=api_key)

    prompt = PROMPT_TEMPLATE.format(difficulty=difficulty)

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": "You are a programming challenge generator."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=400
    )

    content = response.choices[0].message.content

    try:
        data = json.loads(content)
    except Exception:
        raise RuntimeError(f"AI response was not valid JSON:\n{content}")

    if not isinstance(data, dict):
        raise RuntimeError("AI response JSON must be an object")

    title = data.get("title")
    options = data.get("options")
    correct_answer_id = data.get("correct_answer_id")
    explanation = data.get("explanation")

    if not isinstance(title, str) or not title.strip():
        raise RuntimeError("AI response missing valid 'title'")

    if not isinstance(options, list) or len(options) < 2 or not all(isinstance(x, str) and x.strip() for x in options):
        raise RuntimeError("AI response missing valid 'options' (list of strings)")

    if not isinstance(correct_answer_id, int) or correct_answer_id < 0 or correct_answer_id >= len(options):
        raise RuntimeError("AI response missing valid 'correct_answer_id' (index into options)")

    if not isinstance(explanation, str) or not explanation.strip():
        raise RuntimeError("AI response missing valid 'explanation'")

    return data