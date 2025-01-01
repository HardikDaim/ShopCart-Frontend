import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HelpCenter = () => {
  return (
    <>
      <Header />
      <div className="bg-white dark:bg-zinc-900 p-6 md:p-12 min-h-screen">
        <div className="border dark:border-zinc-700 shadow-lg rounded-2xl p-6 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center text-zinc-900 dark:text-zinc-100">
            Help Center
          </h1>
          <div className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            <section className="mb-6">
              <h2 className="text-lg md:text-2xl font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
                Frequently Asked Questions
              </h2>
              <p className="mb-4">
                Have a question? Check out our FAQ section to find answers to
                the most common questions.
              </p>
              <ul className="list-disc pl-5">
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-blue-700 dark:text-blue-400 underline"
                  >
                    How do I create an account?
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-blue-700 dark:text-blue-400 underline"
                  >
                    How can I reset my password?
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-blue-700 dark:text-blue-400 underline"
                  >
                    How do I track my order?
                  </a>
                </li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
                Customer Support
              </h2>
              <p className="mb-4">
                Need further assistance? Our customer support team is here to
                help you with any issues or questions you may have.
              </p>
              <ul className="list-disc pl-5">
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-blue-700 dark:text-blue-400 underline"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-blue-700 dark:text-blue-400 underline"
                  >
                    Chat with a Support Agent
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-blue-700 dark:text-blue-400 underline"
                  >
                    Report an Issue
                  </a>
                </li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
                Resources
              </h2>
              <p className="mb-4">
                Explore our range of resources to help you make the most of our
                services.
              </p>
              <ul className="list-disc pl-5">
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-blue-700 dark:text-blue-400 underline"
                  >
                    User Guides
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-blue-700 dark:text-blue-400 underline"
                  >
                    Tutorials
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-blue-700 dark:text-blue-400 underline"
                  >
                    Knowledge Base
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpCenter;
