import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ChevronDown } from 'lucide-react';

const salesForecastData = [
  { name: 'Goal', value: 37000, fill: 'hsl(var(--primary))' },
  { name: 'Pending Forecast', value: 12000, fill: 'hsl(var(--accent))' }, 
  { name: 'Revenue', value: 18000, fill: 'hsl(35, 91%, 65%)' }, // Orange
];

const dealTypeData = [
  { subject: '2018', Pending: 75, Loss: 35, Won: 90, fullMark: 100 },
  { subject: '2019', Pending: 50, Loss: 45, Won: 80, fullMark: 100 },
  { subject: '2020', Pending: 95, Loss: 25, Won: 65, fullMark: 100 },
  { subject: '2021', Pending: 60, Loss: 30, Won: 110, fullMark: 120 }, 
  { subject: '2022', Pending: 80, Loss: 15, Won: 95, fullMark: 120 },
  { subject: '2023', Pending: 70, Loss: 40, Won: 85, fullMark: 100 },
];

const ChartsSection: React.FC = () => {
  const formatCurrency = (value: number) => `$${(value / 1000).toFixed(0)}k`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sales Forecast</CardTitle>
          <Select defaultValue="nov-2021">
            <SelectTrigger className="w-[180px] text-xs h-8">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nov-2021">Sort By: Nov 2021</SelectItem>
              <SelectItem value="oct-2021">Sort By: Oct 2021</SelectItem>
              <SelectItem value="current-year">Sort By: Current Year</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesForecastData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={formatCurrency} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Legend 
                content={() => (
                    <div className="flex justify-center space-x-4 mt-4 text-xs">
                        {salesForecastData.map(entry => (
                            <div key={entry.name} className="flex items-center">
                                <span className="w-3 h-3 mr-1.5" style={{ backgroundColor: entry.fill }}></span>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                )}
              />
              <Bar dataKey="value" barSize={20} radius={[0, 5, 5, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Deal Type</CardTitle>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[150px] text-xs h-8">
                <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Sort By: Monthly</SelectItem>
              <SelectItem value="quarterly">Sort By: Quarterly</SelectItem>
              <SelectItem value="yearly">Sort By: Yearly</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dealTypeData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 20']} tickFormatter={(value) => value.toString()} />
              <Tooltip />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Radar name="Pending" dataKey="Pending" stroke="hsl(48, 96%, 56%)" fill="hsl(48, 96%, 56%)" fillOpacity={0.5} />
              <Radar name="Loss" dataKey="Loss" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.6} />
              <Radar name="Won" dataKey="Won" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.7} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
