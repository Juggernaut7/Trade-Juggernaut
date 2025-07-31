import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Import icons from lucide-react

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Features', path: '#features' }, // Use hash links for landing page sections
    { name: 'How It Works', path: '#how-it-works' },
    // { name: 'Pricing', path: '#pricing' }, // If you add one later
    { name: 'Launch App', path: '/dashboard' },
  ];

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <nav className="bg-juggernaut-medium p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-2xl font-bold text-juggernaut-accent-1 flex items-center">
          <img src="/logo.svg" alt="Trade Juggernaut Logo" className="h-8 w-8 mr-2" /> {/* Add a logo.svg in your public folder! */}
          Trade Juggernaut
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-juggernaut-text-light hover:text-juggernaut-accent-1 text-lg font-medium transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-juggernaut-text-light focus:outline-none focus:ring-2 focus:ring-juggernaut-accent-1 rounded"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay (Animated with Framer Motion) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-juggernaut-dark flex flex-col items-center justify-center space-y-8 md:hidden z-40"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-juggernaut-text-light hover:text-juggernaut-accent-1 text-3xl font-bold transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;