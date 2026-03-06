import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import styles from './Onboarding.module.css';

const STEPS = [
    { id: 'wakeup', title: "Səhər saat neçədə oyanırsınız?", type: 'time', field: 'wakeTime' },
    { id: 'work', title: "İşə/Dərsə neçədə çatırsınız?", type: 'time', field: 'workTime' },
    { id: 'lunch', title: "Nahar fasiləniz saat neçədədir?", type: 'time', field: 'lunchTime' },
    { id: 'habits', title: "Gün ərzində nələri xatırladaq?", type: 'multi', field: 'habits' }
];

const HABITS = [
    { id: 'stand', label: 'Ayağa qalxmaq (Hər saat)' },
    { id: 'water', label: 'Su içmək (Mütəmadi)' },
    { id: 'eyes', label: 'Göz fasiləsi (20-20-20)' },
    { id: 'stretch', label: 'Qisa dartınma (5 dəq)' },
    { id: 'posture', label: 'Onurğa dikliyi yoxlanışı' },
];

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        wakeTime: '07:30',
        workTime: '09:00',
        lunchTime: '13:00',
        habits: ['stand', 'water']
    });

    const handleNext = () => {
        if (step < STEPS.length - 1) {
            setStep(step + 1);
        } else {
            onComplete(formData);
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
            <div className={styles.header}>
                {step > 0 ? (
                    <button className={styles.backBtn} onClick={handleBack}>
                        <ArrowLeft size={20} />
                    </button>
                ) : <div style={{ width: 40 }} />}

                <div className={styles.stepIndicator}>
                    {STEPS.map((_, i) => (
                        <div key={i} className={`${styles.dot} ${i === step ? styles.dotActive : i < step ? styles.dotCompleted : ''}`}
                            style={{ backgroundColor: i < step ? 'var(--c-primary-teal)' : '' }}
                        />
                    ))}
                </div>

                <div style={{ width: 40 }} />
            </div>

            <div className={styles.content}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        <h2 className={styles.title}>{currentStep.title}</h2>

                        {currentStep.type === 'time' && (
                            <input
                                type="time"
                                className={styles.timeInput}
                                value={formData[currentStep.field]}
                                onChange={e => setFormData({ ...formData, [currentStep.field]: e.target.value })}
                            />
                        )}

                        {currentStep.type === 'multi' && (
                            <div className={styles.optionsGrid}>
                                {HABITS.map(h => {
                                    const selected = formData.habits.includes(h.id);
                                    return (
                                        <button
                                            key={h.id}
                                            className={`${styles.optionCard} ${selected ? styles.optionSelected : ''}`}
                                            onClick={() => toggleHabit(h.id)}
                                        >
                                            <span className={styles.optionLabel}>{h.label}</span>
                                            {selected ? <CheckCircle2 size={24} color="var(--c-primary-teal)" /> : <Circle size={24} color="#A0AEC0" />}
                                        </button>
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
                    {step === STEPS.length - 1 ? "Hazırdır, Başlayaq!" : "Davam et"}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Onboarding;
