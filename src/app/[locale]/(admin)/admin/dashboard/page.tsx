import { fetchPackages } from '@/lib/actions';
import AddPackageForm from '@/components/admin/AddPackageForm';
import PriceDisplay from '@/components/PriceDisplay';

// Since this page handles data fetching dynamically, force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const result = await fetchPackages();
  const packages = result.data || [];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-savanna-950 mb-2">Packages Dashboard</h1>
        <p className="text-sand-700">Manage your travel packages and local deals.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-sand-200 overflow-hidden">
            <div className="p-6 border-b border-sand-200">
              <h3 className="text-xl font-bold text-savanna-900">Existing Packages</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-sand-50 text-sand-600 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Package</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Duration</th>
                    <th className="p-4 font-medium text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-200">
                  {packages.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-sand-500">
                        No packages found. Add one to get started!
                      </td>
                    </tr>
                  ) : (
                    packages.map((pkg: { id: string; image_url: string; title: string; category: string; duration: string; ksh_price: number; usd_price: number }) => (
                      <tr key={pkg.id} className="hover:bg-sand-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {pkg.image_url ? (
                              <img src={pkg.image_url} alt={pkg.title} className="w-12 h-12 rounded object-cover" />
                            ) : (
                              <div className="w-12 h-12 rounded bg-sand-200 flex items-center justify-center text-sand-400 text-xs">No Img</div>
                            )}
                            <div>
                              <p className="font-semibold text-savanna-900">{pkg.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sand-700">{pkg.category}</td>
                        <td className="p-4 text-sand-700">{pkg.duration}</td>
                        <td className="p-4 text-right">
                          <PriceDisplay ksh={pkg.ksh_price} usd={pkg.usd_price} className="text-savanna-900 font-medium block" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Package Form Area */}
        <div className="lg:col-span-1">
          <AddPackageForm />
        </div>
      </div>
    </div>
  );
}
