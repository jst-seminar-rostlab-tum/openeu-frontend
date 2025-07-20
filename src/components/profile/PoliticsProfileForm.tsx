import { zodResolver } from '@hookform/resolvers/zod';
import { User as UserIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LoadingSpinner from '@/components/LoadingSpinner';
import { PoliticalRoleForm } from '@/components/profile/forms/PoliticalRoleForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Politician,
  ProfileUpdate,
} from '@/domain/entities/profile/generated-types';
import { politicianRoleSchema } from '@/domain/schemas/profile';

export interface PoliticianFormProps {
  profileId: string;
  politician: Politician;
  updateProfile: (userId: string, data: ProfileUpdate) => void;
}

export default function PoliticianProfileForm({
  profileId,
  politician,
  updateProfile,
}: PoliticianFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof politicianRoleSchema>>({
    resolver: zodResolver(politicianRoleSchema),
    defaultValues: {
      politician: {
        role: politician.role,
        area_of_expertise: politician.area_of_expertise,
        further_information: politician.further_information,
        institution: politician.institution,
      },
    },
  });

  function onSubmit(values: z.infer<typeof politicianRoleSchema>) {
    setLoading(true);
    updateProfile(profileId, { ...values });
    setLoading(false);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex flex-row gap-2 align-text-center">
              <UserIcon />
              <h2 className="text-lg font-semibold">Political Role</h2>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PoliticalRoleForm form={form} />
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="w-full sm:w-[8rem]"
          disabled={loading}
          onClick={form.handleSubmit(onSubmit)}
        >
          {loading ? <LoadingSpinner /> : 'Save changes'}
        </Button>
      </div>
    </>
  );
}
