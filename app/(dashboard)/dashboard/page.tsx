import { redirect } from 'next/navigation';
import { getUser } from '@/lib/db/queries';
import { isUserAdmin } from '@/lib/auth/permissions';
import DynamicDashboard from './DynamicDashboard';

export default async function DashboardPage() {
  const user = await getUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Check if user is admin
  const isAdmin = await isUserAdmin(user.id);

  // Redirect admin users to admin dashboard
  if (isAdmin) {
    redirect('/dashboard/admin');
  }

  // Non-admin users see the regular dashboard
  return <DynamicDashboard />;
}