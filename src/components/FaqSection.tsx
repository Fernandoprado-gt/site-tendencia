
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funciona o contrato de 90 dias?",
    answer:
      "Nosso contrato inicial de 90 dias é estruturado para estabelecer bases sólidas para o sucesso. Começamos com uma análise completa do seu negócio e mercado, seguida pela criação e implementação de estratégias personalizadas. Durante este período, realizamos otimizações constantes e, ao final, apresentamos um plano detalhado de escala com base nos resultados obtidos.",
  },
  {
    question: "Atendem qualquer tipo de imóvel?",
    answer:
      "Sim, trabalhamos com todos os tipos de empreendimentos imobiliários, desde lançamentos e pré-lançamentos até imóveis prontos, de diferentes portes e segmentos. Nossa abordagem é personalizada para cada tipo de produto, considerando suas características específicas e o público-alvo ideal.",
  },
  {
    question: "Quanto tempo leva para ver resultado?",
    answer:
      "Os primeiros resultados começam a aparecer entre 15 a 30 dias após o início das campanhas. Neste período, conseguimos ajustar a estratégia com base nos dados iniciais. Resultados mais consistentes e escaláveis geralmente são observados entre 45 a 60 dias, quando conseguimos otimizar completamente a abordagem.",
  },
  {
    question: "Como é feito o acompanhamento?",
    answer:
      "Realizamos otimizações técnicas a cada 48 horas nas campanhas. Além disso, fazemos reuniões semanais de performance com cada cliente para apresentar resultados, discutir ajustes estratégicos e definir os próximos passos. Também disponibilizamos acesso a um dashboard em tempo real e relatórios detalhados.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="section-padding bg-tendencia-darker">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perguntas <span className="gradient-text">Frequentes</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tire suas principais dúvidas sobre nossos serviços
          </p>
        </div>

        <div className="max-w-3xl mx-auto animate-fade-in">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-tendencia-cyan/20">
                <AccordionTrigger className="text-left hover:text-tendencia-cyan text-lg py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
