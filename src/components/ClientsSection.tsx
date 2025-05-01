import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Lista de clientes centralizada para facilitar atualizações
const clients = [
  { name: "Lopes", logo: "/lovable-uploads/eda63c99-8b1a-4991-b169-b783047aafa5.png" },
  { name: "Nexus", logo: "/images/clients/nexus.png" },
  { name: "Daniel Brito", logo: "/images/clients/daniel-brito.png" },
  { name: "Flavia Fernandes", logo: "/images/clients/flavia-fernandes.png" },
  { name: "Real Estate Corp", logo: "/images/clients/real-estate-corp.png" },
  { name: "Rio Imóveis", logo: "/images/clients/rio-imoveis.png" },
  { name: "PrimeHome", logo: "/images/clients/primehome.png" },
];

const ClientsSection = () => {
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  // Controle do autoplay
  useEffect(() => {
    if (!autoplayEnabled) return;
    
    const interval = setInterval(() => {
      // O carrossel do Embla gerencia a navegação automaticamente
    }, 3000);
    
    return () => clearInterval(interval);
  }, [autoplayEnabled]);

  // Função para lidar com erros de carregamento de imagens
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, clientName: string) => {
    e.currentTarget.src = `https://placehold.co/300x150/1A1F2C/00F2FF?text=${clientName}`;
  };

  return (
    <section id="clients" className="section-padding bg-gradient-to-b from-tendencia-dark to-tendencia-darker">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Clientes <span className="gradient-text">Atendidos</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Parceria com as principais imobiliárias e corretores do mercado.
          </p>
        </div>

        <div className="relative">
          <Carousel 
            opts={{
              align: "start",
              loop: true
            }}
            className="w-full"
            onMouseEnter={() => setAutoplayEnabled(false)}
            onMouseLeave={() => setAutoplayEnabled(true)}
          >
            <CarouselContent>
              {clients.map((client, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <div className="w-full h-40 bg-tendencia-dark/50 rounded-2xl flex items-center justify-center p-6 border border-tendencia-cyan/20">
                      <img 
                        src={client.logo} 
                        alt={`${client.name} logo`} 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => handleImageError(e, client.name)}
                      />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-center">{client.name}</h3>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 bg-tendencia-dark/80 border-tendencia-cyan/30 text-tendencia-cyan hover:bg-tendencia-cyan/20" />
            <CarouselNext className="absolute right-0 bg-tendencia-dark/80 border-tendencia-cyan/30 text-tendencia-cyan hover:bg-tendencia-cyan/20" />
          </Carousel>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Para adicionar novos clientes, edite a lista no início do componente ClientsSection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
