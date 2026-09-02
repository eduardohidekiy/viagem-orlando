/* Mapas oficiais + pins (% dentro da área do mapa). Fontes no credit de cada parque. */
var DISNEY_GUIDE = { left: 41, top: 5, width: 57, height: 88 };
var PARK_MAPS = {
  seaworld: {
    title: "SeaWorld Orlando",
    img: "assets/park-maps/seaworld.jpg",
    credit: "Mapa SeaWorld Orlando (jul/2026) · <a href=\"https://seaworld.com/orlando/park-info/park-map/\" target=\"_blank\" rel=\"noopener\">seaworld.com</a>",
    stops: [
      { n: 1, x: 52, y: 88, i: 0 }, { n: 2, x: 18, y: 18, i: 1 }, { n: 3, x: 28, y: 14, i: 2 },
      { n: 4, x: 38, y: 12, i: 3 }, { n: 5, x: 62, y: 38, i: 4 }, { n: 6, x: 22, y: 42, i: 5 },
      { n: 7, x: 48, y: 48, i: 6 }, { n: 8, x: 72, y: 55, i: 7 }, { n: 9, x: 28, y: 58, i: 8 },
      { n: 10, x: 35, y: 44, i: 9 }, { n: 11, x: 78, y: 62, i: 10 }, { n: 12, x: 55, y: 72, i: 11 },
      { n: 13, x: 15, y: 68, i: 12 }
    ]
  },
  "uni-studios": {
    title: "Universal Studios Florida",
    img: "assets/park-maps/uni-studios.jpg",
    credit: "Mapa Universal Studios Florida (2025) · <a href=\"https://www.universalorlando.com/web/en/us/plan-your-visit/maps\" target=\"_blank\" rel=\"noopener\">universalorlando.com</a>",
    stops: [
      { n: 1, x: 22, y: 52, i: 0 }, { n: 2, x: 48, y: 38, i: 1 }, { n: 3, x: 58, y: 32, i: 2 },
      { n: 4, x: 62, y: 55, i: 3 }, { n: 5, x: 52, y: 62, i: 4 }, { n: 6, x: 72, y: 68, i: 5 },
      { n: 7, x: 78, y: 58, i: 6 }, { n: 8, x: 68, y: 48, i: 7 }, { n: 9, x: 55, y: 45, i: 8 },
      { n: 10, x: 28, y: 68, i: 9 }, { n: 11, x: 32, y: 78, i: 10 }
    ]
  },
  hollywood: {
    title: "Disney's Hollywood Studios",
    img: "assets/park-maps/hollywood.jpg",
    mapBox: DISNEY_GUIDE,
    credit: "Guidemap oficial Walt Disney World (mai/2026) · <a href=\"https://disneyworld.disney.go.com/destinations/hollywood-studios/map/\" target=\"_blank\" rel=\"noopener\">My Disney Experience</a>",
    stops: [
      { n: 1, x: 14, y: 58, i: 0 }, { n: 2, x: 26, y: 24, i: 1 }, { n: 3, x: 30, y: 20, i: 2 },
      { n: 4, x: 34, y: 16, i: 3 }, { n: 5, x: 46, y: 20, i: 4 }, { n: 6, x: 50, y: 26, i: 5 },
      { n: 7, x: 28, y: 28, i: 6 }, { n: 8, x: 56, y: 66, i: 7 }, { n: 9, x: 76, y: 30, i: 8 },
      { n: 10, x: 80, y: 40, i: 9 }, { n: 11, x: 86, y: 54, i: 10 }
    ]
  },
  animal: {
    title: "Disney's Animal Kingdom",
    img: "assets/park-maps/animal.jpg",
    credit: "Guidemap oficial Walt Disney World (mai/2026) · <a href=\"https://disneyworld.disney.go.com/destinations/animal-kingdom/map/\" target=\"_blank\" rel=\"noopener\">My Disney Experience</a>",
    stops: [
      { n: 1, x: 28, y: 42, i: 0 }, { n: 2, x: 48, y: 38, i: 1 }, { n: 3, x: 72, y: 36, i: 2 },
      { n: 4, x: 78, y: 48, i: 3 }, { n: 6, x: 58, y: 58, i: 5 }, { n: 7, x: 52, y: 62, i: 6 },
      { n: 8, x: 56, y: 66, i: 7 }, { n: 9, x: 46, y: 48, i: 8 }, { n: 10, x: 68, y: 42, i: 9 }
    ]
  },
  epic: {
    title: "Universal Epic Universe",
    img: "assets/park-maps/epic.jpg",
    credit: "Mapa Universal Epic Universe (jun/2026) · <a href=\"https://www.universalorlando.com/web/en/us/plan-your-visit/maps\" target=\"_blank\" rel=\"noopener\">universalorlando.com</a>",
    stops: [
      { n: 1, x: 50, y: 82, i: 0 }, { n: 2, x: 28, y: 28, i: 1 }, { n: 3, x: 34, y: 22, i: 2 },
      { n: 4, x: 72, y: 24, i: 3 }, { n: 5, x: 30, y: 38, i: 4 }, { n: 6, x: 78, y: 48, i: 5 },
      { n: 7, x: 62, y: 52, i: 6 }, { n: 8, x: 48, y: 58, i: 7 }
    ]
  },
  magic: {
    title: "Magic Kingdom",
    img: "assets/park-maps/magic.jpg",
    mapBox: DISNEY_GUIDE,
    credit: "Guidemap oficial Walt Disney World (jan/2026) · <a href=\"https://disneyworld.disney.go.com/destinations/magic-kingdom/map/\" target=\"_blank\" rel=\"noopener\">My Disney Experience</a>",
    stops: [
      { n: 2, x: 24, y: 54, i: 1 }, { n: 3, x: 34, y: 44, i: 2 }, { n: 4, x: 38, y: 48, i: 3 },
      { n: 5, x: 48, y: 52, i: 4 }, { n: 6, x: 52, y: 46, i: 5 }, { n: 7, x: 50, y: 60, i: 6 },
      { n: 8, x: 66, y: 38, i: 7 }, { n: 9, x: 76, y: 30, i: 8 }, { n: 10, x: 80, y: 24, i: 9 },
      { n: 11, x: 50, y: 84, i: 10 }, { n: 12, x: 50, y: 64, i: 11 }
    ]
  },
  epcot: {
    title: "EPCOT",
    img: "assets/park-maps/epcot.jpg",
    mapBox: DISNEY_GUIDE,
    credit: "Guidemap oficial Walt Disney World (jul/2026) · <a href=\"https://disneyworld.disney.go.com/destinations/epcot/map/\" target=\"_blank\" rel=\"noopener\">My Disney Experience</a>",
    stops: [
      { n: 1, x: 22, y: 32, i: 0 }, { n: 2, x: 52, y: 28, i: 1 }, { n: 3, x: 68, y: 26, i: 2 },
      { n: 4, x: 72, y: 34, i: 3 }, { n: 5, x: 38, y: 38, i: 4 }, { n: 6, x: 70, y: 36, i: 5 },
      { n: 7, x: 48, y: 32, i: 6 }, { n: 8, x: 18, y: 62, i: 7 }, { n: 9, x: 42, y: 68, i: 8 },
      { n: 10, x: 48, y: 72, i: 9 }, { n: 11, x: 58, y: 68, i: 10 }, { n: 12, x: 68, y: 72, i: 11 },
      { n: 13, x: 50, y: 82, i: 12 }
    ]
  },
  ioa: {
    title: "Islands of Adventure",
    img: "assets/park-maps/ioa.jpg",
    credit: "Mapa Islands of Adventure (jun/2026) · <a href=\"https://www.universalorlando.com/web/en/us/plan-your-visit/maps\" target=\"_blank\" rel=\"noopener\">universalorlando.com</a>",
    stops: [
      { n: 1, x: 32, y: 22, i: 0 }, { n: 2, x: 38, y: 28, i: 1 }, { n: 3, x: 42, y: 34, i: 2 },
      { n: 4, x: 36, y: 42, i: 3 }, { n: 5, x: 48, y: 52, i: 4 }, { n: 6, x: 58, y: 38, i: 5 },
      { n: 7, x: 62, y: 48, i: 6 }, { n: 8, x: 55, y: 55, i: 7 }, { n: 9, x: 52, y: 62, i: 8 },
      { n: 10, x: 68, y: 58, i: 9 }, { n: 11, x: 72, y: 68, i: 10 }
    ]
  },
  busch: {
    title: "Busch Gardens Tampa",
    img: "assets/park-maps/busch.jpg",
    credit: "Mapa Busch Gardens Tampa Bay (2026) · <a href=\"https://buschgardens.com/tampa/park-info/park-map/\" target=\"_blank\" rel=\"noopener\">buschgardens.com</a>",
    stops: [
      { n: 1, x: 22, y: 28, i: 0 }, { n: 2, x: 28, y: 34, i: 1 }, { n: 3, x: 48, y: 30, i: 2 },
      { n: 4, x: 72, y: 32, i: 3 }, { n: 5, x: 75, y: 55, i: 4 }, { n: 6, x: 52, y: 58, i: 5 },
      { n: 7, x: 38, y: 62, i: 6 }, { n: 8, x: 28, y: 68, i: 7 }, { n: 9, x: 45, y: 72, i: 8 },
      { n: 10, x: 68, y: 75, i: 9 }
    ]
  }
};

function parkPinStyle(stop, cfg) {
  var box = cfg.mapBox || { left: 0, top: 0, width: 100, height: 100 };
  var left = box.left + (stop.x * box.width / 100);
  var top = box.top + (stop.y * box.height / 100);
  return "left:" + left + "%;top:" + top + "%";
}

function renderParkLayout(parkId) {
  var cfg = PARK_MAPS[parkId];
  var inner = document.querySelector("#roterio-" + parkId + " .park-layout-inner");
  if (!inner || !cfg || inner.dataset.rendered === "1") return;
  var html = "<div class=\"park-map-photo\"><img src=\"" + cfg.img + "\" alt=\"Mapa " + cfg.title + "\" loading=\"lazy\">";
  cfg.stops.forEach(function (s) {
    html += "<button type=\"button\" class=\"park-pin\" data-stop=\"" + s.n + "\" style=\"" + parkPinStyle(s, cfg) + "\" aria-label=\"Parada " + s.n + "\">" + s.n + "</button>";
  });
  html += "</div><p class=\"park-map-credit small\">" + cfg.credit + "</p>";
  inner.innerHTML = html;
  inner.dataset.rendered = "1";
  linkParkStops(parkId);
  bindParkLayoutHover(parkId);
}

function linkParkStops(parkId) {
  var cfg = PARK_MAPS[parkId];
  var panel = document.getElementById("roterio-" + parkId);
  if (!panel || !cfg) return;
  var list = panel.querySelector("ol.timed");
  if (!list) return;
  cfg.stops.forEach(function (s) {
    var li = list.children[s.i];
    if (!li) return;
    li.setAttribute("data-stop", String(s.n));
    li.classList.add("has-stop");
    if (!li.querySelector(".stop-badge")) {
      var badge = document.createElement("span");
      badge.className = "stop-badge";
      badge.textContent = s.n;
      li.insertBefore(badge, li.firstChild);
    }
  });
}

function bindParkLayoutHover(parkId) {
  var panel = document.getElementById("roterio-" + parkId);
  if (!panel) return;
  function setOn(n) {
    panel.querySelectorAll(".park-pin").forEach(function (el) {
      el.classList.toggle("is-on", n != null && el.getAttribute("data-stop") === String(n));
    });
    panel.querySelectorAll("ol.timed li[data-stop]").forEach(function (li) {
      li.classList.toggle("is-on", n != null && li.getAttribute("data-stop") === String(n));
    });
  }
  panel.querySelectorAll(".park-pin").forEach(function (el) {
    el.addEventListener("mouseenter", function () { setOn(el.getAttribute("data-stop")); });
    el.addEventListener("mouseleave", function () { setOn(null); });
  });
  panel.querySelectorAll("ol.timed li[data-stop]").forEach(function (li) {
    li.addEventListener("mouseenter", function () { setOn(li.getAttribute("data-stop")); });
    li.addEventListener("mouseleave", function () { setOn(null); });
  });
}

function renderAllParkLayouts() {
  Object.keys(PARK_MAPS).forEach(renderParkLayout);
}
