import { redirect } from '@/i18n/routing';

export default function AdminDashboardRedirect() {
  redirect({ href: '/admin/dashboard/packages', locale: 'en' });
}
