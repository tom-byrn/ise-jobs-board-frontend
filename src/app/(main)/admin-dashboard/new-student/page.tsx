'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/client';
import { User } from '@supabase/supabase-js'

export default function NewStudentPage() {
  const router = useRouter();
  const supabase = createClient()
  const [email, setEmail] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
          error
        } = await supabase.auth.getSession()
        
        if (error || !session) {
          alert('Not authenticated')
          router.push('/login'); // Redirect to login page
          return;
        }
        
        setToken(session.access_token);
      } catch (err) {
        console.error('Auth check failed:', err);
        alert('Authentication failed');
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      alert('Not authenticated');
      return;
    }

    console.log("Form submitted with email:", email);

    try {
      const res = await fetch('http://localhost:8080/api/v1/accepted-student-emails', {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json',
             'Authorization' : `Bearer ${token}`
            },
        body: JSON.stringify({ email }),
      });
      console.log("RES: ", res)

      if (res.ok) {
        alert('Successfully added new student email')
        router.push('/admin-dashboard')
      } else {
        const data = await res.json()
        console.log("Failed to add new student email")
        alert('Failed to add new student email')
      }
    } catch (err) {
      alert('Request failed: ' + err);
    }
  };

  if (loading) {
    return (
      <main className="pt-24 px-6 max-w-xl mx-auto">
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main className="pt-24 px-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Student Email</label>
          <input
            type="text"
            className="w-full p-2 border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-4 pt-2">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 hover:bg-green-700">
            Submit
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin-dashboard')}
            className="bg-gray-600 text-white px-4 py-2 hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}