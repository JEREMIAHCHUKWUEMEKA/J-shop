import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Product = {
  id: string; 
  name: string;
  price: number; 
  image: string;
};

export type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[]; 
  addToCart: (product: Product, quantity?: number) => void; 
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number; 
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return []; 
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (productToAdd: Product, quantityToAdd: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === productToAdd.id);

      if (existingItem) {
        return prev.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        return [...prev, { ...productToAdd, quantity: quantityToAdd }];
      }
    });
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item // Quantity must be at least 1
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};