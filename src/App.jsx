import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Splash from './components/Splash/Splash';
import Onboarding from './components/Onboarding/Onboarding';
import Pricing from './components/Pricing/Pricing';
import Feedback from './components/Feedback/Feedback';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import ReminderList from './components/Reminders/ReminderList';
import BottomNav from './components/BottomNav/BottomNav';
import AIModal from './components/AIInsights/AIModal';
import DayFlow from './components/DayFlow/DayFlow';
import { colors } from './theme';
import './index.css';

// Screen flow: splash → onboarding → pricing → feedback → home
function App() {
  const [screen, setScreen] = useState('splash'); // 'splash' | 'onboarding' | 'pricing' | 'feedback' | 'home'
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Default fallback data mimicking what onboarding provides
  const [userData, setUserData] = useState({
    wakeTime: '07:30',
    sleepTime: '23:30',
    workStart: '09:00',
    workEnd: '18:00',
    lunchTime: '13:00',
    habits: ['stand', 'water']
  });

  return (
    <div style={{ background: screen === 'home' ? 'var(--gradient-bg)' : 'var(--c-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <Splash key="splash" onGetStarted={() => setScreen('onboarding')} />
        )}

        {screen === 'onboarding' && (
          <Onboarding key="onboarding" onComplete={(data) => {
            console.log("Onboarding complete:", data);
            setUserData(data);
            setScreen('pricing');
          }} />
        )}

        {screen === 'pricing' && (
          <Pricing
            key="pricing"
            onContinue={() => setScreen('feedback')}
            onSkip={() => setScreen('feedback')}
          />
        )}

        {screen === 'feedback' && (
          <Feedback
            key="feedback"
            onContinue={() => setScreen('home')}
          />
        )}

        {screen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <Header />
            <main style={{ padding: '0 20px 120px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <Dashboard />
              <ReminderList />
              <DayFlow userData={userData} />
            </main>
            <BottomNav onOpenAI={() => setIsAIModalOpen(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AIModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </div>
  );
}

export default App;
