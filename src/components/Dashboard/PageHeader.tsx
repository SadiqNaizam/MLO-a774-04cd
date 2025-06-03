import React from 'react';
import { ChevronRight } from 'lucide-react';

const PageHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-semibold text-foreground">CRM</h1>
      <div className="flex items-center text-sm text-muted-foreground">
        <span>Dashboards</span>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-primary">CRM</span>
      </div>
    </div>
  );
};

export default PageHeader;
