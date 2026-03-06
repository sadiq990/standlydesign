import React from 'react';
import styles from './Header.module.css';
import { Cloud } from 'lucide-react';

const Header = () => {
  const date = new Date().toLocaleDateString('az-AZ', {
    weekday: 'long', month: 'short', day: 'numeric'
  });

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1 className={styles.greeting}>Günortanız xeyir, Ali</h1>
        <div className={styles.metaRow}>
          <p className={styles.dateText}>{date}</p>
          <span className={styles.weatherBadge}>
            <Cloud size={11} strokeWidth={2.5} />
            18°C
          </span>
        </div>
      </div>
      <div className={styles.avatar}>
        <img
          src="https://api.dicebear.com/7.x/notionists/svg?seed=Ali&backgroundColor=CFF4D2"
          alt="Avatar"
        />
      </div>
    </header>
  );
};
export default Header;
