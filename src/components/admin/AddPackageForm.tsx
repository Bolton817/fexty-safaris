'use client'

import { useRef, useState } from 'react';
import { addPackage } from '@/lib/actions';
import { Upload } from 'lucide-react';

export default function AddPackageForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const result = await addPackage(formData);

    if (result.success) {
      setMessage('Package added successfully!');
      formRef.current?.reset();
    } else {
      setMessage(result.error || 'Failed to add package.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-sand-200">
      <h3 className="text-xl font-bold text-savanna-900 mb-6">Add New Package</h3>
      
      {message && (
        <div className={`p-4 rounded-md mb-6 ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-savanna-800 mb-1">Title</label>
          <input required type="text" name="title" className="w-full px-4 py-2 rounded-md border border-sand-300 focus:outline-none focus:ring-2 focus:ring-sunset-500" placeholder="e.g. Maasai Mara Migration" />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-savanna-800 mb-1">Description</label>
          <textarea required name="description" rows={3} className="w-full px-4 py-2 rounded-md border border-sand-300 focus:outline-none focus:ring-2 focus:ring-sunset-500" placeholder="Describe the package..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-savanna-800 mb-1">Price (KSH)</label>
            <input required type="number" name="kshPrice" min="0" step="0.01" className="w-full px-4 py-2 rounded-md border border-sand-300 focus:outline-none focus:ring-2 focus:ring-sunset-500" placeholder="e.g. 15000" />
          </div>
          <div>
            <label className="block text-sm font-medium text-savanna-800 mb-1">Price (USD)</label>
            <input required type="number" name="usdPrice" min="0" step="0.01" className="w-full px-4 py-2 rounded-md border border-sand-300 focus:outline-none focus:ring-2 focus:ring-sunset-500" placeholder="e.g. 120" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-savanna-800 mb-1">Duration</label>
            <input required type="text" name="duration" className="w-full px-4 py-2 rounded-md border border-sand-300 focus:outline-none focus:ring-2 focus:ring-sunset-500" placeholder="e.g. 3 Days, 2 Nights" />
          </div>
          <div>
            <label className="block text-sm font-medium text-savanna-800 mb-1">Category</label>
            <select required name="category" className="w-full px-4 py-2 rounded-md border border-sand-300 focus:outline-none focus:ring-2 focus:ring-sunset-500">
              <option value="Local Deals">Local Deals</option>
              <option value="Non-Residents">Non-Residents</option>
              <option value="Themed Holidays">Themed Holidays</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-savanna-800 mb-1">Feature Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-sand-300 border-dashed rounded-md hover:border-sunset-500 transition-colors bg-sand-50">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-sand-400" />
              <div className="flex text-sm text-sand-600 justify-center">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-sunset-500 hover:text-sunset-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sunset-500 px-2 py-1 shadow-sm">
                  <span>Upload a file</span>
                  <input id="file-upload" name="image" type="file" accept="image/*" className="sr-only" required />
                </label>
              </div>
              <p className="text-xs text-sand-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-savanna-900 hover:bg-savanna-950 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:bg-sand-400 disabled:cursor-not-allowed mt-4"
        >
          {isSubmitting ? 'Adding Package...' : 'Add Package'}
        </button>
      </form>
    </div>
  );
}
