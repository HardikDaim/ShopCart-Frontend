// src/components/ThemeToggle.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLightTheme, setDarkTheme, setSystemTheme } from '../store/reducers/themeReducer';
import { FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      dispatch(savedTheme === 'light' ? setLightTheme() : savedTheme === 'dark' ? setDarkTheme() : setSystemTheme());
    }
  }, [dispatch]);

  const handleThemeChange = (theme) => {
    localStorage.setItem('theme', theme);
    switch (theme) {
      case 'light':
        dispatch(setLightTheme());
        break;
      case 'dark':
        dispatch(setDarkTheme());
        break;
      case 'system':
        dispatch(setSystemTheme());
        break;
      default:
        break;
    }
    setDropdownOpen(false);
  };


  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 text-xl font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-full shadow-sm hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <FaMoon />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 divide-y divide-gray-100 dark:divide-slate-700 rounded-md shadow-lg outline-none">
          <div className="py-1">
            <button
              onClick={() => handleThemeChange('light')}
              className={`${
                theme === 'light' ? 'bg-gray-100 dark:bg-slate-700' : ''
              } block px-4 py-2 text-sm text-gray-700 dark:text-slate-100 w-full text-left  hover:bg-gray-50 dark:hover:bg-slate-700`}
            >
              Light
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`${
                theme === 'dark' ? 'bg-gray-100 dark:bg-slate-700' : ''
              } block px-4 py-2 text-sm text-gray-700 dark:text-slate-100 w-full text-left  hover:bg-gray-50 dark:hover:bg-slate-700`}
            >
              Dark
            </button>
            <button
              onClick={() => handleThemeChange('system')}
              className={`${
                theme === 'system' ? 'bg-gray-100 dark:bg-slate-700' : ''
              } block px-4 py-2 text-sm text-gray-700 dark:text-slate-100 w-full text-left  hover:bg-gray-50 dark:hover:bg-slate-700`}
            >
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
