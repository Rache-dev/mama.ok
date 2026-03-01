'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';
import { Briefcase } from 'lucide-react';

export default function CareersPage() {
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await api.get('/careers');
      setCareers(response.data.data);
    } catch (error) {
      console.error('Failed to load careers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Careers at Mama</h1>
          <p className="text-gray-600">Join our mission to support mothers worldwide</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading career opportunities...</p>
          </div>
        ) : careers.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Vacancies at This Time</h3>
              <p className="text-gray-600">
                We don't have any open positions right now, but we're always growing!
                Check back soon for new opportunities.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {careers.map((career) => (
              <Card key={career._id}>
                <CardHeader>
                  <CardTitle>{career.title}</CardTitle>
                  <CardDescription>
                    {career.location} • {career.type}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{career.description}</p>
                  {career.requirements && career.requirements.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {career.requirements.map((req: string, idx: number) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Company Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Working at Mama</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              At Mama, we're building the future of maternal healthcare. Our team is passionate about 
              supporting women through their pregnancy journey and beyond. We offer competitive compensation, 
              flexible work arrangements, and the opportunity to make a real impact in people's lives.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Competitive Benefits</h4>
                <p className="text-sm text-gray-600">Health insurance, retirement plans, and more</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Flexible Work</h4>
                <p className="text-sm text-gray-600">Remote options and flexible hours</p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Growth Opportunities</h4>
                <p className="text-sm text-gray-600">Professional development and career advancement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consultant Opportunity */}
        <Card className="mt-8 border-pink-200 bg-pink-50">
          <CardHeader>
            <CardTitle className="text-pink-700">Become a Consultant</CardTitle>
            <CardDescription>Healthcare professionals can join as consultants and earn extra income</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              If you're a qualified obstetrician, midwife, nutritionist, or maternal health specialist, 
              you can register as a consultant on our platform and help expecting mothers while earning 
              additional income.
            </p>
            <p className="text-sm text-gray-600">
              Contact us at <a href="mailto:consultants@mama.com" className="text-pink-600 hover:underline">consultants@mama.com</a> to learn more.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
