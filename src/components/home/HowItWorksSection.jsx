import React from 'react';
import { motion } from 'framer-motion';
import { Plug, MessageSquareText, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: <Plug size={40} className="text-juggernaut-accent-1" />,
    title: 'Connect & Explore',
    description: 'Instantly access real-time market data for a wide range of cryptocurrencies.',
  },
  {
    icon: <MessageSquareText size={40} className="text-juggernaut-accent-1" />,
    title: 'Analyze with AI',
    description: 'Engage our AI chatbot to get deep technical analysis and signal generation based on your prompts.',
  },
  {
    icon: <TrendingUp size={40} className="text-juggernaut-accent-1" />,
    title: 'Make Smarter Trades',
    description: 'Leverage data-driven insights to make confident and strategic trading decisions.',
  },
];

const stepVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-juggernaut-dark text-juggernaut-text-light">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white bg-clip-text text-transparent bg-gradient-to-r from-juggernaut-accent-2 to-juggernaut-accent-1"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          Your Path to Smarter Trades
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-8 bg-juggernaut-medium rounded-xl shadow-xl border border-juggernaut-light"
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
              <p className="text-juggernaut-text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;