import { createContext, useState } from 'react';
import { GlobalProductContent, Product } from '../types/types';

const ProductContext = createContext<GlobalProductContent>(null);

interface ProductProviderProps {
    children: JSX.Element
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [product, setProduct] = useState<Product|null>(null);

  return <ProductContext.Provider value={{ product, setProduct }}>{children}</ProductContext.Provider>;
};

export default ProductContext;
