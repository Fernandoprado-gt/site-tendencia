
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "./icons/WhatsappIcon";
import LeadForm from "./LeadForm";

const ContactForm = () => {
  const handleWhatsAppClick = () => {
    if (window.fbq) {
      window.fbq('track', 'Lead');
      console.log("FB Pixel: Lead event triggered from Contact form WhatsApp button");
    }
    window.location.href = "https://wa.me/5521979613063?text=Olá%2C%20tenho%20interesse%20em%20criar%20uma%20campanha%20com%20a%20Tendência%20Digital.";
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-tendencia-darker to-tendencia-dark relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full bg-tendencia-cyan/10 blur-[100px] -top-10 right-10"></div>
        <div className="absolute w-64 h-64 rounded-full bg-tendencia-cyan/10 blur-[100px] -bottom-10 left-10"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold">
              Vamos criar sua próxima <span className="gradient-text">campanha?</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Preencha o formulário e comece hoje mesmo. Nossa equipe entrará em contato
              para entender seu negócio e preparar uma estratégia personalizada.
            </p>
            <div className="bg-tendencia-dark/50 p-6 rounded-xl border border-tendencia-cyan/20">
              <h3 className="text-xl font-semibold mb-4 gradient-text">
                Por que escolher a Tendência?
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-tendencia-cyan">✓</span>
                  <span>Experiência real no mercado imobiliário</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tendencia-cyan">✓</span>
                  <span>Estratégias exclusivas para o setor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tendencia-cyan">✓</span>
                  <span>Acompanhamento semanal de resultados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-tendencia-cyan">✓</span>
                  <span>Mais de R$200 milhões em VGV gerado</span>
                </li>
              </ul>
            </div>
            <div className="pt-4">
              <Button 
                size="lg"
                className="bg-cyan-gradient hover:opacity-90 transition-opacity animate-pulse-glow group"
                onClick={handleWhatsAppClick}
              >
                <WhatsappIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
                Falar com um especialista agora
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 bg-tendencia-dark/70 backdrop-blur-sm p-8 rounded-2xl border border-tendencia-cyan/30 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-semibold mb-6 gradient-text">
              Solicite uma análise gratuita do seu negócio
            </h3>
            
            <LeadForm/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
