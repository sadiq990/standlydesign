import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Dashboard.module.css';
import { CheckCircle2, Phone, Dumbbell, BookOpen } from 'lucide-react';
import WeeklyCalendar from './WeeklyCalendar';

const completedTasks = [
    { id: 1, time: "21:00", title: "Əliyə yığ", icon: Phone },
    { id: 2, time: "18:30", title: "Məşq et", icon: Dumbbell },
    { id: 3, time: "22:00", title: "Kitab oxu (15 dəq)", icon: BookOpen },
];

const Dashboard = () => {
    const [expanded, setExpanded] = useState(false);
    const total = 6;
    const completed = 3;
    const percent = Math.round((completed / total) * 100);

    return (
        <section className={styles.dashboardSection}>

            {/* Weekly Calendar Strip */}
            <WeeklyCalendar />

            {/* Progress Card */}
            <motion.div
                className={styles.progressCard}
                onClick={() => setExpanded(!expanded)}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.98 }}
                layout
            >
                <p className={styles.cardLabel}>Bugünkü irəliləyiş</p>

                {/* Linear Progress Bar */}
                <div className={styles.progressBarTrack}>
                    <motion.div
                        className={styles.progressBarFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>

                {/* Stats Row */}
                <div className={styles.statsRow}>
                    <span className={styles.completedText}>{completed}/{total} Tamamlandı</span>
                    <span className={styles.percentBadge}>{percent}%</span>
                </div>

                {/* Expandable Task List */}
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className={styles.expandedTasks}
                        >
                            <div className={styles.divider} />
                            {completedTasks.map((task, i) => (
                                <motion.div
                                    key={task.id}
                                    className={styles.taskItem}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.32, ease: "easeOut" }}
                                >
                                    <div className={styles.taskIconBg}>
                                        <task.icon size={15} />
                                    </div>
                                    <div className={styles.taskText}>
                                        <span className={styles.taskTime}>{task.time}</span>
                                        <span className={styles.taskName}>{task.title}</span>
                                    </div>
                                    <CheckCircle2 size={17} color="rgba(123,228,149,0.9)" />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={styles.tapHint}>
                    {expanded ? '▲ bağla' : '▼ detallar'}
                </div>
            </motion.div>

        </section>
    );
};
export default Dashboard;
