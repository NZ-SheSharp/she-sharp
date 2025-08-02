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
  Monitor
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
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Active Sessions',
      description: 'View and manage your active sessions',
      icon: Monitor,
      href: '/dashboard/settings/sessions',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Team Settings',
      description: 'Manage team members and roles',
      icon: Users,
      href: '/dashboard/settings/team',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Security',
      description: 'Update password and security settings',
      icon: Shield,
      href: '/dashboard/settings/account#security',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
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
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      icon: Key,
      status: 'coming-soon',
      action: null,
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
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome back{user?.name ? `, ${user.name}` : ''}!
        </h1>
        <p className="text-gray-600 text-lg">
          Here's an overview of your account and available features
        </p>
      </div>

      {/* Email Verification Alert */}
      {!isVerified && (
        <Alert className="mb-8 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              <strong>Email not verified.</strong> Please verify your email address to access all features.
            </span>
            <Link href={`/verify-email?email=${encodeURIComponent(user?.email || '')}`}>
              <Button size="sm" variant="outline" className="ml-4">
                Verify Email
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {/* Account Status Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
          <CardDescription>Your account security overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isVerified ? 'bg-green-100' : 'bg-amber-100'
              }`}>
                {isVerified ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Email Status</p>
                <p className="text-sm text-gray-500">
                  {isVerified ? 'Verified' : 'Unverified'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Account Security</p>
                <p className="text-sm text-gray-500">Password Protected</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Account Type</p>
                <p className="text-sm text-gray-500">{user?.role || 'Member'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${link.bgColor} mb-2`}>
                      <Icon className={`h-6 w-6 ${link.color}`} />
                    </div>
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Authentication Features */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Security Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {authFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{feature.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div>
                      {feature.status === 'active' && (
                        <Badge className="bg-green-100 text-green-700">Active</Badge>
                      )}
                      {feature.status === 'pending' && (
                        <Badge className="bg-amber-100 text-amber-700">Pending</Badge>
                      )}
                      {feature.status === 'coming-soon' && (
                        <Badge variant="secondary">Coming Soon</Badge>
                      )}
                    </div>
                  </div>
                  {feature.action && (
                    <div className="mt-4">
                      <Link href={feature.action}>
                        <Button size="sm" variant="outline" className="w-full">
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

      {/* Test Navigation Card */}
      <Card className="mt-8 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-600">Authentication Test Pages</CardTitle>
          <CardDescription>
            Quick access to test all authentication features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Link href="/sign-in">
              <Button variant="outline" size="sm" className="w-full">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="outline" size="sm" className="w-full">Sign Up</Button>
            </Link>
            <Link href="/forgot-password">
              <Button variant="outline" size="sm" className="w-full">Forgot Password</Button>
            </Link>
            <Link href={`/verify-email?email=${encodeURIComponent(user?.email || '')}`}>
              <Button variant="outline" size="sm" className="w-full">Verify Email</Button>
            </Link>
            <Link href="/dashboard/settings/account">
              <Button variant="outline" size="sm" className="w-full">Account Settings</Button>
            </Link>
            <Link href="/dashboard/settings/sessions">
              <Button variant="outline" size="sm" className="w-full">Sessions</Button>
            </Link>
            <Link href="/dashboard/settings/team">
              <Button variant="outline" size="sm" className="w-full">Team Settings</Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => {
                fetch('/api/auth/signout', { method: 'POST' })
                  .then(() => window.location.href = '/');
              }}
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}