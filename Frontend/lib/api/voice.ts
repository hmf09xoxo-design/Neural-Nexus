const BASE_URL = "http://localhost:8000";

export async function analyzeVoice(file: File) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE_URL}/voice/analyse`, {
    method: "POST",
    credentials: "include",
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
