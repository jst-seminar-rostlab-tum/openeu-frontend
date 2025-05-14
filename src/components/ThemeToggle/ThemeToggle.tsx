'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { IoMoonSharp, IoSunnySharp } from 'react-icons/io5';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before rendering (to avoid hydration issues)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
    >
      {theme === 'dark' ? (
        <IoSunnySharp className="text-yellow-400 text-3xl" />
      ) : (
        <IoMoonSharp className="text-blue-500 text-3xl" />
      )}
    </button>
  );
}
