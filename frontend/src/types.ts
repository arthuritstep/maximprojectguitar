export interface Guitar {
  id: number;
  name: string;
  brand: string;
  type: 'acoustic' | 'electric' | 'bass';
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  guitar: Guitar;
  quantity: number;
}