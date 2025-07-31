import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

function CallToActionSection() {
  return (
    <section className="py-20 px-4 bg-juggernaut-medium text-juggernaut-text-light text-center">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-8 text-white bg-clip-text text-transparent bg-gradient-to-r from-juggernaut-accent-1 to-juggernaut-accent-2"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          Ready to Transform Your Trading?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-juggernaut-text-muted mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join Trade Juggernaut today and start making smarter, more informed cryptocurrency trading decisions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button to="/dashboard">
            Launch Trade Juggernaut Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default CallToActionSection;