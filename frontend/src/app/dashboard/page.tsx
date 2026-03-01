'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { Baby, Heart, Calendar, TrendingUp, MessageCircle, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!mounted || !user) return null;

  const currentWeek = user.pregnancyInfo?.currentWeek || 1;
  const currentMonth = user.pregnancyInfo?.currentMonth || 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container-custom py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user.profile.firstName}! 👋
          </h1>
          <p className="text-gray-600">Here's your pregnancy journey overview</p>
        </div>

        {/* Pregnancy Status */}
        {user.pregnancyInfo?.isPregnant && (
          <Card className="mb-8 gradient-primary text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Week {currentWeek} • Month {currentMonth}
                  </h2>
                  <p className="opacity-90">You're doing great! Keep taking care of yourself.</p>
                </div>
                <Baby className="h-16 w-16 opacity-80" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QuickActionCard
            href="/symptoms"
            icon={<Heart className="h-8 w-8" />}
            title="Check Symptoms"
            description="Is this normal? Find out about your symptoms"
          />
          <QuickActionCard
            href="/wellness"
            icon={<TrendingUp className="h-8 w-8" />}
            title="Wellness Guide"
            description="Nutrition, exercise, and self-care tips"
          />
          <QuickActionCard
            href="/consultants"
            icon={<MessageCircle className="h-8 w-8" />}
            title="Consult an Expert"
            description="Talk to verified healthcare professionals"
          />
          <QuickActionCard
            href="/hospitals"
            icon={<Building2 className="h-8 w-8" />}
            title="Find Hospitals"
            description="Discover maternity hospitals near you"
          />
          <QuickActionCard
            href="/chat"
            icon={<MessageCircle className="h-8 w-8" />}
            title="My Chats"
            description="Continue your conversations"
          />
          <QuickActionCard
            href="/profile"
            icon={<Calendar className="h-8 w-8" />}
            title="My Profile"
            description="Update your information"
          />
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Your Journey</CardTitle>
            <CardDescription>Track your pregnancy milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <MilestoneItem
                week={currentWeek}
                title={`Week ${currentWeek} of Pregnancy`}
                description="Your baby is growing and developing every day"
                completed={true}
              />
              {currentWeek > 1 && (
                <MilestoneItem
                  week={currentWeek - 1}
                  title={`Week ${currentWeek - 1} Completed`}
                  description="Another week of your journey complete!"
                  completed={true}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function QuickActionCard({ href, icon, title, description }: any) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="text-pink-500 mb-4">{icon}</div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

function MilestoneItem({ week, title, description, completed }: any) {
  return (
    <div className="flex items-start space-x-4">
      <div className={`rounded-full p-2 ${completed ? 'bg-pink-100 text-pink-500' : 'bg-gray-100 text-gray-400'}`}>
        <Baby className="h-5 w-5" />
      </div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
