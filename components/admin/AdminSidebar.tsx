'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  UserCheck,
  UserPlus,
  Activity,
  Shield,
  BookOpen,
  Image,
  Mail,
  FileEdit,
  CalendarPlus,
  CalendarClock,
  Archive,
  Folder,
  Cog,
  MessageSquare,
  CreditCard,
  FileSearch,
  Bell,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  permission?: string | string[];
  badge?: string | number;
  accent?: boolean;
  sections?: {
    title: string;
    href: string;
    icon?: React.ElementType;
    badge?: string | number;
    count?: boolean;
    accent?: boolean;
  }[];
}

const adminNavigation: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard/admin',
    badge: 'live',
  },
  {
    title: 'User Management',
    icon: Users,
    permission: 'canEditUsers',
    sections: [
      { title: 'All Users', href: '/dashboard/admin/users', icon: Users, count: true },
      { title: 'Role Management', href: '/dashboard/admin/users/roles', icon: Shield },
      { title: 'Access Control', href: '/dashboard/admin/users/permissions', icon: UserCheck },
      { title: 'Activity Logs', href: '/dashboard/admin/users/activity', icon: Activity },
    ],
  },
  {
    title: 'Mentorship',
    icon: GraduationCap,
    permission: ['canVerifyMentors', 'canManageRelationships'],
    sections: [
      { title: 'Mentor Applications', href: '/dashboard/admin/mentors/applications', icon: UserPlus, badge: 'pending' },
      { title: 'Verified Mentors', href: '/dashboard/admin/mentors/verified', icon: CheckCircle },
      { title: 'Active Relationships', href: '/dashboard/admin/mentors/relationships', icon: Users },
      { title: 'Meeting Analytics', href: '/dashboard/admin/mentors/meetings', icon: BarChart3 },
    ],
  },
  {
    title: 'Events',
    icon: Calendar,
    permission: 'canManageEvents',
    sections: [
      { title: 'Upcoming Events', href: '/dashboard/admin/events/upcoming', icon: CalendarClock },
      { title: 'Create Event', href: '/dashboard/admin/events/new', icon: CalendarPlus, accent: true },
      { title: 'Registrations', href: '/dashboard/admin/events/registrations', icon: UserCheck },
      { title: 'Past Events', href: '/dashboard/admin/events/archive', icon: Archive },
    ],
  },
  {
    title: 'Content',
    icon: FileText,
    permission: 'canManageContent',
    sections: [
      { title: 'Resources Library', href: '/dashboard/admin/content/resources', icon: BookOpen },
      { title: 'Media Gallery', href: '/dashboard/admin/content/media', icon: Image },
      { title: 'Newsletters', href: '/dashboard/admin/content/newsletters', icon: Mail },
      { title: 'Blog Posts', href: '/dashboard/admin/content/blog', icon: FileEdit },
    ],
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    permission: 'canAccessAnalytics',
    href: '/dashboard/admin/analytics',
    badge: 'pro',
  },
  {
    title: 'Settings',
    icon: Settings,
    sections: [
      { title: 'System Configuration', href: '/dashboard/admin/settings/system', icon: Cog },
      { title: 'Email Templates', href: '/dashboard/admin/settings/emails', icon: MessageSquare },
      { title: 'Membership Tiers', href: '/dashboard/admin/settings/membership', icon: CreditCard },
      { title: 'Audit Logs', href: '/dashboard/admin/settings/audit', icon: FileSearch },
    ],
  },
];

interface AdminSidebarProps {
  userId: number;
}

export default function AdminSidebar({ userId }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const [pendingCounts, setPendingCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    // Load admin permissions
    fetchAdminPermissions();
    // Load pending counts for badges
    fetchPendingCounts();
  }, [userId]);

  const fetchAdminPermissions = async () => {
    try {
      const response = await fetch('/api/admin/permissions');
      if (response.ok) {
        const data = await response.json();
        setPermissions(data.permissions || {});
      }
    } catch (error) {
      console.error('Failed to fetch admin permissions:', error);
    }
  };

  const fetchPendingCounts = async () => {
    try {
      const response = await fetch('/api/admin/pending-counts');
      if (response.ok) {
        const data = await response.json();
        setPendingCounts(data);
      }
    } catch (error) {
      console.error('Failed to fetch pending counts:', error);
    }
  };

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const hasPermission = (permission?: string | string[]) => {
    if (!permission) return true;
    if (Array.isArray(permission)) {
      return permission.some((p) => permissions[p]);
    }
    return permissions[permission];
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (sections?: NavItem['sections']) => {
    return sections?.some((section) => pathname.startsWith(section.href));
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link href="/dashboard/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S#</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4">
        {adminNavigation.map((item) => {
          if (!hasPermission(item.permission)) return null;

          const isExpanded = expandedItems.includes(item.title);
          const hasActiveChild = isParentActive(item.sections);

          if (item.href && !item.sections) {
            // Single link item
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-3 py-2 mb-1 rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant={item.badge === 'live' ? 'default' : 'secondary'}
                    className={cn(
                      'text-xs',
                      item.badge === 'live' && 'bg-green-100 text-green-700',
                      item.badge === 'pro' && 'bg-purple-100 text-purple-700'
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          }

          // Expandable section
          return (
            <div key={item.title} className="mb-1">
              <button
                onClick={() => toggleExpanded(item.title)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors',
                  hasActiveChild
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {isExpanded && item.sections && (
                <div className="mt-1 ml-4 space-y-1">
                  {item.sections.map((section) => (
                    <Link
                      key={section.href}
                      href={section.href}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm',
                        isActive(section.href)
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        {section.icon && <section.icon className="w-4 h-4" />}
                        <span className={section.accent ? 'font-semibold' : ''}>
                          {section.title}
                        </span>
                      </div>
                      {section.badge === 'pending' && pendingCounts.mentorApplications > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {pendingCounts.mentorApplications}
                        </Badge>
                      )}
                      {section.count && pendingCounts[section.href] && (
                        <span className="text-xs text-gray-500">
                          {pendingCounts[section.href]}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="px-3 py-4 border-t border-gray-200">
        <div className="px-3 py-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Quick Actions
          </p>
          <div className="space-y-1">
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-4 h-4" />
              <span>View Notifications</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <FileSearch className="w-4 h-4" />
              <span>Search Everything</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}