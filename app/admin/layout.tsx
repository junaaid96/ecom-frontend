import { redirect } from 'next/navigation';
import { serverApi } from '@/lib/server-api';
import type { User } from '@/types';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    const response = await serverApi((client) => client.get<User>('/auth/me'));
    
    // Check if request was successful and user data exists
    if (response.status !== 200 || !response.data) {
      redirect('/login?redirect=/admin');
    }

    const userRole = response.data?.role;
    const isAdmin = userRole === 'ADMIN' || userRole === 'ROLE_ADMIN';
    
    if (!isAdmin) {
      redirect('/login?redirect=/admin');
    }

    return (
      <div className="flex min-h-screen bg-slate-50">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    // If any error occurs, redirect to login
    redirect('/login?redirect=/admin');
  }
}

