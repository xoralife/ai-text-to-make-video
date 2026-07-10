import logging

logger = logging.getLogger(__name__)


def generate_local_video(prompt: str, output_path: str) -> None:
    from PIL import Image, ImageDraw, ImageFont
    import numpy as np
    import imageio

    width, height = 1920, 1088
    fps = 24
    duration = 8
    total_frames = duration * fps

    words = prompt.split()
    chunk_size = max(1, len(words) // 5)

    try:
        font_title = ImageFont.truetype("arialbd.ttf", 72)
        font_sub = ImageFont.truetype("arial.ttf", 36)
    except (OSError, IOError):
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    writer = imageio.get_writer(
        output_path, fps=fps, codec="libx264", quality=8
    )

    for frame_idx in range(total_frames):
        t = frame_idx / fps
        progress = t / duration

        img = Image.new("RGB", (width, height), (0, 0, 0))
        draw = ImageDraw.Draw(img)

        center_x, center_y = width // 2, height // 3

        line_count = min(int(progress * 6) + 1, 6)
        display_words = words[: min(len(words), line_count * chunk_size)]

        lines = [
            " ".join(display_words[i : i + chunk_size])
            for i in range(0, len(display_words), chunk_size)
        ]

        line_h = 80
        start_y = center_y - (len(lines) * line_h) // 2

        for li, line in enumerate(lines):
            alpha_factor = max(0, min(1, (progress * 6 - li) * 0.3))
            if alpha_factor <= 0:
                continue

            char_count = int(len(line) * min(1, (progress * 6 - li) * 1.2))
            display_text = line[:char_count]

            bbox = draw.textbbox((0, 0), display_text, font=font_title)
            tw = bbox[2] - bbox[0]
            x = center_x - tw // 2
            y = start_y + li * line_h

            text_color = (int(255 * alpha_factor),) * 3
            draw.text((x, y), display_text, font=font_title, fill=text_color)

        footer_text = "Powered by AI"
        bbox = draw.textbbox((0, 0), footer_text, font=font_sub)
        tw = bbox[2] - bbox[0]
        draw.text(
            (center_x - tw // 2, height - 100),
            footer_text,
            font=font_sub,
            fill=(160, 160, 160),
        )

        circle_x = int(center_x + np.sin(t * 2) * 300)
        circle_y = int(height * 0.75 + np.cos(t * 1.5) * 50)
        draw.ellipse(
            [circle_x - 30, circle_y - 30, circle_x + 30, circle_y + 30],
            outline=(60, 60, 60),
            width=2,
        )

        rect_x = int(center_x + np.cos(t * 1.2) * 200) - 40
        rect_y = int(height * 0.78 + np.sin(t * 0.8) * 40) - 40
        draw.rectangle(
            [rect_x, rect_y, rect_x + 80, rect_y + 80],
            outline=(40, 40, 40),
            width=2,
        )

        line_x = int(center_x + np.sin(t * 0.5) * 400)
        draw.line(
            [(line_x, height - 200), (line_x + 100, height - 150)],
            fill=(50, 50, 50),
            width=2,
        )

        writer.append_data(np.array(img))

    writer.close()
    logger.info("Local video saved to %s", output_path)
