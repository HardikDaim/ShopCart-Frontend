import axios from "axios";

const localBaseUrl = "http://localhost:4000";
const productionBaseUrl = "https://shop-cart-backend-green.vercel.app";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? `${productionBaseUrl}/api`
      : `${localBaseUrl}/api`,
});

export default api;
