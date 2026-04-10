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
const reduceMotion =
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  renderSharedShell();
  renderScoutLogos();
  setupNavToggle();
  renderIcons();
  animatePage();
});

function renderSharedShell() {
  const headerTarget = document.querySelector('[data-site-shell="header"]');
  const footerTarget = document.querySelector('[data-site-shell="footer"]');
  const brandLogo = buildScoutLilyLogo(basePath, "site-brand__logo scout-mark-img");

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

function renderScoutLogos() {
  if (window.ScoutLogo && typeof window.ScoutLogo.replaceAll === "function") {
    window.ScoutLogo.replaceAll(document);
  }
}

function renderIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function animatePage() {
  if (!window.anime || reduceMotion) {
    return;
  }

  animateHeaderIntro();
  animateHeroIntro();
  setupRevealObserver();
  setupDropdownMotion();
  setupHoverMotion();
  setupAmbientMotion();
}

function animateHeaderIntro() {
  window.anime({
    targets: [".site-header", ".site-brand"],
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 520,
    delay: window.anime.stagger(60),
    easing: "easeOutCubic"
  });

  window.anime({
    targets: ".site-brand__logo",
    opacity: [0, 1],
    scale: [0.86, 1],
    rotate: [-8, 0],
    duration: 620,
    delay: 120,
    easing: "easeOutBack"
  });
}

function animateHeroIntro() {
  const heroCards = document.querySelectorAll(".section--hero .reveal-card");
  const heroRows = document.querySelectorAll(".section--hero .summary-row");
  const heroButtons = document.querySelectorAll(".section--hero .btn");
  const heroBadges = document.querySelectorAll(".section--hero .icon-badge");

  if (heroCards.length > 0) {
    window.anime.set(heroCards, { opacity: 0, translateY: 26, scale: 0.985 });
    window.anime({
      targets: heroCards,
      opacity: [0, 1],
      translateY: [26, 0],
      scale: [0.985, 1],
      duration: 620,
      delay: window.anime.stagger(110, { start: 170 }),
      easing: "easeOutCubic"
    });
  }

  if (heroRows.length > 0) {
    window.anime.set(heroRows, { opacity: 0, translateX: -14 });
    window.anime({
      targets: heroRows,
      opacity: [0, 1],
      translateX: [-14, 0],
      duration: 420,
      delay: window.anime.stagger(90, { start: 360 }),
      easing: "easeOutCubic"
    });
  }

  if (heroButtons.length > 0) {
    window.anime.set(heroButtons, { opacity: 0, translateY: 16 });
    window.anime({
      targets: heroButtons,
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 360,
      delay: window.anime.stagger(80, { start: 440 }),
      easing: "easeOutCubic"
    });
  }

  if (heroBadges.length > 0) {
    window.anime({
      targets: heroBadges,
      opacity: [0, 1],
      scale: [0.84, 1],
      rotate: [-10, 0],
      duration: 560,
      delay: window.anime.stagger(90, { start: 240 }),
      easing: "easeOutBack"
    });
  }
}

function setupRevealObserver() {
  const revealTargets = [
    ...document.querySelectorAll(".section--tight .reveal-card"),
    ...document.querySelectorAll(".tool-tag"),
    ...document.querySelectorAll(".target-pill"),
    ...document.querySelectorAll(".site-footer__nav a")
  ];

  if (revealTargets.length === 0 || typeof window.IntersectionObserver !== "function") {
    return;
  }

  revealTargets.forEach((element) => {
    if (element.dataset.motionReady === "true") {
      return;
    }

    element.dataset.motionReady = "true";
    window.anime.set(element, { opacity: 0, translateY: 18 });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target;
        window.anime({
          targets: element,
          opacity: [0, 1],
          translateY: [18, 0],
          duration: 420,
          easing: "easeOutCubic"
        });
        observer.unobserve(element);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((element) => observer.observe(element));
}

function setupDropdownMotion() {
  document.querySelectorAll(".site-dropdown").forEach((dropdown) => {
    dropdown.addEventListener("toggle", () => {
      const menu = dropdown.querySelector(".site-dropdown__menu");
      if (!menu || !dropdown.open) {
        return;
      }

      window.anime.remove(menu);
      window.anime.set(menu, { opacity: 0, translateY: -10, scale: 0.985 });
      window.anime({
        targets: menu,
        opacity: [0, 1],
        translateY: [-10, 0],
        scale: [0.985, 1],
        duration: 240,
        easing: "easeOutCubic"
      });
    });
  });
}

function setupHoverMotion() {
  bindHoverMotion(".site-brand", { scale: 1.012, translateY: -1 });
  bindLogoHoverMotion(".site-brand", ".site-brand__logo");
  bindHoverMotion(".btn", { scale: 1.02, translateY: -2 });
  bindHoverMotion(".site-nav__link, .site-dropdown__trigger", { scale: 1.02, translateY: -1 });
  bindHoverMotion(".utility-card, .summary-card, .panel", { scale: 1.008, translateY: -4 });
  bindHoverMotion(".tool-tag, .target-pill", { scale: 1.03, translateY: -1 });
}

function bindHoverMotion(selector, activeState) {
  document.querySelectorAll(selector).forEach((element) => {
    element.addEventListener("mouseenter", () => {
      window.anime.remove(element);
      window.anime({
        targets: element,
        scale: activeState.scale ?? 1.02,
        translateY: activeState.translateY ?? 0,
        duration: 180,
        easing: "easeOutQuad"
      });
    });

    element.addEventListener("mouseleave", () => {
      window.anime.remove(element);
      window.anime({
        targets: element,
        scale: 1,
        translateY: 0,
        duration: 180,
        easing: "easeOutQuad"
      });
    });
  });
}

function bindLogoHoverMotion(containerSelector, logoSelector) {
  document.querySelectorAll(containerSelector).forEach((container) => {
    const logo = container.querySelector(logoSelector);
    if (!logo) {
      return;
    }

    if (window.ScoutLogo && typeof window.ScoutLogo.animate === "function") {
      window.ScoutLogo.animate(logo, container);
      return;
    }

    container.addEventListener("mouseenter", () => {
      window.anime.remove(logo);
      window.anime({
        targets: logo,
        scale: [1, 1.12, 1.05],
        rotate: [0, -7, 0],
        translateY: [0, -2, -1],
        duration: 560,
        easing: "easeOutElastic(1, 0.6)"
      });
    });

    container.addEventListener("mouseleave", () => {
      window.anime.remove(logo);
      window.anime({
        targets: logo,
        scale: 1,
        rotate: 0,
        translateY: 0,
        duration: 220,
        easing: "easeOutQuad"
      });
    });
  });
}

function setupAmbientMotion() {
  const badges = document.querySelectorAll(".section--hero .icon-badge");
  if (badges.length === 0) {
    return;
  }

  window.anime({
    targets: badges,
    translateY: [0, -4, 0],
    duration: 3200,
    delay: window.anime.stagger(180),
    loop: true,
    easing: "easeInOutSine"
  });
}

function buildScoutLilyLogo(currentBasePath, className) {
  return `<span class="${className}" data-scout-logo aria-hidden="true"></span>`;
}
