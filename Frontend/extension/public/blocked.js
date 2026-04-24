const params = new URLSearchParams(location.search);
const url = params.get("url") ?? "";
const reason = params.get("reason") ?? "Phishing risk detected.";
const score = params.get("score");
document.getElementById("url-box").textContent = url || "Unknown URL";
document.getElementById("reason").textContent =
  score ? reason + " (Risk score: " + score + "%)" : reason;
