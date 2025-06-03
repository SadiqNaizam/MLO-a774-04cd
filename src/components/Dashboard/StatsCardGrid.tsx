import React from 'react';
import StatCard, { StatCardProps } from './StatCard';
import { Bell, DollarSign, Activity, Receipt, Heart } from 'lucide-react'; // Using DollarSign instead of BadgeDollarSign as it's more common

const statsData: StatCardProps[] = [
  {
    title: 'CAMPAIGN SENT',
    value: '197',
    icon: Bell,
    iconColorClassName: 'text-primary-foreground bg-primary',
  },
  {
    title: 'ANNUAL PROFIT',
    value: '$489.4k',
    icon: DollarSign,
    iconColorClassName: 'text-green-600 bg-green-100',
    change: { value: '+ $29.4k', type: 'increase' },
    statusDotColor: 'bg-green-500',
  },
  {
    title: 'LEAD CONVERSATION',
    value: '32.89%',
    icon: Activity,
    iconColorClassName: 'text-red-600 bg-red-100',
    change: { value: '- 3.4%', type: 'decrease' }, // Assuming the value is positive but change implies context
    statusDotColor: 'bg-red-500',
  },
  {
    title: 'DAILY AVERAGE INCOME',
    value: '$1,596.5',
    icon: Receipt,
    iconColorClassName: 'text-yellow-600 bg-yellow-100',
    change: { value: '+ $624.8', type: 'increase' },
    statusDotColor: 'bg-green-500',
  },
  {
    title: 'ANNUAL DEALS',
    value: '2,659',
    icon: Heart,
    iconColorClassName: 'text-blue-600 bg-blue-100',
    change: { value: '- 297', type: 'decrease' },
    statusDotColor: 'bg-red-500',
  },
];

const StatsCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {statsData.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconColorClassName={stat.iconColorClassName}
          change={stat.change}
          statusDotColor={stat.statusDotColor}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
