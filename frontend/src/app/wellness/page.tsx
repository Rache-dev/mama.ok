'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { Apple, Dumbbell, Moon, Book, Film, Headphones } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WellnessPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [wellness, setWellness] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(user?.pregnancyInfo?.currentMonth || 1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchWellness();
  }, [user, router, selectedMonth, selectedCategory]);

  const fetchWellness = async () => {
    try {
      const params: any = { month: selectedMonth };
      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }
      const response = await api.get('/wellness', { params });
      setWellness(response.data.data);
    } catch (error) {
      toast.error('Failed to load wellness recommendations');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const categories = [
    { value: 'all', label: 'All', icon: null },
    { value: 'food', label: 'Nutrition', icon: <Apple className="h-4 w-4" /> },
    { value: 'exercise', label: 'Exercise', icon: <Dumbbell className="h-4 w-4" /> },
    { value: 'sleep', label: 'Sleep', icon: <Moon className="h-4 w-4" /> },
    { value: 'books', label: 'Books', icon: <Book className="h-4 w-4" /> },
    { value: 'movies', label: 'Movies', icon: <Film className="h-4 w-4" /> },
    { value: 'podcasts', label: 'Podcasts', icon: <Headphones className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Wellness Guide</h1>
          <p className="text-gray-600">Personalized recommendations for a healthy pregnancy</p>
        </div>

        {/* Month Selector */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(month => (
                <Button
                  key={month}
                  variant={selectedMonth === month ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMonth(month)}
                >
                  Month {month}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat.value)}
                  className="flex items-center gap-2"
                >
                  {cat.icon}
                  {cat.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wellness Recommendations */}
        {loading ? (
          <div className="text-center py-12">
            <p>Loading recommendations...</p>
          </div>
        ) : wellness.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No recommendations found</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {wellness.map((item) => (
              <Card key={item._id}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {item.category === 'food' && item.foods && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Recommended Foods</h3>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {item.foods.map((food: any, idx: number) => (
                          <div key={idx} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2">{food.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{food.benefits}</p>
                            <div className="flex flex-wrap gap-1">
                              {food.nutrients.map((nutrient: string, nIdx: number) => (
                                <span key={nIdx} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                                  {nutrient}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.category === 'exercise' && item.exercises && (
                    <div className="space-y-4">
                      <h3 className="font-semibold">Recommended Exercises</h3>
                      <div className="space-y-3">
                        {item.exercises.map((exercise: any, idx: number) => (
                          <div key={idx} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">{exercise.name}</h4>
                              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {exercise.duration}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
                            <p className="text-sm"><span className="font-semibold">Benefits:</span> {exercise.benefits}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.category === 'sleep' && item.sleepTips && (
                    <div className="space-y-3">
                      {item.sleepTips.map((tip: any, idx: number) => (
                        <div key={idx} className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-1">{tip.tip}</h4>
                          <p className="text-sm text-gray-600 mb-1">{tip.description}</p>
                          <p className="text-sm text-purple-700">✓ {tip.benefit}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.category === 'books' && item.books && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {item.books.map((book: any, idx: number) => (
                        <div key={idx} className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-1">{book.title}</h4>
                          <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
                          <p className="text-sm text-gray-600">{book.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.category === 'movies' && item.movies && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {item.movies.map((movie: any, idx: number) => (
                        <div key={idx} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{movie.title}</h4>
                            <span className="text-sm text-gray-500">{movie.year}</span>
                          </div>
                          <p className="text-sm text-gray-600">{movie.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.category === 'podcasts' && item.podcasts && (
                    <div className="space-y-3">
                      {item.podcasts.map((podcast: any, idx: number) => (
                        <div key={idx} className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-1">{podcast.name}</h4>
                          <p className="text-sm text-gray-500 mb-2">Hosted by {podcast.host}</p>
                          <p className="text-sm text-gray-600">{podcast.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
