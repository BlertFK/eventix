"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: "By accessing or using the Eventix platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.",
  },
  {
    id: "accounts",
    title: "2. User Accounts",
    content: "You must create an account to purchase tickets or access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate and complete information during registration. We reserve the right to suspend or terminate accounts that violate these terms.",
  },
  {
    id: "purchases",
    title: "3. Ticket Purchases",
    content: "All ticket purchases are subject to availability. Prices are displayed in USD and include applicable taxes unless stated otherwise. Once a purchase is confirmed, you will receive a confirmation email with your ticket details. Tickets are non-transferable unless explicitly stated otherwise for a specific event.",
  },
  {
    id: "refunds",
    title: "4. Refunds & Cancellations",
    content: "Refund eligibility depends on the event organizer's policy. Generally, refunds are available up to 48 hours before the event start time. Cancellation by the organizer entitles you to a full refund. Processing times for refunds may take 5-10 business days depending on your payment method.",
  },
  {
    id: "conduct",
    title: "5. User Conduct",
    content: "You agree not to use the platform for any illegal or unauthorized purpose. You must not attempt to gain unauthorized access to any part of the service. Harassment, spam, or any form of abuse directed at other users or staff is strictly prohibited. Violation of these guidelines may result in immediate account termination.",
  },
  {
    id: "ip",
    title: "6. Intellectual Property",
    content: "All content on the Eventix platform, including logos, text, graphics, and software, is the property of Eventix or its licensors. You may not reproduce, distribute, or create derivative works without explicit written permission. Event images and descriptions remain the property of their respective owners.",
  },
  {
    id: "liability",
    title: "7. Limitation of Liability",
    content: "Eventix acts as a marketplace connecting event organizers with attendees. We are not responsible for the quality, safety, or legality of events listed on our platform. Our liability is limited to the amount paid for tickets. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.",
  },
  {
    id: "privacy",
    title: "8. Privacy",
    content: "Your use of Eventix is also governed by our Privacy Policy. We collect and process personal data as described therein. By using our services, you consent to such processing. We implement appropriate technical and organizational measures to protect your personal data.",
  },
  {
    id: "changes",
    title: "9. Changes to Terms",
    content: "We may update these Terms and Conditions from time to time. We will notify users of significant changes via email or platform notification. Continued use of the platform after changes constitutes acceptance. We encourage you to review these terms periodically.",
  },
  {
    id: "contact",
    title: "10. Contact Information",
    content: "If you have questions about these Terms and Conditions, please contact us at legal@eventix.com or through the Contact page on our website. Our support team is available Monday through Friday, 9 AM to 6 PM EST.",
  },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState("acceptance");

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Terms & Conditions</h1>
            <p className="text-gray-400 text-sm">Last updated: January 2025</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28 space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-medium">Table of Contents</p>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                      activeSection === section.id
                        ? "text-purple-light bg-purple/10"
                        : "text-gray-400 hover:text-white hover:bg-glass/30"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3 space-y-8"
            >
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="rounded-xl bg-glass/50 border border-glass-border p-6"
                >
                  <h2 className="text-lg font-semibold text-white mb-3">{section.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{section.content}</p>
                </section>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
