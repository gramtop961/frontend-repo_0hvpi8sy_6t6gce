import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

const HeroSpline = ({ onShopDevices, onShopKits, onContact }) => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-2xl bg-black text-white">
      <Spline
        scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="pointer-events-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur">
            <Rocket className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Smart Devices, DIY Kits, and On‑Demand Service
          </h1>
          <p className="mt-4 text-white/80">
            Explore ready-to-use devices, build-it-yourself kits, or chat with us for custom solutions.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onShopDevices}
              className="pointer-events-auto rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black shadow hover:bg-white/90"
            >
              Shop Devices
            </button>
            <button
              onClick={onShopKits}
              className="pointer-events-auto rounded-xl border border-white/30 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
            >
              DIY Kits
            </button>
            <button
              onClick={onContact}
              className="pointer-events-auto rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-emerald-600"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSpline;
