const BASE_URL = "http://localhost:8000";

export async function analyzeEmail(data: {
  sender: string;
  subject: string;
  body: string;
  with_llm_explanation?: boolean;
}) {
  const res = await fetch(`${BASE_URL}/text/email/analyze/extension`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
