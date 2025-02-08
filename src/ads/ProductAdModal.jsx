import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const productAds = [
  // MacBook Pro
  {
    id: 1,
    image:
      "https://miro.medium.com/v2/resize:fit:1400/1*5gSoG8WLGQujOOo-EJhYBg.png",
    title: "MacBook Pro - Power Meets Performance!",
    description:
      "Unleash your creativity with the powerful MacBook Pro. Order yours today!",
    link: "/products/search?search=MacBook&&category=Laptops",
  },
  // OnePlus 13
  {
    id: 2,
    image:
      "https://images.indianexpress.com/2025/01/OnePlus-13-OnePlus-13R-India-Launch-LIVE-Updates-1.jpg",
    title: "OnePlus 13 - The Future of Smartphones!",
    description:
      "Experience next-gen performance and cutting-edge technology. Pre-order now!",
    link: "/products/search?search=OnePlus&&category=Smartphones",
  },
  // Samsung Neo QLED 8K
  {
    id: 3,
    image:
      "https://img.global.news.samsung.com/in/wp-content/uploads/2022/04/11630_Neo_Qled_Banner_3000x2000.jpg",
    title: "Samsung Neo QLED 8K - Ultimate View!",
    description:
      "Enjoy breathtaking visuals with the latest Neo QLED 8K TV. Limited stock available!",
    link: "/products?category=Smart TV",
  },
];

const ProductAdModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const showModalTimeout = setTimeout(() => setIsOpen(true), 30000);
    return () => clearTimeout(showModalTimeout);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "auto";
      return;
    }

    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) =>
        prevIndex === productAds.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black backdrop-blur-md bg-opacity-50 z-50">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-96 md:w-[80vh] mx-4 text-center border border-zinc-200 dark:border-zinc-700"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-2 -right-2 p-2 rounded-full border dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 transition"
          >
            <X className="w-4 h-4 md:w-5 md:h-5 text-zinc-700 dark:text-zinc-300" />
          </button>
          <Link
            to={productAds[currentAdIndex].link}
            onClick={() => setIsOpen(false)}
          >
            <img
              src={productAds[currentAdIndex].image}
              alt="Product Ad"
              className="w-full h-auto object-cover rounded-t-xl shadow-md"
            />
            <div className="px-4 md:px-8 py-6">
              <h2 className="text-sm md:text-2xl font-semibold text-zinc-900 dark:text-white">
                {productAds[currentAdIndex].title}
              </h2>
              <p className="text-xs md:text-lg text-zinc-700 dark:text-zinc-300 mt-2">
                {productAds[currentAdIndex].description}
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    )
  );
};

export default ProductAdModal;
