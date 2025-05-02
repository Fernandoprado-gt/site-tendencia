
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Lista de clientes centralizada para facilitar atualizações
const clients = [{
  name: "Lopes",
  logo: "/lovable-uploads/eda63c99-8b1a-4991-b169-b783047aafa5.png",
  alt: "Logo da Lopes"
}, {
  name: "Nexus",
  logo: "/lovable-uploads/0c90bb55-a538-4a11-8305-7346b0fb2837.png",
  alt: "Logo da Nexus"
}, {
  name: "Daniel Brito",
  logo: "/lovable-uploads/eda63c99-8b1a-4991-b169-b783047aafa5.png",
  alt: "Logo da Lopes"
}, {
  name: "Bruna Germano",
  logo: "/lovable-uploads/eda63c99-8b1a-4991-b169-b783047aafa5.png",
  alt: "Logo da Lopes"
}, {
  name: "Leonardo Motta",
  logo: "/lovable-uploads/eda63c99-8b1a-4991-b169-b783047aafa5.png",
  alt: "Logo da Lopes"
}, {
  name: "Kaique Andrade",
  logo: "/lovable-uploads/eda63c99-8b1a-4991-b169-b783047aafa5.png",
  alt: "Logo da Lopes"
}];

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
    <section id="clients" className="section-padding section-spacing bg-gradient-to-b from-tendencia-dark to-tendencia-darker">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Clientes <span className="gradient-text">Atendidos</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Parceria com as principais imobiliárias e corretores do mercado.
          </p>
        </div>

        <div className="relative px-4 md:px-8">
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
                <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-2 md:p-3">
                  <div className="h-full">
                    <div className="h-[140px] bg-tendencia-dark/50 rounded-xl md:rounded-2xl flex items-center justify-center p-4 md:p-6 border border-tendencia-cyan/20">
                      <img 
                        src={client.logo} 
                        alt={client.alt} 
                        onError={e => handleImageError(e, client.name)} 
                        className="max-w-full max-h-[50px] object-contain" 
                      />
                    </div>
                    <h3 className="mt-3 text-base md:text-lg font-semibold text-center">{client.name}</h3>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 lg:-left-6 bg-tendencia-dark/80 border-tendencia-cyan/30 text-tendencia-cyan hover:bg-tendencia-cyan/20 hidden md:flex" />
            <CarouselNext className="absolute -right-4 lg:-right-6 bg-tendencia-dark/80 border-tendencia-cyan/30 text-tendencia-cyan hover:bg-tendencia-cyan/20 hidden md:flex" />
          </Carousel>

          <div className="text-center mt-6 md:mt-8">
            <p className="text-gray-400 text-xs md:text-sm">
              Para adicionar novos clientes, edite a lista no início do componente ClientsSection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
