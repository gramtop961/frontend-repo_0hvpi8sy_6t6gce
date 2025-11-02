import React, { useMemo, useState } from 'react';
import { Star } from 'lucide-react';

const productsSeed = [
  { id: 'd1', type: 'device', name: 'Smart Air Monitor', price: 129.0, rating: 4.7, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop' },
  { id: 'd2', type: 'device', name: 'Home Energy Hub', price: 199.0, rating: 4.6, img: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop' },
  { id: 'k1', type: 'kit', name: 'IoT Starter Kit', price: 69.0, rating: 4.5, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop' },
  { id: 'k2', type: 'kit', name: 'Robotics Arm Kit', price: 149.0, rating: 4.8, img: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?q=80&w=1200&auto=format&fit=crop' },
];

const ProductCard = ({ p, onAdd }) => (
  <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-lg">
    <div className="relative">
      <img src={p.img} alt={p.name} className="h-48 w-full object-cover" />
      <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium shadow">
        {p.type === 'device' ? 'Device' : 'DIY Kit'}
      </div>
    </div>
    <div className="space-y-3 p-4">
      <h3 className="text-base font-semibold text-zinc-900">{p.name}</h3>
      <div className="flex items-center gap-1 text-amber-500">
        <Star className="h-4 w-4 fill-current" />
        <span className="text-sm text-zinc-700">{p.rating}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">${p.price.toFixed(2)}</span>
        <button onClick={() => onAdd(p)} className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

const Tabs = ({ tab, setTab }) => (
  <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-50 p-1 text-sm">
    <button
      onClick={() => setTab('device')}
      className={`rounded-lg px-3 py-1.5 ${tab === 'device' ? 'bg-white shadow font-medium' : 'text-zinc-600'}`}
    >
      Full Devices
    </button>
    <button
      onClick={() => setTab('kit')}
      className={`rounded-lg px-3 py-1.5 ${tab === 'kit' ? 'bg-white shadow font-medium' : 'text-zinc-600'}`}
    >
      DIY Kits
    </button>
  </div>
);

const ProductShowcase = ({ onAddToCart, devicesRef, kitsRef }) => {
  const [tab, setTab] = useState('device');
  const list = useMemo(() => productsSeed.filter(p => p.type === tab), [tab]);

  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4" id="shop">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Shop</h2>
        <Tabs tab={tab} setTab={setTab} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(p => (
          <ProductCard key={p.id} p={p} onAdd={onAddToCart} />
        ))}
      </div>

      {/* Anchors for hero buttons */}
      <div ref={devicesRef} />
      <div ref={kitsRef} />
    </section>
  );
};

export default ProductShowcase;
