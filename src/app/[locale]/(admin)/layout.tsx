import { Link } from '@/i18n/routing';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sand-100 flex w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-savanna-950 text-white p-6 hidden md:block shrink-0">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4">
          <Link href="/admin/dashboard/packages" className="block text-sunset-400 font-medium">Dashboard</Link>
          <Link href="/" target="_blank" rel="noopener noreferrer" className="block text-sand-400 hover:text-white transition-colors">View Site</Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
