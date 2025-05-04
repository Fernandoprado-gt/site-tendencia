
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MethodSection from "@/components/MethodSection";
import ServicesSection from "@/components/ServicesSection";
import ClientsSection from "@/components/ClientsSection";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="min-h-screen bg-tendencia-darker text-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <div className="section-spacing">
        <MethodSection />
      </div>
      <div className="section-spacing">
        <ServicesSection />
      </div>
      <div className="section-spacing">
        <ClientsSection />
      </div>
      <div className="section-spacing">
        <FaqSection />
      </div>
      <div className="section-spacing">
        <ContactForm />
      </div>
      <Footer />
      <FloatingWhatsApp />
      <Toaster />
    </div>
  );
};

export default Index;
