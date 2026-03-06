import React, { useState } from 'react';
import styles from './WeeklyCalendar.module.css';

const generateWeek = () => {
    const today = new Date();
    const result = [];
    for (let i = -3; i <= 3; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        result.push(d);
    }
    return result;
};

// Mock: weekday indices (0=Sun) that have tasks
const DAYS_WITH_TASKS = new Set([0, 1, 3, 4]);

const WeeklyCalendar = () => {
    const days = generateWeek();
    const todayStr = new Date().toDateString();
    const [selectedDay, setSelectedDay] = useState(todayStr);

    const getDayInitial = (date) =>
        date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.scrollWrapper}>
                {days.map((date, index) => {
                    const isSelected = date.toDateString() === selectedDay;
                    const hasTasks = DAYS_WITH_TASKS.has(date.getDay());
                    return (
                        <button
                            key={index}
                            className={`${styles.dayPill} ${isSelected ? styles.activePill : ''}`}
                            onClick={() => setSelectedDay(date.toDateString())}
                        >
                            <span className={`${styles.dayLabel} ${isSelected ? styles.activeDayLabel : ''}`}>
                                {getDayInitial(date)}
                            </span>
                            <div className={`${styles.dateCircle} ${isSelected ? styles.activeCircle : ''}`}>
                                {date.getDate()}
                            </div>
                            <div className={`${styles.taskDot} ${hasTasks ? styles.taskDotVisible : ''} ${isSelected && hasTasks ? styles.taskDotActive : ''}`} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default WeeklyCalendar;
