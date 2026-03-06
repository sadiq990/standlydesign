import React, { useState } from 'react';
import styles from './AIPanel.module.css';
import { Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';

const AIPanel = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <section className={styles.aiSection}>
            <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>AI Insights</h3>
                <button className={styles.seeAllBtn}>See All</button>
            </div>

            <div className={`${styles.aiCard} clean-card`} onClick={() => setExpanded(!expanded)}>
                <div className={styles.tagRow}>
                    <div className={styles.aiTag}>
                        <Sparkles size={12} />
                        <span>Health Pattern</span>
                    </div>
                    <div className={`${styles.aiTag} ${styles.tagUrgent}`}>
                        <span>Action Recommended</span>
                    </div>
                </div>

                <div className={styles.aiContent}>
                    <h4 className={styles.cardTitle}>Posture Pattern Detected</h4>

                    <p className={styles.cardDesc}>
                        You've been leaning forward for 45 minutes straight. Take a 2-minute stretch to realign your spine.
                    </p>

                    <div className={`${styles.expandableContent} ${expanded ? styles.expanded : ''}`}>
                        <div className={styles.detailedInsight}>
                            <CheckCircle2 size={16} className={styles.detailIcon} />
                            <p>
                                <strong>Why this matters:</strong> Prolonged forward posture reduces lung capacity by up to 30%, impacting deep work endurance mid-afternoon.
                            </p>
                        </div>
                    </div>

                    <div className={styles.actionBadge}>
                        <span className={styles.actionText}>{expanded ? 'Hide Details' : 'View Details'}</span>
                        <ChevronDown
                            size={14}
                            className={`${styles.chevron} ${expanded ? styles.rotated : ''}`}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default AIPanel;
