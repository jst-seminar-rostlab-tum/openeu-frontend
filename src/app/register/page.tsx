import Image from 'next/image';

import { RegisterForm } from '@/components/auth/RegisterForm';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:flex justify-center items-center">
        <div className="justify-center items-center flex flex-col">
          <Image
            src="/project-europe.png"
            alt="Project Europe"
            className="object-fit dark:brightness-[0.2] dark:grayscale mb-20 dark:invert"
            width={500}
            height={280}
          />
          <p className="font-light text-lg">
            Create your free account and never miss an eu legal agreement
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-muted">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
