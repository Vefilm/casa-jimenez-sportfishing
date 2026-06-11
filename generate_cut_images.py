import os, json, base64, urllib.request, urllib.error

API_KEY = os.environ.get("GEMINI_API_KEY", "")
if not API_KEY:
    raise SystemExit("Set GEMINI_API_KEY environment variable first")

MODEL = "gemini-3-pro-image"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent"

OUTPUT_DIR = r"C:\Users\vefil\Desktop\Casa Jimenez\casa-jimenez-sportfishing\src\assets\images\real"

cuts = [
    ("cut_cheek.jpg",    "Ultra-realistic professional food photography, fresh raw yellowfin tuna cheek cut mejilla medallion, small round tender muscle medallions on dark slate stone, fine dining presentation, single ingredient hero shot, dramatic side lighting, dark background, shallow depth of field"),
    ("cut_kama.jpg",     "Ultra-realistic professional food photography, yellowfin tuna kama collar bone-in, charred and blistered from open flame grill, Japanese yakitori style, caramelized crispy skin, rich fatty collagen, served on black ceramic plate, restaurant photography"),
    ("cut_loin.jpg",     "Ultra-realistic professional food photography, fresh yellowfin tuna dorsal loin akami block, vibrant deep crimson red muscle, perfectly trimmed rectangular sashimi block on dark grey stone, sesame seeds and wasabi, Japanese sashimi bar style, dramatic single light source"),
    ("cut_otoro.jpg",    "Ultra-realistic professional food photography, yellowfin tuna otoro belly slab toro cuts, heavily marbled fat lines visible in deep red flesh, glistening with natural oils, razor-thin sashimi slices fanned on white marble surface, premium omakase presentation"),
    ("cut_tail.jpg",     "Ultra-realistic professional food photography, raw yellowfin tuna caudal tail loin, dense athletic fibrous muscle, dark bloodline clearly visible being trimmed away, stainless butcher surface, Pacific fisherman processing style, real fishing boat authenticity"),
]

for filename, prompt in cuts:
    print(f"Generating {filename}...")
    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["image"], "numberOfImages": 1}
    }).encode("utf-8")
    req = urllib.request.Request(URL, data=payload, method="POST",
                                  headers={"Content-Type": "application/json",
                                           "X-goog-api-key": API_KEY})
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read())
        parts = data["candidates"][0]["content"]["parts"]
        img_data = next(p["inlineData"]["data"] for p in parts if "inlineData" in p)
        out_path = os.path.join(OUTPUT_DIR, filename)
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(img_data))
        print(f"  Saved {out_path} ({os.path.getsize(out_path)//1024}KB)")
    except Exception as e:
        print(f"  ERROR: {e}")

print("Done.")
