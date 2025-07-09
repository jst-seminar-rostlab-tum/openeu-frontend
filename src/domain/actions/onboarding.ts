'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import type { ProfileData } from '@/domain/entities/profile/ProfileData';
import {
  completionSchema,
  createProfileSchema,
  type EntrepreneurCompleteData,
  entrepreneurRoleSchema,
  focusAreaSchema,
  pathDecisionSchema,
  type PoliticianCompleteData,
  politicianRoleSchema,
  validateStep,
} from '@/domain/schemas/OnboardingForm';
import { createClient } from '@/lib/supabase/server';

export async function updatePathDecision(
  formData: FormData,
): Promise<ActionResult<z.infer<typeof pathDecisionSchema>>> {
  try {
    const rawData = {
      userCategory: formData.get('userCategory') as string,
    };

    const validationResult = pathDecisionSchema.safeParse(rawData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.issues.reduce(
        (acc: Record<string, string>, issue: z.ZodIssue) => {
          const field = issue.path.join('.');
          acc[field] = issue.message;
          return acc;
        },
        {} as Record<string, string>,
      );

      return {
        success: false,
        fieldErrors,
        error: 'Please fix the validation errors',
      };
    }

    // This would typically update the context or database
    // For now, we just validate and return success
    return {
      success: true,
      data: validationResult.data,
    };
  } catch (_error) {
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

// Step 3: Update role details
export async function updateRoleDetails(
  formData: FormData,
): Promise<
  ActionResult<
    | z.infer<typeof entrepreneurRoleSchema>
    | z.infer<typeof politicianRoleSchema>
  >
> {
  try {
    const userCategory = formData.get('userCategory') as
      | 'entrepreneur'
      | 'politician';

    if (userCategory === 'entrepreneur') {
      const rawData = {
        userType: formData.getAll('userType') as string[],
        companyStage: formData.get('companyStage') as string,
        companySize: formData.get('companySize') as string,
        primaryIndustry: formData.get('primaryIndustry') as string,
        businessModel: formData.get('businessModel') as string,
        regulatoryComplexity: formData.get('regulatoryComplexity') as string,
        companyDescription: formData.get('companyDescription') as string,
      };

      const validationResult = entrepreneurRoleSchema.safeParse(rawData);
      if (!validationResult.success) {
        const fieldErrors = validationResult.error.issues.reduce(
          (acc: Record<string, string>, issue: z.ZodIssue) => {
            const field = issue.path.join('.');
            acc[field] = issue.message;
            return acc;
          },
          {} as Record<string, string>,
        );

        return {
          success: false,
          fieldErrors,
          error: 'Please fix the validation errors',
        };
      }

      return {
        success: true,
        data: validationResult.data,
      };
    } else {
      const rawData = {
        politicalRole: formData.get('politicalRole') as string,
        institution: formData.get('institution') as string,
        politicalParty: formData.get('politicalParty') as string,
        areaOfExpertise: formData.getAll('areaOfExpertise') as string[],
        companyDescription: formData.get('companyDescription') as string,
      };

      const validationResult = politicianRoleSchema.safeParse(rawData);
      if (!validationResult.success) {
        const fieldErrors = validationResult.error.issues.reduce(
          (acc: Record<string, string>, issue: z.ZodIssue) => {
            const field = issue.path.join('.');
            acc[field] = issue.message;
            return acc;
          },
          {} as Record<string, string>,
        );

        return {
          success: false,
          fieldErrors,
          error: 'Please fix the validation errors',
        };
      }

      return {
        success: true,
        data: validationResult.data,
      };
    }
  } catch (_error) {
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

// Step 4: Update focus area
export async function updateFocusArea(
  formData: FormData,
): Promise<ActionResult<z.infer<typeof focusAreaSchema>>> {
  try {
    const rawData = {
      topicList: formData.getAll('topicList') as string[],
      geographicFocus: formData.getAll('geographicFocus') as string[],
      keyRegulatoryAreas: formData.getAll('keyRegulatoryAreas') as string[],
    };

    const validationResult = focusAreaSchema.safeParse(rawData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.issues.reduce(
        (acc: Record<string, string>, issue: z.ZodIssue) => {
          const field = issue.path.join('.');
          acc[field] = issue.message;
          return acc;
        },
        {} as Record<string, string>,
      );

      return {
        success: false,
        fieldErrors,
        error: 'Please fix the validation errors',
      };
    }

    return {
      success: true,
      data: validationResult.data,
    };
  } catch (_error) {
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

// Step 5: Update completion preferences
export async function updateCompletionPreferences(
  formData: FormData,
): Promise<ActionResult<z.infer<typeof completionSchema>>> {
  try {
    const rawData = {
      newsletterFrequency: formData.get('newsletterFrequency') as string,
    };

    const validationResult = completionSchema.safeParse(rawData);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.issues.reduce(
        (acc: Record<string, string>, issue: z.ZodIssue) => {
          const field = issue.path.join('.');
          acc[field] = issue.message;
          return acc;
        },
        {} as Record<string, string>,
      );

      return {
        success: false,
        fieldErrors,
        error: 'Please fix the validation errors',
      };
    }

    return {
      success: true,
      data: validationResult.data,
    };
  } catch (_error) {
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
}

// Action result types
export type ActionResult<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string>;
};

// Update profile data during onboarding
export async function updateOnboardingProfile(
  profileData: Partial<ProfileData>,
): Promise<ActionResult<ProfileData>> {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    // Convert ProfileData to database format
    const dbData = {
      name: profileData.name,
      surname: profileData.surname,
      email: profileData.email,
      company_description: profileData.companyDescription,
      topic_list: profileData.topicList,
      newsletter_frequency: profileData.newsletterFrequency,
      user_category: profileData.userCategory,
      user_type: profileData.userType,
      political_role: profileData.politicalRole,
      institution: profileData.institution,
      political_party: profileData.politicalParty,
      area_of_expertise: profileData.areaOfExpertise,
      company_stage: profileData.companyStage,
      company_size: profileData.companySize,
      primary_industry: profileData.primaryIndustry,
      geographic_focus: profileData.geographicFocus,
      business_model: profileData.businessModel,
      regulatory_complexity: profileData.regulatoryComplexity,
      key_regulatory_areas: profileData.keyRegulatoryAreas,
      onboarding_completed: profileData.onboardingCompleted,
      updated_at: new Date().toISOString(),
    };

    // Remove undefined values
    const cleanedData = Object.fromEntries(
      Object.entries(dbData).filter(([_, value]) => value !== undefined),
    );

    const { data, error } = await supabase
      .from('profiles')
      .update(cleanedData)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      return {
        success: false,
        error: 'Failed to update profile',
      };
    }

    // Convert back to ProfileData format
    const updatedProfile: ProfileData = {
      id: data.id,
      name: data.name,
      surname: data.surname,
      email: data.email,
      companyDescription: data.company_description || '',
      topicList: data.topic_list || [],
      newsletterFrequency: data.newsletter_frequency || 'weekly',
      userCategory: data.user_category,
      userType: data.user_type,
      politicalRole: data.political_role,
      institution: data.institution,
      politicalParty: data.political_party,
      areaOfExpertise: data.area_of_expertise,
      companyStage: data.company_stage,
      companySize: data.company_size,
      primaryIndustry: data.primary_industry || '',
      geographicFocus: data.geographic_focus || [],
      businessModel: data.business_model,
      regulatoryComplexity: data.regulatory_complexity,
      keyRegulatoryAreas: data.key_regulatory_areas || [],
      onboardingCompleted: data.onboarding_completed || false,
    };

    return {
      success: true,
      data: updatedProfile,
    };
  } catch (_error) {
    return {
      success: false,
      error: 'An unexpected error occurred while updating profile',
    };
  }
}

// Complete onboarding process
export async function completeOnboarding(
  profileData: EntrepreneurCompleteData | PoliticianCompleteData,
): Promise<ActionResult<ProfileData>> {
  try {
    const supabase = await createClient();

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    // Validate complete profile data
    const schema = createProfileSchema(profileData.userCategory);
    const validationResult = schema.safeParse(profileData);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.issues.reduce(
        (acc: Record<string, string>, issue: z.ZodIssue) => {
          const field = issue.path.join('.');
          acc[field] = issue.message;
          return acc;
        },
        {} as Record<string, string>,
      );

      return {
        success: false,
        fieldErrors,
        error: 'Please complete all required fields',
      };
    }

    // Mark onboarding as completed
    const completedData = {
      ...validationResult.data,
      onboardingCompleted: true,
    };

    // Update profile with completed data
    const updateResult = await updateOnboardingProfile(completedData);

    if (!updateResult.success) {
      return updateResult;
    }

    // Revalidate relevant pages
    revalidatePath('/onboarding');
    revalidatePath('/dashboard');

    return {
      success: true,
      data: updateResult.data!,
    };
  } catch (_error) {
    return {
      success: false,
      error: 'An unexpected error occurred while completing onboarding',
    };
  }
}

// Get current user profile
export async function getCurrentProfile(): Promise<
  ActionResult<ProfileData | null>
> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return {
        success: false,
        error: 'User not authenticated',
      };
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No profile found
        return {
          success: true,
          data: null,
        };
      }
      return {
        success: false,
        error: 'Failed to fetch profile',
      };
    }

    // Convert to ProfileData format
    const profile: ProfileData = {
      id: data.id,
      name: data.name || '',
      surname: data.surname || '',
      email: data.email || '',
      companyDescription: data.company_description || '',
      topicList: data.topic_list || [],
      newsletterFrequency: data.newsletter_frequency || 'weekly',
      userCategory: data.user_category,
      userType: data.user_type,
      politicalRole: data.political_role,
      institution: data.institution,
      politicalParty: data.political_party,
      areaOfExpertise: data.area_of_expertise,
      companyStage: data.company_stage,
      companySize: data.company_size,
      primaryIndustry: data.primary_industry || '',
      geographicFocus: data.geographic_focus || [],
      businessModel: data.business_model,
      regulatoryComplexity: data.regulatory_complexity,
      keyRegulatoryAreas: data.key_regulatory_areas || [],
      onboardingCompleted: data.onboarding_completed || false,
    };

    return {
      success: true,
      data: profile,
    };
  } catch (_error) {
    return {
      success: false,
      error: 'An unexpected error occurred while fetching profile',
    };
  }
}

// Validate step data
export async function validateOnboardingStep(
  step: number,
  data: unknown,
  userCategory?: 'entrepreneur' | 'politician',
): Promise<ActionResult<{ isValid: boolean; errors: Record<string, string> }>> {
  try {
    const result = validateStep(step, data, userCategory);

    if (result.success) {
      return {
        success: true,
        data: { isValid: true, errors: {} },
      };
    }

    const errors = result.error.issues.reduce(
      (acc: Record<string, string>, issue: z.ZodIssue) => {
        const field = issue.path.join('.');
        acc[field] = issue.message;
        return acc;
      },
      {} as Record<string, string>,
    );

    return {
      success: true,
      data: { isValid: false, errors },
    };
  } catch (_error) {
    return {
      success: false,
      error: 'Failed to validate step data',
    };
  }
}

// Sign out user
export async function signOut(): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    revalidatePath('/', 'layout');
    redirect('/login');
  } catch (_error) {
    return {
      success: false,
      error: 'An unexpected error occurred during sign out',
    };
  }
}
