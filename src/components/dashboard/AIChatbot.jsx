import React, { useState, useRef, useEffect } from 'react';
import { generateAiResponse } from '../../utils/hfApi';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react'; // Icons for send button and loading

function AIChatbot() {
  const [messages, setMessages] = useState([]); // [{ type: 'user' | 'ai', text: '...' }]
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { type: 'user', text: input.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const aiResponse = await generateAiResponse(input.trim());
      setMessages((prevMessages) => [...prevMessages, { type: 'ai', text: aiResponse }]);
    } catch (err) {
      console.error('Failed to get AI response:', err);
      // Display a user-friendly error message if AI fails
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'ai', text: `Error: ${err.message || 'Could not get AI response.'}` },
      ]);
      setError('Error communicating with AI. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 10 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="bg-juggernaut-medium rounded-xl shadow-xl border border-juggernaut-light flex flex-col h-[500px] lg:h-[700px]">
      <div className="p-4 border-b border-juggernaut-light">
        <h2 className="text-2xl font-semibold text-white">AI Trade Analyst</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <AnimatePresence>
          {messages.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-juggernaut-text-muted italic mt-10"
            >
              <p>Ask me anything about crypto market analysis! </p>
              <p className="text-sm mt-2">
                e.g., "Analyze PYTH USD pair, current price is .1191, recent low is .1181, market seems to be bearish"
              </p>
            </motion.div>
          )}
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`mb-4 max-w-[80%] p-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-juggernaut-accent-1 text-juggernaut-dark ml-auto rounded-br-none'
                  : 'bg-juggernaut-dark text-juggernaut-text-light mr-auto rounded-bl-none border border-juggernaut-light'
              }`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className="font-semibold text-sm mb-1">
                {msg.type === 'user' ? 'You' : 'AI Analyst'}
              </p>
              <p>{msg.text}</p>
            </motion.div>
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-juggernaut-dark text-juggernaut-text-muted p-3 rounded-lg rounded-bl-none flex items-center">
                <Loader2 className="animate-spin mr-2" size={20} />
                Typing...
              </div>
            </div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} /> {/* Scroll to this element */}
      </div>

      {error && (
        <div className="text-red-500 text-sm p-4 text-center">{error}</div>
      )}

      <form onSubmit={handleSendMessage} className="p-4 border-t border-juggernaut-light flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI about market analysis..."
          className="flex-1 bg-juggernaut-dark border border-juggernaut-light rounded-lg px-4 py-2 text-juggernaut-text-light focus:outline-none focus:ring-2 focus:ring-juggernaut-accent-1 mr-2"
          disabled={loading}
        />
        <motion.button
          type="submit"
          className="bg-juggernaut-accent-1 text-juggernaut-dark p-3 rounded-lg hover:bg-juggernaut-accent-2 transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          aria-label="Send message"
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
        </motion.button>
      </form>
    </div>
  );
}

export default AIChatbot;