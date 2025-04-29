
import { BarChart3Icon } from "./icons/BarChart3Icon";
import { Globe2Icon } from "./icons/Globe2Icon";
import { MessageCircleIcon } from "./icons/MessageCircleIcon";
import { PhoneCallIcon } from "./icons/PhoneCallIcon";

const services = [
  {
    icon: <BarChart3Icon />,
    title: "Gestão de Tráfego",
    description: "Campanhas estratégicas no Meta Ads e Google Ads focadas em gerar leads qualificados para o mercado imobiliário."
  },
  {
    icon: <Globe2Icon />,
    title: "Landing Pages",
    description: "Páginas otimizadas para conversão, com design profissional e foco total na captação de leads para seus empreendimentos."
  },
  {
    icon: <MessageCircleIcon />,
    title: "CRM e Automação",
    description: "Integração com sistemas de CRM e automação do processo comercial para aumentar a eficiência de sua equipe de vendas."
  },
  {
    icon: <PhoneCallIcon />,
    title: "Análise de Leads",
    description: "Acompanhamento completo do funil, aquecimento de leads e análise de perfil para maximizar as conversões em vendas."
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-tendencia-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Serviços e <span className="gradient-text">Diferenciais</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Soluções completas para imobiliárias que buscam escalar vendas 
            através do tráfego pago de alta qualidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-tendencia-darker p-8 rounded-2xl border border-tendencia-cyan/20 animate-fade-in card-hover"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="w-16 h-16 bg-tendencia-cyan/10 rounded-full flex items-center justify-center text-tendencia-cyan mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 gradient-text">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-tendencia-darker to-tendencia-dark p-8 rounded-2xl border border-tendencia-cyan/20 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/4 flex justify-center">
              <div className="w-24 h-24 bg-tendencia-cyan/10 rounded-full flex items-center justify-center text-tendencia-cyan">
                <span className="text-4xl font-bold">90</span>
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl font-semibold mb-4 gradient-text">Contrato de 90 dias com análise e plano de escala</h3>
              <p className="text-gray-300">
                Trabalhamos com um período inicial de 90 dias para estabelecer bases sólidas, conhecer 
                profundamente seu produto e mercado e criar uma estratégia personalizada. Após este período, 
                apresentamos um plano detalhado de escala baseado em dados reais de performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
