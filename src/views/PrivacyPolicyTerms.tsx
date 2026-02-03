"use client";

import Navbar from "@/src/components/global/Navbar";
import Footer from "@/src/components/global/Footer";

export function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen text-slate-100 pt-10 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-10 mt-10">Privacy Policy</h1>
          <p className="mt-2 text-slate-400 text-sm">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="mt-10 space-y-8 text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">1. Introduction</h2>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you
                visit our website or use our services. By accessing or using our services, you agree to the terms of
                this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">2. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal information such as name, email address, and contact details.</li>
                <li>Usage data including pages visited, time spent, and interactions.</li>
                <li>Technical data such as browser type, device information, and IP address.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">3. How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Provide and maintain our services</li>
                <li>Improve user experience and website performance</li>
                <li>Communicate updates, offers, or support responses</li>
                <li>Ensure security and prevent fraudulent activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">4. Cookies & Tracking</h2>
              <p>
                We may use cookies and similar tracking technologies to enhance your experience. You can control
                cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data.
                However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">6. Your Rights</h2>
              <p>
                Depending on your location, you may have rights to access, correct, or delete your personal
                information. Contact us to exercise these rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at
                <span className="text-blue-400">        
                <a
                  href="https://mail.google.com/mail/?view=cm&to=braj@thesolfactory.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  braj@thesolfactory.com
                </a></span>.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen text-slate-100 pt-10 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-10 mt-10">Terms of Service</h1>
          <p className="mt-2 text-slate-400 text-sm">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="mt-10 space-y-8 text-slate-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using our website and services, you agree to be bound by these Terms of Service.
                If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">2. Use of Services</h2>
              <p>
                You agree to use our services only for lawful purposes and in accordance with these terms. Any
                misuse, unauthorized access, or harmful activity is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">3. Intellectual Property</h2>
              <p>
                All content, trademarks, logos, and materials on this site are owned by or licensed to us and
                may not be used without prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">4. Limitation of Liability</h2>
              <p>
                We are not liable for any indirect, incidental, or consequential damages arising from your use
                of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">5. Termination</h2>
              <p>
                We reserve the right to suspend or terminate access to our services at any time without prior
                notice if you violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">6. Changes to Terms</h2>
              <p>
                We may update these Terms of Service from time to time. Continued use of the services after
                changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">7. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of your applicable
                jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-medium text-slate-200 mb-2">8. Contact Information</h2>
              <p>
                If you have any questions regarding these Terms of Service, please contact us at
                <span className="text-blue-400">
                  <a
                  href="https://mail.google.com/mail/?view=cm&to=braj@thesolfactory.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  braj@thesolfactory.com
                </a>
                </span>.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
