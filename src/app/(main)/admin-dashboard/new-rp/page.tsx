'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewResidencyPartnerPage() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with name:", name);

    try {
      const res = await fetch('http://localhost:8080/api/v1/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      console.log("RES: ", res)

      if (res.ok) {
        alert('Successfully added new Residency Partner')
        router.push('/admin-dashboard')
      } else {
        const data = await res.json()
        console.log("Failed to create residency partner")
        alert('Failed to create residency partner')
      }
    } catch (err) {
      alert('Request failed: ' + err);
    }
  };

  return (
    <main className="pt-24 px-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Residency Partner</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Company Name</label>
          <input
            type="text"
            className="w-full p-2 border"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
