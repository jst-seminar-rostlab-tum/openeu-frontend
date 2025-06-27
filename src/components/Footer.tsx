import Link from 'next/link';

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
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-gray-800 dark:text-white"
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center text-sm/6 text-gray-600 dark:text-white md:order-1 md:mt-0">
          &copy; {new Date().getFullYear()} Center for Software Engineering
          Excellence gGmbH. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
