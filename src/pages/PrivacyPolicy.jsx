import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
    
    <Header />
    <div className="bg-white dark:bg-slate-900 p-6 md:p-12 min-h-screen">
    <div className="border dark:border-slate-700 shadow-lg rounded-2xl p-6 md:p-12 max-w-4xl mx-auto">      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
        Privacy Policy
      </h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Introduction
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Information Collection
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 ml-4">
            <li>Personal Data</li>
            <li>Derivative Data</li>
            <li>Financial Data</li>
            <li>Data from Social Networks</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Use of Information
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 ml-4">
            <li>Create and manage your account.</li>
            <li>Email you regarding your account or order.</li>
            <li>Enable user-to-user communications.</li>
            <li>Generate a personal profile about you to make future visits to the Site more personalized.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Disclosure of Information
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 ml-4">
            <li>By Law or to Protect Rights</li>
            <li>Third-Party Service Providers</li>
            <li>Business Transfers</li>
            <li>Affiliates</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Security of Information
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <p className="text-slate-600 dark:text-slate-400">
            <strong>Email:</strong> <span className="text-blue-700 dark:text-blue-600">hardikdaim@gmail.com</span>
          </p>
        
        </section>
      </div>
        </div>
    </div>
    <Footer />
    </>
  );
};

export default PrivacyPolicy;
