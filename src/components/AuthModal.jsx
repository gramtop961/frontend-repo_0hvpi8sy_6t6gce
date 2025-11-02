import React, { useState } from 'react';
import { X, User, Phone, Mail, MapPin, CreditCard } from 'lucide-react';

const AuthModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal: '',
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This is a UI-only demo. In production, send to backend auth + payment flow.
    console.log('Profile submitted', form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-6 text-white shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Sign in & Shipping Details</h3>
          <button onClick={onClose} className="rounded-md p-2 hover:bg-white/10">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="col-span-2 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            <User size={16} />
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full bg-transparent outline-none placeholder:text-white/50"
              required
            />
          </label>
          <label className="col-span-2 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            <Mail size={16} />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-transparent outline-none placeholder:text-white/50"
              required
            />
          </label>
          <label className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            <Phone size={16} />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full bg-transparent outline-none placeholder:text-white/50"
              required
            />
          </label>
          <label className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            <MapPin size={16} />
            <input
              name="postal"
              value={form.postal}
              onChange={handleChange}
              placeholder="Postal code"
              className="w-full bg-transparent outline-none placeholder:text-white/50"
              required
            />
          </label>
          <label className="col-span-2 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            <MapPin size={16} />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street address"
              className="w-full bg-transparent outline-none placeholder:text-white/50"
              required
            />
          </label>
          <label className="col-span-2 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
            <MapPin size={16} />
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City / State"
              className="w-full bg-transparent outline-none placeholder:text-white/50"
              required
            />
          </label>

          <div className="col-span-2 mt-2 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/80">
            <div className="mb-2 inline-flex items-center gap-2 font-medium text-white">
              <CreditCard size={16} /> Payment
            </div>
            <p>
              Secure checkout will be provided after sign-in. You can pay via card, bank transfer, or e‑wallet.
            </p>
          </div>

          <div className="col-span-2 mt-2 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 hover:bg-white/10">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-orange-500 px-5 py-2 font-medium text-black hover:bg-orange-400 transition">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
