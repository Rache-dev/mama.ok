'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function SearchPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handleSearch = async (query: string) => {
    if (query.trim().length < 2) {
      setResults(null);
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
      setResults(response.data.data);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Search</h1>
          <p className="text-gray-600">Find symptoms, wellness tips, consultants, and hospitals</p>
        </div>

        {/* Search Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for anything..."
                className="pl-10 text-lg"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {loading && (
          <div className="text-center py-12">
            <p>Searching...</p>
          </div>
        )}

        {results && !loading && (
          <div className="space-y-8">
            {/* Symptoms Results */}
            {results.symptoms && results.symptoms.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Symptoms ({results.symptoms.length})</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.symptoms.map((symptom: any) => (
                    <Link key={symptom._id} href={`/symptoms`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-lg">{symptom.symptomName}</CardTitle>
                          <CardDescription className="line-clamp-2">{symptom.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Consultants Results */}
            {results.consultants && results.consultants.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Consultants ({results.consultants.length})</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.consultants.map((consultant: any) => (
                    <Link key={consultant._id} href={`/consultants`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            {consultant.userId?.profile?.firstName} {consultant.userId?.profile?.lastName}
                          </CardTitle>
                          <CardDescription>{consultant.specialization.join(', ')}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Hospitals Results */}
            {results.hospitals && results.hospitals.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Hospitals ({results.hospitals.length})</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {results.hospitals.map((hospital: any) => (
                    <Link key={hospital._id} href={`/hospitals`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-lg">{hospital.name}</CardTitle>
                          <CardDescription>
                            {hospital.address.city}, {hospital.address.state}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {results.symptoms?.length === 0 && 
             results.consultants?.length === 0 && 
             results.hospitals?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
