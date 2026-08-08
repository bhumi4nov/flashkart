export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  reservedStock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
