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
      bgColor: 'bg-purple-light/30',
      hoverBg: 'hover:bg-purple-light/50',
    },
    {
      title: 'Active Sessions',
      description: 'View and manage your active sessions',
      icon: Monitor,
      href: '/dashboard/settings/sessions',
      color: 'text-periwinkle-dark',
      bgColor: 'bg-periwinkle-light/30',
      hoverBg: 'hover:bg-periwinkle-light/50',
    },
    {
      title: 'Team Settings',
      description: 'Manage team members and roles',
      icon: Users,
      href: '/dashboard/settings/team',
      color: 'text-mint-dark',
      bgColor: 'bg-mint/30',
      hoverBg: 'hover:bg-mint/50',
    },
    {
      title: 'Security',
      description: 'Update password and security settings',
      icon: Shield,
      href: '/dashboard/settings/account#security',
      color: 'text-navy-dark',
      bgColor: 'bg-navy-light/30',
      hoverBg: 'hover:bg-navy-light/50',
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
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-purple-dark" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-dark to-purple-mid bg-clip-text text-transparent">
            Welcome to She Sharp
          </h1>
        </div>
        <p className="text-gray text-lg">
          {user?.name ? `Hello ${user.name}, ` : ''}Your gateway to the STEM community
        </p>
      </div>

      {/* Email Verification Alert */}
      {!isVerified && (
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-navy-dark">
              <strong>Email not verified.</strong> Please verify your email address to access all features.
            </span>
            <Link href={`/verify-email?email=${encodeURIComponent(user?.email || '')}`}>
              <Button size="sm" variant="outline" className="ml-4 border-purple-dark text-purple-dark hover:bg-purple-light/20">
                Verify Email
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {/* Account Status Card */}
      <Card className="mb-8 border-purple-light/50 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-light/20 to-periwinkle-light/20">
          <CardTitle className="text-purple-dark">Account Overview</CardTitle>
          <CardDescription className="text-navy-dark">Your account status and security information</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                isVerified ? 'bg-mint/30' : 'bg-amber-100'
              }`}>
                {isVerified ? (
                  <CheckCircle2 className="h-6 w-6 text-mint-dark" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-navy-dark">Email Status</p>
                <p className="text-sm text-gray">
                  {isVerified ? 'Verified' : 'Pending Verification'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-light/30">
                <Shield className="h-6 w-6 text-purple-dark" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-dark">Account Security</p>
                <p className="text-sm text-gray">Password Protected</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-periwinkle-light/30">
                <Activity className="h-6 w-6 text-periwinkle-dark" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-dark">Member Since</p>
                <p className="text-sm text-gray">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-purple-dark">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Card className={`h-full transition-all duration-200 hover:shadow-xl cursor-pointer border-purple-light/30 ${link.hoverBg}`}>
                  <CardHeader>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${link.bgColor} mb-2`}>
                      <Icon className={`h-6 w-6 ${link.color}`} />
                    </div>
                    <CardTitle className="text-lg text-navy-dark">{link.title}</CardTitle>
                    <CardDescription className="text-gray">{link.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* She Sharp Resources */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-purple-dark">She Sharp Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sheSharpResources.map((resource) => {
            const Icon = resource.icon;
            return (
              <Card key={resource.href} className="border-purple-light/30 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-light/30 to-periwinkle-light/30">
                        <Icon className={`h-5 w-5 ${resource.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base text-navy-dark">{resource.title}</CardTitle>
                        <CardDescription className="mt-1 text-gray">
                          {resource.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href={resource.href}>
                      <Button size="sm" variant="outline" className="w-full border-purple-dark text-purple-dark hover:bg-purple-light/20">
                        {resource.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
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
        <h2 className="text-2xl font-semibold mb-4 text-purple-dark">Security Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {authFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="relative border-purple-light/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-light/30 to-periwinkle-light/30">
                        <Icon className="h-5 w-5 text-purple-dark" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base text-navy-dark">{feature.title}</CardTitle>
                        <CardDescription className="mt-1 text-gray">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div>
                      {feature.status === 'active' && (
                        <Badge className="bg-mint/30 text-mint-dark border-mint-dark/30">Active</Badge>
                      )}
                      {feature.status === 'pending' && (
                        <Badge className="bg-amber-100 text-amber-700 border-amber-300">Pending</Badge>
                      )}
                      {feature.status === 'coming-soon' && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray border-gray-300">Coming Soon</Badge>
                      )}
                    </div>
                  </div>
                  {feature.action && (
                    <div className="mt-4">
                      <Link href={feature.action}>
                        <Button size="sm" variant="outline" className="w-full border-purple-dark text-purple-dark hover:bg-purple-light/20">
                          {feature.status === 'pending' ? 'Complete Setup' : 'Manage'}
                          <ArrowRight className="ml-2 h-4 w-4" />
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