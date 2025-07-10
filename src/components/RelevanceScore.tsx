import CircularProgress from '@/components/ui/circular-progress';
import { Progress } from '@/components/ui/progress';
import { Meeting } from '@/domain/entities/calendar/CalendarTypes';
import { COLOR_SCHEMES } from '@/lib/utils';

interface RelevanceScoreProps {
  meeting: Meeting;
  type: 'bar' | 'circle';
}

export function RelevanceScore({ meeting, type }: RelevanceScoreProps) {
  const isBar = type === 'bar';
  const relevanceScore = isBar
    ? Math.round(meeting.similarity! * 10000) / 100
    : Math.round(meeting.similarity! * 100);

  const strokeColors = COLOR_SCHEMES[meeting.color].stroke;

  if (isBar) {
    return (
      <div className="flex items-center gap-2">
        <Progress value={relevanceScore} />
        <p className="text-xs font-medium">{relevanceScore.toFixed(2)}%</p>
      </div>
    );
  } else {
    return (
      <CircularProgress
        value={relevanceScore}
        size={30}
        circleStrokeWidth={3}
        progressStrokeWidth={3}
        className={`${strokeColors} opacity-30`}
        progressClassName={strokeColors}
        showLabel={true}
        renderLabel={(progress) => progress}
        labelClassName="text-xs font-medium"
      />
    );
  }
}
