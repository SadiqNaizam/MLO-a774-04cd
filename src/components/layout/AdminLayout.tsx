import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  // If sidebar collapsibility were a feature controlled here:
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // For current fixed layout, no state needed here for sidebar.
  // SidebarNav is fixed width (w-64).
  // TopHeader is fixed position with left-64.
  // Main content area needs ml-64 and mt-16.

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarNav />
      {/* The div below acts as the main content viewport, offset by the fixed sidebar */}
      <div className="ml-64"> {/* This margin accounts for the fixed w-64 sidebar */}
        <TopHeader />
        {/* Main content area, offset by fixed header and sidebar */}
        <main className="p-6 pt-20 lg:pt-6 mt-16 min-h-[calc(100vh-4rem)]">
          {/* pt-20 for mobile due to potential stacked elements in header, lg:pt-6 restores normal padding */}
          {/* The above padding adjustment is an example, specific responsive behavior might differ */}
          {/* Using default p-6 as per requirements for mainContent.layout */}
          {/* `mainContent.layout: "p-6 mt-16"` is applied here */} 
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
