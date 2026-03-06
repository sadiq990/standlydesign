import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './BottomNav.module.css';
import { Home, BarChart2, Calendar, User } from 'lucide-react';
import { colors } from '../../theme';

const BottomNav = ({ onOpenAI }) => {
    const [activeTab, setActiveTab] = useState('home');

    const navItems = [
        { id: 'home', icon: Home },
        { id: 'stats', icon: BarChart2 },
        { id: 'ai', isAction: true, label: "AI" },
        { id: 'calendar', icon: Calendar },
        { id: 'profile', icon: User }
    ];

    return (
        <div className={styles.navContainer}>
            <nav className={styles.navBar}>
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;

                    if (item.isAction) {
                        return (
                            <button
                                key={item.id}
                                className={styles.actionButton}
                                onClick={onOpenAI}
                                style={{ background: colors.gradientHome, borderColor: colors.bgLight }}
                            >
                                <span style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: 18 }}>AI</span>
                            </button>
                        );
                    }

                    return (
                        <button
                            key={item.id}
                            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <item.icon
                                size={24}
                                strokeWidth={isActive ? 2.5 : 2}
                                className={styles.icon}
                            />
                            {isActive && <div className={styles.activeIndicator} style={{ backgroundColor: colors.primaryGreen }} />}
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};
export default BottomNav;
