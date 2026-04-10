const primaryNavItems = [
  { key: "home", label: "Home", href: "index.html", icon: "house" },
  { key: "immagini", label: "Immagini", href: "pages/immagini.html", icon: "images" }
];

const disabledTools = [
  { label: "Menu", icon: "utensils-crossed" },
  { label: "Programmi campi / uscite", icon: "calendar-range" },
  { label: "Foglietti", icon: "files" },
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
            <svg class="site-brand__logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
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
