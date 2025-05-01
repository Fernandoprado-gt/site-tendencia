
import { useEffect, useState, useRef } from "react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);

  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === clients.length - 1 ? 0 : prev + 1));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handleNavClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoplay(false);
    
    // Resume autoplay after 10 seconds of user inactivity
    setTimeout(() => setIsAutoplay(true), 10000);
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
          <div 
            ref={carouselRef}
            className="overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {clients.map((client, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0 px-4 flex flex-col items-center"
                >
                  <div className="w-full h-40 bg-tendencia-dark/50 rounded-2xl flex items-center justify-center p-6 border border-tendencia-cyan/20">
                    <img 
                      src={client.logo} 
                      alt={`${client.name} logo`} 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/300x150/1A1F2C/00F2FF?text=${client.name}`;
                      }}
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{client.name}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-2 mt-8">
            {clients.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index ? "bg-tendencia-cyan w-8" : "bg-gray-500"
                }`}
                onClick={() => handleNavClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow navigation */}
          <button
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-tendencia-dark/80 p-2 rounded-full text-tendencia-cyan border border-tendencia-cyan/30 hover:bg-tendencia-cyan/20 transition-colors"
            onClick={() => handleNavClick(activeIndex === 0 ? clients.length - 1 : activeIndex - 1)}
            aria-label="Previous client"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-tendencia-dark/80 p-2 rounded-full text-tendencia-cyan border border-tendencia-cyan/30 hover:bg-tendencia-cyan/20 transition-colors"
            onClick={() => handleNavClick(activeIndex === clients.length - 1 ? 0 : activeIndex + 1)}
            aria-label="Next client"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
