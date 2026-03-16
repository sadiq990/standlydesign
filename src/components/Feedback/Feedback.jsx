import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, MessageSquare } from 'lucide-react';
import styles from './Feedback.module.css';

const TESTIMONIALS = [
    {
        id: 1,
        name: 'Sarah K.',
        avatar: '👩‍💼',
        rating: 5,
        text: 'Standly completely changed my daily routine. I stand up more, drink more water, and feel way more productive.',
        role: 'Product Designer',
    },
    {
        id: 2,
        name: 'James T.',
        avatar: '👨‍💻',
        rating: 5,
        text: 'The AI reminders are surprisingly smart. It knows exactly when I need a break. Highly recommend!',
        role: 'Backend Developer',
    },
    {
        id: 3,
        name: 'Maria L.',
        avatar: '🧘‍♀️',
        rating: 5,
        text: 'Simple, beautiful design. My back pain has improved so much since I started using Standly daily.',
        role: 'UI/UX Designer',
    },
    {
        id: 4,
        name: 'David R.',
        avatar: '🏃‍♂️',
        rating: 5,
        text: 'Best wellness app I have used. The nudges are perfectly timed and never annoying.',
        role: 'Fitness Coach',
    },
    {
        id: 5,
        name: 'Emma W.',
        avatar: '📚',
        rating: 5,
        text: 'Eye break reminders are a game changer for anyone who stares at a screen all day.',
        role: 'Teacher',
    },
];

const StarRating = ({ value, interactive, onChange, size = 28 }) => {
    const [hovered, setHovered] = useState(null);

    return (
        <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = star <= (hovered ?? value);
                return (
                    <motion.button
                        key={star}
                        className={styles.starBtn}
                        onClick={() => interactive && onChange?.(star)}
                        onMouseEnter={() => interactive && setHovered(star)}
                        onMouseLeave={() => interactive && setHovered(null)}
                        whileTap={interactive ? { scale: 0.82 } : {}}
                        animate={{ scale: filled && interactive && hovered === star ? 1.18 : 1 }}
                        transition={{ duration: 0.13 }}
                        style={{ cursor: interactive ? 'pointer' : 'default' }}
                        aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                    >
                        <Star
                            size={size}
                            fill={filled ? '#F6AD55' : 'transparent'}
                            color={filled ? '#F6AD55' : 'var(--c-border)'}
                            strokeWidth={1.6}
                        />
                    </motion.button>
                );
            })}
        </div>
    );
};

const TestimonialCard = ({ t }) => (
    <motion.div
        className={styles.testimonialCard}
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -18, scale: 0.96 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
    >
        <div className={styles.quoteIcon}>"</div>
        <p className={styles.testimonialText}>{t.text}</p>
        <div className={styles.testimonialFooter}>
            <div className={styles.testimonialAvatar}>{t.avatar}</div>
            <div className={styles.testimonialMeta}>
                <span className={styles.testimonialName}>{t.name}</span>
                <div className={styles.testimonialRoleRow}>
                    <span className={styles.testimonialRole}>{t.role}</span>
                    <span className={styles.verifiedTag}>Verified Purchase</span>
                </div>
            </div>
            <StarRating value={t.rating} size={13} />
        </div>
    </motion.div>
);

const RATING_LABELS = {
    5: '😍 Amazing! Thank you so much!',
    4: '🙂 Great! We appreciate it.',
    3: '😐 Thanks. We will keep improving.',
    2: '😔 Sorry to hear that. We will fix it.',
    1: '😔 Sorry to hear that. We will do better.',
};

const Feedback = ({ onContinue }) => {
    const [userRating, setUserRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        if (submitted) return;
        const timer = setInterval(() => {
            setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [submitted]);

    const handleSubmit = () => {
        if (userRating === 0) return;
        if (userRating >= 4) {
            // Simulates SKStoreReviewController.requestReview()
            setTimeout(() => setSubmitted(true), 700);
        } else {
            setSubmitted(true);
        }
    };

    const t = TESTIMONIALS[activeTestimonial];

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
            <AnimatePresence mode="wait">
                {!submitted ? (
                    <motion.div
                        key="form"
                        className={styles.inner}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.28 }}
                    >
                        {/* Header */}
                        <div className={styles.header}>
                            <motion.div
                                className={styles.heartWrap}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Heart size={30} fill="var(--c-primary-teal)" color="var(--c-primary-teal)" />
                            </motion.div>
                            <h1 className={styles.title}>Enjoying Standly?</h1>
                            <p className={styles.subtitle}>Your feedback helps us improve the app for everyone.</p>
                        </div>

                        {/* Stars */}
                        <motion.div
                            className={styles.ratingSection}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.14, duration: 0.38 }}
                        >
                            <StarRating value={userRating} interactive onChange={setUserRating} size={46} />
                            <AnimatePresence>
                                {userRating > 0 && (
                                    <motion.p
                                        className={styles.ratingLabel}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        {RATING_LABELS[userRating]}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* App Store native prompt simulation */}
                        <AnimatePresence>
                            {userRating >= 4 && (
                                <motion.div
                                    className={styles.appStorePrompt}
                                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.3, type: 'spring', bounce: 0.32 }}
                                >
                                    <div className={styles.appStoreIcon}>⚡️</div>
                                    <div className={styles.appStoreText}>
                                        <strong>Rate on the App Store</strong>
                                        <span>Your review helps others discover Standly</span>
                                    </div>
                                    <span className={styles.appStoreBadge}>App Store</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Testimonials */}
                        <div className={styles.testimonialsSection}>
                            <div className={styles.sectionLabel}>
                                <MessageSquare size={13} />
                                <span>User reviews</span>
                            </div>
                            <div className={styles.testimonialCarousel}>
                                <AnimatePresence mode="wait">
                                    <TestimonialCard key={t.id} t={t} />
                                </AnimatePresence>
                            </div>
                            <div className={styles.carouselDots}>
                                {TESTIMONIALS.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.dot} ${i === activeTestimonial ? styles.dotActive : ''}`}
                                        onClick={() => setActiveTestimonial(i)}
                                        aria-label={`Review ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className={styles.footer}>
                            <motion.button
                                className={`${styles.submitBtn} ${userRating === 0 ? styles.submitDisabled : ''}`}
                                onClick={handleSubmit}
                                disabled={userRating === 0}
                                whileTap={userRating > 0 ? { scale: 0.97 } : {}}
                                animate={userRating >= 4 ? {
                                    boxShadow: [
                                        '0 8px 24px rgba(50,157,156,0.22)',
                                        '0 12px 32px rgba(50,157,156,0.42)',
                                        '0 8px 24px rgba(50,157,156,0.22)',
                                    ]
                                } : {}}
                                transition={userRating >= 4 ? { duration: 2, repeat: Infinity } : {}}
                            >
                                {userRating >= 4
                                    ? '⭐ Rate on App Store'
                                    : userRating > 0
                                        ? 'Submit Feedback'
                                        : 'Tap a star to rate'}
                            </motion.button>
                            <button className={styles.laterBtn} onClick={onContinue}>
                                Maybe later
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="thanks"
                        className={styles.thankYou}
                        initial={{ opacity: 0, scale: 0.82 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.5, duration: 0.82 }}
                    >
                        <motion.div
                            className={styles.thankYouEmoji}
                            animate={{ rotate: [0, -14, 14, -7, 7, 0] }}
                            transition={{ duration: 0.85, delay: 0.25 }}
                        >
                            🎉
                        </motion.div>
                        <h2 className={styles.thankYouTitle}>Thank you!</h2>
                        <p className={styles.thankYouSub}>
                            {userRating >= 4
                                ? "Your review has been submitted to the App Store. We really appreciate the support!"
                                : "We've received your feedback and will use it to improve Standly."}
                        </p>
                        <motion.button
                            className={styles.continueBtn}
                            onClick={onContinue}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.48 }}
                        >
                            Let's go 🚀
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Feedback;
