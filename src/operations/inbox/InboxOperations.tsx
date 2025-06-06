import { InboxItem } from '@/domain/entities/inbox-item/inbox-item';
// Sample data for notifications with simplified structure
export default class InboxOperations {
  static getInboxItems(): InboxItem[] {
    return [
      {
        id: '1',
        title: 'Digital Markets Act Amendment',
        date: 'May 14, 2025',
        country: 'EU-wide',
        relevanceScore: 95,
      },
      {
        id: '2',
        title: 'Data Privacy Framework Update',
        date: 'May 12, 2025',
        country: 'EU-wide',
        relevanceScore: 88,
      },
      {
        id: '3',
        title: 'Green Energy Transition Directive',
        date: 'May 10, 2025',
        country: 'EU-wide',
        relevanceScore: 82,
      },
      {
        id: '4',
        title: 'Financial Services Reporting Standards',
        date: 'May 8, 2025',
        country: 'EU-wide',
        relevanceScore: 79,
      },
      {
        id: '5',
        title: 'German AI Ethics Framework',
        date: 'May 7, 2025',
        country: 'Germany',
        relevanceScore: 76,
      },
      {
        id: '6',
        title: 'French Digital Services Tax Revision',
        date: 'May 5, 2025',
        country: 'France',
        relevanceScore: 74,
      },
      {
        id: '7',
        title: 'EU Cybersecurity Certification Scheme',
        date: 'May 3, 2025',
        country: 'EU-wide',
        relevanceScore: 71,
      },
      {
        id: '8',
        title: 'Spanish Renewable Energy Incentives',
        date: 'May 1, 2025',
        country: 'Spain',
        relevanceScore: 68,
      },
      {
        id: '9',
        title: 'Italian Data Localization Requirements',
        date: 'April 28, 2025',
        country: 'Italy',
        relevanceScore: 65,
      },
      {
        id: '10',
        title: 'EU Artificial Intelligence Act Implementation',
        date: 'April 25, 2025',
        country: 'EU-wide',
        relevanceScore: 92,
      },
      {
        id: '11',
        title: 'Swedish Environmental Reporting Standards',
        date: 'April 22, 2025',
        country: 'Sweden',
        relevanceScore: 61,
      },
      {
        id: '12',
        title: 'Dutch Digital Identity Framework',
        date: 'April 20, 2025',
        country: 'Netherlands',
        relevanceScore: 58,
      },
    ];
  }
}
