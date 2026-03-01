'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Search, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SymptomsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [filteredSymptoms, setFilteredSymptoms] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<number>(user?.pregnancyInfo?.currentMonth || 1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchSymptoms();
  }, [user, router, selectedMonth]);

  const fetchSymptoms = async () => {
    try {
      const response = await api.get(`/symptoms?month=${selectedMonth}`);
      setSymptoms(response.data.data);
      setFilteredSymptoms(response.data.data);
    } catch (error) {
      toast.error('Failed to load symptoms');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredSymptoms(symptoms);
    } else {
      const filtered = symptoms.filter(symptom =>
        symptom.symptomName.toLowerCase().includes(query.toLowerCase()) ||
        symptom.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSymptoms(filtered);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Symptom Checker</h1>
          <p className="text-gray-600">Is this normal? Check symptoms for your pregnancy stage</p>
        </div>

        {/* Month Selector */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(month => (
                <Button
                  key={month}
                  variant={selectedMonth === month ? 'default' : 'outline'}
                  onClick={() => setSelectedMonth(month)}
                >
                  Month {month}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search symptoms..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Symptoms List */}
        {loading ? (
          <div className="text-center py-12">
            <p>Loading symptoms...</p>
          </div>
        ) : filteredSymptoms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No symptoms found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSymptoms.map((symptom) => (
              <Card key={symptom._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{symptom.symptomName}</CardTitle>
                    {symptom.isNormal ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <AlertCircle className="h-6 w-6 text-yellow-500" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Category:</span>
                      <span className="ml-2 text-sm">{symptom.category}</span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-500">Severity:</span>
                      <span className={`ml-2 text-sm px-2 py-1 rounded ${
                        symptom.severity === 'mild' ? 'bg-green-100 text-green-700' :
                        symptom.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {symptom.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{symptom.description}</p>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm font-semibold text-blue-900 mb-1">When to worry:</p>
                      <p className="text-sm text-blue-700">{symptom.whenToWorry}</p>
                    </div>
                    {symptom.recommendations && symptom.recommendations.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-1">Recommendations:</p>
                        <ul className="text-sm text-gray-600 list-disc list-inside">
                          {symptom.recommendations.slice(0, 3).map((rec: string, idx: number) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
