export interface Products {
  productId: number;
  productName: string;
  stars: number;
  imageUrl: string;
  listPrice: number | null;
  price: number;
  description: string;
  installments : [
    {
      quantity: number,
      value: number
    }
  ]
  amount: number
}
