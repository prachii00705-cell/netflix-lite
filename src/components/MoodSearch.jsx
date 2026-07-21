import { useState } from "react";

function MoodSearch({ onMoodSearch }) {
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!mood.trim() || loading) return;

    setLoading(true);

    try {
      await onMoodSearch(mood);
      setMood("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="mood-search"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="😊 Describe your mood..."
        value={mood}
        onChange={(e) =>
          setMood(e.target.value)
        }
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Thinking..."
          : "AI Suggest"}
      </button>
    </form>
  );
}

export default MoodSearch;