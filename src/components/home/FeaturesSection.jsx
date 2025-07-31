import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Bot, LayoutDashboard, Globe } from 'lucide-react'; // Import relevant icons

const featureCards = [
  {
    icon: <Activity size={40} className="text-juggernaut-accent-1" />,
    title: 'Real-time Market Data',
    description: 'Stay ahead with live, comprehensive cryptocurrency price feeds and market trends.',
  },
  {
    icon: <Bot size={40} className="text-juggernaut-accent-1" />,
    title: 'AI-Powered Analysis',
    description: 'Get intelligent insights and potential trade signals from our advanced AI chatbot.',
  },
  {
    icon: <LayoutDashboard size={40} className="text-juggernaut-accent-1" />,
    title: 'Intuitive Interface',
    description: 'Navigate complex markets with ease through our sleek and user-friendly design.',
  },
  {
    icon: <Globe size={40} className="text-juggernaut-accent-1" />,
    title: 'Web3 Inspired Design',
    description: 'Experience a modern, decentralized spirit in a secure and performant application.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-juggernaut-medium text-juggernaut-text-light">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white bg-clip-text text-transparent bg-gradient-to-r from-juggernaut-accent-1 to-juggernaut-accent-2"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          Why Trade Juggernaut?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-juggernaut-dark p-8 rounded-xl shadow-xl flex flex-col items-center text-center border border-juggernaut-light"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-6">{card.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-4">{card.title}</h3>
              <p className="text-juggernaut-text-muted">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;