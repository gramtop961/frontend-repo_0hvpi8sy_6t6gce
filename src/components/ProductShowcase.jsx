import React, { useMemo } from 'react';
import { ShoppingCart, Star, Package, Wrench } from 'lucide-react';

const products = [
  {
    id: 'dev-1',
    type: 'device',
    name: 'Autonomous Rover v2',
    price: 1299,
    rating: 4.8,
    description: 'Ready-to-run mobile robot with lidar, Wi‑Fi, and app control.',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'dev-2',
    type: 'device',
    name: 'Smart Greenhouse Kit Pro',
    price: 899,
    rating: 4.7,
    description: 'Automated climate control with sensors, pumps, and cloud app.',
    image:
      'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'kit-1',
    type: 'kit',
    name: 'IoT Starter Kit',
    price: 149,
    rating: 4.6,
    description: 'ESP32, sensors, and guides—perfect for DIY projects.',
    image:
      'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'kit-2',
    type: 'kit',
    name: 'Robotic Arm DIY',
    price: 329,
    rating: 4.5,
    description: 'Assemble a 5‑axis arm with smart servos and control app.',
    image:
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1200&auto=format&fit=crop',
  },
];

const tabs = [
  { key: 'device', label: 'Full Devices', icon: Package },
  { key: 'kit', label: 'DIY Kits', icon: Wrench },
];

const ProductCard = ({ item, onAdd }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur">
      <img src={item.image} alt={item.name} className="h-44 w-full object-cover transition duration-300 group-hover:scale-105" />
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">{item.name}</h3>
          <span className="rounded-md bg-orange-500/20 px-2 py-1 text-sm font-medium text-orange-300">
            ${item.price}
          </span>
        </div>
        <p className="text-sm text-white/70">{item.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-yellow-300">
            <Star size={16} fill="currentColor" />
            <span className="text-sm text-white/80">{item.rating}</span>
          </div>
          <button
            onClick={() => onAdd(item)}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-black hover:bg-orange-400 transition"
          >
            <ShoppingCart size={16} /> Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductShowcase = ({ activeTab, onChangeTab, onAddToCart }) => {
  const filtered = useMemo(
    () => products.filter((p) => p.type === activeTab),
    [activeTab]
  );

  return (
    <section id="products" className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Shop</h2>
        <div className="flex items-center gap-2 rounded-lg bg-white/5 p-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onChangeTab(key)}
              className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition ${
                activeTab === key ? 'bg-orange-500 text-black' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <ProductCard key={item.id} item={item} onAdd={onAddToCart} />
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
