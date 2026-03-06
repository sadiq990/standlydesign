import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { colors } from '../../theme';
import styles from './Splash.module.css';

const Splash = ({ onGetStarted }) => {
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
                <motion.h1
                    className={styles.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Standly
                </motion.h1>
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
                onClick={onGetStarted}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5, type: 'spring', bounce: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <span>Get Started</span>
                <div className={styles.iconCircle}>
                    <ArrowRight size={20} color={colors.primaryGreen} strokeWidth={2.5} />
                </div>
            </motion.button>
        </motion.div>
    );
};

export default Splash;
