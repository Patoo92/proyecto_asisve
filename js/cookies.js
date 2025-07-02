function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const parts = cookies[i].split("=");
    if (parts[0] === name) {
      return decodeURIComponent(parts[1]);
    }
  }
  return null;
}

function enableAnalytics(performance, advertising) {
  if (performance || advertising) {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-P6QT0R39KS";
    script.async = true;
    document.head.appendChild(script);

    script.onload = function () {
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", "G-P6QT0R39KS");
    };
  }
}

function hideBanner() {
  const banner = document.getElementById("cookie-banner");
  if (banner) banner.style.display = "none";
  const overlay = document.getElementById("cookie-overlay");
  if (overlay) overlay.style.display = "none";
}

function acceptAllCookies() {
  const config = { necessary: true, performance: true, advertising: true };
  setCookie("cookie-consent", JSON.stringify(config), 90); // ← ← ← PERIODO DE CONSENTIMIENTO
  enableAnalytics(true, true);
  hideBanner();
}

function rejectCookies() {
  const config = { necessary: true, performance: false, advertising: false };
  setCookie("cookie-consent", JSON.stringify(config), 90); // ← ← ← PERIODO DE CONSENTIMIENTO
  hideBanner();
}

function saveCookiePreferences() {
  const performance = document.getElementById("cookie-performance")?.checked || false;
  const advertising = document.getElementById("cookie-advertising")?.checked || false;
  const config = { necessary: true, performance, advertising };
  setCookie("cookie-consent", JSON.stringify(config), 90); // ← ← ← PERIODO DE CONSENTIMIENTO
  enableAnalytics(performance, advertising);
  hideBanner();

  const modalEl = document.getElementById("cookieModal");
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
  }
}

function openCookieConfig() {
  const modalEl = document.getElementById("cookieModal");
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const consent = getCookie("cookie-consent");
  if (consent) {
    try {
      const config = JSON.parse(consent);
      enableAnalytics(config.performance, config.advertising);
      hideBanner();
    } catch (e) {
      console.error("Cookie malformada:", e);
    }
  } else {
    document.getElementById("cookie-banner").style.display = "block";
  }
});
