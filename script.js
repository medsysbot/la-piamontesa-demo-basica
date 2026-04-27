const WHATSAPP_URL = "https://wa.me/541112345678";
const PHONE_URL = "tel:+541112345678";
const MAPS_URL = "https://www.google.com/maps";

const screens = {
  inicio: {
    src: "assets/inicio.jpg",
    alt: "Página de inicio de La Piamontesa",
    hotspots: "inicio",
    mobileTitle: "El sabor de la cocina casera",
    mobileSubtitle: "Pastas frescas y comidas artesanales.",
    hero: "assets/inicio.jpg"
  },
  pastas: {
    src: "assets/pastas.png",
    alt: "Catálogo de pastas frescas de La Piamontesa",
    hotspots: "catalogo",
    mobileTitle: "Catálogo de Pastas Frescas",
    mobileSubtitle: "Pastas caseras listas para cocinar.",
    hero: "assets/pastas.png"
  },
  platos: {
    src: "assets/platos-elaborados.png",
    alt: "Catálogo de platos elaborados de La Piamontesa",
    hotspots: "catalogo",
    mobileTitle: "Catálogo de Platos Elaborados",
    mobileSubtitle: "Platos caseros listos para disfrutar.",
    hero: "assets/platos-elaborados.png"
  },
  bebidas: {
    src: "assets/bebidas.png",
    alt: "Catálogo de bebidas de La Piamontesa",
    hotspots: "catalogo",
    mobileTitle: "Catálogo de Bebidas",
    mobileSubtitle: "Bebidas frías para acompañar tu pedido.",
    hero: "assets/bebidas.png"
  },
  salsas: {
    src: "assets/salsas.png",
    alt: "Catálogo de salsas de La Piamontesa",
    hotspots: "catalogo",
    mobileTitle: "Catálogo de Salsas",
    mobileSubtitle: "Salsas caseras para acompañar pastas frescas.",
    hero: "assets/salsas.png"
  },
  postres: {
    src: "assets/postres.png",
    alt: "Catálogo de postres de La Piamontesa",
    hotspots: "catalogoPostres",
    mobileTitle: "Catálogo de Postres",
    mobileSubtitle: "Postres clásicos para cerrar la comida.",
    hero: "assets/postres.png"
  }
};

const image = document.getElementById("screenImage");
const hotspotsLayer = document.getElementById("hotspots");
const navButtons = [...document.querySelectorAll(".demo-nav [data-screen]")];
const toast = document.getElementById("toast");
const mobileShell = document.getElementById("mobileShell");
let currentScreen = "inicio";
let toastTimer = null;

function pctBox({ x, y, w, h }) {
  return `left:${x}%;top:${y}%;width:${w}%;height:${h}%;`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function go(screen) {
  if (!screens[screen]) return;
  currentScreen = screen;
  image.src = screens[screen].src;
  image.alt = screens[screen].alt;
  navButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.screen === screen));
  renderHotspots(screens[screen].hotspots);
  renderMobile(screen);
  history.replaceState(null, "", `#${screen}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openExternal(kind) {
  if (kind === "whatsapp") {
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
    showToast("WhatsApp abierto en una pestaña nueva.");
  }
  if (kind === "phone") {
    window.location.href = PHONE_URL;
    showToast("Acción de llamada disponible desde el teléfono.");
  }
  if (kind === "maps") {
    window.open(MAPS_URL, "_blank", "noopener,noreferrer");
    showToast("Mapa abierto en una pestaña nueva.");
  }
}

function makeHotspot(item) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = `hotspot ${item.className || ""}`.trim();
  el.style.cssText = pctBox(item);
  el.setAttribute("aria-label", item.label);
  el.title = item.label;
  el.addEventListener("click", () => {
    if (item.to) go(item.to);
    if (item.external) openExternal(item.external);
  });
  return el;
}

const commonTopNav = [
  { label: "Ir a inicio", to: "inicio", x: 45.4, y: 2.0, w: 12.3, h: 3.1 },
  { label: "Ir a productos", to: "pastas", x: 58.8, y: 2.0, w: 13.2, h: 3.1 },
  { label: "Ver sección Nosotros", to: "inicio", x: 73.2, y: 2.0, w: 12.0, h: 3.1 },
  { label: "Ver contacto", to: "inicio", x: 86.1, y: 2.0, w: 12.0, h: 3.1 }
];

const commonHeroButtons = [
  { label: "Ver productos", to: "pastas", x: 5.2, y: 20.0, w: 18.6, h: 3.1 },
  { label: "Abrir WhatsApp", external: "whatsapp", x: 24.8, y: 20.0, w: 15.0, h: 3.1 },
  { label: "Llamar", external: "phone", x: 41.2, y: 20.0, w: 12.0, h: 3.1 }
];

const catalogTabs = [
  { label: "Ver pastas frescas", to: "pastas", x: 18.5, y: 31.0, w: 14.0, h: 3.2 },
  { label: "Ver platos elaborados", to: "platos", x: 34.0, y: 31.0, w: 22.0, h: 3.2 },
  { label: "Ver bebidas", to: "bebidas", x: 56.5, y: 31.0, w: 13.8, h: 3.2 },
  { label: "Ver salsas", to: "salsas", x: 70.4, y: 31.0, w: 12.5, h: 3.2 }
];

const catalogPostreTabs = [
  { label: "Ver pastas frescas", to: "pastas", x: 12.4, y: 32.5, w: 12.5, h: 3.0 },
  { label: "Ver platos elaborados", to: "platos", x: 26.3, y: 32.5, w: 21.5, h: 3.0 },
  { label: "Ver bebidas", to: "bebidas", x: 49.5, y: 32.5, w: 12.5, h: 3.0 },
  { label: "Ver salsas", to: "salsas", x: 63.5, y: 32.5, w: 10.0, h: 3.0 },
  { label: "Ver postres", to: "postres", x: 75.0, y: 32.5, w: 12.0, h: 3.0 }
];

const maps = {
  inicio: [
    ...commonTopNav,
    { label: "Ver productos", to: "pastas", x: 5.5, y: 20.2, w: 17.0, h: 3.2 },
    { label: "Abrir WhatsApp", external: "whatsapp", x: 23.4, y: 20.2, w: 15.5, h: 3.2 },
    { label: "Llamar", external: "phone", x: 40.0, y: 20.2, w: 13.0, h: 3.2 },
    { label: "Categoría pastas", to: "pastas", className: "card", x: 7.0, y: 34.5, w: 20.8, h: 13.0 },
    { label: "Categoría platos elaborados", to: "platos", className: "card", x: 28.3, y: 34.5, w: 21.2, h: 13.0 },
    { label: "Categoría bebidas", to: "bebidas", className: "card", x: 50.3, y: 34.5, w: 21.0, h: 13.0 },
    { label: "Categoría salsas", to: "salsas", className: "card", x: 72.2, y: 34.5, w: 20.8, h: 13.0 },
    { label: "Ver ravioles recomendados", to: "pastas", className: "card", x: 7.5, y: 53.5, w: 27.2, h: 20.2 },
    { label: "Ver milanesa recomendada", to: "platos", className: "card", x: 36.0, y: 53.5, w: 27.5, h: 20.2 },
    { label: "Ver postres recomendados", to: "postres", className: "card", x: 65.0, y: 53.5, w: 27.5, h: 20.2 },
    { label: "Cómo llegar", external: "maps", x: 11.0, y: 88.5, w: 15.5, h: 3.0 },
    { label: "Abrir mapa", external: "maps", className: "map", x: 46.5, y: 77.0, w: 47.0, h: 16.7 }
  ],
  catalogo: [
    ...commonTopNav,
    ...commonHeroButtons,
    ...catalogTabs
  ],
  catalogoPostres: [
    ...commonTopNav,
    ...commonHeroButtons,
    ...catalogPostreTabs
  ]
};

function renderHotspots(mapName) {
  hotspotsLayer.innerHTML = "";
  const items = maps[mapName] || [];
  for (const item of items) hotspotsLayer.appendChild(makeHotspot(item));
}

function cropStyle(src, crop) {
  const imageW = 1024;
  const imageH = 1536;
  const xPos = crop.x / Math.max(1, imageW - crop.w) * 100;
  const yPos = crop.y / Math.max(1, imageH - crop.h) * 100;
  const size = imageW / crop.w * 100;
  return `--img: url('${src}'); --bg-size: ${size.toFixed(2)}% auto; --bg-pos: ${xPos.toFixed(2)}% ${yPos.toFixed(2)}%;`;
}

const productData = {
  pastas: {
    title: "Pastas frescas",
    grid: "standard",
    src: "assets/pastas.png",
    items: [
      ["Ravioles de Ricota", "$580", 56, 595, 222, 176],
      ["Sorrentinos de Jamón y Queso", "$600", 289, 595, 222, 176],
      ["Tallarines", "$490", 517, 595, 222, 176],
      ["Ñoquis de Papa x 500gr", "$450", 745, 595, 222, 176],
      ["Ravioles de Calabaza", "$580", 56, 913, 222, 176],
      ["Sorrentinos de Calabaza", "$600", 289, 913, 222, 176],
      ["Panzottis", "$750", 517, 913, 222, 176],
      ["Capeletinis", "$900", 745, 913, 222, 176],
      ["Capelettis x 500gr", "$550", 56, 1230, 222, 176],
      ["Tallarines de Espinaca x 500gr", "$490", 289, 1230, 222, 176],
      ["Ñoquis Rellenos de Jamón", "$650", 517, 1230, 222, 176],
      ["Sorrentinos Caprese", "$650", 745, 1230, 222, 176]
    ]
  },
  platos: {
    title: "Platos elaborados",
    grid: "wide",
    src: "assets/platos-elaborados.png",
    items: [
      ["Tallarines al Pesto", "$990", 56, 594, 450, 235],
      ["Capelettis con Estofado", "$1100", 518, 594, 450, 235],
      ["Sorrentinos con Salsa Fileto", "$980", 56, 924, 450, 235],
      ["Panzottis con Salsa Rosa", "$1000", 518, 924, 450, 235],
      ["Ravioles con Salsa Bolognesa", "$1020", 56, 1232, 450, 235],
      ["Milanesa Napolitana", "$1150", 518, 1232, 450, 235]
    ]
  },
  bebidas: {
    title: "Bebidas",
    grid: "standard",
    src: "assets/bebidas.png",
    items: [
      ["Agua Mineral 500 ml", "$300", 56, 645, 220, 290],
      ["Coca-Cola 500 ml", "$380", 289, 645, 220, 290],
      ["Sprite 500 ml", "$380", 517, 645, 220, 290],
      ["Jugo de Naranja 500 ml", "$420", 745, 645, 220, 290],
      ["Agua Saborizada 500 ml", "$340", 56, 1073, 220, 290],
      ["Coca-Cola 1.5 L", "$520", 289, 1073, 220, 290],
      ["Soda 500 ml", "$250", 517, 1073, 220, 290],
      ["Jugo Multifruta 500 ml", "$420", 745, 1073, 220, 290]
    ]
  },
  salsas: {
    title: "Salsas",
    grid: "standard",
    src: "assets/salsas.png",
    items: [
      ["Salsa Fileto", "$350", 56, 700, 220, 300],
      ["Salsa Bolognesa", "$450", 289, 700, 220, 300],
      ["Salsa Pesto", "$420", 517, 700, 220, 300],
      ["Salsa Cuatro Quesos", "$480", 745, 700, 220, 300],
      ["Estofado", "$520", 56, 1125, 220, 300]
    ]
  },
  postres: {
    title: "Postres",
    grid: "wide",
    src: "assets/postres.png",
    items: [
      ["Flan Casero", "$450", 56, 640, 450, 300],
      ["Tiramisú", "$480", 524, 640, 450, 300],
      ["Budín de Pan", "$430", 56, 1072, 450, 300],
      ["Ensalada de Frutas", "$390", 524, 1072, 450, 300]
    ]
  }
};

const homeCategories = [
  { title: "Pastas", to: "pastas", src: "assets/inicio.jpg", crop: { x: 72, y: 530, w: 220, h: 165 } },
  { title: "Platos elaborados", to: "platos", src: "assets/inicio.jpg", crop: { x: 292, y: 530, w: 220, h: 165 } },
  { title: "Bebidas", to: "bebidas", src: "assets/inicio.jpg", crop: { x: 515, y: 530, w: 220, h: 165 } },
  { title: "Salsas", to: "salsas", src: "assets/inicio.jpg", crop: { x: 738, y: 530, w: 220, h: 165 } },
  { title: "Postres", to: "postres", src: "assets/postres.png", crop: { x: 524, y: 640, w: 450, h: 300 } }
];

const homeRecommended = [
  { title: "Ravioles de Ricota", price: "$580", to: "pastas", src: "assets/inicio.jpg", crop: { x: 75, y: 825, w: 280, h: 170 } },
  { title: "Milanesa Napolitana", price: "$1150", to: "platos", src: "assets/platos-elaborados.png", crop: { x: 518, y: 1232, w: 450, h: 235 } },
  { title: "Tiramisú", price: "$480", to: "postres", src: "assets/postres.png", crop: { x: 524, y: 640, w: 450, h: 300 } }
];

function mobileButton(label, screen, active = false) {
  return `<button class="mobile-pill${active ? " active" : ""}" type="button" data-mobile-to="${screen}">${label}</button>`;
}

function renderMobileHeader(screen) {
  return `
    <div class="mobile-top">
      <div class="mobile-brand-row">
        <div class="mobile-logo">La Piamontesa</div>
        <div class="mobile-mini-nav">
          ${mobileButton("Inicio", "inicio", screen === "inicio")}
          ${mobileButton("Productos", screen === "inicio" ? "pastas" : screen, screen !== "inicio")}
        </div>
      </div>
    </div>`;
}

function renderMobileHero(screen) {
  const data = screens[screen];
  return `
    <section class="mobile-hero" style="--hero: url('${data.hero}')">
      <h1 class="mobile-title">${data.mobileTitle}</h1>
      <p class="mobile-subtitle">${data.mobileSubtitle}</p>
      <div class="mobile-actions">
        <button class="mobile-cta red" type="button" data-mobile-to="pastas">Ver productos</button>
        <button class="mobile-cta green" type="button" data-mobile-ext="whatsapp">WhatsApp</button>
        <button class="mobile-cta" type="button" data-mobile-ext="phone">Llamar</button>
      </div>
    </section>`;
}

function renderMobileTabs(active) {
  const tabs = [
    ["Pastas", "pastas"],
    ["Platos elaborados", "platos"],
    ["Bebidas", "bebidas"],
    ["Salsas", "salsas"],
    ["Postres", "postres"]
  ];
  return `
    <div class="mobile-tabs-wrap">
      <div class="mobile-tabs">
        ${tabs.map(([label, key]) => mobileButton(label, key, key === active)).join("")}
      </div>
    </div>`;
}

function renderMobileCard({ title, price, src, crop, to, wide = false }) {
  const style = cropStyle(src, crop);
  return `
    <article class="mobile-card${to ? " clickable" : ""}" ${to ? `data-mobile-to="${to}"` : ""}>
      <div class="mobile-thumb" style="${style}"></div>
      <div class="mobile-card-body">
        <h3 class="mobile-card-title">${title}</h3>
        ${price ? `<div class="mobile-price">${price}</div>` : ""}
      </div>
    </article>`;
}

function renderHome() {
  return `
    ${renderMobileHeader("inicio")}
    ${renderMobileHero("inicio")}
    <section class="mobile-section">
      <h2 class="mobile-section-title">Nuestras Categorías</h2>
      <div class="mobile-grid">
        ${homeCategories.map(item => renderMobileCard(item)).join("")}
      </div>
      <h2 class="mobile-section-title">Nuestros Recomendados</h2>
      <div class="mobile-grid">
        ${homeRecommended.map(item => renderMobileCard(item)).join("")}
      </div>
      <div class="mobile-contact-card">
        <h2 class="mobile-section-title" style="margin-top:0">Nuestra Ubicación</h2>
        <p><strong>Dirección:</strong> Calle Ejemplo 123, Ciudad</p>
        <p><strong>Horarios:</strong> Lunes a Sábado 10:00 a 20:00</p>
        <div class="mobile-actions">
          <button class="mobile-cta red" type="button" data-mobile-ext="maps">Cómo llegar</button>
          <button class="mobile-cta green" type="button" data-mobile-ext="whatsapp">WhatsApp</button>
          <button class="mobile-cta" type="button" data-mobile-ext="phone">Llamar</button>
        </div>
      </div>
    </section>`;
}

function renderCategory(screen) {
  const data = productData[screen];
  const wide = data.grid === "wide";
  const cards = data.items.map(([title, price, x, y, w, h]) => renderMobileCard({
    title,
    price,
    src: data.src,
    crop: { x, y, w, h }
  })).join("");

  return `
    ${renderMobileHeader(screen)}
    ${renderMobileHero(screen)}
    ${renderMobileTabs(screen)}
    <section class="mobile-section">
      <h2 class="mobile-section-title">${data.title}</h2>
      <div class="mobile-grid${wide ? " wide" : ""}">${cards}</div>
    </section>`;
}

function renderMobile(screen) {
  mobileShell.innerHTML = `<div class="mobile-page">${screen === "inicio" ? renderHome() : renderCategory(screen)}</div>`;
  mobileShell.querySelectorAll("[data-mobile-to]").forEach(el => {
    el.addEventListener("click", () => go(el.getAttribute("data-mobile-to")));
  });
  mobileShell.querySelectorAll("[data-mobile-ext]").forEach(el => {
    el.addEventListener("click", () => openExternal(el.getAttribute("data-mobile-ext")));
  });
}

navButtons.forEach(btn => btn.addEventListener("click", () => go(btn.dataset.screen)));

const initial = location.hash.replace("#", "");
go(screens[initial] ? initial : "inicio");
