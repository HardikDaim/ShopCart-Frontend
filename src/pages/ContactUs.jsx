import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const ContactUs = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.name) {
      toast.error("Name is required");
      return;
    }
    if (!input.email) {
      toast.error("Email is required");
      return;
    }
    if (!input.message) {
      toast.error("Message is required");
      return;
    }
    if (input.name && input.email && input.message) {
      toast.success("Message Send Successfully");
    }
  };
  return (
    <>
      <Header />
      <div className="text-zinc-900 dark:text-zinc-200 p-6 md:p-12 min-h-screen">
      <div className="border dark:border-zinc-700 shadow-lg rounded-2xl p-6 md:p-12 max-w-4xl mx-auto">          <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
          <div className="text-lg">
            <p className="mb-4">
              We would love to hear from you! Whether you have a question about
              our services, need assistance, or just want to give feedback, feel
              free to reach out to us.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-600 rounded"
                  required
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-600 rounded"
                  required
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={input.message}
                  name="message"
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-600 rounded"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-700 dark:bg-blue-600 text-white font-semibold rounded hover:bg-blue-800 dark:hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
