export const eventColorVariants = {
  // Colored variants
  blue: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300',
  green:
    'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
  red: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
  yellow:
    'border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300',
  purple:
    'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300',
  orange:
    'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300',

  // Dot variants
  'blue-dot': 'bg-bg-secondary text-t-primary [&_svg]:fill-blue-600',
  'green-dot': 'bg-bg-secondary text-t-primary [&_svg]:fill-green-600',
  'red-dot': 'bg-bg-secondary text-t-primary [&_svg]:fill-red-600',
  'orange-dot': 'bg-bg-secondary text-t-primary [&_svg]:fill-orange-600',
  'purple-dot': 'bg-bg-secondary text-t-primary [&_svg]:fill-purple-600',
  'yellow-dot': 'bg-bg-secondary text-t-primary [&_svg]:fill-yellow-600',
} as const;
