"use client";

import { useState } from "react";
import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";

const navLinks = [
  { label: "Farms", href: "/farms" },
  { label: "Buy Green Beans", href: "/buy-green-beans" },
  { label: "Roasted Coffee", href: "/roasted-coffee" },
  { label: "Spices", href: "/spices" },
  { label: "Blog", href: "/guides" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <header className="w-full border-b-2 border-odisha-black bg-odisha-offwhite sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-odisha-red border-2 border-odisha-black">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M12 3C8 3 4 6 4 10c0 3 1.5 5.5 4 7v2h8v-2c2.5-1.5 4-4 4-7 0-4-4-7-8-7z"
                  fill="#F5F5F5"
                  stroke="#F5F5F5"
                  strokeWidth="0.5"
                />
                <path
                  d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4"
                  stroke="#8B1E1E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold leading-none tracking-wide text-odisha-black font-serif">
                ODISHA COFFEE
              </div>
              <div className="text-[10px] font-medium uppercase tracking-widest text-odisha-black/60 leading-none mt-0.5">
                Gray Cup Enterprises
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                className="px-3 py-2 hover:bg-odisha-red hover:text-white transition-colors border border-transparent hover:border-odisha-red"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2 border-2 border-odisha-black hover:bg-odisha-red hover:border-odisha-red hover:text-white transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-odisha-red text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center border border-white">
                  {count}
                </span>
              )}
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 bg-odisha-red text-odisha-offwhite text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-red-dark transition-colors"
            >
              Bulk Orders
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 border-2 border-odisha-black hover:bg-odisha-red hover:border-odisha-red hover:text-white transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
        <aside
          className={`absolute right-0 top-0 h-full w-72 bg-odisha-offwhite border-l-2 border-odisha-black p-6
          transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-serif font-bold text-odisha-black text-sm tracking-wide">ODISHA COFFEE</span>
            <button
              className="p-1 border-2 border-odisha-black hover:bg-odisha-red hover:border-odisha-red hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-3 border-b border-odisha-black/20 text-sm font-medium hover:bg-odisha-red hover:text-white hover:border-odisha-red transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between w-full px-4 py-3 border-2 border-odisha-black text-odisha-black text-sm font-semibold hover:bg-odisha-black hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" /> Cart
              </span>
              {count > 0 && (
                <span className="bg-odisha-red text-white text-[9px] font-bold px-1.5 py-0.5">
                  {count}
                </span>
              )}
            </Link>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center px-4 py-3 bg-odisha-red text-odisha-offwhite text-sm font-semibold border-2 border-odisha-black hover:bg-odisha-red-dark transition-colors"
            >
              Bulk Orders
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
