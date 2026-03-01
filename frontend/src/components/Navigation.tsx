'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Home, 
  MessageCircle, 
  Search, 
  User, 
  Users, 
  Building2,
  BookOpen,
  Briefcase,
  LogOut 
} from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  // User navigation items
  const userNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/symptoms', label: 'Symptoms', icon: Heart },
    { href: '/wellness', label: 'Wellness', icon: BookOpen },
    { href: '/consultants', label: 'Consultants', icon: Users },
    { href: '/chat', label: 'Chat', icon: MessageCircle },
    { href: '/hospitals', label: 'Hospitals', icon: Building2 },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/careers', label: 'Careers', icon: Briefcase },
  ];

  // Consultant navigation items
  const consultantNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/chat', label: 'Messages', icon: MessageCircle },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  // Select navigation based on user role
  const navItems = user?.role === 'consultant' ? consultantNavItems : userNavItems;

  if (!user) return null;

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold text-gradient">Mama</span>
            {user?.role === 'consultant' && (
              <span className="ml-2 text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                Consultant
              </span>
            )}
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
