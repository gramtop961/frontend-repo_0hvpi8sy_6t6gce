import React, { useMemo, useRef, useState } from 'react';
import HeroSpline from './components/HeroSpline';
import ProductShowcase from './components/ProductShowcase';
import ServiceContact from './components/ServiceContact';
import CheckoutModal from './components/CheckoutModal';
import { ShoppingCart, Mail } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false);
  const devicesRef = useRef(null);
  const kitsRef = useRef(null);

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price, 0), [cart]);

  const onAddToCart = (p) => setCart((c) => [...c, p]);
  const onShopDevices = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  const onShopKits = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  const onContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white text-zinc-900">
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="text-lg font-semibold">RoboDevice</div>
          <div className="flex items-center gap-3">
            <a
              href={`mailto:yuanalbyan13@gmail.com?subject=${encodeURIComponent('Product Inquiry')}`}
              className="hidden items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50 sm:inline-flex"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
            <button
              onClick={() => setOpenCheckout(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-800"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>${subtotal.toFixed(2)}</span>
              <span className="ml-1 rounded bg-white/10 px-2 py-0.5 text-xs">{cart.length}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-4 max-w-6xl space-y-12 px-4 pb-16">
        <HeroSpline onShopDevices={onShopDevices} onShopKits={onShopKits} onContact={onContact} />
        <ProductShowcase onAddToCart={onAddToCart} devicesRef={devicesRef} kitsRef={kitsRef} />
        <div id="contact">
          <ServiceContact />
        </div>
      </main>

      <CheckoutModal open={openCheckout} onClose={() => setOpenCheckout(false)} cart={cart} />
    </div>
  );
}
