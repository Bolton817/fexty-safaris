import { supabase } from '@/lib/supabase/server';
import { Plus, Edit2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import DeletePackageButton from '@/components/admin/DeletePackageButton';
import { supabase as supabaseAdmin } from '@/lib/supabase'; // Service role client

export const revalidate = 0; // Ensure admin dashboard is never fully cached

export default async function PackagesDashboard() {
  const { data: packages, error } = await supabaseAdmin
    .from('packages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching packages:', error);
  }

  const pkgList = packages || [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Packages</h1>
          <p className="text-sm text-gray-500">View, edit, and manage all your safari packages.</p>
        </div>
        <Link 
          href="/admin/dashboard/packages/new"
          className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add New Package
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Package</th>
                <th className="p-4">Category</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Price (KSH)</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pkgList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500">
                    No packages found. Click "Add New Package" to get started.
                  </td>
                </tr>
              ) : (
                pkgList.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-200 shrink-0 overflow-hidden border border-gray-200">
                          {pkg.image_url ? (
                            <img src={pkg.image_url} alt={pkg.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-100" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{pkg.title}</div>
                          <div className="text-xs text-gray-500 truncate max-w-[250px]">{pkg.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(pkg.category) 
                          ? pkg.category.map((cat: string, i: number) => (
                              <span key={i} className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                {cat}
                              </span>
                            ))
                          : (
                              <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                {pkg.category}
                              </span>
                            )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium">
                      {pkg.duration}
                    </td>
                    <td className="p-4 text-sm font-bold text-gray-900">
                      <div className="flex flex-col">
                        <span>KSH {pkg.ksh_price?.toLocaleString() || 0}</span>
                        <span className="text-gray-500 text-xs font-medium">${pkg.usd_price?.toLocaleString() || 0}</span>
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/dashboard/packages/${pkg.id}/edit`}
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit Package"
                        >
                          <Edit2 className="w-5 h-5" />
                        </Link>
                        <DeletePackageButton id={pkg.id} title={pkg.title} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
