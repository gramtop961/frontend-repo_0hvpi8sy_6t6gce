import React from 'react';
import Spline from '@splinetool/react-spline';
import { Bot, ShoppingCart, Wrench } from 'lucide-react';

const HeroSpline = ({ onShopDevices, onShopKits, onOpenAuth }) => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden rounded-2xl bg-black/90 text-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlays that don't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
          <Bot size={16} />
          <span>IoT & Robotics Engineering</span>
        </div>
        <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
          Build, Buy, or Bespoke
          <span className="block text-orange-400">Robotics & IoT Solutions</span>
        </h1>
        <p className="mt-4 max-w-xl text-white/80">
          Choose a ready-to-run device, assemble your own with DIY kits, or request a custom
          solution crafted to your specs.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={onShopDevices}
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-medium text-black hover:bg-orange-400 transition"
          >
            <ShoppingCart size={18} /> Shop Devices
          </button>
          <button
            onClick={onShopKits}
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 font-medium hover:bg-white/20 transition"
          >
            <Wrench size={18} /> DIY Kits
          </button>
          <button
            onClick={onOpenAuth}
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 font-medium hover:bg-white/20 transition"
          >
            Sign in for shipping
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSpline;
