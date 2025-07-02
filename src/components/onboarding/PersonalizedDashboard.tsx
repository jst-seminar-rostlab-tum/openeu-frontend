'use client';

import { Calendar, Filter, MessageSquare, TrendingUp } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProfileData } from '@/domain/entities/profile/ProfileData';
import { PersonalizationService } from '@/lib/personalization';

interface PersonalizedDashboardProps {
  profile: Partial<ProfileData>;
}

export const PersonalizedDashboard: React.FC<PersonalizedDashboardProps> = ({
  profile,
}) => {
  const insights = PersonalizationService.generateInsights(profile);
  const recommendations =
    PersonalizationService.getRecommendedSections(insights);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">
            Welcome back, {profile.name}! 👋
          </CardTitle>
          <CardDescription className="text-base">
            Here&apos;s your personalized OpenEU experience for{' '}
            {profile.companyName}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Personalization Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Your Personalization Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Industry Focus</h4>
              <Badge variant="secondary">{profile.primaryIndustry}</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Business Model</h4>
              <Badge variant="secondary">{profile.businessModel}</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Company Stage</h4>
              <Badge variant="secondary">{profile.companyStage}</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Regulatory Complexity</h4>
              <Badge
                variant={
                  profile.regulatoryComplexity === 'high'
                    ? 'destructive'
                    : 'secondary'
                }
              >
                {profile.regulatoryComplexity}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-2">Geographic Focus</h4>
            <div className="flex flex-wrap gap-1">
              {profile.geographicFocus?.slice(0, 5).map((country) => (
                <Badge key={country} variant="outline" className="text-xs">
                  {country}
                </Badge>
              ))}
              {profile.geographicFocus &&
                profile.geographicFocus.length > 5 && (
                  <Badge variant="outline" className="text-xs">
                    +{profile.geographicFocus.length - 5} more
                  </Badge>
                )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Key Regulatory Areas</h4>
            <div className="flex flex-wrap gap-1">
              {profile.keyRegulatoryAreas?.slice(0, 4).map((area) => (
                <Badge key={area} variant="outline" className="text-xs">
                  {area}
                </Badge>
              ))}
              {profile.keyRegulatoryAreas &&
                profile.keyRegulatoryAreas.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{profile.keyRegulatoryAreas.length - 4} more
                  </Badge>
                )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Smart Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Smart Regulatory Feed
            </CardTitle>
            <CardDescription>
              Filtered updates relevant to your business
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">New AI Regulation Update</p>
                <p className="text-xs text-muted-foreground">
                  Relevant to: {profile.primaryIndustry} •{' '}
                  {profile.businessModel}
                </p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">GDPR Compliance Changes</p>
                <p className="text-xs text-muted-foreground">
                  Relevant to: {profile.geographicFocus?.[0]} • Data Protection
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View All Updates
            </Button>
          </CardContent>
        </Card>

        {/* Contextual Chat */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Contextual AI Assistant
            </CardTitle>
            <CardDescription>
              Chat responses tailored to your business context
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm">
                &quot;How does the new AI regulation affect my{' '}
                {profile.companyStage} stage {profile.primaryIndustry}{' '}
                company?&quot;
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Responses include context about your industry, stage, and
              regulatory complexity level.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Start Personalized Chat
            </Button>
          </CardContent>
        </Card>

        {/* Relevant Meetings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Relevant Meetings
            </CardTitle>
            <CardDescription>
              EU meetings that matter to your business
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">
                  Digital Services Committee
                </p>
                <p className="text-xs text-muted-foreground">
                  Discussing {profile.primaryIndustry} regulations
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Calendar
            </Button>
          </CardContent>
        </Card>

        {/* Recommended Sections */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended for You</CardTitle>
            <CardDescription>Based on your business profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recommendations.map((section) => (
                <div
                  key={section}
                  className="flex items-center justify-between p-2 rounded bg-muted"
                >
                  <span className="text-sm font-medium">{section}</span>
                  <Button variant="ghost" size="sm">
                    Explore
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
