import { getCookie } from 'cookies-next';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/suggestions`;

interface Suggestion {
  title: string;
  similarity: number;
}
export const suggestionRepository = {
  async getSuggestions(
    query: string,
    signOut: () => Promise<void>,
  ): Promise<string[]> {
    if (!query || query.length < 2) return [];
    const token = getCookie('token');

    try {
      const res = await fetch(`${API_URL}?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 401) {
        await signOut();
        throw new Error('Unauthorized: Logging out user');
      }

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
