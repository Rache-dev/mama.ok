'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Star, MessageCircle, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ConsultantsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [consultants, setConsultants] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchConsultants();
  }, [user, router]);

  const fetchConsultants = async () => {
    try {
      const response = await api.get('/consultants');
      setConsultants(response.data.data);
    } catch (error) {
      toast.error('Failed to load consultants');
    } finally {
      setLoading(false);
    }
  };

  const startChat = async (consultantId: string) => {
    try {
      const response = await api.post('/chat', { consultantId });
      router.push(`/chat/${response.data.data._id}`);
    } catch (error) {
      toast.error('Failed to start chat');
    }
  };

  if (!user) return null;

  const filteredConsultants = consultants.filter(consultant =>
    consultant.userId?.profile?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    consultant.userId?.profile?.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    consultant.specialization.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find a Consultant</h1>
          <p className="text-gray-600">Connect with verified healthcare professionals</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name or specialization..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Consultants Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p>Loading consultants...</p>
          </div>
        ) : filteredConsultants.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No consultants found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConsultants.map((consultant) => (
              <Card key={consultant._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>
                        {consultant.userId?.profile?.firstName} {consultant.userId?.profile?.lastName}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {consultant.specialization.join(', ')}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-semibold">
                      {consultant.rating.average.toFixed(1)}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">
                      ({consultant.rating.count} reviews)
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-3">{consultant.bio}</p>
                    
                    <div>
                      <span className="text-sm font-semibold">Experience:</span>
                      <span className="ml-2 text-sm">{consultant.experience.years} years</span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-semibold">Languages:</span>
                      <span className="ml-2 text-sm">{consultant.languages.join(', ')}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-semibold">Rate:</span>
                      <span className="ml-2 text-sm">
                        ${consultant.consultationRate.amount} {consultant.consultationRate.currency}
                      </span>
                    </div>
                    
                    <Button 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => startChat(consultant.userId._id)}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Start Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
