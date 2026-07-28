"""Render the 1200x630 social card in the site palette."""

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
BG = (10, 11, 14)
PANEL = (13, 15, 19)
BD = (35, 38, 46)
TX = (214, 217, 223)
DIM = (139, 144, 155)
FAINT = (86, 91, 102)
ACC = (84, 226, 154)
INFO = (91, 157, 217)
PURPLE = (171, 143, 222)
WARN = (224, 162, 78)

SG_BOLD = "sg-bold.ttf"
SG_REG = "sg-reg.ttf"
MONO = "/usr/share/fonts/TTF/JetBrainsMonoNerdFontMono-Regular.ttf"
MONO_BOLD = "/usr/share/fonts/TTF/JetBrainsMonoNerdFontMono-Bold.ttf"

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img, "RGBA")

# soft accent glow, top-left — same gradient idea as the hero
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
for i in range(160, 0, -1):
    a = int(30 * (i / 160) ** 2.2)
    gd.ellipse([120 - i * 4, 40 - i * 2.6, 120 + i * 4, 40 + i * 2.6], fill=(*ACC, a))
for i in range(140, 0, -1):
    a = int(18 * (i / 140) ** 2.2)
    gd.ellipse([980 - i * 3.4, 0 - i * 2.2, 980 + i * 3.4, 0 + i * 2.2], fill=(*INFO, a))
glow = glow.filter(ImageFilter.GaussianBlur(90))  # kill the ellipse edges
img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")
d = ImageDraw.Draw(img, "RGBA")

# faint 64px grid, fading to the right
for x in range(0, W, 64):
    a = max(0, int(9 * (1 - x / (W * 1.15))))
    d.line([(x, 0), (x, H)], fill=(255, 255, 255, a))
for y in range(0, H, 64):
    a = max(0, int(9 * (1 - y / (H * 1.6))))
    d.line([(0, y), (W, y)], fill=(255, 255, 255, a))

PAD = 74

# wordmark: λ tile + maldev.wiki
d.rounded_rectangle([PAD, 58, PAD + 46, 104], radius=12, fill=(13, 23, 18), outline=(46, 169, 115), width=2)
f_lambda = ImageFont.truetype(MONO_BOLD, 26)
d.text((PAD + 23, 81), "λ", font=f_lambda, fill=ACC, anchor="mm")

f_mark = ImageFont.truetype(MONO_BOLD, 27)
d.text((PAD + 62, 81), "maldev ", font=f_mark, fill=TX, anchor="lm")
mark_w = d.textlength("maldev ", font=f_mark)
d.text((PAD + 62 + mark_w, 81), "wiki", font=f_mark, fill=ACC, anchor="lm")

# creator credit, top right
f_by = ImageFont.truetype(MONO, 18)
d.text((W - PAD, 74), "Gaurav Raj", font=f_by, fill=DIM, anchor="rm")
d.text((W - PAD, 98), "@thehackersbrain", font=f_by, fill=FAINT, anchor="rm")

# headline
f_h1 = ImageFont.truetype(SG_BOLD, 72)
d.text((PAD, 178), "Every technique,", font=f_h1, fill=TX)
line2 = "read from "
d.text((PAD, 262), line2, font=f_h1, fill=TX)
w2 = d.textlength(line2, font=f_h1)
d.text((PAD + w2, 262), "both sides", font=f_h1, fill=ACC)
w3 = d.textlength("both sides", font=f_h1)
d.text((PAD + w2 + w3, 262), ".", font=f_h1, fill=TX)

# supporting line
f_sub = ImageFont.truetype(SG_REG, 27)
d.text((PAD, 372), "Injection, evasion, persistence and C2 — every page pairs", font=f_sub, fill=DIM)
d.text((PAD, 410), "offensive code with the detection logic that catches it.", font=f_sub, fill=DIM)

# terminal strip along the bottom
ty = 486
d.rounded_rectangle([PAD, ty, W - PAD, ty + 84], radius=14, fill=PANEL, outline=BD, width=1)
f_mono = ImageFont.truetype(MONO, 21)
f_mono_b = ImageFont.truetype(MONO_BOLD, 21)

x = PAD + 26
y = ty + 42
d.text((x, y), "❯", font=f_mono_b, fill=ACC, anchor="lm")
x += 28
d.text((x, y), "maldev", font=f_mono, fill=TX, anchor="lm")
x += d.textlength("maldev ", font=f_mono)
d.text((x, y), " search ", font=f_mono, fill=DIM, anchor="lm")
x += d.textlength(" search ", font=f_mono)
d.text((x, y), '"unbacked executable memory"', font=f_mono, fill=WARN, anchor="lm")

# right-hand badges
f_badge = ImageFont.truetype(MONO, 17)
bx = W - PAD - 22
for label, colour in [("sigma · yara", PURPLE), ("T1055.012", INFO)]:
    tw = d.textlength(label, font=f_badge)
    d.rounded_rectangle([bx - tw - 22, y - 16, bx, y + 16], radius=8, outline=(*colour, 90), width=1, fill=(*colour, 22))
    d.text((bx - 11 - tw / 2, y), label, font=f_badge, fill=colour, anchor="mm")
    bx -= tw + 34

img.save("og.png", "PNG", optimize=True)
print("wrote og.png")
