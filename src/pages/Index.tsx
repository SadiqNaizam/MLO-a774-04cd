import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import PageHeader from '../components/Dashboard/PageHeader';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import ChartsSection from '../components/Dashboard/ChartsSection';
import BalanceOverview from '../components/Dashboard/BalanceOverview';
import DealsStatusTable from '../components/Dashboard/DealsStatusTable';
import TasksList from '../components/Dashboard/TasksList';

const IndexPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <PageHeader />
        <StatsCardGrid />
        <ChartsSection />
        <BalanceOverview />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DealsStatusTable />
          </div>
          <div className="lg:col-span-1">
            <TasksList />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default IndexPage;
