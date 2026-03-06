import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, User, BrainCircuit } from 'lucide-react';
import styles from './AIChat.module.css';

const AIChat = ({ onClose }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: 'Salam! Hansı yeni vərdişi və ya məqsədi formalaşdırmaq istəyirsən? Məsələn: "Mütəmadi idman etmək istəyirəm" və ya "Gündə 2L su içmək".'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // User message
        const newUserMsg = { id: Date.now(), sender: 'user', text: inputValue };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Mock AI response
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: 'Əla seçim! Sənin üçün uyğunlaşdırılmış yeni "Axın" (Flow) qurdum:\n\n1️⃣ Səhər oyananda: 5 dəqiqə\n2️⃣ Axşam 19:00: 15 dəqiqə\n\nBu taskları avtomatik olaraq sənin Gün Axınına əlavə edimmi?'
            }]);
        }, 1800);
    };

    return (
        <motion.div
            className={styles.chatContainer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 240, mass: 0.9 }}
        >
            {/* Top Bar */}
            <div className={styles.topBar}>
                <motion.button className={styles.backBtn} onClick={onClose} whileTap={{ scale: 0.9 }}>
                    <ArrowLeft size={20} strokeWidth={2.5} />
                </motion.button>
                <div className={styles.headerInfo}>
                    <h2 className={styles.pageTitle}>AI Task Setup</h2>
                    <span className={styles.statusDot}>Aktivdir</span>
                </div>
                <div style={{ width: 40 }} />
            </div>

            {/* Chat Area */}
            <div className={styles.chatArea}>
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className={`${styles.messageRow} ${msg.sender === 'user' ? styles.msgRight : styles.msgLeft}`}
                        >
                            {msg.sender === 'ai' && (
                                <div className={styles.avatarWrapAi}>
                                    <BrainCircuit size={18} color="#ffffff" strokeWidth={2} />
                                </div>
                            )}

                            <div className={`${styles.bubble} ${msg.sender === 'user' ? styles.bubbleUser : styles.bubbleAi}`}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`${styles.messageRow} ${styles.msgLeft}`}
                        >
                            <div className={styles.avatarWrapAi}>
                                <Sparkles size={16} color="#ffffff" strokeWidth={2} />
                            </div>
                            <div className={`${styles.bubble} ${styles.bubbleTyping}`}>
                                <span className={styles.dot}></span>
                                <span className={styles.dot}></span>
                                <span className={styles.dot}></span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={styles.inputSection}>
                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        className={styles.inputField}
                        placeholder="Məs: Yoga vərdişi yarat..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <motion.button
                        className={styles.sendBtn}
                        onClick={handleSend}
                        whileTap={{ scale: 0.92 }}
                        disabled={!inputValue.trim()}
                    >
                        <Send size={18} color="#ffffff" strokeWidth={2.5} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default AIChat;
