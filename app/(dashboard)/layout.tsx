'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Home, LogOut, Menu, X, Settings, Users, Activity, CreditCard, ArrowLeft } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      // Call NextAuth signOut first
      await nextAuthSignOut({ 
        redirect: false,
        callbackUrl: '/' 
      });
      
      // Clear custom session
      await fetch('/api/auth/signout', { 
        method: 'POST',
        credentials: 'include'
      });
      
      // Use the complete signout endpoint that clears everything and redirects
      window.location.href = '/api/auth/signout-complete';
    } catch (error) {
      console.error('Sign out failed:', error);
      // Force complete signout even on error
      window.location.href = '/api/auth/signout-complete';
    }
  }

  if (!user) {
    return (
      <>
        <Link href="/sign-in">
          <Button variant="ghost" size="sm" className="text-purple-dark hover:text-purple-mid">
            Sign In
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button size="sm" className="bg-purple-dark hover:bg-purple-mid text-white rounded-full px-6">
            Get Started
          </Button>
        </Link>
      </>
    );
  }

  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.slice(0, 2).toUpperCase() || 'U';
  };

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative flex items-center gap-2 px-2 hover:bg-purple-light transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
            <AvatarFallback className="bg-gradient-to-br from-purple-dark to-periwinkle-dark text-white text-xs">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline-block text-sm font-medium text-navy-dark">
            {user.name || user.email.split('@')[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-3 p-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
            <AvatarFallback className="bg-purple-light text-purple-dark">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard/settings/account">
            <Settings className="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard/settings/sessions">
            <Activity className="mr-2 h-4 w-4" />
            <span>Active Sessions</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard/settings/team">
            <Users className="mr-2 h-4 w-4" />
            <span>Team Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/dashboard/settings/billing">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-periwinkle-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-32 h-10">
                <Image
                  src="/logos/she-sharp-logo.svg"
                  alt="She Sharp Logo"
                  width={128}
                  height={40}
                  className="object-contain text-purple-dark group-hover:text-purple-mid transition-colors"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray hidden sm:block">
                  Dashboard
                </span>
              </div>
            </Link>
            
            {/* Back to Main Site */}
            <Link 
              href="/"
              className="hidden md:flex items-center gap-1 text-sm text-gray hover:text-blue transition-colors ml-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Main Site
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-navy-dark hover:text-purple-dark hover:bg-purple-light transition-colors">
                  Overview
                </Button>
              </Link>
              <Link href="/dashboard/settings/account">
                <Button variant="ghost" size="sm" className="text-navy-dark hover:text-purple-dark hover:bg-purple-light transition-colors">
                  Settings
                </Button>
              </Link>
              <Link href="/dashboard/settings/team">
                <Button variant="ghost" size="sm" className="text-navy-dark hover:text-purple-dark hover:bg-purple-light transition-colors">
                  Team
                </Button>
              </Link>
            </nav>
            <div className="h-6 w-px bg-gray-300" />
            <Suspense fallback={<div className="h-9 w-9 animate-pulse bg-gray-200 rounded-full" />}>
              <UserMenu />
            </Suspense>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray hover:text-purple-dark hover:bg-purple-light/20 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-periwinkle-light py-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-navy-dark hover:text-purple-dark hover:bg-purple-light transition-colors">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard Overview
                </Button>
              </Link>
              <Link href="/dashboard/settings/account" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-navy-dark hover:text-purple-dark hover:bg-purple-light transition-colors">
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </Button>
              </Link>
              <Link href="/dashboard/settings/team" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-navy-dark hover:text-purple-dark hover:bg-purple-light transition-colors">
                  <Users className="mr-2 h-4 w-4" />
                  Team Settings
                </Button>
              </Link>
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-navy-dark hover:text-purple-dark hover:bg-purple-light transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Main Site
                </Button>
              </Link>
              <div className="pt-2 border-t border-periwinkle-light">
                <Suspense fallback={<div className="h-12 animate-pulse bg-periwinkle-light rounded" />}>
                  <UserMenu />
                </Suspense>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-light via-white to-periwinkle-light">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-white border-t border-periwinkle-light py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray">
              © {new Date().getFullYear()} She Sharp. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/about" className="text-gray hover:text-blue transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray hover:text-blue transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray hover:text-blue transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray hover:text-blue transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
