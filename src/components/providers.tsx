"use client";

import React from "react";
import { CartProvider } from "@/context/cart-context";
import { WhatsappWidget } from "@/components/whatsapp-widget";

interface RootProvidersProps {
  children: React.ReactNode;
}

export default function RootProviders({ children }: RootProvidersProps) {
  return (
    <CartProvider>
      {children}
      <WhatsappWidget />
    </CartProvider>
  );
}
