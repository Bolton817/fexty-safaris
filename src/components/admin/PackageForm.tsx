'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, UploadCloud, Save, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { createPackage, updatePackage } from '@/lib/actions/packages';

interface PackageFormProps {
  initialData?: any;
}

export default function PackageForm({ initialData }: PackageFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;
  
  // Basic Info State
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [duration, setDuration] = useState(initialData?.duration || '');
  const [categories, setCategories] = useState<string[]>(() => {
    if (Array.isArray(initialData?.category)) return initialData.category;
    if (typeof initialData?.category === 'string' && initialData.category.trim()) {
      return initialData.category.split(',').map((s: string) => s.trim());
    }
    return [];
  });
  const [newCategory, setNewCategory] = useState('');
  const [kshPrice, setKshPrice] = useState(initialData?.ksh_price?.toString() || '');
  const [usdPrice, setUsdPrice] = useState(initialData?.usd_price?.toString() || '');
  
  // Image State
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic Array States
  const [inclusions, setInclusions] = useState<string[]>(initialData?.inclusions || []);
  const [newInclusion, setNewInclusion] = useState('');
  
  const [exclusions, setExclusions] = useState<string[]>(initialData?.exclusions || []);
  const [newExclusion, setNewExclusion] = useState('');

  const [itinerary, setItinerary] = useState<any[]>(initialData?.itinerary || []);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handlers for Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('package-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('package-images')
        .getPublicUrl(filePath);

      setImageUrl(data.publicUrl);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  // Handlers for Arrays
  const addStringItem = (
    val: string, 
    setVal: React.Dispatch<React.SetStateAction<string>>, 
    list: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (val.trim()) {
      setList([...list, val.trim()]);
      setVal('');
    }
  };

  const removeStringItem = (
    index: number,
    list: string[], 
    setList: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

  // Handlers for Itinerary
  const addItineraryDay = () => {
    setItinerary([
      ...itinerary, 
      { day: itinerary.length + 1, title: '', description: '', lodging: '', meals: '' }
    ]);
  };

  const removeItineraryDay = (index: number) => {
    const newItin = itinerary.filter((_, i) => i !== index);
    // Re-sequence days
    setItinerary(newItin.map((item, i) => ({ ...item, day: i + 1 })));
  };

  const updateItineraryDay = (index: number, field: string, value: string) => {
    const newItin = [...itinerary];
    newItin[index][field] = value;
    setItinerary(newItin);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    if (!imageUrl) {
      setErrorMsg('Please upload a cover image first.');
      setIsSubmitting(false);
      return;
    }

    const payload = {
      title,
      description,
      duration,
      category: categories,
      ksh_price: kshPrice,
      usd_price: usdPrice,
      image_url: imageUrl,
      inclusions,
      exclusions,
      itinerary
    };

    let res;
    if (isEditing) {
      res = await updatePackage(initialData.id, payload);
    } else {
      res = await createPackage(payload);
    }
    
    if (res.success) {
      router.refresh();
      router.push('/admin/dashboard/packages');
    } else {
      setErrorMsg(res.error || 'Failed to save package');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <form onSubmit={handleSubmit}>
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Package' : 'Create New Package'}</h1>
            <p className="text-sm text-gray-500">{isEditing ? 'Update the details below' : 'Draft a new tour package for the catalog'}</p>
          </div>
          <div className="flex items-center gap-4">
            {errorMsg && <span className="text-red-500 text-sm font-medium">{errorMsg}</span>}
            <button 
              type="button" 
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || isUploading}
              className="flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-md"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? 'Saving...' : 'Save Package'}
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 px-4 space-y-8">
          
          {/* Section: Media */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-400" />
              Cover Image
            </h2>
            
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 relative overflow-hidden transition-colors hover:bg-gray-100 cursor-pointer"
                 onClick={() => fileInputRef.current?.click()}>
              {imageUrl ? (
                <div className="absolute inset-0">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium">Click to change image</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900">Click to upload cover image</p>
                  <p className="text-xs text-gray-500 mt-1">JPEG, PNG, WEBP up to 5MB</p>
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="font-bold text-gray-900 animate-pulse">Uploading...</span>
                </div>
              )}
            </div>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
            />
          </div>

          {/* Section: Basic Info */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Basic Details</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Title</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)}
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none" 
                       placeholder="e.g. Masai Mara Migration Experience" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input type="text" required value={duration} onChange={e => setDuration(e.target.value)}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none" 
                         placeholder="e.g. 4 Days / 3 Nights" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                  <div className="flex gap-2 mb-2">
                    <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)}
                           onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addStringItem(newCategory, setNewCategory, categories, setCategories))}
                           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none text-sm" 
                           placeholder="e.g. Honeymoon" />
                    <button type="button" onClick={() => addStringItem(newCategory, setNewCategory, categories, setCategories)}
                            className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      <Plus className="w-5 h-5"/>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat, i) => (
                      <span key={i} className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">
                        {cat}
                        <button type="button" onClick={() => removeStringItem(i, categories, setCategories)} className="text-blue-400 hover:text-blue-600">
                          <Trash2 className="w-3 h-3"/>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (KSH)</label>
                  <input type="number" required value={kshPrice} onChange={e => setKshPrice(e.target.value)}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none" 
                         placeholder="150000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
                  <input type="number" required value={usdPrice} onChange={e => setUsdPrice(e.target.value)}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none" 
                         placeholder="1200" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required rows={4} value={description} onChange={e => setDescription(e.target.value)}
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none resize-y" 
                       placeholder="Write a compelling overview of the package..." />
              </div>
            </div>
          </div>

          {/* Section: Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inclusions */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Inclusions</h2>
              <div className="flex gap-2 mb-4">
                <input type="text" value={newInclusion} onChange={e => setNewInclusion(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addStringItem(newInclusion, setNewInclusion, inclusions, setInclusions))}
                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Add inclusion..." />
                <button type="button" onClick={() => addStringItem(newInclusion, setNewInclusion, inclusions, setInclusions)}
                        className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"><Plus className="w-5 h-5"/></button>
              </div>
              <ul className="space-y-2">
                {inclusions.map((inc, i) => (
                  <li key={i} className="flex items-center justify-between bg-green-50/50 p-3 rounded-lg border border-green-100">
                    <span className="text-sm text-gray-700">{inc}</span>
                    <button type="button" onClick={() => removeStringItem(i, inclusions, setInclusions)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Exclusions */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Exclusions</h2>
              <div className="flex gap-2 mb-4">
                <input type="text" value={newExclusion} onChange={e => setNewExclusion(e.target.value)}
                       onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addStringItem(newExclusion, setNewExclusion, exclusions, setExclusions))}
                       className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Add exclusion..." />
                <button type="button" onClick={() => addStringItem(newExclusion, setNewExclusion, exclusions, setExclusions)}
                        className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"><Plus className="w-5 h-5"/></button>
              </div>
              <ul className="space-y-2">
                {exclusions.map((exc, i) => (
                  <li key={i} className="flex items-center justify-between bg-red-50/50 p-3 rounded-lg border border-red-100">
                    <span className="text-sm text-gray-700">{exc}</span>
                    <button type="button" onClick={() => removeStringItem(i, exclusions, setExclusions)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4"/></button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Itinerary Builder */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Itinerary Builder</h2>
              <button type="button" onClick={addItineraryDay} className="flex items-center gap-1 text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded hover:bg-gray-200">
                <Plus className="w-4 h-4" /> Add Day
              </button>
            </div>
            
            <div className="space-y-6">
              {itinerary.length === 0 && (
                <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
                  <p className="text-gray-500">No days added yet. Click "Add Day" to build the itinerary.</p>
                </div>
              )}
              
              {itinerary.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 bg-gray-50 relative group">
                  <button type="button" onClick={() => removeItineraryDay(index)} 
                          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <h3 className="font-bold text-gray-900 mb-4">Day {item.day}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Day Title</label>
                      <input type="text" value={item.title} onChange={e => updateItineraryDay(index, 'title', e.target.value)}
                             className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm" placeholder="e.g. Arrival in Nairobi" />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Description</label>
                      <textarea rows={2} value={item.description} onChange={e => updateItineraryDay(index, 'description', e.target.value)}
                             className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm resize-y" placeholder="What happens on this day?" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Lodging</label>
                        <input type="text" value={item.lodging} onChange={e => updateItineraryDay(index, 'lodging', e.target.value)}
                               className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm" placeholder="e.g. Premium Tented Camp" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Meals</label>
                        <input type="text" value={item.meals} onChange={e => updateItineraryDay(index, 'meals', e.target.value)}
                               className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm" placeholder="e.g. Breakfast, Lunch, Dinner" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
