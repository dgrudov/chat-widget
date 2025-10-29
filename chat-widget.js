(function () {
  const IFRAME_SRC = "https://support-bot-ai-83659ec1.base44.app/EmbedChatWidget";
  const BUTTON_SIZE = 64;
  const BUTTON_BOTTOM = 24;
  const BUTTON_RIGHT = 24;

  // Create button
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
    transition: "transform .25s, box-shadow .25s",
  });
  btn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>';

  btn.addEventListener("mouseenter", () => (btn.style.transform = "scale(1.08)"));
  btn.addEventListener("mouseleave", () => (btn.style.transform = "scale(1)"));

  // Create iframe (no src yet — lazy)
  const iframe = document.createElement("iframe");
  iframe.setAttribute("allow", "microphone; camera; clipboard-write;");
  Object.assign(iframe.style, {
    position: "fixed",
    bottom: (BUTTON_BOTTOM + BUTTON_SIZE + 12) + "px", // sits above button
    right: BUTTON_RIGHT + "px",
    width: "400px",
    height: "600px",
    border: "none",
    borderRadius: "16px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    zIndex: 9999,
    opacity: 0,
    pointerEvents: "none",
    transform: "translateY(20px) scale(0.95)",
    transition: "opacity .28s ease, transform .28s ease",
    background: "transparent"
  });
  iframe.style.display = "block";

  let isOpen = false;
  let loaded = false;

  function openFrame() {
    if (!loaded) {
      iframe.src = IFRAME_SRC;
      loaded = true;
    }
    iframe.style.opacity = "1";
    iframe.style.pointerEvents = "all";
    iframe.style.transform = "translateY(0) scale(1)";
    btn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="28" height="28"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
    isOpen = true;
  }

  function closeFrame() {
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.style.transform = "translateY(20px) scale(0.95)";
    btn.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>';
    isOpen = false;
  }

  btn.addEventListener("click", function () {
    if (!isOpen) openFrame();
    else closeFrame();
  });

  // keyboard accessible (Enter/Space)
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) openFrame();
      else closeFrame();
    }
  });

  // Append elements
  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(btn);
    document.body.appendChild(iframe);
  });
})();
