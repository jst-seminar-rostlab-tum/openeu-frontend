const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/suggestions`;
interface Suggestion {
  title: string;
}
export const suggestionRepository = {
  async getSuggestions(query: string): Promise<string[]> {
    if (!query || query.length < 2) return [];

    try {
      const res = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Failed to fetch suggestions');
      const response = await res.json();
      return Array.isArray(response.data)
        ? response.data.map((s: Suggestion) => s.title)
        : [];
    } catch (err) {
      console.error('Error in getSuggestions:', err);
      return [];
    }
  },
};
