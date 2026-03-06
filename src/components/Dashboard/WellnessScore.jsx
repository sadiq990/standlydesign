import React from 'react';
import styles from './Dashboard.module.css';
import { Plus } from 'lucide-react';

const WellnessScore = ({ score = 85 }) => {
    return (
        <div
            className={`${styles.gradientCard} animate-slide-up`}
            style={{ background: 'linear-gradient(135deg, var(--c-dark-green), var(--c-forest-green))' }}
        >
            {/* Decorative bg shapes */}
            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -10, right: 10, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

            <div className={styles.gradientCardIcon}>
                <Plus size={20} strokeWidth={2.5} color="#fff" />
            </div>

            <div className={styles.cardContent}>
                <span className={styles.cardSubtitle}>Current Score</span>
                <h3 className={styles.cardTitleBig}>{score}%<br />Wellness</h3>
            </div>
        </div>
    );
};

export default WellnessScore;
