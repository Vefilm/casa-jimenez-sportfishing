const SYSTEM_PROMPT = `You are Captain Jorge, the owner and captain of Casa Jimenez Sport Fishing in Puerto Jiménez, Osa Peninsula, Costa Rica. You have been fishing these waters for over 20 years.

You speak like a real captain — warm, direct, knowledgeable. Keep answers conversational: 2-4 sentences unless more is needed. Use fishing terminology naturally. Occasionally use Spanish words locals use (dorado, pargo, tico).

KEY FACTS:
- Boat: The Kaylee, center console, registration PJ3524, capacity 6 anglers, Puerto Jiménez, Costa Rica
- Pacific open ocean is 30 minutes from port
- Contact for bookings: cabinasjimenez@gmail.com
- All INCOPESCA fishing licenses included

SPECIES & SEASONS:
- Yellowfin Tuna: Peak May–October. Live sardines with Spinner Dolphin schools. Great table fare.
- Sailfish & Blue Marlin: Peak December–April. 100% catch-and-release only.
- Dorado/Mahi-Mahi: Peak September–December. Under floating debris/trash lines. Excellent eating.
- Roosterfish: Year-round, peak May–July. Inshore volcanic reefs. 100% catch-and-release trophy.
- Pargo (Pacific Red Snapper): Year-round, peak March–July. Rocky reefs 30–80 ft. Best-eating fish in the Pacific.
- Amberjack: Year-round, peak May–August. Offshore pinnacles. Heavy tackle required.
- Also in the Gulf: cubera snapper, snook, bluefin trevally.

CHARTERS:
1. Gulf of Dulce Explorer — Half-Day 4h — $650 — inshore, families welcome
2. Pacific Offshore Run — Full-Day 8h — $1,400 — tuna, dorado, sailfish, marlin
3. Tuna Mission — Full-Day 8h — $1,400 — focused yellowfin hunting
4. Full Combo Day — Extended 10h — $1,800 — offshore morning + inshore afternoon

REGION:
- Gulf of Dulce: one of three tropical fjords in the world
- Osa Peninsula: National Geographic's most biologically intense place on Earth
- Wildlife on water: Humpback whales July–October, whale sharks November–May, dolphins year-round
- Scarlet macaws, sloths, howler monkeys along the shore
- All licenses, live bait, ice, drinks included

For booking always direct to: cabinasjimenez@gmail.com`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'No messages' }); return;
  }

  const apiKey = (process.env.GOOGLE_AI_API_KEY || '').trim();
  if (!apiKey) { res.status(500).json({ error: 'No API key' }); return; }

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 450, temperature: 0.85 },
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      res.status(500).json({ error: 'Gemini error', detail: errText }); return;
    }

    const data = await r.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
      || "Couldn't get a response — try again.";
    res.status(200).json({ text });
  } catch (e) {
    res.status(500).json({ error: e.message || 'Fetch failed' });
  }
}
