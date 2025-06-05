export default class HomeOperations {
  static getInboxItems(): {
    id: number;
    title: string;
    country: string;
    urgent: boolean;
  }[] {
    return [
      { id: 1, title: 'New GDPR Amendment', country: 'EU-Wide', urgent: true },
      {
        id: 2,
        title: 'Digital Services Act Update',
        country: 'Germany',
        urgent: false,
      },
      { id: 3, title: 'AI Regulation Draft', country: 'France', urgent: true },
    ];
  }
}
