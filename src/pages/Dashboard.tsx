
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { Users, ShieldCheck, UserPlus, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  // Mock data for statistics
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      description: '24 new this week',
      icon: <Users size={18} />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'New Applications',
      value: '6',
      description: '2 pending review',
      icon: <UserPlus size={18} />,
      trend: { value: 33, isPositive: true }
    },
    {
      title: 'Security Alerts',
      value: '2',
      description: 'Unresolved issues',
      icon: <AlertTriangle size={18} />,
      trend: { value: 50, isPositive: false }
    },
    {
      title: 'Auth Providers',
      value: '5',
      description: 'Active providers',
      icon: <ShieldCheck size={18} />,
      trend: { value: 0, isPositive: true }
    }
  ];

  // Mock data for activity feed
  const activities = [
    {
      id: '1',
      user: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      type: 'login' as const,
      action: 'Logged in from a new device in San Francisco, CA',
      timestamp: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
    },
    {
      id: '2',
      user: {
        name: 'Emily Johnson',
        email: 'emily.j@example.com',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      type: 'permission' as const,
      action: 'Changed role from User to Admin',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
    },
    {
      id: '3',
      user: {
        name: 'Michael Davis',
        email: 'm.davis@example.com'
      },
      type: 'signup' as const,
      action: 'Created a new account',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
    },
    {
      id: '4',
      user: {
        name: 'Lisa Wang',
        email: 'lisa.wang@example.com',
        avatar: 'https://i.pravatar.cc/150?img=10'
      },
      type: 'settings' as const,
      action: 'Updated 2FA settings',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
    },
    {
      id: '5',
      user: {
        name: 'Robert Chen',
        email: 'r.chen@example.com',
        avatar: 'https://i.pravatar.cc/150?img=12'
      },
      type: 'login' as const,
      action: 'Failed login attempt (incorrect password)',
      timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000) // 26 hours ago
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight pb-1">Neuro-Access Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your identity management system
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              {...stat}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityFeed activities={activities} />
          </div>
          <div className="space-y-6">
            {/* You can add more components here for the sidebar */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
