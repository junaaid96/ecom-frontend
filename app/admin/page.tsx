import Link from 'next/link';
import { serverApi } from '@/lib/server-api';
import type { Category, Order, Product } from '@/types';

type DashboardSummary = {
  products: number;
  categories: number;
  orders: number;
  users: number;
  revenue: number;
  pendingOrders: number;
  lowStockProducts: number;
};

async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await serverApi((client) => client.get<DashboardSummary>('/admin/summary'));
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  return { products: 0, categories: 0, orders: 0, users: 0, revenue: 0, pendingOrders: 0, lowStockProducts: 0 };
}

async function getRecentOrders(): Promise<Order[]> {
  const response = await serverApi((client) => client.get<Order[]>('/admin/orders/recent', { params: { limit: 5 } }));
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  return [];
}

async function getTopProducts(): Promise<Product[]> {
  const response = await serverApi((client) => client.get<Product[]>('/admin/products/top', { params: { limit: 5 } }));
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  return [];
}

async function getOutOfStockProducts(): Promise<Product[]> {
  const response = await serverApi((client) => client.get<Product[]>('/admin/products/out-of-stock'));
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  return [];
}

function formatCurrency(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `Tk${num.toFixed(2)}`;
}

export default async function AdminDashboardPage() {
  const [summary, orders, topProducts, outOfStockProducts] = await Promise.all([
    getDashboardSummary(),
    getRecentOrders(),
    getTopProducts(),
    getOutOfStockProducts()
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">Welcome to your admin dashboard</p>
      </div>

      <section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Total Products</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{summary.products}</p>
            {summary.lowStockProducts > 0 && (
              <p className="mt-2 text-xs text-amber-600">{summary.lowStockProducts} low stock</p>
            )}
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Categories</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{summary.categories}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Total Orders</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{summary.orders}</p>
            {summary.pendingOrders > 0 && (
              <p className="mt-2 text-xs text-blue-600">{summary.pendingOrders} pending</p>
            )}
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Total Revenue</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">{formatCurrency(summary.revenue)}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr,_1fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700">
              View all →
            </Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-sm text-slate-500">
                      No recent orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-100 text-sm text-slate-600">
                      <td className="py-3 font-semibold text-slate-900">#{order.id}</td>
                      <td className="py-3">{order.user?.email || 'N/A'}</td>
                      <td className="py-3">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'SHIPPED' ? 'bg-purple-100 text-purple-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-slate-900">{formatCurrency(order.total || order.totalAmount || 0)}</td>
                      <td className="py-3">{new Date(order.placedAt || order.createdAt || '').toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Top Products</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {topProducts.length === 0 ? (
                <li className="text-sm text-slate-500">No top products yet.</li>
              ) : (
                topProducts.map((product) => (
                  <li key={product.id} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <div>
                      <span className="font-medium text-slate-900">{product.name}</span>
                      <p className="text-xs text-slate-500">Stock: {product.stock || product.inventory || 0}</p>
                    </div>
                    <span className="font-semibold text-slate-900">{formatCurrency(product.price)}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Out of Stock Products</h2>
            {outOfStockProducts.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">No out-of-stock products.</p>
            ) : (
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {outOfStockProducts.map((product) => (
                  <li key={product.id} className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <div>
                      <span className="font-medium text-slate-900">{product.name}</span>
                      <p className="text-xs text-red-600 font-medium">Stock: {product.stock || product.inventory || 0}</p>
                    </div>
                    <Link 
                      href={`/admin/products`}
                      className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Restock →
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

