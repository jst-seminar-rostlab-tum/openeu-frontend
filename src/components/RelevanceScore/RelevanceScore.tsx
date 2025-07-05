import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { extractColorName, getStrokeColorClasses } from '@/lib/utils';

interface RelevanceScoreProps {
  meeting: Meeting;
  type: 'bar' | 'circle';
  textClassName?: string;
}

export function RelevanceScore({
  meeting,
  type,
  textClassName = 'text-white',
}: RelevanceScoreProps) {
  const isBar = type === 'bar';
  const relevanceScore = isBar
    ? Math.round(meeting.similarity! * 10000) / 100
    : Math.round(meeting.similarity! * 100);

  const colorName = extractColorName(meeting.color);
  const strokeColors = getStrokeColorClasses(colorName);

  if (isBar) {
    return (
      <div
        className="flex w-full h-4 bg-gray-200 rounded-full overflow-hidden outline-1 outline-solid dark:bg-neutral-700 py-auto"
        role="progressbar"
      >
        <div
          className={`flex flex-col justify-center rounded-full overflow-hidden outline-1 outline-solid bg-accent-foreground ${textClassName} text-[0.75em] text-center align-middle whitespace-nowrap transition duration-500 h-4 dark:bg-white dark:text-black`}
          style={{ width: `${relevanceScore}%` }}
        >
          {relevanceScore.toFixed(2)}%
        </div>
      </div>
    );
  } else {
    return (
      <div className="relative">
        <svg
          className="size-full -rotate-90"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="18"
            cy="18"
            r="12"
            fill="none"
            className={`${strokeColors.light} dark:${strokeColors.dark}`}
            opacity={0.3}
            strokeWidth="2"
          ></circle>
          <circle
            cx="18"
            cy="18"
            r="12"
            fill="none"
            className={`${strokeColors.light} dark:${strokeColors.dark}`}
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={relevanceScore}
            strokeLinecap="round"
          ></circle>
        </svg>
        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <span className={`text-center text-[0.75em] ${textClassName}`}>
            {relevanceScore}
          </span>
        </div>
      </div>
    );
  }
}
