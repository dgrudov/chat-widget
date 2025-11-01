(function () {
  const IFRAME_SRC = "https://support-bot-ai-83659ec1.base44.app/EmbedChatWidget";
  const BUTTON_SIZE = 64;
  const BUTTON_BOTTOM = 24;
  const BUTTON_RIGHT = 24;
  const MOBILE_MAX = 600;

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
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 24px rgba(59,130,246,0.4)",
    transition: "transform .25s, box-shadow .25s"
  });
  btn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>';

  const iframe = document.createElement("iframe");
  iframe.setAttribute("allow", "microphone; camera; clipboard-write; fullscreen; autoplay;");
  iframe.setAttribute("referrerpolicy", "no-referrer");
  iframe.setAttribute("title", "Support chat");
  iframe.tabIndex = 0;
  Object.assign(iframe.style, {
    position: "fixed",
    border: "none",
    zIndex: 9999,
    opacity: 0,
    pointerEvents: "none",
    transform: "translateY(20px) scale(0.95)",
    transition: "opacity .28s ease, transform .28s ease",
    background: "transparent",
    display: "block",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    touchAction: "auto"
  });

  let isOpen = false;
  let loaded = false;

  function isMobile() {
    return window.innerWidth <= MOBILE_MAX;
  }

function applyResponsiveStyles() {
  if (isMobile()) {
    Object.assign(iframe.style, {
      width: "100vw",
      height: "100vh",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      borderRadius: "0",
      position: "fixed",
      zIndex: 10001,
      pointerEvents: "auto",
      transform: "translateY(0) scale(1)"
    });
  } else {
    Object.assign(iframe.style, {
      width: "400px",
      height: "600px",
      bottom: (BUTTON_BOTTOM + BUTTON_SIZE + 12) + "px",
      right: BUTTON_RIGHT + "px",
      top: "auto",
      left: "auto",
      borderRadius: "16px",
      position: "fixed",
      zIndex: 9999
    });
  }
}


  function openFrame() {
    if (!loaded) {
      iframe.src = IFRAME_SRC;
      loaded = true;
    }
    applyResponsiveStyles();
    iframe.style.opacity = "1";
    iframe.style.pointerEvents = "auto";
    iframe.style.transform = "translateY(0) scale(1)";
    iframe.style.zIndex = 10001;
    if (isMobile()) {
      btn.style.display = "none";
    } else {
      btn.style.display = "flex";
    }
    try { iframe.focus(); } catch (e) {}
    btn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
    isOpen = true;
  }

  function closeFrame() {
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.style.transform = "translateY(20px) scale(0.95)";
    iframe.style.zIndex = 9999;
    btn.style.display = "flex";
    btn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>';
    isOpen = false;
  }

  btn.addEventListener("click", () => (isOpen ? closeFrame() : openFrame()));
  btn.addEventListener("mouseenter", () => (btn.style.transform = "scale(1.08)"));
  btn.addEventListener("mouseleave", () => (btn.style.transform = "scale(1)"));
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      isOpen ? closeFrame() : openFrame();
    }
  });

  window.addEventListener("resize", () => {
    applyResponsiveStyles();
    if (isOpen) {
      iframe.style.transform = "translateY(0) scale(1)";
      iframe.style.zIndex = 10001;
      if (isMobile()) btn.style.display = "none";
    } else {
      iframe.style.zIndex = 9999;
      btn.style.display = "flex";
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.body.appendChild(btn);
    document.body.appendChild(iframe);
    applyResponsiveStyles();
  });
})();

