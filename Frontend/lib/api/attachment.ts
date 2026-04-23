const BASE_URL = "http://localhost:8000";

export async function analyzeAttachment(
  file: File,
  withLlmExplanation = false
) {
  const form = new FormData();
  form.append("file", file);
  form.append("with_llm_explanation", withLlmExplanation ? "true" : "false");

  const res = await fetch(`${BASE_URL}/attachment/analyze`, {
    method: "POST",
    credentials: "include",
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
