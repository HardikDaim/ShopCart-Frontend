import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip as ReactTooltip } from "react-tooltip";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { get_category } from "./store/reducers/homeReducer";
import CategoryShop from "./pages/CategoryShop";
import SearchProducts from "./pages/SearchProducts";
import Payment from "./pages/Payment";
import ProtectUser from "./utils/ProtectUser";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import ChangePassword from "./pages/ChangePassword";
import Wishlist from "./pages/Wishlist";
import OrderDetails from "./pages/OrderDetails";
import ScrollToTop from "./scrollToTop";
import Chat from "./pages/Chat";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DeliveryInformation from "./pages/DeliveryInformation";
import HelpCenter from "./pages/HelpCenter";
import ReturnsAndRefunds from "./pages/ReturnsAndRefunds";
import FAQ from "./pages/FAQ";
import GoogleAd from "./components/GoogleAd";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import NetworkStatusPopup from "./components/NetworkStatusPopup";
import { ClipLoader } from "react-spinners";
const Shops = lazy(() => import("./pages/Shops"));

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      window.location.reload(); // Refresh the page when online
    };

    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (theme === "system") {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", isDarkMode);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const isDarkTheme =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    dispatch(get_category());
  }, [dispatch]);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader
        size={50}
        color={isDarkTheme ? "#fff" : "#000"}
        loading={true}
      />
    </div>
  );

  return (
    <div className={isDarkTheme ? "dark" : ""}>
      <SkeletonTheme
        baseColor={isDarkTheme ? "#1F2937" : "#E5E7EB"}
        highlightColor={isDarkTheme ? "#374151" : "#F3F4F6"}
      >
        <Toaster
          toastOptions={{
            position: "top-center",
            style: {
              background: isDarkTheme
                ? "rgba(55, 65, 81, 0.9)"
                : "rgba(255, 255, 255, 0.9)",
              color: isDarkTheme ? "#F9FAFB" : "#1F2937",
            },
          }}
        />

        <ReactTooltip id="my-tooltip" place="top" effect="solid" />

        <BrowserRouter>
          <ScrollToTop />
          {process.env.NODE_ENV === "production" && (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          )}

          <NetworkStatusPopup isVisible={isOffline} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/delivery-information"
              element={<DeliveryInformation />}
            />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route
              path="/returns-and-refunds"
              element={<ReturnsAndRefunds />}
            />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/shops"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Shops />
                </Suspense>
              }
            />
            <Route
              path="/product/details/:slug"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Details />
                </Suspense>
              }
            />
            <Route
              path="/products?"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <CategoryShop />
                </Suspense>
              }
            />
            <Route path="/products/search?" element={<SearchProducts />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failed" element={<Failed />} />

            {/* Protected Routes */}
            <Route element={<ProtectUser />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-orders" element={<Orders />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/my-wishlist" element={<Wishlist />} />
              <Route
                path="/order/details/:orderId"
                element={<OrderDetails />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:sellerId" element={<Chat />} />
              <Route path="/payment" element={<Payment />} />
            </Route>
          </Routes>
          {/* <GoogleAd
            adClient="ca-pub-2161322477877336"
            adSlot="7045718367"
            adFormat="auto"
          /> */}
        </BrowserRouter>
      </SkeletonTheme>
    </div>
  );
}

export default App;
