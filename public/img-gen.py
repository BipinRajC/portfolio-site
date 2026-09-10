import base64
from openai import OpenAI

client = OpenAI()  # reads OPENAI_API_KEY from env automatically

result = client.images.generate(
    model="gpt-image-2.5-flare",
    prompt="A minimal, iconic favicon for a technical portfolio with a cosmic observatory identity. A single four-pointed star rendered in warm ivory on a deep blue-black background, with a thin cool-blue orbit ring around it. The design is crisp, geometric, and flat, recognizable at 16x16. No text, no gradients, no detail, no glow. High contrast, minimal, square composition.",
    size="1024x1024",
    quality="high",
)

with open("favicon.png", "wb") as f:
    f.write(base64.b64decode(result.data[0].b64_json))
