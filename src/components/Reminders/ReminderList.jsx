import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckCircle2, PersonStanding, Droplets, Eye } from 'lucide-react';
import { colors } from '../../theme';
import styles from './ReminderList.module.css';

const initialReminders = [
    { id: 1, title: 'Ayağa qalx', icon: PersonStanding, color: "#56C596", stat: '3,400 / 5k addım', progress: 68 },
    { id: 2, title: 'Su iç', icon: Droplets, color: "#4299E1", stat: '1.2 / 2.0 L', progress: 60 },
    { id: 3, title: 'Göz fasiləsi', icon: Eye, color: "#805AD5", stat: '42 / 60 dəq', progress: 70 },
];

const ReminderList = () => {
    const [reminders, setReminders] = useState(initialReminders);
    const [completing, setCompleting] = useState(new Set());
    const [expandedId, setExpandedId] = useState(null);

    const startComplete = (e, id) => {
        e.stopPropagation();
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
                {/* The "Add" button is moved to a global FAB */}
            </div>

            <div className={styles.horizontalScroll}>
                <AnimatePresence>
                    {reminders.map((r, index) => {
                        const isCompleting = completing.has(r.id);
                        const isExpanded = expandedId === r.id;
                        return (
                            <motion.div
                                key={r.id}
                                className={styles.reminderCard}
                                style={{
                                    borderTop: `3px solid ${r.color}`,
                                    width: isExpanded ? 200 : 'calc(33.33% - 14px)',
                                    minWidth: isExpanded ? 200 : 100
                                }}
                                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                                animate={{ opacity: isCompleting ? 0.4 : 1, scale: isCompleting ? 0.91 : 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.7, x: -16 }}
                                transition={{ duration: 0.35, delay: 0.05 * index }}
                                onClick={() => !isCompleting && setExpandedId(isExpanded ? null : r.id)}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={!isExpanded ? { scale: 0.96 } : {}}
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

                                {/* Small progress bar indicator */}
                                {r.progress !== undefined && (
                                    <div className={styles.miniProgressBar}>
                                        <div
                                            className={styles.miniProgressFill}
                                            style={{
                                                width: `${r.progress}%`,
                                                backgroundColor: r.color,
                                                boxShadow: `0 0 8px ${r.color}55`
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Stat badge */}
                                {r.stat ? (
                                    <span className={styles.reminderStat} style={{ color: r.color }}>
                                        {r.stat}
                                    </span>
                                ) : null}

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            className={styles.expandedContent}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <div className={styles.expandedDetails}>
                                                <p>Növbəti: <strong>12 dəq</strong></p>
                                                <p>Tarixçə: <strong>Bugün 3 dəfə</strong></p>
                                            </div>
                                            <button
                                                className={styles.completeBtn}
                                                style={{ backgroundColor: `${r.color}25`, color: r.color }}
                                                onClick={(e) => startComplete(e, r.id)}
                                            >
                                                <CheckCircle2 size={16} /> Tamamla
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
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

            {/* Floating Action Button for Adding Reminders */}
            <motion.button
                className={styles.fab}
                onClick={addReminder}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <Plus size={24} strokeWidth={2.5} />
            </motion.button>
        </section>
    );
};
export default ReminderList;
