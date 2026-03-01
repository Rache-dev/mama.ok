'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { User, Baby, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    profile: {
      firstName: '',
      lastName: '',
      phone: '',
    },
    pregnancyInfo: {
      isPregnant: false,
      currentWeek: 1,
      currentMonth: 1,
      dueDate: '',
    },
    location: {
      city: '',
      state: '',
      country: '',
    },
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    setFormData({
      profile: {
        firstName: user.profile.firstName || '',
        lastName: user.profile.lastName || '',
        phone: user.profile.phone || '',
      },
      pregnancyInfo: {
        isPregnant: user.pregnancyInfo?.isPregnant || false,
        currentWeek: user.pregnancyInfo?.currentWeek || 1,
        currentMonth: user.pregnancyInfo?.currentMonth || 1,
        dueDate: user.pregnancyInfo?.dueDate || '',
      },
      location: {
        city: user.location?.city || '',
        state: user.location?.state || '',
        country: user.location?.country || '',
      },
    });
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put('/users/profile', formData);
      updateUser(response.data.data);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-gray-600">Manage your account information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.profile.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, firstName: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.profile.lastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile: { ...formData.profile, lastName: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email (cannot be changed)</Label>
                  <Input id="email" value={user.email} disabled />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.profile.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, phone: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pregnancy Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Baby className="h-5 w-5" />
                  Pregnancy Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPregnant"
                    checked={formData.pregnancyInfo.isPregnant}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pregnancyInfo: {
                          ...formData.pregnancyInfo,
                          isPregnant: e.target.checked,
                        },
                      })
                    }
                  />
                  <Label htmlFor="isPregnant">I am currently pregnant</Label>
                </div>
                {formData.pregnancyInfo.isPregnant && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currentWeek">Current Week</Label>
                        <Input
                          id="currentWeek"
                          type="number"
                          min="1"
                          max="42"
                          value={formData.pregnancyInfo.currentWeek}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pregnancyInfo: {
                                ...formData.pregnancyInfo,
                                currentWeek: parseInt(e.target.value) || 1,
                                currentMonth: Math.ceil((parseInt(e.target.value) || 1) / 4.33),
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="currentMonth">Current Month</Label>
                        <Input
                          id="currentMonth"
                          type="number"
                          value={formData.pregnancyInfo.currentMonth}
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={formData.pregnancyInfo.dueDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pregnancyInfo: {
                              ...formData.pregnancyInfo,
                              dueDate: e.target.value,
                            },
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.location.city}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: { ...formData.location, city: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.location.state}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: { ...formData.location, state: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.location.country}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, country: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
