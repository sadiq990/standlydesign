import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, CheckCircle2, Circle,
    Sunrise, Moon, Building2, UtensilsCrossed,
    PersonStanding, Droplets, Eye, Dumbbell, Heart
} from 'lucide-react';
import AnimatedClock from '../common/AnimatedClock';
import styles from './Onboarding.module.css';
import Confetti from 'react-confetti';

const STEPS = [
    {
        id: 'wakeup',
        icon: Sunrise,
        iconColor: '#F6AD55',
        title: "Səhər neçədə oyanırsınız?",
        subtitle: "İlk xatırlatmaları bu saata uyğun tənzimləyəcəyik",
        type: 'time',
        field: 'wakeTime'
    },
    {
        id: 'sleep',
        icon: Moon,
        iconColor: '#805AD5',
        title: "Bəs neçədə yatırsınız?",
        subtitle: "Yuxu rejiminiz... Bu saatdan sonra bildiriş göndərmirik 🌙",
        type: 'time',
        field: 'sleepTime'
    },
    {
        id: 'work',
        icon: Building2,
        iconColor: '#4299E1',
        title: "İş / Dərs rejiminiz",
        subtitle: "Ofis modunu aktivləşdirib məhsuldar saatlarınızı təyin edək",
        type: 'time-range',
        fields: { start: 'workStart', end: 'workEnd' },
        labels: { start: 'Başlayır', end: 'Bitir' }
    },
    {
        id: 'lunch',
        icon: UtensilsCrossed,
        iconColor: '#56C596',
        title: "Nahar fasiləniz",
        subtitle: "Günün tam ortasında enerjinizi bərpa etmək üçün",
        type: 'time',
        field: 'lunchTime'
    },
    {
        id: 'habits',
        title: "Gün ərzində nələri xatırladaq?",
        subtitle: "İstədiyini seç, daha sonra nizamlamalardan dəyişə bilərsən",
        type: 'multi',
        field: 'habits'
    }
];

const HABITS = [
    { id: 'stand', label: 'Ayağa qalxmaq', sub: 'Hər saat', icon: PersonStanding, color: '#56C596' },
    { id: 'water', label: 'Su içmək', sub: 'Mütəmadi', icon: Droplets, color: '#4299E1' },
    { id: 'eyes', label: 'Göz fasiləsi', sub: '20-20-20', icon: Eye, color: '#805AD5' },
    { id: 'stretch', label: 'Qısa dartınma', sub: '5 dəqiqə', icon: Dumbbell, color: '#F6AD55' },
    { id: 'posture', label: 'Onurğa dikliyi', sub: 'Yoxlama', icon: Heart, color: '#FC8181' },
];

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        wakeTime: '07:30',
        sleepTime: '23:30',
        workStart: '09:00',
        workEnd: '18:00',
        lunchTime: '13:00',
        habits: ['stand', 'water']
    });

    const [showConfetti, setShowConfetti] = useState(false);

    const handleNext = () => {
        if (step < STEPS.length - 1) {
            setStep(step + 1);
        } else {
            // "Hazırdır, Başlayaq" - Last step! Show confetti.
            setShowConfetti(true);
            setTimeout(() => {
                onComplete(formData);
                setShowConfetti(false);
            }, 3000); // 3 seconds of confetti before unmounting
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const toggleHabit = (id) => {
        setFormData(prev => ({
            ...prev,
            habits: prev.habits.includes(id)
                ? prev.habits.filter(h => h !== id)
                : [...prev.habits, id]
        }));
    };

    const currentStep = STEPS[step];

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.15}
                    colors={['#56C596', '#4299E1', '#805AD5', '#F6AD55', '#FC8181']}
                    style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
                />
            )}

            <div className={styles.header}>
                {step > 0 ? (
                    <button className={styles.backBtn} onClick={handleBack}>
                        <ArrowLeft size={20} />
                    </button>
                ) : <div style={{ width: 40 }} />}

                <div className={styles.stepIndicator}>
                    {STEPS.map((_, i) => (
                        <motion.div key={i}
                            layout
                            className={`${styles.dot} ${i === step ? styles.dotActive : ''}`}
                            style={{ backgroundColor: i <= step ? 'var(--c-primary-teal)' : '' }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                    ))}
                </div>

                <div style={{ width: 40 }} />
            </div>

            <div className={styles.content}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ x: 24, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -24, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeOut' }}
                    >
                        {/* Step icon (for time steps) */}
                        {currentStep.icon && (
                            <motion.div className={styles.stepIconWrap}
                                initial={{ scale: 0.5, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
                                style={{ backgroundColor: currentStep.iconBg }}>
                                {currentStep.id === 'wakeup' ? (
                                    <div style={{ position: 'relative', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <motion.div
                                            initial={{ y: 15, opacity: 0, scale: 0.8 }}
                                            animate={{ y: 0, opacity: 1, scale: 1 }}
                                            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                                            style={{
                                                position: 'absolute',
                                                display: 'flex',
                                                filter: `drop-shadow(0 0 10px ${currentStep.iconColor}80)`
                                            }}
                                        >
                                            <currentStep.icon size={32} color={currentStep.iconColor} strokeWidth={2.2} />
                                        </motion.div>
                                    </div>
                                ) : currentStep.id === 'sleep' ? (
                                    <div style={{ position: 'relative', display: 'flex' }}>
                                        <motion.div
                                            animate={{ y: [0, -3, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                        >
                                            <currentStep.icon size={32} color={currentStep.iconColor} strokeWidth={2} />
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 0, x: 0 }}
                                            animate={{ opacity: [0, 1, 0], y: -15, x: 8 }}
                                            transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
                                            style={{ position: 'absolute', top: -5, right: -12, fontSize: 11, fontWeight: 'bold', color: currentStep.iconColor, pointerEvents: 'none' }}
                                        >
                                            Z
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 0, x: 0 }}
                                            animate={{ opacity: [0, 1, 0], y: -20, x: 12 }}
                                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                                            style={{ position: 'absolute', top: -15, right: -20, fontSize: 16, fontWeight: 'bold', color: currentStep.iconColor, pointerEvents: 'none' }}
                                        >
                                            z
                                        </motion.div>
                                    </div>
                                ) : currentStep.id === 'work' ? (
                                    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: 44 }}>
                                        <motion.div
                                            initial={{ y: 0, scaleY: 1 }}
                                            animate={{ y: [0, -4, 0], scaleY: [1, 1.05, 1] }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                        >
                                            <currentStep.icon size={32} color={currentStep.iconColor} strokeWidth={2} />
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0.4 }}
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                            style={{
                                                position: 'absolute',
                                                top: 6,
                                                width: 4,
                                                height: 4,
                                                borderRadius: '50%',
                                                backgroundColor: currentStep.iconColor,
                                                boxShadow: `0 0 6px ${currentStep.iconColor}`,
                                                pointerEvents: 'none'
                                            }}
                                        />
                                    </div>
                                ) : currentStep.id === 'lunch' ? (
                                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <motion.div
                                            animate={{ rotate: [-8, 8, -8] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                        >
                                            <currentStep.icon size={32} color={currentStep.iconColor} strokeWidth={2} />
                                        </motion.div>
                                        {/* Steam particles */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 0, x: -8 }}
                                            animate={{ opacity: [0, 0.8, 0], y: -16, x: -12 }}
                                            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                                            style={{ position: 'absolute', color: currentStep.iconColor, fontSize: 18, pointerEvents: 'none' }}
                                        >
                                            ~
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 0, x: 8 }}
                                            animate={{ opacity: [0, 0.8, 0], y: -20, x: 14 }}
                                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
                                            style={{ position: 'absolute', color: currentStep.iconColor, fontSize: 14, pointerEvents: 'none' }}
                                        >
                                            ~
                                        </motion.div>
                                    </div>
                                ) : (
                                    <currentStep.icon size={32} color={currentStep.iconColor} strokeWidth={1.8} />
                                )}
                            </motion.div>
                        )}

                        <h2 className={styles.title}>{currentStep.title}</h2>
                        {currentStep.subtitle && (
                            <p className={styles.subtitle}>{currentStep.subtitle}</p>
                        )}

                        {currentStep.type === 'time' && (
                            <div className={styles.timeInputWrapper}>
                                <input
                                    type="time"
                                    className={styles.timeInput}
                                    value={formData[currentStep.field]}
                                    onChange={e => setFormData({ ...formData, [currentStep.field]: e.target.value })}
                                />
                                <div className={styles.clockIconAbsolute}>
                                    <AnimatedClock size={28} color="currentColor" />
                                </div>
                            </div>
                        )}

                        {currentStep.type === 'time-range' && (
                            <div className={styles.timeRangeContainer}>
                                <div className={styles.timeRangeGroup}>
                                    <label className={styles.timeLabel}>{currentStep.labels.start}</label>
                                    <div style={{ position: 'relative', display: 'flex' }}>
                                        <input
                                            type="time"
                                            className={styles.timeInputSmall}
                                            value={formData[currentStep.fields.start]}
                                            onChange={e => setFormData({ ...formData, [currentStep.fields.start]: e.target.value })}
                                        />
                                        <div className={styles.clockIconAbsoluteSmall}>
                                            <AnimatedClock size={20} color="currentColor" />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.timeRangeSeparator}>-</div>
                                <div className={styles.timeRangeGroup}>
                                    <label className={styles.timeLabel}>{currentStep.labels.end}</label>
                                    <div style={{ position: 'relative', display: 'flex' }}>
                                        <input
                                            type="time"
                                            className={styles.timeInputSmall}
                                            value={formData[currentStep.fields.end]}
                                            onChange={e => setFormData({ ...formData, [currentStep.fields.end]: e.target.value })}
                                        />
                                        <div className={styles.clockIconAbsoluteSmall}>
                                            <AnimatedClock size={20} color="currentColor" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep.type === 'multi' && (
                            <div className={styles.optionsGrid}>
                                {HABITS.map((h, i) => {
                                    const selected = formData.habits.includes(h.id);
                                    return (
                                        <motion.button
                                            key={h.id}
                                            className={`${styles.optionCard} ${selected ? styles.optionSelected : ''}`}
                                            onClick={() => toggleHabit(h.id)}
                                            style={selected ? { borderColor: h.color, backgroundColor: `${h.color}15` } : {}}
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.35, delay: i * 0.08, type: 'spring' }}
                                            whileTap={{ scale: 0.96 }}
                                        >
                                            <div className={styles.optionLeft}>
                                                <div className={styles.optionIcon}
                                                    style={{ backgroundColor: `${h.color}20`, color: h.color }}>
                                                    <h.icon size={18} strokeWidth={1.8} />
                                                </div>
                                                <div>
                                                    <span className={styles.optionLabel}>{h.label}</span>
                                                    <span className={styles.optionSub}>{h.sub}</span>
                                                </div>
                                            </div>
                                            {selected
                                                ? <CheckCircle2 size={22} color={h.color} />
                                                : <Circle size={22} color="#CBD5E0" />
                                            }
                                        </motion.button>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className={styles.footer}>
                <motion.button
                    className={styles.nextBtn}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNext}
                >
                    {step === STEPS.length - 1 ? "Hazırdır, Başlayaq! 🚀" : "Davam et →"}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Onboarding;
