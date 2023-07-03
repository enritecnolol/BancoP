export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

export interface GlobalProductContent {
    product: Product | null;
    setProduct: (product: Product | null) => void;
}
