import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button'; // Import our reusable button
// import ThreeJsBackground from './ThreeJsBackground'; // Placeholder for your Three.js component later

function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="relative h-[calc(100vh-80px)] flex items-center justify-center text-center px-4 md:px-8 overflow-hidden">
      {/* Three.js background placeholder */}
      {/* <ThreeJsBackground /> */}
      <div className="absolute inset-0 bg-juggernaut-dark opacity-80 z-10"></div> {/* Overlay for readability */}

      <motion.div
        className="relative z-20 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-juggernaut-accent-1 to-juggernaut-accent-2"
          variants={itemVariants}
        >
          Unleash Your Trading Edge with AI-Powered Insights
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-juggernaut-text-light mb-10 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Trade Juggernaut provides real-time cryptocurrency market data and intelligent AI analysis for smarter, data-driven trading decisions.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button to="/dashboard">
            Launch Trade Juggernaut
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;