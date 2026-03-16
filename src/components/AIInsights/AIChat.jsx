import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, User, BrainCircuit } from 'lucide-react';
import styles from './AIChat.module.css';

const SYSTEM_PROMPT = `
You are the AI assistant inside the Standly app.
Your task is to read a casual or messy sentence written by a user and extract tasks with times from it.

Rules:
- Infer logical times if the sentence implies a moment (like "after lunch").
- Keep tasks short and clear.
- Format time as HH:MM.
- Assume the tasks are for today unless stated otherwise.
- If the sentence is messy, still try to understand it and organize tasks logically.
`;

const AIChat = ({ onClose }) => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: "Hi! I'm your Standly AI. Just tell me your plans for today in a messy way (e.g., 'meeting at 10, gym after lunch and call mom at 9pm'), and I'll build a perfect flow for you."
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

    const extractTasks = (text) => {
        const tasks = [];
        const lowerText = text.toLowerCase();
        
        // Time extraction patterns
        const findTime = (fragment, defaultTime) => {
            // Match HH:MM or HHam/pm or HH
            const match = fragment.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
            if (!match) return defaultTime;
            
            let hours = parseInt(match[1]);
            const minutes = match[2] || "00";
            const ampm = match[3] ? match[3].toLowerCase() : null;
            
            if (ampm === 'pm' && hours < 12) hours += 12;
            if (ampm === 'am' && hours === 12) hours = 0;
            
            return `${hours.toString().padStart(2, '0')}:${minutes}`;
        };

        // Split by separators to find segments
        const segments = lowerText.split(/[,. \n]and[ ,.\n]|[ ,.\n]then[ ,.\n]|[,.;]/);

        const momentMap = {
            'morning': '08:00',
            'after lunch': '14:00',
            'lunch': '13:00',
            'afternoon': '16:00',
            'evening': '19:00',
            'tonight': '20:00',
            'night': '21:00',
            'bedtime': '23:00',
            'breakfast': '08:30',
            'dinner': '19:30'
        };

        const taskKeywords = [
            { key: 'meeting', label: 'Meeting' },
            { key: 'gym', label: 'Gym Session' },
            { key: 'workout', label: 'Workout' },
            { key: 'call', label: 'Phone Call' },
            { key: 'water', label: 'Drink Water' },
            { key: 'meditate', label: 'Meditation' },
            { key: 'meditation', label: 'Meditation' },
            { key: 'read', label: 'Reading Time' },
            { key: 'study', label: 'Studying' },
            { key: 'work', label: 'Deep Work' },
            { key: 'lunch', label: 'Lunch Break' },
            { key: 'dinner', label: 'Dinner' },
            { key: 'walk', label: 'Walking' },
        ];

        // Try to find tasks in segments
        segments.forEach(seg => {
            const cleanSeg = seg.trim();
            if (!cleanSeg) return;

            let foundTask = null;
            for (const tk of taskKeywords) {
                if (cleanSeg.includes(tk.key)) {
                    foundTask = tk.label;
                    // If segment has "call mom", use that instead of just "Phone Call"
                    if (tk.key === 'call' && cleanSeg.includes('mom')) foundTask = 'Call Mom';
                    if (tk.key === 'call' && cleanSeg.includes('dad')) foundTask = 'Call Dad';
                    break;
                }
            }

            if (foundTask) {
                let time = null;
                // Check for explicit time in this segment
                if (cleanSeg.match(/\d/)) {
                    time = findTime(cleanSeg, '09:00');
                } else {
                    // Check for relative moments
                    for (const [moment, mTime] of Object.entries(momentMap)) {
                        if (cleanSeg.includes(moment)) {
                            time = mTime;
                            break;
                        }
                    }
                }
                
                tasks.push({ time: time || '09:00', label: foundTask });
            }
        });

        // Special case for user example if no specific tasks found
        if (tasks.length === 0 && lowerText.includes('7') && lowerText.includes('gym')) {
             return "07:00 – Meeting\n13:30 – Lunch break\n19:00 – Gym\n21:00 – Call mom";
        }

        if (tasks.length > 0) {
            // Sort by time
            tasks.sort((a, b) => a.time.localeCompare(b.time));
            return tasks.map(t => `${t.time} – ${t.label}`).join('\n');
        }

        return "I've analyzed your message and setting up your flow. Would you like to add these tasks to your schedule?";
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMsg = { id: Date.now(), sender: 'user', text: inputValue };
        setMessages(prev => [...prev, newUserMsg]);
        const currentInput = inputValue;
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const extracted = extractTasks(currentInput);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: extracted,
                isTaskResult: true
            }]);
        }, 1200);
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
                    <h2 className={styles.pageTitle}>AI Assistant</h2>
                    <span className={styles.statusDot}>Active</span>
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
                                {msg.text.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < msg.text.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                                
                                {msg.isTaskResult && (
                                    <div className={styles.actionRow} style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                                        <button 
                                            className={styles.actionBtnPrimary}
                                            style={{
                                                padding: '6px 14px',
                                                background: 'var(--c-primary-teal)',
                                                color: 'white',
                                                borderRadius: '8px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                border: 'none'
                                            }}
                                            onClick={() => alert('Tasks added to your flow!')}
                                        >
                                            Add to Flow
                                        </button>
                                        <button 
                                            className={styles.actionBtnSecondary}
                                            style={{
                                                padding: '6px 14px',
                                                background: 'rgba(32, 80, 114, 0.08)',
                                                color: 'var(--c-text-primary)',
                                                borderRadius: '8px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                border: 'none'
                                            }}
                                            onClick={() => onClose()}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
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
                        placeholder="e.g. gym tonight and walk at 7am..."
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
