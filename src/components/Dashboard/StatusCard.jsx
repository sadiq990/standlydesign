import React from 'react';
import styles from './Dashboard.module.css';
import { Plus } from 'lucide-react';

const StatusCard = ({ title, value, subtitle, icon: Icon, gradient, delay = '0s' }) => {
    return (
        <div
            className={`${styles.gradientCard} animate-slide-up`}
            style={{ background: gradient, animationDelay: delay }}
        >
            <div className={styles.gradientCardIcon}>
                <Plus size={20} strokeWidth={2.5} color="#fff" />
            </div>

            <div className={styles.cardContent}>
                <span className={styles.cardSubtitle}>{subtitle}</span>
                <h3 className={styles.cardTitleBig}>{title}<br />{value}</h3>
            </div>
        </div>
    );
};
export default StatusCard;
