
import { WhatsappIcon } from "./icons/WhatsappIcon";

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.fbq) {
      window.fbq('track', 'Lead');
      console.log("FB Pixel: Lead event triggered from Floating WhatsApp button");
    }
    window.location.href = "https://wa.me/5521979613063?text=Olá%2C%20gostaria%20de%20falar%20com%20um%20especialista%20da%20Tendência.";
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
