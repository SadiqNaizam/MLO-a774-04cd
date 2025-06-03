import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  iconColorClassName?: string;
  change?: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
  };
  statusDotColor?: 'bg-green-500' | 'bg-red-500' | 'bg-yellow-500' | 'bg-gray-400';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: IconComponent,
  iconColorClassName = 'text-muted-foreground',
  change,
  statusDotColor,
}) => {
  const TrendIcon = change?.type === 'increase' ? ArrowUp : change?.type === 'decrease' ? ArrowDown : null;
  const trendColor = change?.type === 'increase' ? 'text-green-600' : change?.type === 'decrease' ? 'text-red-600' : 'text-muted-foreground';

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {statusDotColor && (
            <div className={cn('w-2 h-2 rounded-full', statusDotColor)} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
            <div className='flex items-center'>
                <div className={cn("p-2 mr-3 rounded", iconColorClassName, !iconColorClassName.includes('bg-') && 'bg-muted')}>
                    <IconComponent className={cn("h-6 w-6", iconColorClassName.includes('text-') ? '' : 'text-primary')} />
                </div>
                <div>
                    <div className="text-2xl font-semibold text-foreground">{value}</div>
                    {change && (
                    <div className={cn("text-xs flex items-center", trendColor)}>
                        {TrendIcon && <TrendIcon className="h-3 w-3 mr-0.5" />}
                        <span>{change.value}</span>
                    </div>
                    )}
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
