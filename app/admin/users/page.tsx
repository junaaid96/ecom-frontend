'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import type { User } from '@/types';
import useAuth from '@/store/authStore';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser, hydrate } = useAuth();

  useEffect(() => {
    // Ensure auth store is hydrated to get current user
    hydrate().then(() => {
      loadUsers();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUsers = async () => {
    try {
      const response = await apiClient.get<User[]>('/users');
      setUsers(response.data || []);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActiveStatusUpdate = async (userId: number, active: boolean) => {
    try {
      await apiClient.patch(`/users/${userId}/status`, { active });
      loadUsers();
    } catch (error: any) {
      console.error('Failed to update user status:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to update user status. Please try again.';
      alert(errorMessage);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Users</h1>
        <p className="mt-2 text-slate-600">Manage user accounts and roles</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {users.map((user) => {
              const isCurrentUser = currentUser?.id === user.id;
              const isActive = user.active !== false; // Default to true if not set
              
              return (
                <tr key={user.id} className={!isActive ? 'opacity-60' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{user.username || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      (user.role === 'ADMIN' || user.role === 'ROLE_ADMIN') ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'
                    }`}>
                      {user.role === 'ROLE_ADMIN' ? 'ADMIN' : user.role === 'ROLE_CUSTOMER' ? 'USER' : user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {isCurrentUser ? (
                      <span className="text-slate-400 italic">No actions available</span>
                    ) : (
                      <select
                        value={isActive ? 'active' : 'inactive'}
                        onChange={(e) => handleActiveStatusUpdate(user.id, e.target.value === 'active')}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

