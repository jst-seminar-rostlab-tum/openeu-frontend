import { SidebarGroupData } from '@/domain/entities/chat/Sidebar';
import { Search, SquarePen } from 'lucide-react';

export default class ChatSidebarOperations {
  static getSidebarGroups(): SidebarGroupData[] {
    return [
      {
        label: 'Actions',
        items: [
          {
            icon: SquarePen,
            title: 'New Chat',
            onClick: () => {},
          },
          {
            icon: Search,
            title: 'Search through all existing chat histories and templates',
            onClick: () => {},
          },
        ],
      },
      {
        label: 'Templates',
        items: [
          {
            title:
              'Comprehensive EU Legislation Analysis and Impact Assessment Framework',
            onClick: () => {},
          },
          {
            title:
              'Policy Impact Assessment with Cross-Border Considerations and Stakeholder Analysis',
            onClick: () => {},
          },
          {
            title: 'Member State Comparison',
            onClick: () => {},
          },
          {
            title:
              'Complete Guide to EU Funding Mechanisms and Grant Application Procedures 2024-2027',
            onClick: () => {},
          },
          {
            title: 'Regulatory Compliance',
            onClick: () => {},
          },
          {
            title:
              'European Green Deal Implementation Projects and Environmental Impact Studies',
            onClick: () => {},
          },
        ],
      },
      {
        label: 'Chats',
        items: [
          {
            title:
              'Common Agricultural Policy Reform Analysis 2024: Implementation and Member State Impact Assessment',
            onClick: () => {},
          },
          {
            title:
              'Digital Markets Act Impact Analysis on Tech Companies and Consumer Protection Measures',
            onClick: () => {},
          },
          {
            title:
              'Horizon Europe Grants and Research Innovation Framework 2024-2027',
            onClick: () => {},
          },
          {
            title:
              'GDPR Compliance Assessment and Cross-Border Data Transfer Regulations Review',
            onClick: () => {},
          },
          {
            title:
              'EU Artificial Intelligence Act: Implementation Guidelines and Industry Standards',
            onClick: () => {},
          },
          {
            title:
              'European Climate Law and National Energy Transition Plans Analysis',
            onClick: () => {},
          },
          {
            title:
              'NextGenerationEU Recovery Fund Distribution and Project Monitoring',
            onClick: () => {},
          },
          {
            title:
              'Single Market Emergency Instrument: Supply Chain Resilience Assessment',
            onClick: () => {},
          },
          {
            title:
              'EU-UK Trade and Cooperation Agreement: Northern Ireland Protocol Updates',
            onClick: () => {},
          },
          {
            title:
              'European Chips Act: Semiconductor Industry Development Strategy',
            onClick: () => {},
          },
          {
            title:
              'Corporate Sustainability Reporting Directive Implementation Timeline',
            onClick: () => {},
          },
          {
            title:
              'EU Taxonomy for Sustainable Activities: Financial Sector Guidelines',
            onClick: () => {},
          },
        ],
      },
    ];
  }
}
