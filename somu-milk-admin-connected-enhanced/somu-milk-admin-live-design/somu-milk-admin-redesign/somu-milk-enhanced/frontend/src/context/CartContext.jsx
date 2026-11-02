import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("somu_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [pausedCart, setPausedCart] = useState(() => {
    try {
      const saved = localStorage.getItem("somu_paused_cart");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("somu_cart", JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Pause current shopping cart
  const pauseCart = () => {
    if (cartItems.length === 0) return false;
    const pausedData = {
      items: [...cartItems],
      savedAt: new Date().toISOString(),
      itemCount: totalCartCount,
      subtotal,
    };
    try {
      localStorage.setItem("somu_paused_cart", JSON.stringify(pausedData));
      setPausedCart(pausedData);
      setCartItems([]);
      window.dispatchEvent(new CustomEvent("somu:cart-paused"));
      return true;
    } catch (err) {
      console.error("Failed to pause cart", err);
      return false;
    }
  };

  // Resume paused shopping cart
  const resumeCart = () => {
    try {
      const saved = localStorage.getItem("somu_paused_cart");
      if (!saved) return false;
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed?.items) && parsed.items.length > 0) {
        // Merge with existing cart items if any
        setCartItems((prev) => {
          const merged = [...prev];
          parsed.items.forEach((item) => {
            const idx = merged.findIndex((m) => m.id === item.id);
            if (idx >= 0) {
              merged[idx].quantity += item.quantity;
            } else {
              merged.push(item);
            }
          });
          return merged;
        });
      }
      localStorage.removeItem("somu_paused_cart");
      setPausedCart(null);
      window.dispatchEvent(new CustomEvent("somu:cart-resumed"));
      return true;
    } catch (err) {
      console.error("Failed to resume cart", err);
      return false;
    }
  };

  const dismissPausedCart = () => {
    try {
      localStorage.removeItem("somu_paused_cart");
      setPausedCart(null);
    } catch {}
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => {
    const rawPrice =
      typeof item.price === "number"
        ? item.price
        : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
    return sum + rawPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        pauseCart,
        resumeCart,
        dismissPausedCart,
        pausedCart,
        totalCartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
