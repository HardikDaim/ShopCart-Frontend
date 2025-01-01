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
        className="inline-flex justify-center w-full px-4 py-2 text-lg font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-full shadow-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <FaMoon />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 divide-y divide-zinc-100 dark:divide-zinc-700 rounded-md shadow-lg outline-none">
          <div className="py-1">
            <button
              onClick={() => handleThemeChange('light')}
              className={`${
                theme === 'light' ? 'bg-zinc-100 dark:bg-zinc-700' : ''
              } block px-4 py-2 text-xs text-zinc-700 dark:text-zinc-100 w-full text-left  hover:bg-zinc-50 dark:hover:bg-zinc-700`}
            >
              Light
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`${
                theme === 'dark' ? 'bg-zinc-100 dark:bg-zinc-700' : ''
              } block px-4 py-2 text-xs text-zinc-700 dark:text-zinc-100 w-full text-left  hover:bg-zinc-50 dark:hover:bg-zinc-700`}
            >
              Dark
            </button>
            <button
              onClick={() => handleThemeChange('system')}
              className={`${
                theme === 'system' ? 'bg-zinc-100 dark:bg-zinc-700' : ''
              } block px-4 py-2 text-xs text-zinc-700 dark:text-zinc-100 w-full text-left  hover:bg-zinc-50 dark:hover:bg-zinc-700`}
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
