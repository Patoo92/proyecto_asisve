// FUNCIONES ÚNICAS PARA SET Y GET DE COOKIES
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

// ACEPTAR TODAS LAS COOKIES
function acceptAllCookies() {
    const config = { necessary: true, performance: true, advertising: true };
    setCookie('cookie-consent', JSON.stringify(config), 365);
    enableAnalytics(true, true);
    hideBanner();
}

// RECHAZAR TODAS LAS COOKIES
function rejectCookies() {
    const config = { necessary: true, performance: false, advertising: false };
    setCookie('cookie-consent', JSON.stringify(config), 365);
    hideBanner();
}

// GUARDAR CONFIGURACIÓN PERSONALIZADA
function saveCookiePreferences() {
    const performance = document.getElementById('cookie-performance').checked;
    const advertising = document.getElementById('cookie-advertising').checked;
    const config = { necessary: true, performance, advertising };
    setCookie('cookie-consent', JSON.stringify(config), 365);
    enableAnalytics(performance, advertising);
    hideBanner();
    const modal = bootstrap.Modal.getInstance(document.getElementById('cookieModal'));
    modal.hide();
}

// MOSTRAR MODAL
function openCookieConfig() {
    const modal = new bootstrap.Modal(document.getElementById('cookieModal'));
    modal.show();
}

// OCULTAR BANNER
function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';
}

// CARGAR GOOGLE ANALYTICS SI SE ACEPTÓ
function enableAnalytics(performance, advertising) {
    if (performance || advertising) {
        const script = document.createElement('script');
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-P6QT0R39KS";
        script.async = true;
        document.head.appendChild(script);
        script.onload = function () {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-P6QT0R39KS');
        };
    }
}

// AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    const saved = getCookie('cookie-consent');
    if (saved) {
        const parsed = JSON.parse(saved);
        enableAnalytics(parsed.performance, parsed.advertising);
        hideBanner();
    } else {
        // Mostrar el banner si no hay consentimiento guardado
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'block';
    }
});
