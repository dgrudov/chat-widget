(function () {
  const IFRAME_SRC = "https://support-bot-ai-83659ec1.base44.app/EmbedChatWidget";
  const BUTTON_SIZE = 64;
  const BUTTON_BOTTOM = 24;
  const BUTTON_RIGHT = 24;
  const MOBILE_MAX = 600;

  const iframe = document.createElement("iframe");
  iframe.src = IFRAME_SRC;
  iframe.allow = "microphone; camera; clipboard-write; autoplay; fullscreen;";
  iframe.setAttribute("title", "Support chat");
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "400px";
  iframe.style.height = "600px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "16px";
  iframe.style.zIndex = "10001";
  iframe.style.background = "white";
  document.body.appendChild(iframe);

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "transparent";
  overlay.style.zIndex = "10002";
  overlay.style.display = "none";
  document.body.appendChild(overlay);

  const btn = document.createElement("button");
  btn.setAttribute("aria-label", "Open chat");
  Object.assign(btn.style, {
    position: "fixed",
    bottom: BUTTON_BOTTOM + "px",
    right: BUTTON_RIGHT + "px",
    width: BUTTON_SIZE + "px",
    height: BUTTON_SIZE + "px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#3B82F6,#6366F1)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    zIndex: "10003",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 24px rgba(59,130,246,0.4)",
    transition: "transform .25s, box-shadow .25s"
  });
  btn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>';
  document.body.appendChild(btn);

  let isOpen = false;

  function isMobile() {
    return window.innerWidth <= MOBILE_MAX;
  }

  function applyResponsiveStyles() {
    if (isMobile() && isOpen) {
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.borderRadius = "0";
    } else {
      iframe.style.width = "400px";
      iframe.style.height = "600px";
      iframe.style.bottom = BUTTON_BOTTOM + BUTTON_SIZE + 12 + "px";
      iframe.style.right = BUTTON_RIGHT + "px";
      iframe.style.top = "auto";
      iframe.style.left = "auto";
      iframe.style.borderRadius = "16px";
    }
  }

  function openFrame() {
    overlay.style.display = isMobile() ? "block" : "none";
    applyResponsiveStyles();
    isOpen = true;
  }

  function closeFrame() {
    overlay.style.display = "none";
    isOpen = false;
    applyResponsiveStyles();
  }

  btn.addEventListener("click", () => {
    if (!isOpen) openFrame();
    else closeFrame();
  });

  overlay.addEventListener("click", closeFrame);

  window.addEventListener("resize", applyResponsiveStyles);

  document.addEventListener("DOMContentLoaded", () => {
    applyResponsiveStyles();
  });
})();
