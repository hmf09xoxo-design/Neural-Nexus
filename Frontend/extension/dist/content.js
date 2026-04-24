var e=`hmf-shield-banner`;function t(){if(document.getElementById(`hmf-shield-styles`))return;let e=document.createElement(`style`);e.id=`hmf-shield-styles`,e.textContent=`
    #hmf-shield-banner {
      all: initial;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2147483647;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 13px;
      line-height: 1.4;
      box-shadow: 0 2px 8px rgba(0,0,0,.35);
      animation: hmf-slide-in 0.25s ease;
    }
    @keyframes hmf-slide-in {
      from { transform: translateY(-100%); opacity: 0; }
      to   { transform: translateY(0);     opacity: 1; }
    }
    #hmf-shield-banner.hmf-danger  { background:#1a0000; border-bottom:3px solid #ef4444; color:#fca5a5; }
    #hmf-shield-banner.hmf-warning { background:#1a1200; border-bottom:3px solid #f59e0b; color:#fcd34d; }
    #hmf-shield-banner .hmf-icon   { font-size:20px; margin-right:10px; flex-shrink:0; }
    #hmf-shield-banner .hmf-body   { flex:1; }
    #hmf-shield-banner .hmf-title  { font-weight:700; margin-bottom:2px; }
    #hmf-shield-banner .hmf-reason { opacity:.85; font-size:11px; }
    #hmf-shield-banner .hmf-score  { font-size:11px; opacity:.6; margin-top:2px; }
    #hmf-shield-banner .hmf-close  {
      all: unset;
      cursor:pointer;
      font-size:18px;
      margin-left:12px;
      opacity:.6;
      flex-shrink:0;
    }
    #hmf-shield-banner .hmf-close:hover { opacity:1; }
  `,document.head?.appendChild(e)}function n(){document.getElementById(e)?.remove()}function r(r){if(r.risk_level===`safe`)return;t(),n();let{icon:a,title:o}={safe:{icon:`✅`,title:`Site appears safe`},warning:{icon:`⚠️`,title:`Suspicious URL detected`},danger:{icon:`🛡️`,title:`Phishing / Malicious URL Blocked`}}[r.risk_level],s=document.createElement(`div`);s.id=e,s.className=`hmf-${r.risk_level}`,s.innerHTML=`
    <span class="hmf-icon" aria-hidden="true">${a}</span>
    <div class="hmf-body">
      <div class="hmf-title">HMF Shield — ${o}</div>
      <div class="hmf-reason">${i(r.reason)}</div>
      <div class="hmf-score">Risk score: ${Math.round(r.risk_score*100)}% · Confidence: ${Math.round(r.confidence*100)}%</div>
    </div>
    <button class="hmf-close" aria-label="Dismiss">✕</button>
  `,s.querySelector(`.hmf-close`)?.addEventListener(`click`,n),document.documentElement.prepend(s),r.risk_level===`warning`&&setTimeout(n,8e3)}function i(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}chrome.runtime.onMessage.addListener(e=>{e.type===`URL_RESULT`&&r(e.result)});