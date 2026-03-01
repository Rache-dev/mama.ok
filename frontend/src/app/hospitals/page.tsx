'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { MapPin, Star, Phone, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function HospitalsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchHospitals();
  }, [user, router]);

  const fetchHospitals = async () => {
    try {
      const response = await api.get('/hospitals');
      setHospitals(response.data.data);
    } catch (error) {
      toast.error('Failed to load hospitals');
    } finally {
      setLoading(false);
    }
  };

  const selectHospital = async (hospitalId: string) => {
    try {
      await api.put('/users/hospital', { hospitalId });
      toast.success('Hospital selected successfully');
    } catch (error) {
      toast.error('Failed to select hospital');
    }
  };

  if (!user) return null;

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.address.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Hospitals</h1>
          <p className="text-gray-600">Discover the best maternity hospitals near you</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search hospitals by name or city..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Hospitals List */}
        {loading ? (
          <div className="text-center py-12">
            <p>Loading hospitals...</p>
          </div>
        ) : filteredHospitals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No hospitals found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredHospitals.map((hospital) => (
              <Card key={hospital._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{hospital.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        {hospital.address.city}, {hospital.address.state}
                      </span>
                    </div>
                  </CardDescription>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm font-semibold">
                      {hospital.rating.average.toFixed(1)}
                    </span>
                    <span className="ml-1 text-sm text-gray-500">
                      ({hospital.rating.count} reviews)
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {hospital.contact.phone && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>{hospital.contact.phone}</span>
                      </div>
                    )}
                    
                    {hospital.facilities && hospital.facilities.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-2">Facilities:</p>
                        <div className="flex flex-wrap gap-2">
                          {hospital.facilities.slice(0, 6).map((facility: string, idx: number) => (
                            <span
                              key={idx}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                            >
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-2">
                      <Button 
                        className="w-full"
                        onClick={() => selectHospital(hospital._id)}
                      >
                        Select This Hospital
                      </Button>
                    </div>
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
