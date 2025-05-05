
import { WhatsappIcon } from "./icons/WhatsappIcon";

// Separate the tracking and redirection logic into a cleaner utility function
const handleWhatsAppRedirect = (message: string) => {
  // Track the lead event in Meta Pixel
  if (window.fbq) {
    try {
      window.fbq('track', 'Lead');
      console.log("FB Pixel: Lead event triggered from Floating WhatsApp button");
    } catch (err) {
      // Silently handle tracking errors to ensure redirection still works
      console.error("FB Pixel tracking error:", err);
    }
  }
  
  // Safely redirect to WhatsApp with a small delay to ensure tracking completes
  setTimeout(() => {
    window.location.href = `https://wa.me/5521979613063?text=${message}`;
  }, 100);
};

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const message = encodeURIComponent("Olá, gostaria de falar com um especialista da Tendência.");
    handleWhatsAppRedirect(message);
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
