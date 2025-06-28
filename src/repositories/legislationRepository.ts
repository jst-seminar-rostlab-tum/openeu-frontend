import { getCookie } from 'cookies-next';

export const legislationRepository = {
  async getLegislations() {
    const token = getCookie('token');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/legislations`,
        {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const parsedRes = await res.json();
      const data = Array.isArray(parsedRes.data) ? parsedRes.data : [];

      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  },
};
