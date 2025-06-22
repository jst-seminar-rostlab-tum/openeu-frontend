import { ProfileData } from '@/domain/entities/profile/ProfileData';
import { ToastOperations } from '@/operations/toast/toastOperations';
const API_URL = 'https://openeu-backend-1.onrender.com/profile';

export const profileRepository = {
  async createProfile(profileData: ProfileData): Promise<string> {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: profileData.id,
          name: profileData.name,
          surname: profileData.surname,
          company_name: profileData.companyName,
          company_description: profileData.companyDescription,
          topic_list: profileData.topicList,
          subscribed_newsletter: profileData.subscribedNewsletter,
        }),
      });
      if (!res.ok) {
        ToastOperations.showError({
          title: 'Error fetching proffile',
          message: `HTTP error! status: ${res.status}`,
        });
        throw new Error('Failed to create profile');
      }
      return 'success';
    } catch {
      return 'error';
    }
  },
};
