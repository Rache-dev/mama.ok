'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Baby, MessageCircle, Building2, BookOpen, Shield } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-white">
      {/* Header */}
      <header className="container-custom py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-10 w-10 text-pink-500" />
            <span className="text-3xl font-bold text-gradient">Mama</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container-custom py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Journey to{' '}
            <span className="text-gradient">Motherhood</span>,{' '}
            Supported Every Step
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Expert guidance, personalized care, and a supportive community for expecting mothers. 
            From pregnancy to postpartum, we're here for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/consultants">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Meet Our Consultants
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
         Everything You Need for a <span className="text-gradient">Healthy Pregnancy</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Baby className="h-12 w-12" />}
            title="Month-by-Month Guidance"
            description="Track your pregnancy journey with personalized symptom checkers and wellness recommendations for each stage."
          />
          <FeatureCard
            icon={<MessageCircle className="h-12 w-12" />}
            title="Expert Consultations"
            description="Connect with verified obstetricians, midwives, and maternal health specialists via real-time chat."
          />
          <FeatureCard
            icon={<Building2 className="h-12 w-12" />}
            title="Hospital Finder"
            description="Find the best maternity hospitals near you with detailed facilities and ratings."
          />
          <FeatureCard
            icon={<BookOpen className="h-12 w-12" />}
            title="Wellness Resources"
            description="Access curated food plans, exercises, books, movies, and podcasts for every month."
          />
          <FeatureCard
            icon={<Heart className="h-12 w-12" />}
            title="AI Health Assistant"
            description="Get instant answers to your pregnancy questions with our Grok AI-powered consultation."
          />
          <FeatureCard
            icon={<Shield className="h-12 w-12" />}
            title="Secure & Private"
            description="Your health data is encrypted and protected with enterprise-grade security."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary py-20">
        <div className="container-custom text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Begin Your Pregnancy Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of mothers who trust Mama for their pregnancy support
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-8 w-8 text-pink-400" />
                <span className="text-2xl font-bold">Mama</span>
              </div>
              <p className="text-gray-400">
                Supporting mothers through pregnancy and beyond.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/symptoms">Symptoms</Link></li>
                <li><Link href="/wellness">Wellness</Link></li>
                <li><Link href="/consultants">Consultants</Link></li>
                <li><Link href="/hospitals">Hospitals</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/terms">Terms & Conditions</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Payment Methods</h3>
              <p className="text-gray-400 text-sm">
                We accept: Credit Cards, Debit Cards, PayPal, Bank Transfers
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Mama Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-pink-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
