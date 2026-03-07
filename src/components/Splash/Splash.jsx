import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { colors } from '../../theme';
import styles from './Splash.module.css';
import AnimatedMascot from '../common/AnimatedMascot';

const Splash = ({ onGetStarted }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (isClicked) return;
        setIsClicked(true);
        // Wait for animation to finish before moving to onboarding
        setTimeout(() => {
            onGetStarted();
        }, 400);
    };

    return (
        <motion.div
            className={styles.splashContainer}
            style={{ background: colors.gradientSplash }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            <div className={styles.content}>
                {/* ── Animated Mascot ── */}
                <motion.div
                    initial={{ scale: 0, y: 50, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                        delay: 0.1
                    }}
                >
                    <AnimatedMascot size={200} state="idle" className={styles.mascotImage} />
                </motion.div>
                <h1 className={styles.title}>
                    {"Standly".split('').map((char, index) => (
                        <motion.span
                            key={index}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 + index * 0.08, duration: 0.6, type: "spring", bounce: 0.5 }}
                            style={{ display: 'inline-block' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </h1>
                <motion.p
                    className={styles.slogan}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Sənin şəxsi sağlamlıq və inkişaf köməkçin
                </motion.p>
            </div>

            <motion.button
                className={styles.getStartedBtn}
                onClick={handleClick}
                initial={{ y: 40, opacity: 0 }}
                animate={isClicked ? { scale: 0.95 } : { y: 0, opacity: 1 }}
                transition={{ delay: isClicked ? 0 : 0.6, duration: 0.4, type: 'spring', bounce: 0.4 }}
                whileHover={!isClicked ? { scale: 1.05 } : {}}
                whileTap={!isClicked ? { scale: 0.94 } : {}}
            >
                <motion.span
                    animate={{ opacity: isClicked ? 0 : 1, x: isClicked ? -20 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    Get Started
                </motion.span>
                <motion.div
                    className={styles.iconCircle}
                    animate={{
                        x: isClicked ? 80 : 0,
                        scale: isClicked ? 1.5 : 1,
                        opacity: isClicked ? 0 : 1
                    }}
                    transition={{ duration: 0.35, ease: "backIn" }}
                >
                    <ArrowRight size={20} color={colors.primaryGreen} strokeWidth={2.5} />
                </motion.div>
            </motion.button>
        </motion.div>
    );
};

export default Splash;
