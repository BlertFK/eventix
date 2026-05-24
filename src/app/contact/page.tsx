import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import PageHero from "@/components/PageHero";
import ContactInfoCard from "@/components/ContactInfoCard";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Eventix",
  description:
    "Get in touch with the Eventix team. We're here to help with tickets, partnerships, and anything else.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const contactInfo = [
  {
    label: "Email Us",
    value: "hello@eventix.com",
    subValue: "We reply within 24 hours",
    gradient: "from-purple to-pink",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Call Us",
    value: "+1 (800) 393-8491",
    subValue: "Mon–Fri, 9 am – 6 pm EST",
    gradient: "from-cyan to-purple",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "Visit Us",
    value: "247 Event Plaza, Suite 12",
    subValue: "New York, NY 10001",
    gradient: "from-pink to-cyan",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: "Live Chat",
    value: "Available on the platform",
    subValue: "Average wait: under 2 min",
    gradient: "from-purple to-cyan",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    name: "Twitter / X",
    handle: "@eventixhq",
    gradient: "from-purple to-pink",
    path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
  },
  {
    name: "Instagram",
    handle: "@eventix",
    gradient: "from-pink to-purple",
    path: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm4.5-7.5a1 1 0 110-2 1 1 0 010 2z",
  },
  {
    name: "LinkedIn",
    handle: "Eventix",
    gradient: "from-cyan to-purple",
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z",
  },
];

const faqs = [
  {
    question: "How do I get a refund for a cancelled event?",
    answer:
      "If an event is cancelled by the organizer, you'll automatically receive a full refund to your original payment method within 5–7 business days. You'll also get an email notification as soon as we process it. For postponed events, you can choose to keep your tickets or request a refund within 30 days of the announcement.",
  },
  {
    question: "Can I transfer my ticket to someone else?",
    answer:
      "Yes! Most tickets on Eventix are transferable. Go to My Tickets in your account, select the ticket, and tap Transfer. You'll need the recipient's email address. Some events restrict transfers — if the Transfer button isn't visible, that event has opted out.",
  },
  {
    question: "How do I sell my tickets if I can't attend?",
    answer:
      "Navigate to My Tickets, select the ticket you'd like to sell, and choose List for Resale. Set your price (within any limits set by the organizer) and we'll handle the rest. You'll be paid out within 3 business days after the event.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and PayPal. For select events we also support buy-now-pay-later options via Klarna and Afterpay.",
  },
  {
    question: "I'm an event organizer — how do I list my event?",
    answer:
      "Create an organizer account at eventix.com/organizers and follow the guided setup. Once your identity is verified (usually within 24 hours), you can create and publish events, set ticket tiers, and access real-time sales analytics. Our onboarding team is happy to help — just reach out via the form above.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. Eventix is PCI-DSS Level 1 compliant — the highest level of payment security certification. We never store your full card details on our servers. All transactions are encrypted with TLS 1.3 and processed through Stripe.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <PageHero
          label="Get In Touch"
          title="We'd love to"
          titleHighlight="hear from you."
          description="Whether you have a question about tickets, partnerships, or just want to say hello — our team is ready to help."
          gradientFrom="from-cyan"
          gradientTo="to-purple"
        />

        {/* Contact info cards + form */}
        <section className="relative py-16 md:py-24 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-purple/5 blur-[150px] rounded-full" />
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: info + social */}
              <div>
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2.5 mb-4 text-xs font-semibold tracking-[0.25em] uppercase text-purple-light">
                    <span className="w-[3px] h-4 rounded-full bg-gradient-to-b from-purple to-pink" />
                    Contact Details
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Multiple Ways to Reach Us
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                    Pick the channel that works best for you. We aim to reply to every message within one business day.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 mb-8">
                  {contactInfo.map((info, i) => (
                    <ContactInfoCard key={info.label} {...info} index={i} />
                  ))}
                </div>

                {/* Social */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                    Follow Us
                  </p>
                  <div className="flex flex-col gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href="#"
                        className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${social.gradient} p-0.5 flex-shrink-0`}>
                          <span className="w-full h-full rounded-full bg-navy flex items-center justify-center block">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d={social.path} />
                            </svg>
                          </span>
                        </span>
                        <span>
                          <span className="block text-xs text-gray-600">{social.name}</span>
                          <span className={`text-sm font-semibold bg-gradient-to-r ${social.gradient} bg-clip-text text-transparent`}>
                            {social.handle}
                          </span>
                        </span>
                        <svg className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div>
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2.5 mb-4 text-xs font-semibold tracking-[0.25em] uppercase text-purple-light">
                    <span className="w-[3px] h-4 rounded-full bg-gradient-to-b from-purple to-pink" />
                    Send a Message
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    Drop Us a Line
                  </h2>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="relative py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-glass-border h-72 md:h-96 bg-navy-light">
              {/* Map placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Decorative pin */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple to-pink flex items-center justify-center shadow-lg shadow-purple/30">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-purple/30 rounded-full blur-sm" />
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">247 Event Plaza, Suite 12</p>
                  <p className="text-gray-500 text-xs">New York, NY 10001</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-purple to-pink hover:shadow-lg hover:shadow-purple/25 hover:brightness-110 transition-all duration-300"
                >
                  Open in Maps
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-20 md:py-28 px-4 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan/5 blur-[150px] rounded-full" />
          <div className="relative max-w-3xl mx-auto">
            <SectionHeading
              label="FAQs"
              title="Frequently Asked Questions"
              description="Can't find the answer here? Drop us a message using the form above."
            />
            <FAQAccordion items={faqs} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
