
import { Badge } from "@/components/ui/badge";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-gradient-to-b from-tendencia-darker to-tendencia-dark">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 lg:w-2/5">
            <div className="rounded-2xl overflow-hidden border-2 border-tendencia-cyan/30 animate-fade-in">
              <img 
                src="/images/founder.jpg" 
                alt="Fernando Prado - Fundador da Tendência" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/600x600/1A1F2C/00F2FF?text=Fernando+Prado";
                }}
              />
            </div>
          </div>
          <div className="md:w-1/2 lg:w-3/5 space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Badge variant="outline" className="border-tendencia-cyan text-tendencia-cyan px-4 py-1 text-sm">
              Sobre a Tendência
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              Especialistas em resultados para o mercado imobiliário
            </h2>
            <p className="text-gray-300 text-lg">
              Fundada por Fernando Prado, ex-corretor da Lopes Rio com mais de 5 anos de experiência no setor imobiliário, 
              a Tendência nasceu para preencher uma lacuna no mercado: agências que realmente entendem a dinâmica da venda 
              de imóveis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-tendencia-dark/50 p-5 rounded-xl border border-tendencia-cyan/20">
                <h4 className="text-xl font-semibold mb-2">+R$200 milhões</h4>
                <p className="text-gray-300">Em VGV gerado para nossos clientes nos últimos anos</p>
              </div>
              <div className="bg-tendencia-dark/50 p-5 rounded-xl border border-tendencia-cyan/20">
                <h4 className="text-xl font-semibold mb-2">+25 clientes ativos</h4>
                <p className="text-gray-300">Incluindo Lopes, Nexus e líderes de vendas do RJ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
