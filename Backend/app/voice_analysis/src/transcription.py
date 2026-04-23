import logging
from faster_whisper import WhisperModel
import torch

logger = logging.getLogger(__name__)

# Use "float16" for GPU, "int8" for CPU to save memory
device = "cuda" if torch.cuda.is_available() else "cpu"
compute_type = "float16" if device == "cuda" else "int8"

try:
    model = WhisperModel("small", device=device, compute_type=compute_type)
except Exception as e:
    logger.error(
        f"Failed to load Whisper model. This typically happens on first import when "
        f"downloading ~240MB model weights. Ensure you have stable network connectivity. "
        f"Error: {e}"
    )
    model = None

def get_transcript(audio_path_or_bytes):
    if model is None:
        raise RuntimeError(
            "Whisper model failed to load. Check logs for network/download errors. "
            "Please retry the request to attempt downloading the model again."
        )
    print("Running Whisper Transcription")
    segments, info = model.transcribe(audio_path_or_bytes, beam_size=5)
    
    text = " ".join([segment.text for segment in segments])
    return text.strip()