import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    // Initialize theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // If no saved theme, determine based on media query for initial icon render
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const date = new Date().toLocaleDateString('az-AZ', {
    weekday: 'long', month: 'short', day: 'numeric'
  });

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className={styles.left}>
        <h1 className={styles.greeting}>Günortanız xeyir, Ali!</h1>
        <motion.div
          className={styles.subtitleRow}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <span className={styles.nextSubtitle}>Növbəti: Su içmək</span>
          <span className={styles.nextTime}>23 dəq</span>
        </motion.div>
      </div>
      <div className={styles.rightGroup}>
        <motion.button
          className={styles.themeToggle}
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
              style={{ display: 'flex' }}
            >
              {theme === 'dark' ? <Sun size={18} color="currentColor" /> : <Moon size={18} color="currentColor" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
        <div className={styles.avatar}>
          <img
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Ali&backgroundColor=CFF4D2"
            alt="Avatar"
          />
        </div>
      </div>
    </motion.header>
  );
};
export default Header;
