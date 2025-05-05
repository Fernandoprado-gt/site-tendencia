
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "./icons/WhatsappIcon";
import { LeadForm } from "@/components/LeadForm";
import { trackWhatsAppLeadEvent } from "@/utils/metaPixelUtils";

// Meta Pixel API access token (replace with your actual token)
const META_API_ACCESS_TOKEN = "YOUR_ACCESS_TOKEN_HERE";

// Separate the tracking and redirection logic
const handleWhatsAppRedirect = async (message: string, userEmail: string | null = null) => {
  try {
    // Send event to both Meta Pixel and Conversions API
    await trackWhatsAppLeadEvent(userEmail, META_API_ACCESS_TOKEN);
    
    console.log("WhatsApp redirect initiated with message:", message);
  } catch (error) {
    // Log error but continue with redirection
    console.error("Error in WhatsApp tracking:", error);
  } finally {
    // Always redirect to WhatsApp, even if tracking fails
    setTimeout(() => {
      window.location.href = `https://wa.me/5521979613063?text=${message}`;
    }, 100);
  }
};

const HeroSection = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá, gostaria de falar com um especialista da Tendência.");
    handleWhatsAppRedirect(message);
  };

  return (
    <section className="pt-24 pb-16 bg-cover bg-center bg-no-repeat min-h-[90vh] flex items-center">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="mb-6 md:mb-8">
              <a href="/">
                <img 
                  src="/lovable-uploads/2d44a52f-ca96-4705-a9c3-92094ae60aa5.png" 
                  alt="Logo da Tendência | Estratégias Digitais" 
                  className="max-h-[80px] md:max-h-[100px] max-w-[150px] md:max-w-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/200x50/1A1F2C/00F2FF?text=TENDÊNCIA";
                  }}
                />
              </a>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
              Tráfego Pago Especializado para <span className="gradient-text">Imobiliárias.</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-300">
              9 anos de expertise no marketing digital,
              5 anos transformando o mercado imobiliário.
              Entregamos estratégias que geram resultado de verdade.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-cyan-gradient hover:opacity-90 transition-opacity animate-pulse-glow group w-full md:w-auto text-sm md:text-base" 
                onClick={handleWhatsAppClick}
              >
                <WhatsappIcon className="mr-2 h-4 md:h-5 w-4 md:w-5 group-hover:scale-110 transition-transform" /> 
                Falar com um especialista agora
              </Button>
            </div>
          </div>

          <div className="bg-tendencia-dark/70 backdrop-blur-sm p-5 md:p-6 lg:p-8 rounded-2xl border border-tendencia-cyan/30 animate-fade-in mt-6 md:mt-0" style={{
            animationDelay: '0.3s'
          }}>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
