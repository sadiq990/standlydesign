import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Shield, Bell, Brain, TrendingUp, Star, X, Lock } from 'lucide-react';
import styles from './Pricing.module.css';

const PLANS = [
    {
        id: 'yearly',
        label: 'Yearly',
        sublabel: 'Best Value',
        price: '$29.99',
        period: 'year',
        perWeek: 'Only $0.58 per week',
        savingsBadge: 'Save 70%',
        recommended: true,
        color: '#329D9C',
        colorDark: '#205072',
        gradient: 'linear-gradient(135deg, #329D9C, #205072)',
        billing: 'Billed annually',
    },
    {
        id: 'monthly',
        label: 'Monthly',
        sublabel: null,
        price: '$4.99',
        period: 'month',
        perWeek: '$1.15/week',
        savingsBadge: null,
        recommended: false,
        color: '#805AD5',
        colorDark: '#553C9A',
        gradient: 'linear-gradient(135deg, #805AD5, #553C9A)',
        billing: 'Billed monthly',
    },
    {
        id: 'weekly',
        label: 'Weekly',
        sublabel: null,
        price: '$1.99',
        period: 'week',
        perWeek: null,
        savingsBadge: null,
        recommended: false,
        color: '#4299E1',
        colorDark: '#2B6CB0',
        gradient: 'linear-gradient(135deg, #4299E1, #2B6CB0)',
        billing: 'Billed weekly',
    },
];

const FEATURES = [
    { icon: Bell, text: 'Unlimited reminders' },
    { icon: Brain, text: 'Smart AI reminders' },
    { icon: TrendingUp, text: 'Health & productivity insights' },
    { icon: Shield, text: 'Cancel anytime' },
];

const REVIEWS = [
    {
        id: 1,
        name: 'Sarah K.',
        avatar: '👩‍💼',
        text: 'Finally an app that reminds me to stand up during long work sessions.',
        rating: 5,
    },
    {
        id: 2,
        name: 'James T.',
        avatar: '👨‍💻',
        text: 'Simple but very effective for improving posture and productivity.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Maria L.',
        avatar: '🧘‍♀️',
        text: 'My back pain improved after using Standly daily.',
        rating: 5,
    },
];

const StarRow = ({ count = 5 }) => (
    <div className={styles.reviewStars}>
        {Array.from({ length: count }).map((_, i) => (
            <Star key={i} size={13} fill="#F6AD55" color="#F6AD55" />
        ))}
    </div>
);

const Pricing = ({ onContinue, onSkip }) => {
    const [selectedPlan, setSelectedPlan] = useState('yearly');
    const [loading, setLoading] = useState(false);

    const plan = PLANS.find(p => p.id === selectedPlan);

    const handleStart = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onContinue();
        }, 1100);
    };

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
            {/* Close Button */}
            <motion.button
                className={styles.closeBtn}
                onClick={onSkip}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                whileHover={{ opacity: 1, scale: 1.08 }}
                transition={{ delay: 0.4 }}
                aria-label="Skip"
            >
                <X size={18} />
            </motion.button>

            {/* ── HERO ── */}
            <div className={styles.hero}>
                <motion.div
                    className={styles.appIconWrap}
                    initial={{ scale: 0.5, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.55, duration: 0.9 }}
                >
                    <span className={styles.appIcon}>⚡️</span>
                </motion.div>

                <motion.h1
                    className={styles.heroTitle}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                >
                    Standly Premium
                </motion.h1>

                <motion.p
                    className={styles.heroSub}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.4 }}
                >
                    Start with a 3-day free trial · Cancel anytime
                </motion.p>

                {/* Trust message */}
                <motion.p
                    className={styles.trustMsg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.28, duration: 0.4 }}
                >
                    ⭐ Trusted by 5,000+ users
                </motion.p>

                {/* Trial pill */}
                <motion.div
                    className={styles.trialPill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
                >
                    <Star size={11} style={{ marginRight: 5 }} />
                    No payment required during trial
                </motion.div>
            </div>

            {/* ── PLANS ── */}
            <div className={styles.plansWrapper}>
                {PLANS.map((p, i) => {
                    const isSelected = selectedPlan === p.id;
                    return (
                        <motion.button
                            key={p.id}
                            className={`${styles.planCard} ${isSelected ? styles.planSelected : ''} ${p.recommended ? styles.planFeatured : ''} ${p.id === 'weekly' ? styles.planWeekly : ''}`}
                            style={isSelected ? {
                                borderColor: p.color,
                                background: `linear-gradient(135deg, ${p.color}12, ${p.colorDark}08)`,
                            } : {}}
                            onClick={() => setSelectedPlan(p.id)}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12 + i * 0.07, duration: 0.38, ease: 'easeOut' }}
                            whileTap={{ scale: 0.985 }}
                        >
                            {/* Recommended stripe */}
                            {p.recommended && (
                                <div
                                    className={styles.featuredStripe}
                                    style={{ background: p.gradient }}
                                >
                                    ⭐ Most Popular
                                </div>
                            )}

                            {/* Savings badge */}
                            {p.savingsBadge && (
                                <div className={styles.savingsBadge}>
                                    {p.savingsBadge}
                                </div>
                            )}

                            <div className={styles.planLeft}>
                                {/* Radio */}
                                <div
                                    className={styles.radio}
                                    style={isSelected ? { borderColor: p.color, background: p.color } : {}}
                                >
                                    {isSelected && (
                                        <motion.div
                                            className={styles.radioDot}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                                        />
                                    )}
                                </div>

                                <div className={styles.planInfo}>
                                    <div className={styles.planNameRow}>
                                        <span className={styles.planName}>{p.label}</span>
                                        {p.sublabel && (
                                            <span
                                                className={styles.planSublabel}
                                                style={{ color: p.color, background: `${p.color}15` }}
                                            >
                                                {p.sublabel}
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.planBillingRow}>
                                        <span className={styles.planBilling}>{p.billing}</span>
                                        {p.perWeek && <span className={styles.planPerWeekDetail}>{p.perWeek}</span>}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.planRight}>
                                <span className={styles.planPrice} style={isSelected ? { color: p.color } : {}}>
                                    {p.price}
                                </span>
                                <span className={styles.planPeriod}>/{p.period}</span>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* ── FEATURES ── */}
            <motion.div
                className={styles.features}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.36 }}
            >
                {FEATURES.map((f, i) => (
                    <div key={i} className={styles.featureRow}>
                        <div className={styles.featureIconWrap}>
                            <f.icon size={14} />
                        </div>
                        <span className={styles.featureText}>{f.text}</span>
                    </div>
                ))}
            </motion.div>

            {/* ── CTA ── */}
            <div className={styles.ctaSection}>
                <motion.button
                    className={styles.ctaBtn}
                    style={{ background: plan.gradient }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleStart}
                    disabled={loading}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.44, duration: 0.38 }}
                >
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div key="spin" className={styles.spinner}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                        ) : (
                            <motion.span key="txt"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                Start 3-Day Free Trial
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>

                <motion.p
                    className={styles.ctaNote}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.52 }}
                >
                    After 3 days, <strong>{plan.price}/{plan.period}</strong>. Cancel anytime in App Store settings.
                </motion.p>
            </div>

            {/* ── REVIEWS ── */}
            <motion.div
                className={styles.reviewsSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
            >
                <p className={styles.reviewsTitle}>WHAT OUR USERS SAY</p>
                <div className={styles.reviewsGrid}>
                    {REVIEWS.map((r, i) => (
                        <motion.div
                            key={r.id}
                            className={styles.reviewCard}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.07 }}
                        >
                            <StarRow count={r.rating} />
                            <p className={styles.reviewText}>"{r.text}"</p>
                            <div className={styles.reviewAuthor}>
                                <span className={styles.reviewAvatar}>{r.avatar}</span>
                                <span className={styles.reviewName}>{r.name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* ── FOOTER LINKS ── */}
            <motion.div
                className={styles.footerLinks}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                <div className={styles.secureBadge}>
                    <Lock size={11} strokeWidth={2.5} />
                    <span>100% Secure Transaction</span>
                </div>
                <div className={styles.footerLinksRow}>
                    <button className={styles.footerLink}>Restore Purchases</button>
                    <span className={styles.footerDot}>·</span>
                    <button className={styles.footerLink}>Terms of Use</button>
                    <span className={styles.footerDot}>·</span>
                    <button className={styles.footerLink}>Privacy Policy</button>
                </div>
            </motion.div>

            <div className={styles.bottomSpacer} />
        </motion.div>
    );
};

export default Pricing;
