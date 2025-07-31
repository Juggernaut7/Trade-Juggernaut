import React from 'react';
import { motion } from 'framer-motion';

function Button({ children, className = '', onClick, to, type = 'button', ...props }) {
  const commonClasses = 'px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out ' +
                        'focus:outline-none focus:ring-2 focus:ring-juggernaut-accent-1 focus:ring-offset-2 focus:ring-offset-juggernaut-dark ' +
                        'transform hover:-translate-y-1 hover:scale-105 hover:text-juggernaut-accent-1';

  const primaryClasses = 'bg-juggernaut-accent-1 text-juggernaut-dark hover:bg-juggernaut-accent-2';
  const secondaryClasses = 'bg-transparent border-2 border-juggernaut-accent-1 text-juggernaut-accent-1 hover:bg-juggernaut-accent-1 hover:text-juggernaut-dark';

  const combinedClasses = `${commonClasses} ${primaryClasses} ${className}`;

  if (to) {
    // If 'to' prop is provided, render as a Link (assuming react-router-dom Link)
    return (
      <motion.a
        href={to} // Use href for anchor tag as Link is imported directly in relevant component
        className={combinedClasses}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;