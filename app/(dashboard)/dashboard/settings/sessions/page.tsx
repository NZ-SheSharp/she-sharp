'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { 
  Monitor, 
  Smartphone, 
  Tablet,
  Globe,
  MapPin,
  Clock,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  Shield,
  RefreshCw
} from 'lucide-react';

interface Session {
  id: number;
  deviceInfo?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  ipAddress?: string;
  lastActivity: string;
  createdAt: string;
  isCurrent?: boolean;
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRevoking, setIsRevoking] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sessionToRevoke, setSessionToRevoke] = useState<number | null>(null);
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/user/sessions');
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions || []);
      } else {
        setError('Failed to load sessions');
      }
    } catch (err) {
      setError('An error occurred while loading sessions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevokeSession = async (sessionId: number) => {
    setIsRevoking(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`/api/user/sessions/${sessionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Session revoked successfully');
        setSessions(sessions.filter(s => s.id !== sessionId));
      } else {
        setError('Failed to revoke session');
      }
    } catch (err) {
      setError('An error occurred while revoking session');
    } finally {
      setIsRevoking(false);
      setShowRevokeDialog(false);
      setSessionToRevoke(null);
    }
  };

  const handleRevokeAllOther = async () => {
    setIsRevoking(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/user/sessions/revoke-all', {
        method: 'POST',
      });

      if (response.ok) {
        setMessage('All other sessions revoked successfully');
        setSessions(sessions.filter(s => s.isCurrent));
      } else {
        setError('Failed to revoke sessions');
      }
    } catch (err) {
      setError('An error occurred while revoking sessions');
    } finally {
      setIsRevoking(false);
    }
  };

  const getDeviceIcon = (deviceType?: string) => {
    switch (deviceType?.toLowerCase()) {
      case 'mobile':
      case 'phone':
        return <Smartphone className="h-5 w-5" />;
      case 'tablet':
        return <Tablet className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) {
      return 'Active now';
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 7) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // Mock data for demonstration
  const mockSessions: Session[] = [
    {
      id: 1,
      deviceInfo: 'Chrome on Windows',
      deviceType: 'desktop',
      browser: 'Chrome 120',
      os: 'Windows 11',
      ipAddress: '192.168.1.1',
      lastActivity: new Date().toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isCurrent: true,
    },
    {
      id: 2,
      deviceInfo: 'Safari on iPhone',
      deviceType: 'mobile',
      browser: 'Safari 17',
      os: 'iOS 17',
      ipAddress: '192.168.1.2',
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
    {
      id: 3,
      deviceInfo: 'Firefox on Mac',
      deviceType: 'desktop',
      browser: 'Firefox 121',
      os: 'macOS Sonoma',
      ipAddress: '192.168.1.3',
      lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
  ];

  const displaySessions = sessions.length > 0 ? sessions : mockSessions;

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Active Sessions</h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor all devices that are signed in to your account
          </p>
        </div>
        <Button
          onClick={fetchSessions}
          variant="outline"
          size="sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {message && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">{message}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Security Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription>
              If you see any unfamiliar sessions, revoke them immediately and change your password.
              We recommend reviewing your active sessions regularly.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="space-y-4 mb-6">
        {displaySessions.map((session) => (
          <Card key={session.id} className={session.isCurrent ? 'border-green-500' : ''}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getDeviceIcon(session.deviceType)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {session.deviceInfo || 'Unknown Device'}
                      {session.isCurrent && (
                        <Badge className="ml-2 bg-green-100 text-green-700">
                          Current Session
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {session.browser && <span>{session.browser} • </span>}
                      {session.os && <span>{session.os}</span>}
                    </CardDescription>
                  </div>
                </div>
                {!session.isCurrent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSessionToRevoke(session.id);
                      setShowRevokeDialog(true);
                    }}
                    disabled={isRevoking}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Revoke
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>IP: {session.ipAddress || 'Unknown'}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Last active: {formatDate(session.lastActivity)}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Globe className="h-4 w-4" />
                  <span>Signed in: {formatDate(session.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {displaySessions.filter(s => !s.isCurrent).length > 0 && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-600">Revoke All Other Sessions</CardTitle>
            <CardDescription>
              Sign out from all other sessions except your current one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              This will sign you out from all other devices and browsers. You'll need to sign in again on those devices.
            </p>
            <Button
              variant="outline"
              onClick={handleRevokeAllOther}
              disabled={isRevoking}
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Revoke All Other Sessions
            </Button>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Session?</AlertDialogTitle>
            <AlertDialogDescription>
              This will sign out the selected device. You'll need to sign in again on that device to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => sessionToRevoke && handleRevokeSession(sessionToRevoke)}
              className="bg-red-600 hover:bg-red-700"
            >
              Revoke Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}