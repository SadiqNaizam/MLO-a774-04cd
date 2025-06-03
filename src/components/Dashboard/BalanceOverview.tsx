import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const balanceData = [
  { month: 'Jan', revenue: 20000, expenses: 15000 },
  { month: 'Feb', revenue: 25000, expenses: 18000 },
  { month: 'Mar', revenue: 40000, expenses: 22000 },
  { month: 'Apr', revenue: 30000, expenses: 25000 },
  { month: 'May', revenue: 50000, expenses: 30000 },
  { month: 'Jun', revenue: 45000, expenses: 32000 },
  { month: 'Jul', revenue: 60000, expenses: 35000 },
  { month: 'Aug', revenue: 55000, expenses: 40000 },
  { month: 'Sep', revenue: 75000, expenses: 42000 },
  { month: 'Oct', revenue: 80000, expenses: 48000 },
  { month: 'Nov', revenue: 90000, expenses: 55000 },
  { month: 'Dec', revenue: 85000, expenses: 60000 },
];

const totalRevenue = balanceData.reduce((sum, item) => sum + item.revenue, 0);
const totalExpenses = balanceData.reduce((sum, item) => sum + item.expenses, 0);
const profitRatio = totalExpenses > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : 100;

const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}k`;

const BalanceOverview: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Balance Overview</CardTitle>
          <div className="mt-2 flex items-center space-x-6 text-sm">
            <div className="flex items-center">
                <span className="font-semibold text-lg text-primary mr-1.5">{formatCurrency(totalRevenue)}</span>
                <span className="text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center">
                <span className="font-semibold text-lg text-destructive mr-1.5">{formatCurrency(totalExpenses)}</span>
                <span className="text-muted-foreground">Expenses</span>
            </div>
            <div className="flex items-center">
                <span className="font-semibold text-lg text-accent mr-1.5">{profitRatio.toFixed(1)}%</span>
                <span className="text-muted-foreground">Profit Ratio</span>
            </div>
          </div>
        </div>
        <Select defaultValue="current-year">
            <SelectTrigger className="w-[180px] text-xs h-8">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-year">Sort By: Current Year</SelectItem>
              <SelectItem value="last-year">Sort By: Last Year</SelectItem>
              <SelectItem value="last-6-months">Sort By: Last 6 Months</SelectItem>
            </SelectContent>
          </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={balanceData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="expenses" name="Expenses" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BalanceOverview;
