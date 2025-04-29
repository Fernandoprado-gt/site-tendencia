
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MethodSection from "@/components/MethodSection";
import ServicesSection from "@/components/ServicesSection";
import ClientsSection from "@/components/ClientsSection";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-tendencia-darker text-white">
      <HeroSection />
      <AboutSection />
      <MethodSection />
      <ServicesSection />
      <ClientsSection />
      <FaqSection />
      <ContactForm />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
