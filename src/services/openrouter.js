const OPENROUTER_API_KEY =
  import.meta.env.VITE_OPENROUTER_API_KEY;

export async function getMovieFromMood(mood) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a movie recommendation assistant.",
          },
          {
            role: "user",
            content: `Suggest exactly ONE movie for this mood: "${mood}". Reply ONLY with the movie title.`,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error("OpenRouter request failed");
  }

  const data = await response.json();

  return data.choices[0].message.content.trim();
}