# Self-host Google Fonts: download woff2 files + generate local @font-face CSS.
# Source: css2 API for Courier Prime (400/700/400i) + Noto Sans Thai (400/500/600/700).
# Output: public/fonts/*.woff2, public/fonts/fonts.css
import re
import urllib.request

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/128.0.0.0 Safari/537.36"
)
CSS2_URL = (
    "https://fonts.googleapis.com/css2"
    "?family=Courier+Prime:ital,wght@0,400;0,700;1,400"
    "&family=Noto+Sans+Thai:wght@400;500;600;700"
    "&display=swap"
)

req = urllib.request.Request(CSS2_URL, headers={"User-Agent": UA})
css = urllib.request.urlopen(req, timeout=30).read().decode("utf-8")

# Parse: /* subset */ comments + @font-face blocks
blocks = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{[^}]+\})", css)
out_css = []
seen = set()
for subset, block in blocks:
    family = re.search(r"font-family:\s*'([^']+)'", block).group(1)
    style = re.search(r"font-style:\s*(\w+)", block).group(1)
    weight = re.search(r"font-weight:\s*(\d+)", block).group(1)
    url = re.search(r"src:\s*url\(([^)]+)\)", block).group(1)
    urange = re.search(r"unicode-range:\s*([^;]+);", block).group(1).strip()

    slug = family.lower().replace(" ", "-")
    fname = f"{slug}-{subset}-{weight}{'-italic' if style == 'italic' else ''}.woff2"
    if fname in seen:
        continue
    seen.add(fname)

    data = urllib.request.urlopen(
        urllib.request.Request(url, headers={"User-Agent": UA}), timeout=30
    ).read()
    with open(f"public/fonts/{fname}", "wb") as fp:
        fp.write(data)

    out_css.append(
        f"/* {family} {weight} {style} — {subset} */\n"
        "@font-face {\n"
        f"  font-family: '{family}';\n"
        f"  font-style: {style};\n"
        f"  font-weight: {weight};\n"
        "  font-display: swap;\n"
        f"  src: url('/fonts/{fname}') format('woff2');\n"
        f"  unicode-range: {urange};\n"
        "}\n"
    )
    print(f"{fname}: {len(data)} bytes")

with open("public/fonts/fonts.css", "w", encoding="utf-8") as fp:
    fp.write("\n".join(out_css))
print(f"\nwrote public/fonts/fonts.css ({len(out_css)} faces)")
