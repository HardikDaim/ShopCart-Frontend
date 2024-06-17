import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThemeToggle from './components/ThemeToggle';
import Shops from "./pages/Shops";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from 'react-hot-toast';
import { get_category } from "./store/reducers/homeReducer";
import CategoryShop from "./pages/CategoryShop";
import SearchProducts from "./pages/SearchProducts";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    if (theme === 'system') {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', isDarkMode);
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const isDarkTheme = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);


  useEffect(() => {
    dispatch(get_category());
  },[])

  return (
    <div className={isDarkTheme ? 'dark' : ''}>
      <Toaster
        toastOptions={{
          position: 'top-center',
          style: {
            background: isDarkTheme ? 'rgba(55, 65, 81, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            color: isDarkTheme ? '#F9FAFB' : '#1F2937',
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/product/details/:slug" element={<Details />} />
          <Route path="/products?" element={<CategoryShop />} />
          <Route path="/products/search?" element={<SearchProducts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
