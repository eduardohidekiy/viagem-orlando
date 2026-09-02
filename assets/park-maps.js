/* Mapas oficiais (sem pins). Clique abre lightbox. Números/cores no roteiro (index.html). */
var PARK_MAPS = {
  seaworld: {
    title: "SeaWorld Orlando",
    img: "assets/park-maps/seaworld.jpg",
    credit: "Mapa SeaWorld Orlando (jul/2026) · <a href=\"https://seaworld.com/orlando/park-info/park-map/\" target=\"_blank\" rel=\"noopener\">seaworld.com</a>"
  },
  "uni-studios": {
    title: "Universal Studios Florida",
    img: "assets/park-maps/uni-studios.jpg",
    credit: "Mapa Universal Studios Florida (2025) · <a href=\"https://www.universalorlando.com/web/en/us/plan-your-visit/maps\" target=\"_blank\" rel=\"noopener\">universalorlando.com</a>"
  },
  hollywood: {
    title: "Disney's Hollywood Studios",
    img: "assets/park-maps/hollywood.jpg",
    credit: "Guidemap oficial Walt Disney World (mai/2026) · <a href=\"https://disneyworld.disney.go.com/destinations/hollywood-studios/map/\" target=\"_blank\" rel=\"noopener\">My Disney Experience</a>"
  },
  animal: {
    title: "Disney's Animal Kingdom",
    img: "assets/park-maps/animal.jpg",
    credit: "Guidemap oficial Walt Disney World (mai/2026) · <a href=\"https://disneyworld.disney.go.com/destinations/animal-kingdom/map/\" target=\"_blank\" rel=\"noopener\">My Disney Experience</a>"
  },
  epic: {
    title: "Universal Epic Universe",
    img: "assets/park-maps/epic.jpg",
    credit: "Mapa Universal Epic Universe (jun/2026) · <a href=\"https://www.universalorlando.com/web/en/us/plan-your-visit/maps\" target=\"_blank\" rel=\"noopener\">universalorlando.com</a>"
  },
  magic: {
    title: "Magic Kingdom",
    img: "assets/park-maps/magic.jpg",
    credit: "Guidemap oficial Walt Disney World (jan/2026) · <a href=\"https://disneyworld.disney.go.com/destinations/magic-kingdom/map/\" target=\"_blank\" rel=\"noopener\">My Disney Experience</a>"
  },
  epcot: {
    title: "EPCOT",
    img: "assets/park-maps/epcot.jpg",
    credit: "Guidemap oficial Walt Disney World (jul/2026) · <a href=\"https://disneyworld.disney.go.com/destinations/epcot/map/\" target=\"_blank\" rel=\"noopener\">My Disney Experience</a>"
  },
  ioa: {
    title: "Islands of Adventure",
    img: "assets/park-maps/ioa.jpg",
    credit: "Mapa Islands of Adventure (jun/2026) · <a href=\"https://www.universalorlando.com/web/en/us/plan-your-visit/maps\" target=\"_blank\" rel=\"noopener\">universalorlando.com</a>"
  },
  busch: {
    title: "Busch Gardens Tampa",
    img: "assets/park-maps/busch.jpg",
    credit: "Mapa Busch Gardens Tampa Bay (2026) · <a href=\"https://buschgardens.com/tampa/park-info/park-map/\" target=\"_blank\" rel=\"noopener\">buschgardens.com</a>"
  }
};

var parkMapLightbox;

function ensureParkMapLightbox() {
  if (parkMapLightbox) return parkMapLightbox;
  parkMapLightbox = document.createElement("dialog");
  parkMapLightbox.className = "park-map-lightbox noprint";
  parkMapLightbox.setAttribute("aria-label", "Mapa ampliado");
  parkMapLightbox.innerHTML =
    "<button type=\"button\" class=\"park-map-lightbox-close\" aria-label=\"Fechar\">×</button>" +
    "<div class=\"park-map-lightbox-inner\">" +
    "<p class=\"park-map-lightbox-title\"></p>" +
    "<div class=\"park-map-lightbox-scroll\"><img src=\"\" alt=\"\"></div>" +
    "</div>";
  document.body.appendChild(parkMapLightbox);
  parkMapLightbox.querySelector(".park-map-lightbox-close").addEventListener("click", function () {
    parkMapLightbox.close();
  });
  parkMapLightbox.addEventListener("click", function (e) {
    if (e.target === parkMapLightbox) parkMapLightbox.close();
  });
  return parkMapLightbox;
}

function openParkMapLightbox(cfg) {
  var dlg = ensureParkMapLightbox();
  dlg.querySelector(".park-map-lightbox-title").textContent = cfg.title;
  var img = dlg.querySelector(".park-map-lightbox-scroll img");
  img.src = cfg.img;
  img.alt = "Mapa " + cfg.title;
  if (typeof dlg.showModal === "function") dlg.showModal();
}

function renderParkLayout(parkId) {
  var cfg = PARK_MAPS[parkId];
  var inner = document.querySelector("#roterio-" + parkId + " .park-layout-inner");
  if (!inner || !cfg || inner.dataset.rendered === "1") return;
  inner.innerHTML =
    "<button type=\"button\" class=\"park-map-photo\" aria-label=\"Ampliar mapa " + cfg.title + "\">" +
    "<img src=\"" + cfg.img + "\" alt=\"Mapa " + cfg.title + "\" loading=\"lazy\">" +
    "<span class=\"park-map-zoom-hint\">Ampliar</span></button>" +
    "<p class=\"park-map-credit small\">" + cfg.credit + "</p>";
  inner.querySelector(".park-map-photo").addEventListener("click", function () {
    openParkMapLightbox(cfg);
  });
  inner.dataset.rendered = "1";
}

function renderAllParkLayouts() {
  Object.keys(PARK_MAPS).forEach(renderParkLayout);
}
