import { zodResolver } from '@hookform/resolvers/zod';
import { User as UserIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import LoadingSpinner from '@/components/LoadingSpinner';
import { EntrepreneurRoleForm } from '@/components/profile/forms/EntrepreneurRoleForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Company,
  ProfileUpdate,
} from '@/domain/entities/profile/generated-types';
import { entrepreneurRoleSchema } from '@/domain/schemas/profile';

export interface EntrepreneurFormProps {
  profileId: string;
  company: Company;
  updateProfile: (userId: string, data: ProfileUpdate) => void;
}

export default function EntrepreneurProfileForm({
  profileId,
  company,
  updateProfile,
}: EntrepreneurFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof entrepreneurRoleSchema>>({
    resolver: zodResolver(entrepreneurRoleSchema),
    defaultValues: {
      company: {
        name: company.name,
        company_size: company.company_size,
        company_stage: company.company_stage,
        description: company.description ?? '',
        role: company.role,
        industry: company.industry,
      },
    },
  });

  function onSubmit(values: z.infer<typeof entrepreneurRoleSchema>) {
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
              <h2 className="text-lg font-semibold">Business Information</h2>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EntrepreneurRoleForm form={form} />
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
