import React from 'react';
import { Phone, Mail } from 'lucide-react';

const ServiceContact = ({ whatsappNumber = '+628953398492', supportEmail = 'yuanalbyan13@gmail.com' }) => {
  const waLink = (msg) => `https://wa.me/${whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(msg)}`;
  const defaultMsg = 'Hello! I would like to inquire about a custom service or DANA payment link.';

  const emailHref = `mailto:${supportEmail}?subject=${encodeURIComponent('Support / Order Inquiry')}&body=${encodeURIComponent('Hello, I would like to ask about my order or request a DANA payment link.')} `;

  return (
    <section className="mx-auto max-w-6xl rounded-2xl border border-zinc-200 bg-white px-4 py-8 shadow-sm">
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-semibold">Need help or custom service?</h3>
          <p className="mt-2 text-zinc-600">
            Chat with us on WhatsApp or send us an email. We can also provide a DANA payment link upon request.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-3 md:justify-end">
          <a
            href={waLink(defaultMsg)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600"
          >
            <Phone className="h-4 w-4" /> Chat on WhatsApp
          </a>
          <a
            href={emailHref}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-zinc-900 hover:bg-zinc-50"
          >
            <Mail className="h-4 w-4" /> Email us
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceContact;
