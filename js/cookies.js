function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

function acceptCookies() {
    let cookies = {
        necessary: true,
        performance: document.getElementById('performance-cookies').checked,
        advertising: document.getElementById('advertising-cookies').checked
    };
    setCookie('cookie-consent', JSON.stringify(cookies), 365);
    loadAnalytics(cookies.performance, cookies.advertising);
    document.getElementById('cookie-consent').style.display = 'none';
}

function rejectCookies() {
    setCookie('cookie-consent', JSON.stringify({ necessary: true, performance: false, advertising: false }), 365);
    document.getElementById('cookie-consent').style.display = 'none';
}

function loadAnalytics(performance, advertising) {
    if (performance || advertising) {
        // Google Analytics script
        var script = document.createElement('script');
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-P6QT0R39KS";
        document.head.appendChild(script);
        script.onload = function () {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-P6QT0R39KS');
        };
    }
}

// Cargar las cookies si ya fueron aceptadas
let savedCookies = getCookie('cookie-consent');
if (savedCookies) {
    savedCookies = JSON.parse(savedCookies);
    document.getElementById('performance-cookies').checked = savedCookies.performance;
    document.getElementById('advertising-cookies').checked = savedCookies.advertising;
    loadAnalytics(savedCookies.performance, savedCookies.advertising);
    document.getElementById('cookie-consent').style.display = 'none';
}
