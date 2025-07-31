import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection'; // NEW
import HowItWorksSection from '../components/home/HowItWorksSection'; // NEW
import CallToActionSection from '../components/home/CallToActionSection'; // NEW
import Footer from '../components/layout/Footer';

function HomePage() {
  return (
    <div className="min-h-screen bg-juggernaut-dark text-juggernaut-text-light overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection /> {/* Added */}
        <HowItWorksSection /> {/* Added */}
        <CallToActionSection /> {/* Added */}
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;