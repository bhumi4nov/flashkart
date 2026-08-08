export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;

  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
  };
}

export interface CartResponse {
  items: CartItem[];
  totalAmount: number;
}
