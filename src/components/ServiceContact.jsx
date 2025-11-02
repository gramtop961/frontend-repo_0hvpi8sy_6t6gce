import React from 'react';
import { MessageCircle, Wrench } from 'lucide-react';

const ServiceContact = () => {
  const whatsappNumber = '628953398492'; // converted from 08953398492
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi! I would like to request a custom IoT/robotics service. Could we discuss the details?'
  )}`;

  return (
    <section id="service" className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs">
              <Wrench size={14} /> On‑request service
            </div>
            <h3 className="mt-3 text-2xl font-semibold">Need something custom?</h3>
            <p className="mt-2 max-w-2xl text-white/80">
              Tell us what you want to build—from industrial monitoring to playful robots. We’ll
              scope it, prototype, and ship.
            </p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-3 font-medium text-black hover:bg-green-400 transition"
          >
            <MessageCircle size={18} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceContact;
