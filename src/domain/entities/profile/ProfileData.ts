export interface ProfileData {
  id: string;
  name: string;
  surname: string;
  companyName: string;
  companyDescription: string;
  topicList: string[];
  newsletterFrequency: 'daily' | 'weekly' | 'none';
}
