import json
import os
import requests
from dotenv import load_dotenv

load_dotenv()

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:1.5b")
OLLAMA_TIMEOUT = float(os.getenv("OLLAMA_TIMEOUT_SECONDS", "30"))


def analyze_fraud_intent(transcript: str, acoustic_label: str, acoustic_conf: float) -> str:
    """Analyze transcript for fraud intent using local Ollama (qwen2.5:1.5b).

    Returns: JSON string with keys: risk_score, is_fraud, system_logic, red_flags
    """
    # Normalise label wording so the model focuses on analysis not terminology
    voice_type = "AI-generated/synthetic" if "spoof" in acoustic_label.lower() or "deep" in acoustic_label.lower() else "human/authentic"

    prompt = f"""You are a voice security analysis system for fraud detection.

VOICE ANALYSIS INPUT:
- Voice type detected: {voice_type} ({acoustic_conf:.0%} confidence)
- Spoken transcript: "{transcript}"

TASK: Score the social-engineering / fraud risk of this voice call.

RULES:
1. Only flag red_flags that are LITERALLY present in the transcript text.
2. A short or empty transcript means LOW risk unless the voice is clearly synthetic AND the words are suspicious.
3. Synthetic voice alone does not prove fraud — assess the transcript too.

Return ONLY valid JSON with no other text:
{{"risk_score": <integer 0-10>, "is_fraud": <true|false>, "system_logic": "<one sentence reasoning>", "red_flags": [<phrases from transcript only>]}}"""

    try:
        print(f"[voice-llm] Calling Ollama model={OLLAMA_MODEL}")
        resp = requests.post(
            OLLAMA_URL,
            json={"model": OLLAMA_MODEL, "prompt": prompt, "stream": False},
            timeout=OLLAMA_TIMEOUT,
        )
        resp.raise_for_status()
        raw = resp.json().get("response", "").strip()
        print(f"[voice-llm] Response received ({len(raw)} chars)")

        # Extract JSON block from response
        start = raw.find("{")
        end = raw.rfind("}")
        if start != -1 and end != -1 and end > start:
            return raw[start : end + 1]
        return raw

    except Exception as e:
        print(f"[voice-llm] ERROR: {e}")
        return json.dumps({
            "risk_score": 0,
            "is_fraud": False,
            "system_logic": f"LLM unavailable: {e}",
            "red_flags": [],
        })
