const navItems = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "immagini", label: "Sistemazione immagini", href: "pages/immagini.html" },
  { key: "prepare", label: "Prepare", href: "pages/prepare.html" },
  { key: "menu", label: "Menu", href: "pages/menu.html" },
  { key: "programmi", label: "Programmi campi / uscite", href: "pages/programmi.html" },
  { key: "foglietti", label: "Foglietti", href: "pages/foglietti.html" },
  { key: "libretti", label: "Impaginatore libretti campi estivi", href: "pages/libretti.html" }
];

const basePath = document.body.dataset.basePath || "./";
const currentPage = document.body.dataset.currentPage || "";

document.addEventListener("DOMContentLoaded", () => {
  renderSharedShell();
  setupNavToggle();

  if (document.body.dataset.page === "immagini") {
    initImageTool();
  }
});

function renderSharedShell() {
  const headerTarget = document.querySelector('[data-site-shell="header"]');
  const footerTarget = document.querySelector('[data-site-shell="footer"]');

  if (headerTarget) {
    const navLinks = navItems
      .map((item) => {
        const isActive = item.key === currentPage ? " is-active" : "";
        return `<a class="site-nav__link${isActive}" href="${basePath}${item.href}">${item.label}</a>`;
      })
      .join("");

    headerTarget.outerHTML = `
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="brand" href="${basePath}index.html">
            <span class="brand__title">Scout Utility Website</span>
            <span class="brand__subtitle">Utility locali per attività scout</span>
          </a>

          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            Menu
          </button>

          <nav class="site-nav" id="site-nav" aria-label="Navigazione principale">
            ${navLinks}
          </nav>
        </div>
      </header>
    `;
  }

  if (footerTarget) {
    footerTarget.outerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__inner">
          <p>
            Scout Utility Website · Progetto statico locale pensato per crescere come raccolta di utility.
          </p>
          <nav class="site-footer__nav" aria-label="Link rapidi footer">
            <a href="${basePath}index.html">Home</a>
            <a href="${basePath}pages/immagini.html">Sistemazione immagini</a>
            <a href="${basePath}README.md">README</a>
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

function initImageTool() {
  const state = {
    images: [],
    draggedId: null
  };

  const fileInput = document.getElementById("image-input");
  const dropzone = document.getElementById("upload-dropzone");
  const imageList = document.getElementById("image-list");
  const preview = document.getElementById("print-preview");
  const previewSummary = document.getElementById("preview-summary");
  const projectTitle = document.getElementById("project-title");
  const perPageSelect = document.getElementById("images-per-page");
  const marginSelect = document.getElementById("page-margin");
  const orientationSelect = document.getElementById("page-orientation");
  const printButton = document.getElementById("print-button");
  const clearButton = document.getElementById("clear-button");

  const printStyle = document.createElement("style");
  printStyle.id = "dynamic-print-style";
  document.head.appendChild(printStyle);

  fileInput.addEventListener("change", (event) => {
    addFiles(Array.from(event.target.files || []));
    event.target.value = "";
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.add("is-dragover");
    });
  });

  ["dragleave", "dragend"].forEach((eventName) => {
    dropzone.addEventListener(eventName, () => {
      dropzone.classList.remove("is-dragover");
    });
  });

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropzone.classList.remove("is-dragover");
    addFiles(Array.from(event.dataTransfer?.files || []));
  });

  imageList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }

    const item = button.closest(".upload-item");
    if (!item) {
      return;
    }

    const { action } = button.dataset;
    const { id } = item.dataset;

    if (action === "remove") {
      removeImage(id);
      return;
    }

    if (action === "up") {
      moveImage(id, -1);
      return;
    }

    if (action === "down") {
      moveImage(id, 1);
    }
  });

  imageList.addEventListener("dragstart", (event) => {
    const item = event.target.closest(".upload-item");
    if (!item) {
      return;
    }

    state.draggedId = item.dataset.id;
    item.classList.add("is-dragging");

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", state.draggedId);
    }
  });

  imageList.addEventListener("dragover", (event) => {
    const item = event.target.closest(".upload-item");
    if (!item) {
      return;
    }

    event.preventDefault();
    item.classList.add("is-drag-target");
  });

  imageList.addEventListener("dragleave", (event) => {
    const item = event.target.closest(".upload-item");
    if (item) {
      item.classList.remove("is-drag-target");
    }
  });

  imageList.addEventListener("drop", (event) => {
    const item = event.target.closest(".upload-item");
    if (!item) {
      return;
    }

    event.preventDefault();
    item.classList.remove("is-drag-target");
    moveImageBefore(state.draggedId, item.dataset.id);
  });

  imageList.addEventListener("dragend", () => {
    cleanupDragState();
  });

  [projectTitle, perPageSelect, marginSelect, orientationSelect].forEach((element) => {
    element.addEventListener("input", renderPreview);
    element.addEventListener("change", renderPreview);
  });

  printButton.addEventListener("click", () => {
    if (!state.images.length) {
      window.alert("Carica almeno un'immagine prima di stampare o salvare in PDF.");
      return;
    }

    window.print();
  });

  clearButton.addEventListener("click", () => {
    if (!state.images.length) {
      return;
    }

    const shouldClear = window.confirm("Vuoi rimuovere tutte le immagini caricate?");
    if (!shouldClear) {
      return;
    }

    state.images.forEach((image) => URL.revokeObjectURL(image.url));
    state.images = [];
    renderAll();
  });

  window.addEventListener("beforeunload", () => {
    state.images.forEach((image) => URL.revokeObjectURL(image.url));
  });

  renderAll();

  function addFiles(files) {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (!imageFiles.length) {
      return;
    }

    const newImages = imageFiles.map((file) => ({
      id: getId(),
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    state.images = [...state.images, ...newImages];
    renderAll();
  }

  function removeImage(id) {
    const targetImage = state.images.find((image) => image.id === id);
    if (!targetImage) {
      return;
    }

    URL.revokeObjectURL(targetImage.url);
    state.images = state.images.filter((image) => image.id !== id);
    renderAll();
  }

  function moveImage(id, direction) {
    const currentIndex = state.images.findIndex((image) => image.id === id);
    const nextIndex = currentIndex + direction;

    if (currentIndex === -1 || nextIndex < 0 || nextIndex >= state.images.length) {
      return;
    }

    const updated = [...state.images];
    const [movedItem] = updated.splice(currentIndex, 1);
    updated.splice(nextIndex, 0, movedItem);
    state.images = updated;
    renderAll();
  }

  function moveImageBefore(sourceId, targetId) {
    if (!sourceId || sourceId === targetId) {
      cleanupDragState();
      return;
    }

    const sourceIndex = state.images.findIndex((image) => image.id === sourceId);
    const targetIndex = state.images.findIndex((image) => image.id === targetId);

    if (sourceIndex === -1 || targetIndex === -1) {
      cleanupDragState();
      return;
    }

    const updated = [...state.images];
    const [movedItem] = updated.splice(sourceIndex, 1);
    const adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
    updated.splice(adjustedTargetIndex, 0, movedItem);
    state.images = updated;
    cleanupDragState();
    renderAll();
  }

  function cleanupDragState() {
    state.draggedId = null;
    imageList.querySelectorAll(".upload-item").forEach((item) => {
      item.classList.remove("is-drag-target", "is-dragging");
    });
  }

  function renderAll() {
    renderImageList();
    renderPreview();
  }

  function renderImageList() {
    if (!state.images.length) {
      imageList.innerHTML = `
        <div class="empty-state">
          Nessuna immagine caricata. Usa il riquadro di upload per iniziare a costruire la pagina stampabile.
        </div>
      `;
      return;
    }

    imageList.innerHTML = state.images
      .map((image, index) => {
        const position = index + 1;
        return `
          <article class="upload-item" draggable="true" data-id="${image.id}">
            <div class="upload-item__thumb">
              <img src="${image.url}" alt="Anteprima di ${escapeHtml(image.name)}">
            </div>
            <div class="upload-item__meta">
              <p class="upload-item__name">${escapeHtml(image.name)}</p>
              <p class="upload-item__hint">Posizione ${position} di ${state.images.length}</p>
              <div class="upload-item__actions">
                <button class="small-button" type="button" data-action="up" ${index === 0 ? "disabled" : ""}>Su</button>
                <button class="small-button" type="button" data-action="down" ${index === state.images.length - 1 ? "disabled" : ""}>Giù</button>
                <button class="small-button small-button--danger" type="button" data-action="remove">Rimuovi</button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderPreview() {
    const settings = getSettings();
    const pages = chunkItems(state.images, settings.perPage);

    document.body.dataset.imagesPerPage = String(settings.perPage);
    document.body.dataset.printOrientation = settings.orientation;
    document.documentElement.style.setProperty("--page-inner-padding", settings.marginValue);
    printStyle.textContent = `@page { size: A4 ${settings.orientation}; margin: ${settings.marginValue}; }`;

    if (!state.images.length) {
      preview.innerHTML = `
        <div class="empty-state">
          L'anteprima apparirà qui appena carichi le immagini. Potrai poi stampare o salvare in PDF dal browser.
        </div>
      `;
      previewSummary.textContent = "Nessuna immagine caricata.";
      return;
    }

    const title = projectTitle.value.trim() || "Raccolta immagini";
    const pageLabel = pages.length === 1 ? "1 pagina pronta" : `${pages.length} pagine pronte`;
    previewSummary.textContent = `${state.images.length} immagini · ${pageLabel}`;

    preview.innerHTML = pages
      .map((pageImages, index) => {
        return `
          <section class="print-page" aria-label="Anteprima pagina ${index + 1}">
            <div class="print-page__head">
              <div>
                <h3>${escapeHtml(title)}</h3>
                <p class="print-page__meta">Scout Utility Website · Layout ${settings.perPage} per pagina</p>
              </div>
              <p class="print-page__index">Pagina ${index + 1} / ${pages.length}</p>
            </div>
            <div class="print-page__body">
              ${pageImages
                .map((image) => {
                  return `
                    <figure class="print-figure">
                      <img src="${image.url}" alt="Immagine ${escapeHtml(image.name)}">
                      <figcaption>${escapeHtml(image.name)}</figcaption>
                    </figure>
                  `;
                })
                .join("")}
            </div>
          </section>
        `;
      })
      .join("");
  }

  function getSettings() {
    const marginMap = {
      stretto: "8mm",
      medio: "14mm",
      largo: "20mm"
    };

    return {
      perPage: Number(perPageSelect.value),
      orientation: orientationSelect.value,
      marginValue: marginMap[marginSelect.value] || marginMap.medio
    };
  }
}

function chunkItems(items, chunkSize) {
  const chunks = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
}

function getId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `img-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
