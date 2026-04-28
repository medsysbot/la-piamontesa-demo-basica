const WHATSAPP_URL = "https://wa.me/541112345678";
const PHONE_URL = "tel:+541112345678";
const MAPS_URL = "https://www.google.com/maps";

const screens = {
  inicio: {
    src: "assets/inicio.jpg",
    alt: "Página de inicio de La Piamontesa",
    hotspots: "inicio"
  },
  pastas: {
    src: "assets/pastas.png",
    alt: "Catálogo de pastas frescas de La Piamontesa",
    hotspots: "catalogo"
  },
  platos: {
    src: "assets/platos-elaborados.png",
    alt: "Catálogo de platos elaborados de La Piamontesa",
    hotspots: "catalogo"
  },
  bebidas: {
    src: "assets/bebidas.png",
    alt: "Catálogo de bebidas de La Piamontesa",
    hotspots: "catalogo"
  },
  salsas: {
    src: "assets/salsas.png",
    alt: "Catálogo de salsas de La Piamontesa",
    hotspots: "catalogo"
  },
  postres: {
    src: "assets/postres.png",
    alt: "Catálogo de postres de La Piamontesa",
    hotspots: "catalogoPostres"
  }
};

const image = document.getElementById("screenImage");
const hotspotsLayer = document.getElementById("hotspots");
const toast = document.getElementById("toast");
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
  image.src = screens[screen].src;
  image.alt = screens[screen].alt;
  renderHotspots(screens[screen].hotspots);
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
    showToast("Enlace telefónico activado.");
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

const initial = location.hash.replace("#", "");
go(screens[initial] ? initial : "inicio");
