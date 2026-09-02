"""Baixa mapas oficiais e gera JPEG otimizados em assets/park-maps/."""
import os
import re
import urllib.request

import fitz

OUT = os.path.join(os.path.dirname(__file__), "assets", "park-maps")
os.makedirs(OUT, exist_ok=True)
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
MAX_W = 1800

DIRECT = {
    "hollywood.pdf": "https://cdn1.parksmedia.wdprapps.disney.com/vision-dam/digital/parks-platform/parks-global-assets/disney-world/guest-services/guide-maps/DHS_052626_EN-KM.pdf",
    "magic.pdf": "https://cdn1.parksmedia.wdprapps.disney.com/vision-dam/digital/parks-platform/parks-standard-assets/disney-world/guide-maps/magic-kingdom/MK_0126_EN.pdf",
    "epcot.pdf": "https://cdn1.parksmedia.wdprapps.disney.com/vision-dam/digital/parks-platform/parks-global-assets/disney-world/guest-services/guide-maps/EPCOT-guidemap_0726_ENG-DIGITAL.pdf",
    "uni-studios.pdf": "https://www.vaipradisney.com/blog/wp-content/uploads/2020/06/universal-studios-florida-park-map-2025.pdf",
    "animal.jpg": "https://media.blogmickey.com/wp-content/uploads/2026/05/26073540/animal-kingdom-map-may-2026-1.jpg",
    "ioa.jpg": "https://www.planuniversal.com/wp-content/uploads/2026/06/islands-of-adventure-park-map-english.jpg",
    "epic.jpg": "https://www.planuniversal.com/wp-content/uploads/2026/06/universal-epic-universe-park-map-english.jpg",
    "seaworld.png": "https://seaworld.com/orlando/-/media/commercial/seaworld-orlando/images/park-maps/2026/swparkmaporcastadium300july2026-1-1.png",
    "busch.pdf": "https://deeparrival.com/wp-content/uploads/2026/07/busch-gardens-tampa-bay-map-2026-web.pdf",
}

PDF_MAP_PAGE = {"hollywood.pdf": 1, "magic.pdf": 1, "epcot.pdf": 0, "uni-studios.pdf": 0}


def download(name, url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = resp.read()
    path = os.path.join(OUT, name)
    with open(path, "wb") as f:
        f.write(data)
    return path


def export_jpg(src_path, base_name):
    doc = fitz.open(src_path)
    w = doc[0].rect.width
    zoom = min(1.0, MAX_W / w)
    pix = doc[0].get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
    out = os.path.join(OUT, base_name + ".jpg")
    pix.save(out, jpg_quality=82)
    doc.close()
    print(base_name, os.path.getsize(out) // 1024, "KB")


if __name__ == "__main__":
    for name, url in DIRECT.items():
        try:
            path = download(name, url)
            print("OK", name)
        except Exception as exc:
            print("FAIL", name, exc)

    for pdf, base in [
        ("hollywood.pdf", "hollywood"),
        ("magic.pdf", "magic"),
        ("epcot.pdf", "epcot"),
        ("uni-studios.pdf", "uni-studios"),
        ("busch.pdf", "busch"),
    ]:
        p = os.path.join(OUT, pdf)
        if not os.path.exists(p):
            continue
        doc = fitz.open(p)
        page = PDF_MAP_PAGE.get(pdf, 0)
        page = min(page, doc.page_count - 1)
        w = doc[page].rect.width
        zoom = min(1.0, MAX_W / w)
        pix = doc[page].get_pixmap(matrix=fitz.Matrix(zoom, zoom), alpha=False)
        pix.save(os.path.join(OUT, base + ".jpg"), jpg_quality=82)
        doc.close()
        print("jpg", base)

    for base in ("animal", "ioa", "epic", "seaworld"):
        for ext in (".jpg", ".jpeg", ".png"):
            p = os.path.join(OUT, base + ext)
            if os.path.exists(p):
                export_jpg(p, base)
                break
