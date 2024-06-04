import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  categories: string[];
  detail: string;
}

interface ProductsResponse {
  count: number;
  countByCategory: { [key: string]: number };
  products: Product[];
}

interface User {
  id: number;
  name: string;
  email: string;
  detail: string;
}

interface UsersResponse {
  count: number;
  users: User[];
}

interface DataContextType {
  products: ProductsResponse | null;
  users: UsersResponse | null;
}

const InitDataContext = createContext<DataContextType | undefined>(undefined);

interface InitDataProviderProps {
  children: ReactNode;
}

const InitDataProvider: React.FC<InitDataProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [users, setUsers] = useState<UsersResponse | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsResponse, usersResponse] = await Promise.all([
          axios.get<ProductsResponse>('http://localhost:3030/api/products/'),
          axios.get<UsersResponse>('http://localhost:3030/api/users/'),
        ]);
        setProducts(productsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <InitDataContext.Provider value={{ products, users }}>
      {children}
    </InitDataContext.Provider>
  );
};

export { InitDataContext, InitDataProvider };
