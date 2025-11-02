import React, { useEffect, useRef, useState } from 'react';
import { ShoppingCart, LogIn } from 'lucide-react';
import HeroSpline from './components/HeroSpline';
import ProductShowcase from './components/ProductShowcase';
import ServiceContact from './components/ServiceContact';
import AuthModal from './components/AuthModal';

function App() {
  const [activeTab, setActiveTab] = useState('device');
  const [cart, setCart] = useState([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [cookiesOK, setCookiesOK] = useState(true);
  const productsRef = useRef(null);

  useEffect(() => {
    const ok = localStorage.getItem('cookies-ok');
    if (!ok) setCookiesOK(false);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookies-ok', '1');
    setCookiesOK(true);
  };

  const handleAddToCart = (item) => {
    setCart((c) => {
      const exists = c.find((i) => i.id === item.id);
      if (exists) return c.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { ...item, qty: 1 }];
    });
  };

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Simple top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-orange-500" />
            <span className="font-semibold">Robotics Lab</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <button onClick={scrollToProducts} className="text-white/80 hover:text-white">Shop</button>
            <a href="#service" className="text-white/80 hover:text-white">Custom Service</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAuthOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
            >
              <LogIn size={16} /> Sign in
            </button>
            <div className="relative">
              <button
                onClick={() => setAuthOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-black hover:bg-orange-400"
              >
                <ShoppingCart size={16} />
                <span>{cart.reduce((sum, i) => sum + i.qty, 0)}</span>
              </button>
              {cart.length > 0 && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-zinc-900 p-3 shadow-xl">
                  <div className="max-h-60 space-y-2 overflow-auto pr-1">
                    {cart.map((i) => (
                      <div key={i.id} className="flex items-center justify-between text-sm">
                        <span className="truncate pr-2">{i.name} × {i.qty}</span>
                        <span className="text-white/70">${(i.price * i.qty).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-sm">
                    <span className="text-white/70">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(0)}</span>
                  </div>
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="mt-3 w-full rounded-lg bg-orange-500 py-2 text-sm font-medium text-black hover:bg-orange-400"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <HeroSpline
          onShopDevices={() => {
            setActiveTab('device');
            scrollToProducts();
          }}
          onShopKits={() => {
            setActiveTab('kit');
            scrollToProducts();
          }}
          onOpenAuth={() => setAuthOpen(true)}
        />

        <div ref={productsRef}>
          <ProductShowcase
            activeTab={activeTab}
            onChangeTab={setActiveTab}
            onAddToCart={handleAddToCart}
          />
        </div>

        <ServiceContact />
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-center text-white/60">
        © {new Date().getFullYear()} Robotics Lab — IoT & Robot Engineering
      </footer>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Cookies consent */}
      {!cookiesOK && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[95%] max-w-2xl -translate-x-1/2 rounded-xl border border-white/10 bg-zinc-900 p-4 text-sm text-white shadow-xl">
          <p className="pr-2 text-white/80">
            We use cookies to personalize content, remember your preferences, and analyze traffic. By tapping Accept, you
            agree to our cookie policy.
          </p>
          <div className="mt-3 flex items-center justify-end gap-2">
            <button onClick={() => setCookiesOK(true)} className="rounded-lg px-3 py-2 hover:bg-white/10">
              Decline
            </button>
            <button onClick={handleAcceptCookies} className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-black hover:bg-orange-400">
              Accept
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
