import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Toaster } from "react-hot-toast";
import { get_category } from "./store/reducers/homeReducer";
import ProtectUser from "./utils/ProtectUser";
import ScrollToTop from "./scrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Details = lazy(() => import("./pages/Details"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const CategoryShop = lazy(() => import("./pages/CategoryShop"));
const SearchProducts = lazy(() => import("./pages/SearchProducts"));
const Payment = lazy(() => import("./pages/Payment"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Chat = lazy(() => import("./pages/Chat"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const DeliveryInformation = lazy(() => import("./pages/DeliveryInformation"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const ReturnsAndRefunds = lazy(() => import("./pages/ReturnsAndRefunds"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Success = lazy(() => import("./pages/Success"));
const Failed = lazy(() => import("./pages/Failed"));
const Shops = lazy(() => import("./pages/Shops"));
const GoogleAd = lazy(() => import("./components/GoogleAd"));
const NetworkStatusPopup = lazy(() => import("./components/NetworkStatusPopup"));

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
            <Route path="/" element={
              <Suspense fallback={<div></div>}>
                <Home />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<div></div>}>
                <NotFound />
              </Suspense>
            } />
            <Route path="/about-us" element={
              <Suspense fallback={<div></div>}>
                <AboutUs />
              </Suspense>
            } />
            <Route path="/contact-us" element={
              <Suspense fallback={<div></div>}>
                <ContactUs />
              </Suspense>
            } />
            <Route path="/privacy-policy" element={
              <Suspense fallback={<div></div>}>
                <PrivacyPolicy />
              </Suspense>
            } />
            <Route path="/delivery-information" element={
              <Suspense fallback={<div></div>}>
                <DeliveryInformation />
              </Suspense>
            } />
            <Route path="/help-center" element={
              <Suspense fallback={<div></div>}>
                <HelpCenter />
              </Suspense>
            } />
            <Route path="/returns-and-refunds" element={
              <Suspense fallback={<div></div>}>
                <ReturnsAndRefunds />
              </Suspense>
            } />
            <Route path="/faq" element={
              <Suspense fallback={<div></div>}>
                <FAQ />
              </Suspense>
            } />
            <Route path="/login" element={
              <Suspense fallback={<div></div>}>
                <Login />
              </Suspense>
            } />
            <Route path="/register" element={
              <Suspense fallback={<div></div>}>
                <Register />
              </Suspense>
            } />
            <Route path="/shops" element={
              <Suspense fallback={<div></div>}>
                <Shops />
              </Suspense>
            } />
            <Route path="/product/details/:slug" element={
              <Suspense fallback={<div></div>}>
                <Details />
              </Suspense>
            } />
            <Route path="/products?" element={
              <Suspense fallback={<div></div>}>
                <CategoryShop />
              </Suspense>
            } />
            <Route path="/products/search?" element={
              <Suspense fallback={<div></div>}>
                <SearchProducts />
              </Suspense>
            } />
            <Route path="/success" element={
              <Suspense fallback={<div></div>}>
                <Success />
              </Suspense>
            } />
            <Route path="/failed" element={
              <Suspense fallback={<div></div>}>
                <Failed />
              </Suspense>
            } />

            {/* Protected Routes */}
            <Route element={<ProtectUser />}>
              <Route path="/dashboard" element={
                <Suspense fallback={<div></div>}>
                  <Dashboard />
                </Suspense>
              } />
              <Route path="/my-orders" element={
                <Suspense fallback={<div></div>}>
                  <Orders />
                </Suspense>
              } />
              <Route path="/change-password" element={
                <Suspense fallback={<div></div>}>
                  <ChangePassword />
                </Suspense>
              } />
              <Route path="/my-wishlist" element={
                <Suspense fallback={<div></div>}>
                  <Wishlist />
                </Suspense>
              } />
              <Route path="/order/details/:orderId" element={
                <Suspense fallback={<div></div>}>
                  <OrderDetails />
                </Suspense>
              } />
              <Route path="/cart" element={
                <Suspense fallback={<div></div>}>
                  <Cart />
                </Suspense>
              } />
              <Route path="/shipping" element={
                <Suspense fallback={<div></div>}>
                  <Shipping />
                </Suspense>
              } />
              <Route path="/chat" element={
                <Suspense fallback={<div></div>}>
                  <Chat />
                </Suspense>
              } />
              <Route path="/payment" element={
                <Suspense fallback={<div></div>}>
                  <Payment />
                </Suspense>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </SkeletonTheme>
    </div>
  );
}

export default App;
