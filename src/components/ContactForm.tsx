"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required.";
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.subject.trim()) errors.subject = "Subject is required.";
  if (!data.message.trim()) {
    errors.message = "Message is required.";
  } else if (data.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters.";
  }
  return errors;
}

const subjects = [
  "General Enquiry",
  "Ticket Support",
  "Event Organizer",
  "Partnership",
  "Press & Media",
  "Bug Report",
  "Other",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1800));
    // 90% chance success for demo
    if (Math.random() > 0.1) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTouched({});
    } else {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full px-4 py-3.5 rounded-xl bg-glass/40 border text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 transition-all duration-300";
  const inputNormal = `${inputBase} border-glass-border focus:border-purple/50 focus:ring-purple/20`;
  const inputError = `${inputBase} border-red-500/50 focus:border-red-500/60 focus:ring-red-500/10`;

  return (
    <div className="relative p-6 md:p-8 rounded-2xl bg-glass/30 border border-glass-border backdrop-blur-sm overflow-hidden">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/50 to-transparent" />

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan to-purple mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-sm text-gray-400 mb-8 max-w-xs mx-auto">
              We got your message and will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="px-6 py-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-purple to-pink hover:shadow-lg hover:shadow-purple/25 transition-all duration-300 cursor-pointer"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-widest">
                  Full Name <span className="text-pink">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Jane Smith"
                  className={errors.name ? inputError : inputNormal}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-widest">
                  Email <span className="text-pink">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="jane@example.com"
                  className={errors.email ? inputError : inputNormal}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-widest">
                Subject <span className="text-pink">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${errors.subject ? inputError : inputNormal} cursor-pointer appearance-none`}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              >
                <option value="" disabled className="bg-navy">
                  Select a topic…
                </option>
                {subjects.map((s) => (
                  <option key={s} value={s} className="bg-navy">
                    {s}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p id="subject-error" className="mt-1.5 text-xs text-red-400">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-widest">
                Message <span className="text-pink">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell us how we can help…"
                className={`${errors.message ? inputError : inputNormal} resize-none`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              <div className="flex items-center justify-between mt-1.5">
                {errors.message ? (
                  <p id="message-error" className="text-xs text-red-400">{errors.message}</p>
                ) : (
                  <span />
                )}
                <span className={`text-xs ${form.message.length >= 20 ? "text-cyan" : "text-gray-600"}`}>
                  {form.message.length} / 20+
                </span>
              </div>
            </div>

            {/* Error banner */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30"
              >
                <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p className="text-xs text-red-400">
                  Something went wrong. Please try again or email us directly at{" "}
                  <a href="mailto:hello@eventix.com" className="underline">hello@eventix.com</a>.
                </p>
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="relative w-full flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full overflow-hidden bg-gradient-to-r from-purple via-pink to-cyan hover:brightness-110 hover:shadow-lg hover:shadow-purple/25 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
