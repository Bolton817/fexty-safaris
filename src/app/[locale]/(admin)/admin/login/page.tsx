'use client'

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { signIn } from '@/lib/actions';

export default function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await signIn(formData);

    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.error || 'Failed to login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-sand-200 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-savanna-900 mb-2">Fexty Admin</h1>
          <p className="text-sand-600">Sign in to manage your safaris.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-savanna-800 mb-2">Email</label>
            <input 
              type="email" 
              name="email"
              required 
              className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sunset-500"
              placeholder="admin@fextysafaris.co.ke"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-savanna-800 mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              required 
              className="w-full px-4 py-3 bg-sand-50 border border-sand-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sunset-500"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-savanna-900 hover:bg-savanna-950 text-white font-bold py-3 rounded-xl transition-all shadow-md disabled:opacity-70"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
