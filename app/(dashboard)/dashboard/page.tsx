'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  Settings, 
  Shield,
  Mail,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Activity,
  Lock,
  Key,
  Monitor,
  Sparkles,
  Heart,
  BookOpen,
  Target
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsVerified(!!userData.emailVerifiedAt);
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLinks = [
    {
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      icon: Settings,
      href: '/dashboard/settings/account',
      color: 'text-purple-dark',
      bgColor: 'bg-purple-light',
      hoverBg: 'hover:bg-purple-mid hover:text-white',
    },
    {
      title: 'Active Sessions',
      description: 'View and manage your active sessions',
      icon: Monitor,
      href: '/dashboard/settings/sessions',
      color: 'text-periwinkle-dark',
      bgColor: 'bg-periwinkle-light',
      hoverBg: 'hover:bg-periwinkle-dark hover:text-white',
    },
    {
      title: 'Team Settings',
      description: 'Manage team members and roles',
      icon: Users,
      href: '/dashboard/settings/team',
      color: 'text-navy-dark',
      bgColor: 'bg-mint-light',
      hoverBg: 'hover:bg-mint-dark hover:text-navy-dark',
    },
    {
      title: 'Security',
      description: 'Update password and security settings',
      icon: Shield,
      href: '/dashboard/settings/account#security',
      color: 'text-navy-dark',
      bgColor: 'bg-navy-light',
      hoverBg: 'hover:bg-navy-dark hover:text-white',
    },
  ];

  const sheSharpResources = [
    {
      title: 'Mentorship Program',
      description: 'Connect with experienced women in STEM',
      icon: Heart,
      href: '/mentorship',
      color: 'text-purple-dark',
      action: 'Explore',
    },
    {
      title: 'Upcoming Events',
      description: 'Join workshops and networking events',
      icon: Calendar,
      href: '/events',
      color: 'text-periwinkle-dark',
      action: 'View Events',
    },
    {
      title: 'Learning Resources',
      description: 'Access STEM education materials',
      icon: BookOpen,
      href: '/resources',
      color: 'text-mint-dark',
      action: 'Learn More',
    },
    {
      title: 'Career Opportunities',
      description: 'Find your next role in technology',
      icon: Target,
      href: '/careers',
      color: 'text-navy-dark',
      action: 'Browse Jobs',
    },
  ];

  const authFeatures = [
    {
      title: 'Email Verification',
      description: 'Verify your email to access all features',
      icon: Mail,
      status: isVerified ? 'active' : 'pending',
      action: !isVerified ? `/verify-email?email=${encodeURIComponent(user?.email || '')}` : null,
    },
    {
      title: 'Password Security',
      description: 'Keep your account secure with a strong password',
      icon: Lock,
      status: 'active',
      action: '/dashboard/settings/account#security',
    },
    {
      title: 'Session Management',
      description: 'Monitor and control active sessions',
      icon: Activity,
      status: 'active',
      action: '/dashboard/settings/sessions',
    },
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      icon: Key,
      status: 'coming-soon',
      action: null,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-dark"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-purple-dark flex-shrink-0" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-dark to-purple-mid bg-clip-text text-transparent">
            Welcome to She Sharp
          </h1>
        </div>
        <p className="text-gray text-base sm:text-lg">
          {user?.name ? `Hello ${user.name}, ` : ''}Your gateway to the STEM community
        </p>
      </div>

      {/* Email Verification Alert */}
      {!isVerified && (
        <Alert className="mb-6 sm:mb-8 border-error bg-error/10">
          <AlertTriangle className="h-4 w-4 text-error flex-shrink-0" />
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-navy-dark text-sm sm:text-base">
              <strong className="font-semibold">Email not verified.</strong>
              <span className="block sm:inline"> Please verify your email address to access all features.</span>
            </span>
            <Link href={`/verify-email?email=${encodeURIComponent(user?.email || '')}`} className="flex-shrink-0">
              <Button size="sm" variant="outline" className="w-full sm:w-auto border-purple-dark text-purple-dark hover:bg-purple-light transition-colors">
                Verify Email
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {/* Account Status Card */}
      <Card className="mb-6 sm:mb-8 border-periwinkle-light shadow-lg bg-card">
        <CardHeader className="bg-gradient-to-r from-purple-light to-periwinkle-light p-4 sm:p-6">
          <CardTitle className="text-navy-dark text-lg sm:text-xl">Account Overview</CardTitle>
          <CardDescription className="text-gray text-sm sm:text-base">Your account status and security information</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center space-x-3 p-3 sm:p-0 bg-white sm:bg-transparent rounded-lg sm:rounded-none">
              <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full flex-shrink-0 ${
                isVerified ? 'bg-mint-light' : 'bg-error/10'
              }`}>
                {isVerified ? (
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-mint-dark" />
                ) : (
                  <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-error" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-navy-dark truncate">Email Status</p>
                <p className="text-xs sm:text-sm text-gray">
                  {isVerified ? 'Verified' : 'Pending Verification'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 sm:p-0 bg-white sm:bg-transparent rounded-lg sm:rounded-none">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-purple-light flex-shrink-0">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-dark" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-navy-dark truncate">Account Security</p>
                <p className="text-xs sm:text-sm text-gray">Password Protected</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 sm:p-0 bg-white sm:bg-transparent rounded-lg sm:rounded-none sm:col-span-2 lg:col-span-1">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-periwinkle-light flex-shrink-0">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-periwinkle-dark" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-navy-dark truncate">Member Since</p>
                <p className="text-xs sm:text-sm text-gray">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-purple-dark">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Card className={`h-full transition-all duration-200 hover:shadow-xl cursor-pointer border-border bg-card ${link.hoverBg} group`}>
                  <CardHeader className="p-3 sm:p-4 lg:p-6">
                    <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg ${link.bgColor} mb-2 transition-colors mx-auto sm:mx-0`}>
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${link.color} group-hover:text-current transition-colors`} />
                    </div>
                    <CardTitle className="text-sm sm:text-base lg:text-lg text-navy-dark group-hover:text-current transition-colors text-center sm:text-left">{link.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-gray group-hover:text-current/80 transition-colors hidden sm:block">{link.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* She Sharp Resources */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-purple-dark">She Sharp Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {sheSharpResources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Card key={resource.href} className="border-border bg-card hover:shadow-lg transition-shadow">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 w-full">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-light to-periwinkle-light flex-shrink-0">
                        <Icon className={`h-5 w-5 ${resource.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm sm:text-base text-navy-dark">{resource.title}</CardTitle>
                        <CardDescription className="mt-1 text-xs sm:text-sm text-gray">
                          {resource.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <Link href={resource.href}>
                      <Button size="sm" variant="outline" className="w-full border-2 border-purple-dark text-purple-dark hover:bg-purple-light transition-colors text-xs sm:text-sm">
                        {resource.action}
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Security Features */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-purple-dark">Security Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {authFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="relative border-border bg-card">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-dark to-periwinkle-dark flex-shrink-0">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-sm sm:text-base text-navy-dark">{feature.title}</CardTitle>
                        <CardDescription className="mt-1 text-xs sm:text-sm text-gray">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex-shrink-0 self-start">
                      {feature.status === 'active' && (
                        <Badge className="bg-mint-light border border-mint-dark text-navy-dark text-xs">Active</Badge>
                      )}
                      {feature.status === 'pending' && (
                        <Badge className="bg-error/10 border border-error text-error text-xs">Pending</Badge>
                      )}
                      {feature.status === 'coming-soon' && (
                        <Badge variant="secondary" className="bg-periwinkle-light text-gray border-periwinkle-dark text-xs">Coming Soon</Badge>
                      )}
                    </div>
                  </div>
                  {feature.action && (
                    <div>
                      <Link href={feature.action}>
                        <Button size="sm" className="w-full bg-purple-dark text-white hover:bg-purple-mid transition-colors text-xs sm:text-sm">
                          {feature.status === 'pending' ? 'Complete Setup' : 'Manage'}
                          <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}