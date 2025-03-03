
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
};

const NavItem = ({ to, icon, label, active, onClick }: NavItemProps) => (
  <Link 
    to={to} 
    className="w-full" 
    onClick={onClick}
  >
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 px-3 py-2 mb-1 transition-all duration-200",
        active 
          ? "bg-accent text-accent-foreground font-medium" 
          : "hover:bg-accent/50 text-muted-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Button>
  </Link>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPath]);

  // Close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      <header className="md:hidden border-b border-border bg-card p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            className="mr-2"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <h1 className="text-lg font-medium">Identity Manager</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
      </header>

      {/* Sidebar - Desktop always visible, Mobile conditionally */}
      <aside 
        className={cn(
          "transition-all duration-300 ease-in-out",
          "bg-card border-r border-border w-64 p-4 flex flex-col shrink-0",
          "md:block", // Always show on desktop
          isMobileMenuOpen 
            ? "fixed inset-0 w-64 h-full z-50 animate-fade-in" 
            : "hidden" // Hide on mobile when closed
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold">Identity Manager</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            className="md:hidden"
          >
            <X size={18} />
          </Button>
        </div>
        
        <nav className="flex-1">
          <div className="space-y-1">
            <NavItem 
              to="/dashboard" 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard" 
              active={currentPath === '/dashboard'}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <NavItem 
              to="/users" 
              icon={<Users size={18} />} 
              label="Users" 
              active={currentPath === '/users'}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <NavItem 
              to="/settings" 
              icon={<Settings size={18} />} 
              label="Settings" 
              active={currentPath === '/settings'}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
            <LogOut size={18} />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 h-full overflow-auto transition-all",
        isMobileMenuOpen && "md:ml-0"
      )}>
        {/* Mobile menu backdrop overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        <div className="container mx-auto p-4 md:p-6 animate-on-enter">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
