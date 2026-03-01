'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { ArrowLeft, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { io, Socket } from 'socket.io-client';

interface Message {
  _id: string;
  chatId: string;
  sender: {
    _id: string;
    profile: {
      firstName: string;
      lastName: string;
    };
  };
  content: string;
  type: string;
  createdAt: string;
}

export default function ChatConversationPage() {
  const router = useRouter();
  const params = useParams();
  const chatId = params?.chatId as string;
  const user = useAuthStore((state) => state.user);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [otherUser, setOtherUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!chatId) return;

    // Initialize Socket.io
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const socketUrl = apiUrl.replace('/api', '');
    
    socketRef.current = io(socketUrl, {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected');
      socketRef.current?.emit('join-chat', chatId);
    });

    socketRef.current.on('new-message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Fetch initial data
    fetchMessages();
    fetchChatDetails();

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user, router, chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/chat/${chatId}/messages`);
      setMessages(response.data.data);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const fetchChatDetails = async () => {
    try {
      const response = await api.get('/chat');
      const chat = response.data.data.find((c: any) => c._id === chatId);
      if (chat) {
        const other = chat.participants.find(
          (p: any) => p.userId._id !== user?._id
        );
        setOtherUser(other?.userId);
      }
    } catch (error) {
      console.error('Failed to load chat details');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      await api.post(`/chat/${chatId}/messages`, {
        content: newMessage,
        type: 'text'
      });
      setNewMessage('');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <main className="flex-1 container-custom py-8 flex flex-col">
        <div className="mb-4">
          <Link href="/chat" className="flex items-center text-pink-500 hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Chats
          </Link>
          {otherUser && (
            <h1 className="text-2xl font-bold">
              {otherUser.profile.firstName} {otherUser.profile.lastName}
            </h1>
          )}
        </div>

        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 flex flex-col p-4">
            {loading ? (
              <div className="text-center py-12">
                <p>Loading messages...</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      No messages yet. Start the conversation!
                    </div>
                  ) : (
                    messages.map((message) => {
                      const isOwnMessage = message.sender._id === user._id;
                      return (
                        <div
                          key={message._id}
                          className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isOwnMessage
                                ? 'bg-pink-500 text-white'
                                : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            <p className="text-sm break-words">{message.content}</p>
                            <p className={`text-xs mt-1 ${isOwnMessage ? 'text-pink-100' : 'text-gray-500'}`}>
                              {new Date(message.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={sending}
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    disabled={!newMessage.trim() || sending}
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
