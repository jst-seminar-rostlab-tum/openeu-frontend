import { RegisterForm } from '@/components/RegisterForm/RegisterForm';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:flex justify-center items-center">
        <div className="justify-center items-center flex flex-col">
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img
            src="/project-europe.jpg"
            alt="Image"
            className="object-fit dark:brightness-[0.2] dark:grayscale h-24 mb-20"
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
