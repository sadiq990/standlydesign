import fs from 'fs';

let svg = fs.readFileSync('src/assets/mascot-layered.svg', 'utf8');

// SVG Cleaning and React Component preparation
svg = svg.replace(/<\?xml.*?\?>\n?/g, '');
svg = svg.replace(/data-name=".*?"/g, '');
svg = svg.replace(/class=/g, 'className=');
svg = svg.replace(/stop-color/g, 'stopColor');
svg = svg.replace(/xmlns:xlink=/g, 'xmlnsXlink=');

// Remove main SVG tag wrapper
svg = svg.replace(/<svg.*?>/, '');
svg = svg.replace(/<\/svg>/, '');

// Convert all <g> tags to <motion.g> to easily animate groups!
svg = svg.replace(/<g/g, '<motion.g').replace(/<\/g>/g, '</motion.g>');

// Add variants and origins to specific layered parts based on their IDs
svg = svg.replace(/<motion\.g id="qol_sol"/, '<motion.g id="qol_sol" variants={armLeftVariants} style={{ originX: "135px", originY: "250px" }}');
svg = svg.replace(/<motion\.g id="qol_sol-2"/, '<motion.g id="qol_sol-2" variants={armRightVariants} style={{ originX: "444px", originY: "260px" }}');
svg = svg.replace(/<motion\.g id="bagli_goz"/, '<motion.g id="bagli_goz" variants={eyeVariants} style={{ originX: "300px", originY: "201px" }}');

const jsx = `import React from 'react';
import { motion } from 'framer-motion';

const AnimatedMascot = ({ size = 200, state = 'idle', className, style }) => {
    // states: 'idle', 'happy', 'walking', 'sleeping'

    const bodyVariants = {
        idle: { scaleY: [1, 1.02, 1], transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' } },
        happy: { y: [0, -20, 0], scaleY: [1, 1.05, 0.95, 1], transition: { repeat: Infinity, duration: 0.5 } },
        walking: { rotate: [-3, 3, -3], y: [0, -10, 0], transition: { repeat: Infinity, duration: 0.6 } },
        sleeping: { scaleY: [1, 1.01, 1], transition: { repeat: Infinity, duration: 6, ease: 'easeInOut' } },
    };

    const armLeftVariants = {
        idle: { rotate: [0, -5, 5, 0], transition: { repeat: Infinity, duration: 4 } },
        happy: { rotate: [0, -30, 0], transition: { repeat: Infinity, duration: 0.5 } },
        walking: { rotate: [-15, 15, -15], transition: { repeat: Infinity, duration: 0.6 } },
        sleeping: { rotate: 0 }
    };

    const armRightVariants = {
        idle: { rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 4 } },
        happy: { rotate: [0, 30, 0], transition: { repeat: Infinity, duration: 0.5 } },
        walking: { rotate: [15, -15, 15], transition: { repeat: Infinity, duration: 0.6 } },
        sleeping: { rotate: 0 }
    };

    const eyeVariants = {
        idle: { scaleY: [1, 1, 0.1, 1, 1], transition: { repeat: Infinity, duration: 4, times: [0, 0.45, 0.5, 0.55, 1] } },
        happy: { scaleY: [1, 0.8, 1], transition: { repeat: Infinity, duration: 2 } },
        walking: { scaleY: 1 },
        sleeping: { scaleY: 0.1, transition: { duration: 0.5 } }
    };

    return (
        <motion.div 
            style={{ width: size, height: 'auto', display: 'flex', justifyContent: 'center', originX: '50%', originY: '100%', ...style }} 
            className={className} 
            animate={state} 
            variants={bodyVariants}
        >
            <motion.svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 611.64 499.59" width="100%" height="auto" style={{ overflow: 'visible' }}>
                ${svg}
                
                {/* Zzz indicators for sleeping state */}
                {state === 'sleeping' && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <motion.text 
                            x="450" y="150" 
                            fontSize="40" 
                            fill="#Zbd5E0" 
                            fontWeight="bold"
                            animate={{ opacity: [0, 1, 0], y: [-10, -50], x: [0, 20] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeOut', delay: 0 }}
                        >
                            Z
                        </motion.text>
                        <motion.text 
                            x="480" y="100" 
                            fontSize="25" 
                            fill="#CBD5E0" 
                            fontWeight="bold"
                            animate={{ opacity: [0, 1, 0], y: [-10, -50], x: [0, 20] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeOut', delay: 0.8 }}
                        >
                            z
                        </motion.text>
                    </motion.g>
                )}
            </motion.svg>
        </motion.div>
    );
};

export default AnimatedMascot;
`;

fs.writeFileSync('src/components/common/AnimatedMascot.jsx', jsx);
console.log('Conversion successful!');
