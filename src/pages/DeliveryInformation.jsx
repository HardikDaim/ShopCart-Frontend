import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const DeliveryInformation = () => {
  return (<>
  <Header />
    <div className="bg-white dark:bg-zinc-900 p-6 md:p-12 min-h-screen">
    <div className="border dark:border-zinc-700 shadow-lg rounded-2xl p-6 md:p-12 max-w-4xl mx-auto">
      <h1 className="text-3xl flex justify-center font-bold text-zinc-900 dark:text-white mb-6">
        Delivery Information
      </h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
            Delivery Times
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            We strive to deliver your orders within the estimated delivery time provided during the checkout process. Delivery times may vary based on your location, the shipping method selected, and the time of your order. Please note that orders placed on weekends or holidays may take longer to process.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
            Shipping Costs
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Shipping costs are calculated based on the weight and dimensions of your order, as well as the delivery location. The exact shipping costs will be displayed at checkout before you complete your order. We offer various shipping options to cater to your needs, including standard and express shipping.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
            Tracking Orders
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Once your order has been shipped, you will receive an email notification with your tracking information. You can use this information to track the status of your delivery through our shipping partner's website. If you have any questions or issues with your tracking information, please contact our customer support team.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            If you have any questions about our delivery policies or need assistance with your order, please contact our customer support team:
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            <strong>Email:</strong> <span className="text-blue-700 dark:text-blue-600">hardikdaim@gmail.com</span>
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            <strong>Phone:</strong> <span className="text-blue-700 dark:text-blue-600">91-95182-13371</span>
          </p>

        </section>
      </div>
    </div>
        </div>
    <Footer />
  </>
  );
};

export default DeliveryInformation;
