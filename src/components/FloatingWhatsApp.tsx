
import { WhatsappIcon } from "./icons/WhatsappIcon";
import { trackWhatsAppLeadEvent } from "@/utils/metaPixelUtils";

// Meta Pixel API access token (replace with your actual token)
const META_API_ACCESS_TOKEN = "YOUR_ACCESS_TOKEN_HERE";

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const message = encodeURIComponent("Olá, gostaria de falar com um especialista da Tendência.");
    
    try {
      // Send event to both Meta Pixel and Conversions API
      await trackWhatsAppLeadEvent(null, META_API_ACCESS_TOKEN);
      
      console.log("Floating WhatsApp click tracked successfully");
    } catch (error) {
      console.error("Error tracking WhatsApp click:", error);
    } finally {
      // Always redirect to WhatsApp, even if tracking fails
      setTimeout(() => {
        window.location.href = `https://wa.me/5521979613063?text=${message}`;
      }, 100);
    }
  };

  return (
    <a
      href="#whatsapp"
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-cyan-gradient text-white p-3 md:p-4 rounded-full shadow-lg hover:opacity-90 transition-all animate-pulse-glow flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <WhatsappIcon className="h-5 w-5 md:h-6 md:w-6" />
    </a>
  );
};

export default FloatingWhatsApp;
