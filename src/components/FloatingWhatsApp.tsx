
import { WhatsappIcon } from "./icons/WhatsappIcon";

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/5521999999999"
      className="fixed bottom-6 right-6 z-50 bg-cyan-gradient text-white p-3 md:p-4 rounded-full shadow-lg hover:opacity-90 transition-all animate-pulse-glow flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <WhatsappIcon className="h-5 w-5 md:h-6 md:w-6" />
    </a>
  );
};

export default FloatingWhatsApp;
