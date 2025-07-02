import Link from 'next/link';

import { Button } from '@/components/ui/button';

const navigation = [
  {
    name: 'Privacy Policy',
    href: '/privacy',
  },
];

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center gap-x-6 md:order-2">
          {navigation.map((item) => (
            <Button asChild variant="link" key={item.name}>
              <Link href={item.href} className="underline">
                <span>{item.name}</span>
              </Link>
            </Button>
          ))}
        </div>
        <p className="mt-8 text-center text-sm/6 text-gray-600 dark:text-white md:order-1 md:mt-0">
          &copy; {new Date().getFullYear()} Center for Software Engineering
          Excellence GmbH. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
