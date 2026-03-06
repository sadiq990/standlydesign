import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './DayFlow.module.css';

// ── Default day schedule (can be personalised via Onboarding later) ──────────
const DAY_EVENTS = [
    { id: 1, time: '07:30', label: 'Sabahın xeyir' },
    { id: 2, time: '08:30', label: 'Evdən çıx' },
    { id: 3, time: '09:00', label: 'Ofisə çat' },
    { id: 4, time: '12:00', label: 'Nahar fasiləsi' },
    { id: 5, time: '18:00', label: 'İş bitir' },
    { id: 6, time: '19:00', label: 'İdman' },
    { id: 7, time: '21:00', label: 'Evə qayıt' },
];

const timeToMins = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
};

const getNowMins = () => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
};

const DayFlow = () => {
    const [nowMins, setNowMins] = useState(getNowMins());

    // Refresh every minute so the timeline auto-advances
    useEffect(() => {
        const timer = setInterval(() => setNowMins(getNowMins()), 60_000);
        return () => clearInterval(timer);
    }, []);

    const events = DAY_EVENTS.map(e => ({ ...e, mins: timeToMins(e.time) }));

    // First upcoming event is "active"; everything before it is "past"
    let activeIdx = events.findIndex(e => e.mins > nowMins);
    if (activeIdx === -1) activeIdx = events.length - 1; // past midnight fallback

    // Sliding window: [past, active, next]  (max 3 visible)
    const winStart = Math.max(0, activeIdx - 1);
    const winEnd = Math.min(events.length - 1, winStart + 2);
    const visible = events.slice(winStart, winEnd + 1);

    const statusOf = (localIdx) => {
        const global = winStart + localIdx;
        if (global < activeIdx) return 'past';
        if (global === activeIdx) return 'active';
        return 'future';
    };

    return (
        <section className={styles.section}>
            {/* Section header */}
            <div className={styles.header}>
                <h3 className={styles.title}>Gün Axını</h3>
                <span className={styles.liveBadge}>
                    <span className={styles.liveDot} />
                    Canlı
                </span>
            </div>

            {/* Timeline card */}
            <div className={styles.card}>
                <div className={styles.timeline}>
                    {visible.map((evt, i) => {
                        const status = statusOf(i);
                        const isLast = i === visible.length - 1;

                        return (
                            <motion.div
                                key={evt.id}
                                className={styles.row}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.35, ease: 'easeOut' }}
                            >
                                {/* — Left: dot + connecting line — */}
                                <div className={styles.leftCol}>
                                    {/* Dot */}
                                    <div className={`${styles.dot} ${styles['dot_' + status]}`}>
                                        {status === 'active' && (
                                            <motion.span
                                                className={styles.dotRing}
                                                animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
                                                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeOut' }}
                                            />
                                        )}
                                    </div>
                                    {/* Connector line (not on last row) */}
                                    {!isLast && (
                                        <div className={`${styles.connector} ${status === 'past' ? styles.connectorDone : ''}`} />
                                    )}
                                </div>

                                {/* — Right: event info — */}
                                <div className={`${styles.content} ${styles['content_' + status]}`}>
                                    <span className={styles.evtTime}>{evt.time}</span>
                                    <span className={styles.evtLabel}>{evt.label}</span>
                                    {status === 'past' && <span className={styles.check}>✓</span>}
                                    {status === 'active' && <span className={styles.nowPill}>İndi</span>}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section >
    );
};

export default DayFlow;
