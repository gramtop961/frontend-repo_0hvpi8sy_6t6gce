import React, { useEffect, useMemo, useRef, useState } from 'react';

const loadPayPal = (clientId = 'sb', currency = 'USD') => {
  return new Promise((resolve, reject) => {
    if (window.paypal) return resolve(window.paypal);
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
    script.async = true;
    script.onload = () => resolve(window.paypal);
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const Field = ({ label, type = 'text', value, onChange, placeholder }) => (
  <label className="block">
    <span className="text-sm text-zinc-700">{label}</span>
    <input
      type={type}
      className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 outline-none focus:border-zinc-400"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required
    />
  </label>
);

function normalizeIndo(number) {
  const digits = String(number).replace(/[^\d]/g, '');
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  return digits;
}

const CheckoutModal = ({ open, onClose, cart }) => {
  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price, 0), [cart]);
  const [tab, setTab] = useState('paypal');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal: '',
  });
  const paypalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    if (tab !== 'paypal') return;
    let destroyed = false;
    loadPayPal('sb', 'USD').then((paypal) => {
      if (destroyed || !paypalRef.current) return;
      paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: subtotal.toFixed(2) },
                description: `Order for ${form.name || 'Guest'}`,
              },
            ],
            application_context: { shipping_preference: 'NO_SHIPPING' },
          });
        },
        onApprove: async (data, actions) => {
          try {
            const details = await actions.order.capture();
            alert(`Payment successful! Transaction: ${details.id}`);
            onClose();
          } catch (e) {
            alert('Payment captured but unable to retrieve details.');
          }
        },
        onError: (err) => {
          console.error(err);
          alert('PayPal error, please try again.');
        },
      }).render(paypalRef.current);
    });
    return () => {
      destroyed = true;
      if (paypalRef.current) paypalRef.current.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, tab, subtotal, form.name]);

  const orderSummaryText = () => {
    const lines = cart.map((i) => `- ${i.name} ($${i.price.toFixed(2)})`).join('\n');
    return `Order Summary\n${lines}\nSubtotal: $${subtotal.toFixed(2)}\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nAddress: ${form.address}, ${form.city} ${form.postal}`;
  };

  const mailtoHref = `mailto:yuanalbyan13@gmail.com?subject=${encodeURIComponent('DANA Payment Link Request')}&body=${encodeURIComponent(orderSummaryText())}`;
  const whatsappHref = `https://wa.me/${normalizeIndo('08953398492')}?text=${encodeURIComponent('Hi, I would like to pay with DANA.\n' + orderSummaryText())}`;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">Checkout</h3>
            <p className="text-sm text-zinc-600">Enter shipping details and choose a payment method.</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100">✕</button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="John Doe" />
            <Field type="email" label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="john@example.com" />
            <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+62..." />
            <Field label="Street address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} placeholder="123 Main St" />
            <div className="grid grid-cols-3 gap-3">
              <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} placeholder="Jakarta" />
              <Field label="Postal" value={form.postal} onChange={(v) => setForm({ ...form, postal: v })} placeholder="12345" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-zinc-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600">Subtotal</span>
                <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-50 p-1 text-sm">
                <button onClick={() => setTab('paypal')} className={`rounded-lg px-3 py-1.5 ${tab === 'paypal' ? 'bg-white shadow font-medium' : 'text-zinc-600'}`}>PayPal</button>
                <button onClick={() => setTab('dana')} className={`rounded-lg px-3 py-1.5 ${tab === 'dana' ? 'bg-white shadow font-medium' : 'text-zinc-600'}`}>DANA</button>
              </div>

              {tab === 'paypal' ? (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-zinc-600">Pay securely with PayPal. This demo uses the sandbox environment.</p>
                  <div ref={paypalRef} />
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-zinc-700">
                    To pay with DANA, request a secure payment link via WhatsApp or Email. We will send you a DANA link/QR and confirm your order.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href={whatsappHref} target="_blank" rel="noreferrer" className="rounded-xl bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600">Request via WhatsApp</a>
                    <a href={mailtoHref} className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-zinc-900 hover:bg-zinc-50">Request via Email</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-zinc-500">By proceeding you agree to our terms and privacy policy.</div>
      </div>
    </div>
  );
};

export default CheckoutModal;
