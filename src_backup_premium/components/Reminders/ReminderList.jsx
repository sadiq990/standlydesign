import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle2, PersonStanding, Droplets, Eye } from 'lucide-react';
import { colors } from '../../theme';
import styles from './ReminderList.module.css';

const initialReminders = [
    { id: 1, title: 'Ayağa qalx', icon: PersonStanding, color: colors.primaryTeal, stat: '3,400 addım' },
    { id: 2, title: 'Su iç', icon: Droplets, color: "#4299E1", stat: '1.2L' },
    { id: 3, title: 'Göz fasiləsi', icon: Eye, color: "#805AD5", stat: '42 dəq' },
];

const ReminderList = () => {
    const [reminders, setReminders] = useState(initialReminders);
    const [completing, setCompleting] = useState(new Set());

    const startComplete = (id) => {
        setCompleting(prev => new Set([...prev, id]));
        setTimeout(() => {
            setReminders(prev => prev.filter(r => r.id !== id));
            setCompleting(prev => { const n = new Set(prev); n.delete(id); return n; });
        }, 600);
    };

    const addReminder = () => {
        setReminders(prev => [...prev, {
            id: Date.now(),
            title: 'Yeni xatırlatma',
            icon: Droplets,
            color: colors.primaryGreen,
            stat: '',
        }]);
    };

    return (
        <section className={styles.reminderSection}>
            <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Xatırlatmalar</h3>
                <motion.button
                    className={styles.addBtn}
                    onClick={addReminder}
                    whileTap={{ scale: 0.88 }}
                    whileHover={{ scale: 1.08 }}
                >
                    <Plus size={16} strokeWidth={2.5} />
                </motion.button>
            </div>

            <div className={styles.horizontalScroll}>
                <AnimatePresence>
                    {reminders.map((r) => {
                        const isCompleting = completing.has(r.id);
                        return (
                            <motion.div
                                key={r.id}
                                className={styles.reminderCard}
                                style={{ borderTop: `3px solid ${r.color}` }}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: isCompleting ? 0.4 : 1, scale: isCompleting ? 0.91 : 1 }}
                                exit={{ opacity: 0, scale: 0.7, x: -16 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => !isCompleting && startComplete(r.id)}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                                layout
                            >
                                {/* Completion overlay */}
                                <AnimatePresence>
                                    {isCompleting && (
                                        <motion.div
                                            className={styles.checkOverlay}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: 'spring', damping: 14 }}
                                        >
                                            <CheckCircle2 size={30} color="#ffffff" strokeWidth={2} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Icon */}
                                <div className={styles.iconWrapper}
                                    style={{ backgroundColor: `${r.color}18`, color: r.color }}>
                                    <r.icon size={26} strokeWidth={1.8} />
                                </div>

                                {/* Title */}
                                <span className={styles.reminderTitle}>{r.title}</span>

                                {/* Stat badge */}
                                {r.stat ? (
                                    <span className={styles.reminderStat} style={{ color: r.color }}>
                                        {r.stat}
                                    </span>
                                ) : null}
                            </motion.div>
                        );
                    })}
                    {reminders.length === 0 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={styles.emptyText}
                        >
                            Bütün xatırlatmalar tamamlandı! 🎉
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
export default ReminderList;
