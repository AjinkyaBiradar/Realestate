import math
from PIL import Image, ImageDraw

def render_logo(size):
    # Render at 4x for smooth antialiasing
    scale = 4
    canvas_size = size * scale
    img = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Base squircle / rounded rect
    corner_radius = int(canvas_size * 0.25)
    # Background gradient approximation: dark obsidian
    draw.rounded_rectangle(
        [(0, 0), (canvas_size - 1, canvas_size - 1)],
        radius=corner_radius,
        fill=(18, 20, 26, 255),
        outline=(255, 255, 255, 36),
        width=max(1, int(1.5 * scale))
    )

    # Coords mapped from 120x120 viewBox
    def sx(x): return (x / 120.0) * canvas_size
    def sy(y): return (y / 120.0) * canvas_size

    # 1. Structural vertical pylon
    px0, py0, px1, py1 = sx(34), sy(28), sx(45), sy(92)
    draw.rounded_rectangle([(px0, py0), (px1, py1)], radius=int((px1-px0)/2), fill=(245, 245, 250, 255))

    # 2. Upper Cantilever Wing
    upper_poly = [
        (sx(51), sy(54)),
        (sx(76), sy(29)),
        (sx(83), sy(32)),
        (sx(83), sy(40)),
        (sx(79.5), sy(46)),
        (sx(59), sy(62)),
    ]
    draw.polygon(upper_poly, fill=(240, 243, 248, 255))

    # 3. Lower Cantilever Terrace
    lower_poly = [
        (sx(51), sy(66)),
        (sx(79.5), sy(83)),
        (sx(83), sy(89)),
        (sx(83), sy(93)),
        (sx(76), sy(96)),
        (sx(51), sy(74)),
    ]
    draw.polygon(lower_poly, fill=(215, 222, 230, 230))

    # 4. Golden Sun of Kairos
    sun_cx, sun_cy, sun_r = sx(86), sy(40), sx(7)
    draw.ellipse(
        [(sun_cx - sun_r, sun_cy - sun_r), (sun_cx + sun_r, sun_cy + sun_r)],
        fill=(245, 158, 11, 255)
    )

    # 5. Sun halo ring
    halo_r = sx(13)
    draw.ellipse(
        [(sun_cx - halo_r, sun_cy - halo_r), (sun_cx + halo_r, sun_cy + halo_r)],
        outline=(245, 158, 11, 110),
        width=max(1, int(1 * scale))
    )

    # Downsample with Lanczos high-quality filter
    return img.resize((size, size), Image.Resampling.LANCZOS)

if __name__ == "__main__":
    # Generate favicon-16.png
    f16 = render_logo(16)
    f16.save("public/assets/favicon-16.png")
    
    # Generate favicon-32.png
    f32 = render_logo(32)
    f32.save("public/assets/favicon-32.png")

    # Generate apple-touch-icon.png (180x180)
    f180 = render_logo(180)
    f180.save("public/apple-touch-icon.png")

    # Generate favicon.ico with multi-resolution icon sizes
    f48 = render_logo(48)
    f48.save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

    print("Successfully generated modern KAIROS logos & favicons.")
