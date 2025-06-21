import {
  Committee,
  Legislation,
  LegislationStatus,
  StatusConfig,
} from '@/domain/entities/monitor/types';

export default class MonitorOperations {
  static getLegislationData(): Legislation[] {
    return [
      // Commission Proposal (just submitted)
      {
        id: '2025/0826(COD)',
        title:
          'Amending Regulation (EU) 2017/2402 for securitisation and creating a specific framework for simple, transparent and standardised securitisation',
        rapporteurs: [],
        year: 2025,
        status: 'commission-proposal',
        procedureType: 'COD',
        submissionDate: new Date('2025-01-15'),
        lastUpdate: new Date('2025-01-15'),
        stage: 'Commission proposal submitted',
      },
      {
        id: '2025/0825(COD)',
        title:
          'Prudential requirements for credit institutions as regards requirements for securitisation exposures',
        rapporteurs: [],
        year: 2025,
        status: 'commission-proposal',
        procedureType: 'COD',
        submissionDate: new Date('2025-01-15'),
        lastUpdate: new Date('2025-01-15'),
        stage: 'Commission proposal submitted',
      },
      {
        id: '2025/0180(COD)',
        title:
          'Phasing out Russian natural gas imports, improving monitoring of potential energy dependencies',
        rapporteurs: [],
        year: 2025,
        status: 'committee-review',
        procedureType: 'COD',
        submissionDate: new Date('2025-01-10'),
        lastUpdate: new Date('2025-01-10'),
      },

      // Committee Review (committee assigned, work in progress)
      {
        id: '2025/0129(COD)',
        title:
          'Amending Regulation as regards obligations of economic operators concerning battery due diligence policies',
        committee: 'Environment, Climate and Food Safety',
        rapporteurs: [{ name: 'DECARO Antonio', group: 'S&D' }],
        year: 2025,
        status: 'committee-review',
        procedureType: 'COD',
        submissionDate: new Date('2025-01-08'),
        lastUpdate: new Date('2025-01-14'),
        stage: 'Committee responsible working on proposal',
      },
      {
        id: '2025/0236(COD)',
        title:
          'Amending certain CAP Regulations as regards the conditionality system, types of intervention in the form of direct payment, types of intervention in certain sectors and rural development',
        committee: 'Agriculture and Rural Development',
        rapporteurs: [{ name: 'RODRIGUES André', group: 'S&D' }],
        year: 2025,
        status: 'committee-review',
        procedureType: 'COD',
        submissionDate: new Date('2025-01-05'),
        lastUpdate: new Date('2025-01-14'),
        stage: 'Committee responsible working on proposal',
      },
      {
        id: '2025/0103(COD)',
        title:
          'Incentivising defence-related investments in the EU budget to implement the ReArm Europe Plan',
        committee: 'Industry, Research and Energy',
        rapporteurs: [{ name: 'KOLS Rihards', group: 'ECR' }],
        year: 2025,
        status: 'committee-review',
        procedureType: 'COD',
        submissionDate: new Date('2025-01-03'),
        lastUpdate: new Date('2025-01-10'),
        stage: 'Committee responsible working on proposal',
      },

      // Parliament First Reading
      {
        id: '2024/0312(COD)',
        title:
          'Establishing a framework for cross-border payments in the Union',
        committee: 'Economic and Monetary Affairs',
        rapporteurs: [
          { name: 'FERNÁNDEZ Jonás', group: 'S&D' },
          { name: 'VALENCIA López', group: 'EPP' },
        ],
        year: 2024,
        status: 'parliament-first-reading',
        procedureType: 'COD',
        submissionDate: new Date('2024-08-15'),
        lastUpdate: new Date('2024-12-20'),
        stage: 'Parliament position at first reading adopted',
      },
      {
        id: '2024/0298(COD)',
        title:
          'Digital Services Act: transparency and accountability measures for online platforms',
        committee: 'Internal Market and Consumer Protection',
        rapporteurs: [{ name: 'SCHWAB Andreas', group: 'EPP' }],
        year: 2024,
        status: 'parliament-first-reading',
        procedureType: 'COD',
        submissionDate: new Date('2024-07-22'),
        lastUpdate: new Date('2024-12-18'),
        stage: 'Parliament position at first reading adopted',
      },

      // Council First Reading
      {
        id: '2024/0156(COD)',
        title: 'European Health Data Space: secondary use of health data',
        committee: 'Environment, Climate and Food Safety',
        rapporteurs: [{ name: 'MAIJ Marit', group: 'S&D' }],
        year: 2024,
        status: 'council-first-reading',
        procedureType: 'COD',
        submissionDate: new Date('2024-05-10'),
        lastUpdate: new Date('2024-11-28'),
        stage: 'Council examining Parliament position',
      },
      {
        id: '2024/0134(COD)',
        title:
          'Amending Directive 2008/98/EC on waste as regards food waste reduction',
        committee: 'Environment, Climate and Food Safety',
        rapporteurs: [{ name: 'CUFFE Ciarán', group: 'Greens/EFA' }],
        year: 2024,
        status: 'council-first-reading',
        procedureType: 'COD',
        submissionDate: new Date('2024-04-15'),
        lastUpdate: new Date('2024-11-15'),
        stage: 'Council examining Parliament position',
      },

      // Parliament Second Reading
      {
        id: '2023/0425(COD)',
        title: 'Corporate Sustainability Due Diligence Directive',
        committee: 'Legal Affairs',
        rapporteurs: [{ name: 'YENBOU Lara', group: 'Renew' }],
        year: 2023,
        status: 'parliament-second-reading',
        procedureType: 'COD',
        submissionDate: new Date('2023-11-20'),
        lastUpdate: new Date('2024-10-30'),
        stage: 'Parliament second reading in progress',
      },

      // Signed
      {
        id: '2024/0028(COD)',
        title:
          'Temporary trade-liberalisation measures supplementing trade concessions applicable to Ukrainian products',
        committee: 'International Trade',
        rapporteurs: [{ name: 'KARLSBRO Karin', group: 'Renew' }],
        year: 2024,
        status: 'signed',
        procedureType: 'COD',
        submissionDate: new Date('2024-01-15'),
        lastUpdate: new Date('2024-05-31'),
        stage:
          'Signature by the President of the EP and by the President of the Council',
      },

      // Published (completed)
      {
        id: '2022/0272(COD)',
        title:
          'Cybersecurity requirements for products with digital elements (Cyber Resilience Act)',
        committee: 'Internal Market and Consumer Protection',
        rapporteurs: [{ name: 'LØKKEGAARD Morten', group: 'Renew' }],
        year: 2022,
        status: 'published',
        procedureType: 'COD',
        submissionDate: new Date('2022-09-15'),
        lastUpdate: new Date('2024-11-20'),
        stage: 'Publication in the Official Journal',
      },
      {
        id: '2021/0340(COD)',
        title:
          'Amending Annexes IV and V to Regulation (EU) 2019/1021 on persistent organic pollutants',
        committee: 'Environment, Climate and Food Safety',
        rapporteurs: [{ name: 'HOJSÍK Martin', group: 'Renew' }],
        year: 2021,
        status: 'published',
        procedureType: 'COD',
        submissionDate: new Date('2021-10-28'),
        lastUpdate: new Date('2022-12-09'),
        stage: 'Publication in the Official Journal',
      },

      // Withdrawn
      {
        id: '2023/0287(COD)',
        title:
          'Sustainable and smart mobility strategy implementation measures',
        committee: 'Transport and Tourism',
        rapporteurs: [],
        year: 2023,
        status: 'withdrawn',
        procedureType: 'COD',
        submissionDate: new Date('2023-07-30'),
        lastUpdate: new Date('2024-05-15'),
        stage: 'Procedure withdrawn by Commission',
      },
    ];
  }

  static getStatusConfig(): StatusConfig {
    return {
      'commission-proposal': {
        name: 'Commission Proposal',
        color: '#94a3b8',
        description: 'Commission proposal submitted to Parliament and Council',
        symbol: '***I',
        order: 1,
      },
      'committee-review': {
        name: 'Committee Review',
        color: '#f59e0b',
        description:
          'Committee responsible assigned, rapporteur working on proposal',
        symbol: '***I',
        order: 2,
      },
      'parliament-first-reading': {
        name: 'Parliament First Reading',
        color: '#3b82f6',
        description: 'Parliament has adopted its position at first reading',
        symbol: 'EP1',
        order: 3,
      },
      'council-first-reading': {
        name: 'Council First Reading',
        color: '#8b5cf6',
        description:
          'Council examining Parliament position or adopting its own position',
        symbol: 'C1',
        order: 4,
      },
      'parliament-second-reading': {
        name: 'Parliament Second Reading',
        color: '#f97316',
        description: 'Parliament examining Council position at second reading',
        symbol: 'EP2',
        order: 5,
      },
      'council-second-reading': {
        name: 'Council Second Reading',
        color: '#ef4444',
        description:
          'Council examining Parliament amendments at second reading',
        symbol: 'C2',
        order: 6,
      },
      conciliation: {
        name: 'Conciliation',
        color: '#dc2626',
        description: 'Conciliation procedure between Parliament and Council',
        symbol: 'CON',
        order: 7,
      },
      adopted: {
        name: 'Adopted',
        color: '#22c55e',
        description: 'Legislative act adopted by both co-legislators',
        symbol: '✓',
        order: 8,
      },
      signed: {
        name: 'Signed',
        color: '#16a34a',
        description: 'Signed by Presidents of Parliament and Council',
        symbol: '✓S',
        order: 9,
      },
      published: {
        name: 'Published',
        color: '#15803d',
        description: 'Published in the Official Journal of the European Union',
        symbol: '✓P',
        order: 10,
      },
      withdrawn: {
        name: 'Withdrawn',
        color: '#6b7280',
        description: 'Procedure withdrawn by the Commission',
        symbol: 'W',
        order: 11,
      },
    };
  }

  static getStatusOrder(): LegislationStatus[] {
    return [
      'commission-proposal',
      'committee-review',
      'parliament-first-reading',
      'council-first-reading',
      'parliament-second-reading',
      'council-second-reading',
      'conciliation',
      'adopted',
      'signed',
      'published',
      'withdrawn',
    ];
  }

  static groupLegislationByStatus(
    data: Legislation[],
  ): Record<LegislationStatus, Legislation[]> {
    return data.reduce(
      (acc, item) => {
        (acc[item.status] ??= []).push(item);
        return acc;
      },
      {} as Record<LegislationStatus, Legislation[]>,
    );
  }

  static getUniqueCommittees(): Committee[] {
    const data = this.getLegislationData();
    const committees = new Set<string>();

    for (const item of data) {
      if (item.committee) {
        committees.add(item.committee);
      }
    }

    return Array.from(committees) as Committee[];
  }

  static getUniqueYears(): number[] {
    const data = this.getLegislationData();
    const years = new Set<number>();

    for (const item of data) {
      years.add(item.year);
    }

    return Array.from(years).sort((a, b) => b - a);
  }

  static getStatistics(): {
    total: number;
    byStatus: Record<LegislationStatus, number>;
    byCommittee: Record<string, number>;
  } {
    const data = this.getLegislationData();
    const byStatus: Record<LegislationStatus, number> = {} as Record<
      LegislationStatus,
      number
    >;
    const byCommittee: Record<string, number> = {};

    for (const item of data) {
      byStatus[item.status] = (byStatus[item.status] || 0) + 1;
      if (item.committee) {
        byCommittee[item.committee] = (byCommittee[item.committee] || 0) + 1;
      }
    }

    return {
      total: data.length,
      byStatus,
      byCommittee,
    };
  }

  static getLegislationById(id: string): Legislation | undefined {
    const data = this.getLegislationData();
    const map = new Map(data.map((item) => [item.id, item]));
    return map.get(id);
  }

  static getLegislationByStatus(status: LegislationStatus): Legislation[] {
    return this.getLegislationData().filter((item) => item.status === status);
  }

  static getStatusColumns(): Array<{ id: string; label: string }> {
    const statusConfig = this.getStatusConfig();
    return Object.entries(statusConfig).map(([id, config]) => ({
      id,
      label: config.name,
    }));
  }
}
