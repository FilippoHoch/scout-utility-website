const primaryNavItems = [
  { key: "home", label: "Home", href: "index.html", icon: "house" },
  { key: "immagini", label: "Immagini", href: "pages/immagini.html", icon: "images" },
  { key: "foglietti", label: "Foglietti", href: "pages/foglietti.html", icon: "files" }
];

const disabledTools = [
  { label: "Menu", icon: "utensils-crossed" },
  { label: "Programmi campi / uscite", icon: "calendar-range" },
  { label: "Impaginatore libretti campi estivi", icon: "book-open-text" }
];

const basePath = document.body.dataset.basePath || "./";
const currentPage = document.body.dataset.currentPage || "";

document.addEventListener("DOMContentLoaded", () => {
  renderSharedShell();
  setupNavToggle();
  renderIcons();
  animatePage();
});

function renderSharedShell() {
  const headerTarget = document.querySelector('[data-site-shell="header"]');
  const footerTarget = document.querySelector('[data-site-shell="footer"]');
  const brandLogo = buildScoutLilyLogo("site-brand__logo scout-lily");

  if (headerTarget) {
    const navLinks = primaryNavItems
      .map((item) => {
        const isActive = item.key === currentPage ? " is-active" : "";
        return `
          <a class="site-nav__link${isActive}" href="${basePath}${item.href}">
            <i data-lucide="${item.icon}"></i>
            <span>${item.label}</span>
          </a>
        `;
      })
      .join("");

    const dropdownItems = disabledTools
      .map((item) => {
        return `
          <span class="site-dropdown__item is-disabled" aria-disabled="true">
            <i data-lucide="${item.icon}"></i>
            <span>${item.label}</span>
          </span>
        `;
      })
      .join("");

    headerTarget.outerHTML = `
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="site-brand" href="${basePath}index.html">
            ${brandLogo}
            <span class="site-brand__divider"></span>
            <span>
              <span class="site-brand__title">Scout Utility Website</span>
              <span class="site-brand__subtitle">Utility scout</span>
            </span>
          </a>

          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            Menu
          </button>

          <nav class="site-nav" id="site-nav" aria-label="Navigazione principale">
            ${navLinks}
            <details class="site-dropdown">
              <summary class="site-nav__link site-dropdown__trigger">
                <i data-lucide="chevron-down"></i>
                <span>Altri strumenti</span>
              </summary>
              <div class="site-dropdown__menu" role="menu" aria-label="Altri strumenti">
                ${dropdownItems}
              </div>
            </details>
          </nav>
        </div>
      </header>
    `;
  }

  if (footerTarget) {
    footerTarget.outerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__inner">
          <nav class="site-footer__nav" aria-label="Link rapidi footer">
            <a href="${basePath}index.html">Home</a>
            <a href="${basePath}pages/immagini.html">Immagini</a>
            <a href="${basePath}pages/foglietti.html">Foglietti</a>
          </nav>
        </div>
      </footer>
    `;
  }
}

function setupNavToggle() {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (!navToggle || !siteNav) {
    return;
  }

  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function renderIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function animatePage() {
  if (!window.anime) {
    return;
  }

  window.anime({
    targets: ".site-header",
    opacity: [0, 1],
    translateY: [-8, 0],
    duration: 500,
    easing: "easeOutCubic"
  });

  window.anime({
    targets: ".reveal-card",
    opacity: [0, 1],
    translateY: [24, 0],
    duration: 520,
    delay: window.anime.stagger(80, { start: 180 }),
    easing: "easeOutCubic"
  });
}

function buildScoutLilyLogo(className) {
  return `
    <svg class="${className}" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path class="scout-lily__petal scout-lily__petal--center" d="M32 7C28.7 11.1 26 16.5 26 22.4C26 27.8 28.2 32.1 32 36.1C35.8 32.1 38 27.8 38 22.4C38 16.5 35.3 11.1 32 7Z" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
      <path class="scout-lily__petal scout-lily__petal--left" d="M29.1 35.2C21.5 32.4 16.9 27.6 15.2 21.1C13.7 15.6 14.8 10.7 18.2 7.2C19.3 13.3 23.1 18.7 29.3 22.4C24.5 25.1 21.8 28.1 20.7 31.7C23.7 31.7 26.5 32.9 29.1 35.2Z" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
      <path class="scout-lily__petal scout-lily__petal--right" d="M34.9 35.2C42.5 32.4 47.1 27.6 48.8 21.1C50.3 15.6 49.2 10.7 45.8 7.2C44.7 13.3 40.9 18.7 34.7 22.4C39.5 25.1 42.2 28.1 43.3 31.7C40.3 31.7 37.5 32.9 34.9 35.2Z" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
      <path class="scout-lily__knot" d="M27 39.8C28.7 40.9 30.4 41.7 32 42C33.6 41.7 35.3 40.9 37 39.8C36.2 42.9 34.7 45.3 32 47C29.3 45.3 27.8 42.9 27 39.8Z" fill="#fdfcf8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      <path class="scout-lily__stem" d="M32 35.3C30.7 39.3 29 42.6 26.6 45.8C24.4 48.5 21.3 50.7 16.8 52C21.9 52.6 27.2 51.6 32 49C36.8 51.6 42.1 52.6 47.2 52C42.7 50.7 39.6 48.5 37.4 45.8C35 42.6 33.3 39.3 32 35.3Z" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
      <path class="scout-lily__ribbon scout-lily__ribbon--left" d="M14.1 39.1C18.7 36.4 23.4 36.1 28.1 37.9C24.2 41 20.1 43.1 16.2 44.1C12.9 44.9 10.1 44.7 8 43.7C9.6 41.9 11.6 40.3 14.1 39.1Z" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
      <path class="scout-lily__ribbon scout-lily__ribbon--right" d="M49.9 39.1C45.3 36.4 40.6 36.1 35.9 37.9C39.8 41 43.9 43.1 47.8 44.1C51.1 44.9 53.9 44.7 56 43.7C54.4 41.9 52.4 40.3 49.9 39.1Z" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `;
}
