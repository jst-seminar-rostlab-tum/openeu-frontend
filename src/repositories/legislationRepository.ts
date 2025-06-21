export const legislationRepository = {
  async getLegislations() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/legislations`,
      );

      const parsedRes = await res.json();
      const data = Array.isArray(parsedRes.data) ? parsedRes.data : [];

      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },
};
