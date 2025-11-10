import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { getAuthToken } from '../utils/auth';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:3001/api';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from localStorage or API when user changes
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        // User is logged in, try to load cart from backend
        try {
          setLoading(true);
          const token = getAuthToken();
          const response = await fetch(`${API_BASE_URL}/cart`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const cartData = await response.json();
            setItems(cartData.items || []);
          } else {
            // If cart doesn't exist on backend, load from localStorage
            const localCart = localStorage.getItem('cart');
            if (localCart) {
              setItems(JSON.parse(localCart));
            }
          }
        } catch (error) {
          console.error('Error loading cart from backend:', error);
          // Fallback to localStorage
          const localCart = localStorage.getItem('cart');
          if (localCart) {
            setItems(JSON.parse(localCart));
          }
        } finally {
          setLoading(false);
        }
      } else {
        // User not logged in, load from localStorage
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          setItems(JSON.parse(localCart));
        } else {
          setItems([]);
        }
      }
    };

    loadCart();
  }, [user]);

  // Save cart to localStorage and backend when items change
  useEffect(() => {
    const saveCart = async () => {
      // Always save to localStorage
      localStorage.setItem('cart', JSON.stringify(items));
      
      // If user is logged in, also save to backend
      if (user && items.length > 0) {
        try {
          const token = getAuthToken();
          await fetch(`${API_BASE_URL}/cart`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items }),
          });
        } catch (error) {
          console.error('Error saving cart to backend:', error);
        }
      }
    };

    if (items.length > 0) {
      saveCart();
    }
  }, [items, user]);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    setItems([]);
    localStorage.removeItem('cart');
    
    // If user is logged in, also clear cart on backend
    if (user) {
      try {
        const token = getAuthToken();
        await fetch(`${API_BASE_URL}/cart`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error clearing cart on backend:', error);
      }
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
