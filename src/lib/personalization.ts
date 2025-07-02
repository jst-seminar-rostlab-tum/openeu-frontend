import { ProfileData } from '@/domain/entities/profile/ProfileData';

export interface PersonalizationInsights {
  relevantTopics: string[];
  industryFocus: string[];
  regulatoryPriorities: string[];
  geographicRelevance: string[];
  complexityLevel: 'low' | 'medium' | 'high';
  businessContext: {
    stage: string;
    size: string;
    model: string;
  };
}

interface ContentItem {
  tags?: string[];
  category?: string;
  countries?: string[];
  region?: string;
  regulatoryAreas?: string[];
  relevantStages?: string[];
}

export class PersonalizationService {
  static generateInsights(
    profile: Partial<ProfileData>,
  ): PersonalizationInsights {
    return {
      relevantTopics: profile.topicList || [],
      industryFocus: profile.primaryIndustry ? [profile.primaryIndustry] : [],
      regulatoryPriorities: profile.keyRegulatoryAreas || [],
      geographicRelevance: profile.geographicFocus || [],
      complexityLevel: profile.regulatoryComplexity || 'medium',
      businessContext: {
        stage: profile.companyStage || 'unknown',
        size: profile.companySize || 'unknown',
        model: profile.businessModel || 'unknown',
      },
    };
  }

  static filterContentByRelevance(
    content: ContentItem[],
    insights: PersonalizationInsights,
    contentField: 'industry' | 'geography' | 'regulatory' | 'stage',
  ): ContentItem[] {
    switch (contentField) {
      case 'industry':
        return content.filter((item) =>
          insights.industryFocus.some(
            (industry) =>
              item.tags?.includes(industry) ||
              item.category?.includes(industry),
          ),
        );
      case 'geography':
        return content.filter((item) =>
          insights.geographicRelevance.some(
            (country) =>
              item.countries?.includes(country) ||
              item.region?.includes(country),
          ),
        );
      case 'regulatory':
        return content.filter((item) =>
          insights.regulatoryPriorities.some(
            (area) =>
              item.regulatoryAreas?.includes(area) || item.tags?.includes(area),
          ),
        );
      case 'stage':
        return content.filter(
          (item) =>
            item.relevantStages?.includes(insights.businessContext.stage) ||
            !item.relevantStages, // Include if no stage restriction
        );
      default:
        return content;
    }
  }

  static generatePersonalizedPrompt(
    query: string,
    insights: PersonalizationInsights,
  ): string {
    const context = [];

    if (insights.industryFocus.length > 0) {
      context.push(`Industry focus: ${insights.industryFocus.join(', ')}`);
    }

    if (insights.geographicRelevance.length > 0) {
      context.push(
        `Geographic focus: ${insights.geographicRelevance.join(', ')}`,
      );
    }

    if (insights.businessContext.stage !== 'unknown') {
      context.push(`Company stage: ${insights.businessContext.stage}`);
    }

    if (insights.businessContext.model !== 'unknown') {
      context.push(`Business model: ${insights.businessContext.model}`);
    }

    if (insights.regulatoryPriorities.length > 0) {
      context.push(
        `Key regulatory areas: ${insights.regulatoryPriorities.slice(0, 3).join(', ')}`,
      );
    }

    const contextString =
      context.length > 0
        ? `\n\nContext about my business: ${context.join('; ')}`
        : '';

    return `${query}${contextString}\n\nPlease provide insights relevant to my business context and regulatory complexity level (${insights.complexityLevel}).`;
  }

  static getRecommendedSections(insights: PersonalizationInsights): string[] {
    const recommendations = [];

    // Always recommend based on regulatory complexity
    if (insights.complexityLevel === 'high') {
      recommendations.push('Compliance Updates', 'Risk Assessment');
    } else if (insights.complexityLevel === 'medium') {
      recommendations.push('Key Updates', 'Business Impact');
    } else {
      recommendations.push('Essential Updates');
    }

    // Add industry-specific recommendations
    if (insights.industryFocus.includes('FinTech')) {
      recommendations.push('Financial Regulations', 'Payment Services');
    }
    if (insights.industryFocus.includes('HealthTech')) {
      recommendations.push('Medical Device Regulations', 'Data Protection');
    }
    if (insights.industryFocus.includes('AI/ML')) {
      recommendations.push('AI Regulation', 'Ethics Guidelines');
    }

    // Add stage-specific recommendations
    if (
      insights.businessContext.stage === 'idea' ||
      insights.businessContext.stage === 'pre_seed'
    ) {
      recommendations.push('Startup Compliance', 'Minimum Viable Compliance');
    }
    if (
      insights.businessContext.stage === 'growth' ||
      insights.businessContext.stage === 'established'
    ) {
      recommendations.push('Scale Compliance', 'International Expansion');
    }

    return [...new Set(recommendations)]; // Remove duplicates
  }
}
