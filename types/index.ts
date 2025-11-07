export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
  inventory?: number; // Alias for stock for backward compatibility
  category: Category;
  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  id: number;
  username?: string;
  email: string;
  role: 'ROLE_ADMIN' | 'ROLE_CUSTOMER' | 'ADMIN' | 'USER'; // Backend returns ROLE_ADMIN/ROLE_CUSTOMER, frontend may use ADMIN/USER
  active?: boolean;
};

export type OrderItem = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: number;
  status: string;
  total: number;
  totalAmount?: number; // Alias for total
  placedAt: string;
  shippingAddress: string;
  items: OrderItem[];
  user?: User;
  createdAt?: string;
};

export type PaginationMeta = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type PagedResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

