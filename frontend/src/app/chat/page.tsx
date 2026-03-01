'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ChatPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchChats();
  }, [user, router]);

  const fetchChats = async () => {
    try {
      const response = await api.get('/chat');
      setChats(response.data.data);
    } catch (error) {
      toast.error('Failed to load chats');
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
          <h1 className="text-4xl font-bold mb-2">My Conversations</h1>
          <p className="text-gray-600">Continue your chats with consultants</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading chats...</p>
          </div>
        ) : chats.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No conversations yet</p>
              <Link href="/consultants">
                <span className="text-pink-500 hover:underline">Start a conversation with a consultant</span>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {chats.map((chat) => {
              const otherParticipant = chat.participants.find(
                (p: any) => p.userId._id !== user._id
              );
              return (
                <Link key={chat._id} href={`/chat/${chat._id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {otherParticipant?.userId.profile.firstName} {otherParticipant?.userId.profile.lastName}
                        </CardTitle>
                        <span className="text-sm text-gray-500">
                          {new Date(chat.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    {chat.lastMessage && (
                      <CardContent>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {chat.lastMessage.content}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
