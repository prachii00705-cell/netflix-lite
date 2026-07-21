const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getMovieFromMood(mood) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Suggest only ONE movie title for this mood: "${mood}". Return only the movie title with no explanation.`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  return data.candidates[0].content.parts[0].text.trim();
}