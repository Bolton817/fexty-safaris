'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deletePackage } from '@/lib/actions/packages';
import { useRouter } from 'next/navigation';

export default function DeletePackageButton({ id, title }: { id: string; title: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      setIsDeleting(true);
      const res = await deletePackage(id);
      
      if (res.success) {
        // revalidatePath happens on server, but we can router.refresh just in case
        router.refresh();
      } else {
        alert(res.error || 'Failed to delete package.');
        setIsDeleting(false);
      }
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Delete Package"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
