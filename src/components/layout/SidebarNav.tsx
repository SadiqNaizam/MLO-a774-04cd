import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming React Router for navigation
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  LineChart,
  Users,
  ShoppingCart,
  Bitcoin,
  FolderKanban,
  Image as ImageIcon,
  Briefcase,
  BookOpen,
  AppWindow,
  LayoutPanelLeft,
  ShieldCheck,
  FileText,
  Send,
  Component as ComponentIcon,
  Layers,
  LayoutGrid,
  ClipboardEdit,
  ChevronDown,
  Icon as LucideIcon
} from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  badge?: { text: string; variant: 'new' | 'hot' };
  children?: NavItem[];
  isTitle?: boolean;
  activeMatcher?: RegExp;
}

const navigationItems: NavItem[] = [
  { isTitle: true, label: 'MENU', icon: ShieldCheck /* Dummy icon, not rendered */ }, 
  {
    label: 'Dashboards' as const,
    icon: LayoutDashboard,
    activeMatcher: /^\/(analytics|crm|ecommerce)?$/i, // Matches /, /analytics, /crm, /ecommerce
    children: [
      { label: 'Analytics' as const, href: '/analytics', icon: LineChart },
      { label: 'CRM' as const, href: '/', icon: Users, activeMatcher: /^\/$/i }, // Assuming '/' is CRM dashboard
      { label: 'Ecommerce' as const, href: '/ecommerce', icon: ShoppingCart },
      { label: 'Crypto' as const, href: '/crypto', icon: Bitcoin },
      { label: 'Projects' as const, href: '/projects', icon: FolderKanban },
      { label: 'NFT' as const, href: '/nft', icon: ImageIcon }, 
      { label: 'Job' as const, href: '/job', icon: Briefcase, badge: { text: 'New', variant: 'new' } },
    ],
  },
  { label: 'Blog' as const, href: '/blog', icon: BookOpen },
  {
    label: 'Apps' as const,
    icon: AppWindow,
    children: [
        { label: 'Calendar', href: '/apps/calendar', icon: LayoutDashboard /* Placeholder */ },
        { label: 'Chat', href: '/apps/chat', icon: Users /* Placeholder */ },
    ]
  },
  { label: 'Layouts' as const, href: '/layouts', icon: LayoutPanelLeft, badge: { text: 'Hot', variant: 'hot' } }, 
  { isTitle: true, label: 'PAGES', icon: ShieldCheck },
  {
    label: 'Authentication' as const,
    icon: ShieldCheck,
    children: [
      { label: 'Sign In', href: '/auth/signin', icon: Users /* Placeholder */ },
      { label: 'Sign Up', href: '/auth/signup', icon: Users /* Placeholder */ },
    ]
  },
  { label: 'Pages' as const, href: '/pages', icon: FileText },
  { label: 'Landing' as const, href: '/landing', icon: Send },
  { isTitle: true, label: 'COMPONENTS', icon: ShieldCheck },
  {
    label: 'Base UI' as const,
    icon: ComponentIcon,
    children: [
      { label: 'Alerts', href: '/ui/alerts', icon: Layers /* Placeholder */ },
      { label: 'Buttons', href: '/ui/buttons', icon: Layers /* Placeholder */ },
    ]
  },
  { label: 'Advance UI' as const, href: '/ui/advance', icon: Layers },
  { label: 'Widgets' as const, href: '/ui/widgets', icon: LayoutGrid },
  { label: 'Forms' as const, href: '/ui/forms', icon: ClipboardEdit },
];

const SidebarNav: React.FC = () => {
  const location = useLocation();

  const renderNavItem = (item: NavItem, index: number, isSubItem = false) => {
    const isActive = item.href ? (item.activeMatcher ? item.activeMatcher.test(location.pathname) : location.pathname === item.href) : false;
    const hasActiveChild = item.children ? item.children.some(child => child.href && (child.activeMatcher ? child.activeMatcher.test(location.pathname) : location.pathname === child.href)) : false;

    if (item.isTitle) {
      return <h_title key={index} className="px-4 pt-4 pb-2 text-xs font-semibold uppercase text-sidebar-muted-foreground tracking-wider">{item.label}</h_title>;
    }

    if (item.children) {
      return (
        <AccordionItem key={index} value={`item-${index}`} className="border-none">
          <AccordionTrigger className={cn(
            "w-full flex items-center justify-between py-2.5 px-4 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring transition-colors",
            isSubItem ? "pl-8" : "",
            (isActive || hasActiveChild) ? "text-sidebar-primary-foreground" : "text-sidebar-foreground"
          )}>
            <div className="flex items-center">
              <item.icon className={cn("h-5 w-5 mr-3", (isActive || hasActiveChild) ? "text-sidebar-primary" : "text-sidebar-muted-foreground group-hover:text-sidebar-accent-foreground")} />
              {item.label}
            </div>
            <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", (isActive || hasActiveChild) ? "text-sidebar-primary" : "text-sidebar-muted-foreground")} />
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <div className="pl-4 border-l border-sidebar-border ml-[1.375rem]">
              {item.children.map((child, childIndex) => renderNavItem(child, childIndex, true))}
            </div>
          </AccordionContent>
        </AccordionItem>
      );
    }

    return (
      <Link
        key={index}
        to={item.href || '#'}
        className={cn(
          "flex items-center py-2.5 px-4 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-ring transition-colors group",
          isSubItem ? "pl-8" : "",
          isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground"
        )}
      >
        <item.icon className={cn("h-5 w-5 mr-3", isActive ? "" : "text-sidebar-muted-foreground group-hover:text-sidebar-accent-foreground")} />
        {item.label}
        {item.badge && (
          <Badge
            variant="default"
            className={cn(
              "ml-auto text-xs px-1.5 py-0.5 rounded-sm",
              item.badge.variant === 'new' ? "bg-green-500 text-white" : "bg-red-500 text-white"
            )}
          >
            {item.badge.text}
          </Badge>
        )}
      </Link>
    );
  };

  // Determine default open accordion items based on active children
  const defaultOpenValues = navigationItems
    .map((item, index) => (item.children && item.children.some(child => child.href && (child.activeMatcher ? child.activeMatcher.test(location.pathname) : location.pathname === child.href))) ? `item-${index}` : null)
    .filter(Boolean) as string[];

  return (
    <aside className="fixed top-0 left-0 z-20 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      <div className="p-4 text-center border-b border-sidebar-border">
        <Link to="/" className="block text-2xl font-bold text-sidebar-primary tracking-wider select-none">
          VELZON
        </Link>
      </div>
      
      <div className="p-4 text-left border-b border-sidebar-border">
        <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="https://pbs.twimg.com/profile_images/1783105498568863744/-xK0d10G_400x400.jpg" alt="Anna Adame" />
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">AA</AvatarFallback>
            </Avatar>
            <div>
                <h3 className="font-semibold text-sm text-sidebar-foreground">Anna Adame</h3>
                <p className="text-xs text-green-400 flex items-center">
                    <span className="h-1.5 w-1.5 bg-green-400 rounded-full mr-1"></span>
                    Online
                </p>
            </div>
        </div>
      </div>

      <ScrollArea className="flex-1 mt-2 mb-4 px-2.5">
        <Accordion type="multiple" defaultValue={defaultOpenValues} className="w-full space-y-0.5">
          {navigationItems.map((item, index) => renderNavItem(item, index))}
        </Accordion>
      </ScrollArea>
      
      {/* Optional: Sidebar footer or additional controls */}
      {/* <div className="mt-auto p-4 border-t border-sidebar-border">
        <Button variant="outline" className="w-full border-sidebar-border text-sidebar-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Settings className="h-4 w-4 mr-2"/> Settings
        </Button>
      </div> */}
    </aside>
  );
};

export default SidebarNav;
