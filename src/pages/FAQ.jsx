import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const FAQ = () => {
  return (
    <>
      <Header />
      <div className="bg-white dark:bg-zinc-900 p-6 md:p-12 min-h-screen">
        <div className="border dark:border-zinc-700 shadow-lg rounded-2xl p-6 md:p-8 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions
          </h1>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                What is your return policy?
              </h2>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                We offer a 30-day return policy on all items. If you are not
                satisfied with your purchase, you can return it within 30 days
                of delivery for a full refund. The product must be in its
                original condition and packaging.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                How can I track my order?
              </h2>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                You can track your order using the tracking number provided in
                your shipping confirmation email. Simply enter the tracking
                number on our website's tracking page.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                Do you offer international shipping?
              </h2>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                Yes, we offer international shipping to most countries. Shipping
                costs and delivery times vary depending on the destination. You
                can view the shipping options and costs at checkout.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                What payment methods do you accept?
              </h2>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                We accept various payment methods including credit/debit cards,
                PayPal, and other secure payment options. You can view all
                available payment methods at checkout.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
                How can I contact customer support?
              </h2>
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                You can contact our customer support team by email at{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-blue-700 dark:text-blue-400 underline"
                >
                  hardikdaim@gmail.com
                </a>
                . Our support team is available Monday to Friday, 9 AM to 5 PM.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
