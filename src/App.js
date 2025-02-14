import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Toaster } from "react-hot-toast";
import { get_category } from "./store/reducers/homeReducer";
import ProtectUser from "./utils/ProtectUser";
import ChangePassword from "./pages/ChangePassword";
import ScrollToTop from "./scrollToTop";
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
import { ClipLoader, DotLoader } from "react-spinners";
import ProductAdModal from "./ads/ProductAdModal";

const Home = lazy(() => import("./pages/Home"));
const Shops = lazy(() => import("./pages/Shops"));
const CategoryShop = lazy(() => import("./pages/CategoryShop"));
const SearchProducts = lazy(() => import("./pages/SearchProducts"));
const Cart = lazy(() => import("./pages/Cart"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Details = lazy(() => import("./pages/Details"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Payment = lazy(() => import("./pages/Payment"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Orders = lazy(() => import("./pages/Orders"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Chat = lazy(() => import("./pages/Chat"));

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
      <DotLoader size={50} color="#1D4ED8" loading={true} />
    </div>
  );

  return (
    <div className={isDarkTheme ? "dark" : ""}>
      <SkeletonTheme
        baseColor={isDarkTheme ? "#18181B" : "#F4F4F5"}
        highlightColor={isDarkTheme ? "#3F3F46" : "#E4E4E7"}
      >
        <Toaster
          toastOptions={{
            position: "top-center",
            style: {
              background: isDarkTheme
                ? "rgba(63, 63, 70, 0.9)"
                : "rgba(228, 228, 231, 0.9)",
              color: isDarkTheme ? "#FAFAFA" : "#18181B",
            },
          }}
        />

        <ReactTooltip id="my-tooltip" place="top" effect="solid" />

        <BrowserRouter>
          <ScrollToTop />
          <ProductAdModal />
          {process.env.NODE_ENV === "production" && (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          )}

          <NetworkStatusPopup isVisible={isOffline} />

          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Home />
                </Suspense>
              }
            />
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
            <Route
              path="/login"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Register />
                </Suspense>
              }
            />
            <Route path="/shops" element={<Shops />} />
            <Route path="/product/details/:slug" element={<Details />} />
            <Route path="/products?" element={<CategoryShop />} />
            <Route path="/products/search?" element={<SearchProducts />} />
            <Route path="/success" element={<Success />} />
            <Route path="/failed" element={<Failed />} />

            {/* Protected Routes */}
            <Route element={<ProtectUser />}>
              <Route
                path="/dashboard"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Dashboard />
                  </Suspense>
                }
              />
              <Route
                path="/my-orders"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Orders />
                  </Suspense>
                }
              />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route
                path="/my-wishlist"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Wishlist />
                  </Suspense>
                }
              />
              <Route
                path="/order/details/:orderId"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <OrderDetails />
                  </Suspense>
                }
              />
              <Route
                path="/cart"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Cart />
                  </Suspense>
                }
              />
              <Route
                path="/shipping"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Shipping />
                  </Suspense>
                }
              />
              <Route
                path="/chat"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Chat />
                  </Suspense>
                }
              />
              <Route path="/chat/:sellerId" element={<Chat />} />
              <Route
                path="/payment"
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Payment />
                  </Suspense>
                }
              />
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
