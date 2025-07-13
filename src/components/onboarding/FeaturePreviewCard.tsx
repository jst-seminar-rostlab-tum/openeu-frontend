import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface FeaturePreviewCardProps {
  emoji: string;
  title: string;
  href: string;
  description: string;
  benefit: string;
}

export default function FeaturePreviewCard({
  emoji,
  title,
  href,
  description,
  benefit,
}: FeaturePreviewCardProps) {
  return (
    <div className="p-4 bg-muted/50 rounded-lg flex flex-col h-full gap-2">
      <h3 className="font-semibold flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-xs text-muted-foreground italic">{benefit}</p>
      <div className="flex justify-end">
        <Button asChild variant="ghost" size="sm">
          <Link href={href}>
            Explore now
            <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
