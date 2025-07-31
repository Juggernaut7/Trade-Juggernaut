import React from 'react';
import Navbar from '../components/layout/Navbar';
import MarketList from '../components/dashboard/MarketList';
import AIChatbot from '../components/dashboard/AIChatbot'; // Import the AI Chatbot
import Footer from '../components/layout/Footer';

function DashboardPage() {
  return (
    <div className="min-h-screen bg-juggernaut-dark text-juggernaut-text-light">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-juggernaut-text-light mb-8 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-juggernaut-accent-1 to-juggernaut-accent-2">
            Your Juggernaut Dashboard
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market List on the left/top */}
          <div className="lg:col-span-2">
            <MarketList />
          </div>

          {/* AI Chatbot on the right/bottom */}
          <div className="lg:col-span-1">
            <AIChatbot /> {/* Our AI Chatbot component */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardPage;