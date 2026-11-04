"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";

export default function ClearCart() {
  const { loaded, clear } = useCart();
  useEffect(() => {
    if (loaded) clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);
  return null;
}
