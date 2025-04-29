
import { useState, useEffect } from "react";
import { CheckIcon } from "./icons/CheckIcon";

const steps = [
  {
    number: "01",
    title: "Estratégia com o cliente",
    description: "Sessão estratégica para entender produto, público e mercado",
    features: [
      "Análise do mercado local",
      "Pesquisa de concorrentes diretos",
      "Definição de buyer persona",
      "Mapeamento de objetivos e KPIs"
    ]
  },
  {
    number: "02",
    title: "Criação e Captação",
    description: "Criativos personalizados, campanhas em Meta Ads & Google, landing pages, CRM",
    features: [
      "Criação de anúncios impactantes",
      "Segmentação precisa de audiência",
      "Landing pages de alta conversão",
      "Integração com CRM imobiliário"
    ]
  },
  {
    number: "03",
    title: "Otimização e Escala",
    description: "Otimizações a cada 48h + reuniões semanais de performance",
    features: [
      "Acompanhamento diário das campanhas",
      "Relatórios semanais de desempenho",
      "Reuniões estratégicas de performance",
      "Escala baseada em dados reais"
    ]
  }
];

const MethodSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="method" className="section-padding bg-tendencia-darker relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full bg-tendencia-cyan/10 blur-[100px] -top-10 -left-10"></div>
        <div className="absolute w-64 h-64 rounded-full bg-tendencia-cyan/10 blur-[100px] bottom-10 right-10"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nosso <span className="gradient-text">Método</span> em 3 Etapas
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Um processo estruturado e transparente para entregar resultados consistentes 
            para imobiliárias de todos os portes.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`
                flex-1 border border-tendencia-cyan/20 rounded-2xl p-8 transition-all duration-500
                ${activeStep === index ? 'bg-tendencia-dark shadow-lg shadow-tendencia-cyan/10 scale-105' : 'bg-tendencia-dark/50'} 
                animate-fade-in card-hover
              `}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setActiveStep(index)}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center 
                  ${activeStep === index ? 'bg-cyan-gradient text-tendencia-darker' : 'bg-tendencia-dark border border-tendencia-cyan/30'}
                  transition-all duration-300
                `}>
                  <span className="text-2xl font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold gradient-text">{step.title}</h3>
              </div>
              <p className="text-gray-300 mb-6">
                {step.description}
              </p>
              <ul className="space-y-3">
                {step.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckIcon className="text-tendencia-cyan flex-shrink-0" />
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MethodSection;
