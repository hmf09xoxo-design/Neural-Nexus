import json
import os
import requests
from dotenv import load_dotenv

load_dotenv()

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "phi3:mini")
OLLAMA_TIMEOUT = float(os.getenv("OLLAMA_TIMEOUT_SECONDS", "30"))


def analyze_fraud_intent(transcript: str, acoustic_label: str, acoustic_conf: float) -> str:
    """Analyze transcript for fraud intent using local Ollama.

    Returns: JSON string with keys: risk_score, is_fraud, system_logic, red_flags
    """
    prompt = f"""[ROLE]: Objective Forensic Analyst.
[INPUT]:
- Audio Label: {acoustic_label}
- Audio Confidence: {acoustic_conf:.4f}
- Transcript: "{transcript}"

[TASK]: Analyze the transcript for EXPLICIT evidence of fraud.

[STRICT GROUNDING RULES]:
1. ZERO HALLUCINATION: You may only list "red_flags" that are LITERALLY present as words or phrases in the provided Transcript.
2. NEUTRALITY: If the transcript is a standard business communication (e.g., policy renewal, appointment reminder) with NO threats or data requests, you must assign a LOW risk_score (0-2).
3. AUDIO WEIGHT: If the Transcript is neutral AND the Audio Model says "Real", the risk_score must be 0.
4. OVERRIDE ONLY ON PROOF: Only override a "Real" audio label if the Transcript contains explicit malicious intent (e.g., asking for OTP, PIN, urgent payment to a 'secure' account).

[OUTPUT SCHEMA]:
Return ONLY valid JSON with no extra text:
- "risk_score": (int 0-10)
- "is_fraud": (boolean)
- "system_logic": (Reasoning based ONLY on provided text.)
- "red_flags": (List only phrases found IN THE TEXT. If none, return [].)"""

    try:
        print(f"[voice-llm] Calling local Ollama model={OLLAMA_MODEL}")
        resp = requests.post(
            OLLAMA_URL,
            json={"model": OLLAMA_MODEL, "prompt": prompt, "stream": False},
            timeout=OLLAMA_TIMEOUT,
        )
        resp.raise_for_status()
        raw = resp.json().get("response", "").strip()
        print(f"[voice-llm] Response received ({len(raw)} chars)")

        # Extract JSON from response
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
            "system_logic": f"Local LLM error: {e}",
            "red_flags": [],
        })
