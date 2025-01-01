import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ReturnsAndRefunds = () => {
  return (
    <>
      <Header />
      <div className="bg-white dark:bg-zinc-900 p-6 md:p-12 min-h-screen">
        <div className="border dark:border-zinc-700 shadow-lg rounded-2xl p-6 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center text-zinc-900 dark:text-zinc-100">
            Returns & Refunds Policy
          </h1>
          <div className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
                Return Policy
              </h2>
              <p className="mb-4">
                If you are not satisfied with your purchase, you can return the
                product within 30 days of delivery for a full refund. The
                product must be in its original condition and packaging.
              </p>
              <p className="mb-4">
                To initiate a return, please contact our customer support team
                with your order details. We will provide you with a return
                authorization and instructions on how to send your item back to
                us.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
                Refund Policy
              </h2>
              <p className="mb-4">
                Once we receive your returned item, we will inspect it and
                notify you of the status of your refund. If your return is
                approved, we will initiate a refund to your original method of
                payment. You will receive the credit within a certain number of
                days, depending on your card issuer's policies.
              </p>
              <p className="mb-4">
                Please note that shipping costs are non-refundable. If you
                receive a refund, the cost of return shipping will be deducted
                from your refund.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
                Exchanges
              </h2>
              <p className="mb-4">
                If you need to exchange an item for a different size or color,
                please contact our customer support team. We will provide you
                with instructions on how to send the item back to us. Once we
                receive the item, we will send out the new item to you.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
                Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions about our returns and refunds policy,
                please contact us at{" "}
                <a
                  href="mailto:support@example.com"
                  className="text-blue-700 dark:text-blue-400 underline"
                >
               hardikdaim@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReturnsAndRefunds;
