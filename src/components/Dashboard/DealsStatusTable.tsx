import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  salesRep: {
    name: string;
    avatarUrl?: string;
    fallback: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck' | 'Negotiation' | 'Proposal Sent';
  dealValue: string;
}

const dealsData: Deal[] = [
  {
    id: '1',
    name: 'Absternet LLC',
    lastContacted: 'Sep 20, 2021',
    salesRep: { name: 'Donald Risher', fallback: 'DR', avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
    status: 'Deal Won' as const,
    dealValue: '$100.1K',
  },
  {
    id: '2',
    name: 'Raitech Soft',
    lastContacted: 'Sep 23, 2021',
    salesRep: { name: 'Sofia Cunha', fallback: 'SC', avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
    status: 'Intro Call' as const,
    dealValue: '$150K',
  },
  {
    id: '3',
    name: 'William PVT',
    lastContacted: 'Sep 27, 2021',
    salesRep: { name: 'Luis Rocha', fallback: 'LR', avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg' },
    status: 'Stuck' as const,
    dealValue: '$78.18K',
  },
  {
    id: '4',
    name: 'Loiusee LLP',
    lastContacted: 'Sep 30, 2021',
    salesRep: { name: 'Vitoria Rodrigues', fallback: 'VR', avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
    status: 'Deal Won' as const,
    dealValue: '$180K',
  },
  {
    id: '5',
    name: 'Innovate Solutions',
    lastContacted: 'Oct 02, 2021',
    salesRep: { name: 'Marcus Johnson', fallback: 'MJ', avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg' },
    status: 'Negotiation' as const,
    dealValue: '$220K',
  },
];

const getStatusBadgeClass = (status: Deal['status']): string => {
  switch (status) {
    case 'Deal Won':
      return 'bg-green-100 text-green-700 hover:bg-green-200 border-green-300';
    case 'Intro Call':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-300';
    case 'Stuck':
      return 'bg-red-100 text-red-700 hover:bg-red-200 border-red-300';
    case 'Negotiation':
      return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300';
    case 'Proposal Sent':
      return 'bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300';
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300';
  }
};

const DealsStatusTable: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Deals Status</CardTitle>
        <Select defaultValue="nov-dec-2021">
            <SelectTrigger className="w-[250px] text-xs h-8">
                <SelectValue placeholder="Select Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nov-dec-2021">02 Nov 2021 to 31 Dec 2021</SelectItem>
              <SelectItem value="oct-2021">01 Oct 2021 to 31 Oct 2021</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Last Contacted</TableHead>
              <TableHead>Sales Representative</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealsData.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground">{deal.lastContacted}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={deal.salesRep.avatarUrl} alt={deal.salesRep.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {deal.salesRep.fallback || <User className="h-4 w-4"/>}
                      </AvatarFallback>
                    </Avatar>
                    <span>{deal.salesRep.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", getStatusBadgeClass(deal.status))}>
                    {deal.status.toLowerCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{deal.dealValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DealsStatusTable;
