"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import {
  addCartLine,
  clearCart,
  getCartProduct,
  getCartSnapshot,
  getServerCartSnapshot,
  initializeCart,
  removeCartLine,
  subscribeToCart,
  updateCartLine,
  type CartLine,
} from "@/lib/cart-store";

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  addItem: typeof addCartLine;
  updateItem: typeof updateCartLine;
  removeItem: typeof removeCartLine;
  clear: typeof clearCart;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getServerCartSnapshot,
  );

  useEffect(() => {
    initializeCart();
  }, []);

  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  const subtotal = lines.reduce((total, line) => {
    const product = getCartProduct(line.productId);
    const variant = product?.variants?.find(
      (item) => item.id === line.variantId,
    );
    return total + (variant?.price ?? product?.price ?? 0) * line.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        lines,
        itemCount,
        subtotal,
        addItem: addCartLine,
        updateItem: updateCartLine,
        removeItem: removeCartLine,
        clear: clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider.");
  return value;
}
