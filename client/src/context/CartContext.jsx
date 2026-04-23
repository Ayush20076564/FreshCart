import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    if (Number(product.stock) <= 0) {
      alert("This product is out of stock.");
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.qty >= Number(product.stock)) {
          alert(`Only ${product.stock} item(s) available in stock.`);
          return prevItems;
        }

        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, stock: Number(product.stock), qty: 1 }];
    });
  };

  const updateQuantity = (productId, qty) => {
    const parsedQty = Number(qty);

    if (parsedQty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== productId) return item;

        if (parsedQty > Number(item.stock)) {
          alert(`Only ${item.stock} item(s) available in stock.`);
          return { ...item, qty: Number(item.stock) };
        }

        return { ...item, qty: parsedQty };
      })
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.qty,
      0
    );
  }, [cartItems]);

  const deliveryFee = useMemo(() => {
    return cartItems.length > 0 ? 3 : 0;
  }, [cartItems]);

  const total = useMemo(() => {
    return subtotal + deliveryFee;
  }, [subtotal, deliveryFee]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        deliveryFee,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}