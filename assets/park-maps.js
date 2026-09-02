/* Mapas oficiais (sem pins). Números e cores das regiões ficam no roteiro (index.html). */
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

function renderParkLayout(parkId) {
  var cfg = PARK_MAPS[parkId];
  var inner = document.querySelector("#roterio-" + parkId + " .park-layout-inner");
  if (!inner || !cfg || inner.dataset.rendered === "1") return;
  inner.innerHTML =
    "<div class=\"park-map-photo\"><img src=\"" + cfg.img + "\" alt=\"Mapa " + cfg.title + "\" loading=\"lazy\"></div>" +
    "<p class=\"park-map-credit small\">" + cfg.credit + "</p>";
  inner.dataset.rendered = "1";
}

function renderAllParkLayouts() {
  Object.keys(PARK_MAPS).forEach(renderParkLayout);
}
