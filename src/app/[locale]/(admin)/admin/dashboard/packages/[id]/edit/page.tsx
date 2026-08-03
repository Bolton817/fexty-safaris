import { fetchPackageById } from '@/lib/actions';
import { notFound } from 'next/navigation';
import PackageForm from '@/components/admin/PackageForm';

export default async function EditPackageDashboard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { success, data: pkg } = await fetchPackageById(id);

  if (!success || !pkg) {
    notFound();
  }

  return <PackageForm initialData={pkg} />;
}
