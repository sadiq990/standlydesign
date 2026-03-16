import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, HeartPulse, Wallet, Sparkles, ChevronRight, ArrowLeft, ListTodo } from 'lucide-react';
import styles from './AIModal.module.css';
import AIChat from './AIChat';

const aiCategories = [
    {
        id: 'task',
        title: 'AI Task Assistant',
        desc: 'Organize your day and set up new habits',
        icon: ListTodo,
        gradient: 'linear-gradient(135deg, #205072, #329D9C)',
        badge: 'Smart',
    },
    {
        id: 'food',
        title: 'Nutrition',
        desc: 'Find restaurants, recipes, or track meals',
        icon: Utensils,
        gradient: 'linear-gradient(135deg, #F6AD55, #ED8936)',
        badge: 'New',
    },
    {
        id: 'health',
        title: 'Health',
        desc: 'Advice for a healthier lifestyle',
        icon: HeartPulse,
        gradient: 'linear-gradient(135deg, #FC8181, #F56565)',
        badge: null,
    },
    {
        id: 'finance',
        title: 'Finance',
        desc: 'Plan your budget and track expenses',
        icon: Wallet,
        gradient: 'linear-gradient(135deg, #68D391, #38A169)',
        badge: null,
    },
];

const AIModal = ({ isOpen, onClose }) => {
    const [active, setActive] = useState(null);
    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setShowChat(false);
            setActive(null);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.fullPage}
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 240, mass: 0.9 }}
                >
                    {/* ── Top Nav Bar ─────────────────────────── */}
                    <div className={styles.topBar}>
                        <motion.button
                            className={styles.backBtn}
                            onClick={onClose}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ArrowLeft size={20} strokeWidth={2.5} />
                        </motion.button>
                        <h2 className={styles.pageTitle}>AI Assistant</h2>
                        <div style={{ width: 40 }} />
                    </div>

                    {/* ── Hero ────────────────────────────────── */}
                    <div className={styles.heroSection}>
                        <motion.div
                            className={styles.aiIconWrapper}
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1, type: 'spring', damping: 14 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ display: 'flex' }}
                            >
                                <Sparkles size={34} color="#ffffff" strokeWidth={1.8} />
                            </motion.div>
                        </motion.div>
                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18, duration: 0.3 }}
                        >
                            Choose a category to start
                        </motion.p>
                    </div>

                    {/* ── Categories ──────────────────────────── */}
                    <div className={styles.categoriesList}>
                        {aiCategories.map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                className={`${styles.categoryCard} ${active === cat.id ? styles.categoryCardActive : ''}`}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.09, duration: 0.36, ease: 'easeOut' }}
                                onClick={() => {
                                    if (cat.id === 'task') setShowChat(true);
                                    else setActive(cat.id === active ? null : cat.id);
                                }}
                                whileHover={{ scale: 1.015, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <div className={styles.catIcon} style={{ background: cat.gradient }}>
                                    <cat.icon size={24} color="#ffffff" strokeWidth={2} />
                                </div>
                                <div className={styles.catInfo}>
                                    <div className={styles.catTitleRow}>
                                        <h4 className={styles.catTitle}>{cat.title}</h4>
                                        {cat.badge && (
                                            <span className={styles.badgePill}>{cat.badge}</span>
                                        )}
                                    </div>
                                    <p className={styles.catDesc}>{cat.desc}</p>
                                </div>
                                <ChevronRight size={18} className={styles.arrow} strokeWidth={2} />
                            </motion.div>
                        ))}
                    </div>

                    <p className={styles.footerHint}>✦ AI is learning your habits</p>

                    <AnimatePresence>
                        {showChat && <AIChat onClose={() => setShowChat(false)} />}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AIModal;
