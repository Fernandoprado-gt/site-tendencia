
import { ArrowUpIcon } from "./icons/ArrowUpIcon";
import { WhatsappIcon } from "./icons/WhatsappIcon";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-tendencia-darker pt-12 pb-6 border-t border-tendencia-cyan/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <a href="/">
              <img 
                src="/tendencia-logo.png" 
                alt="Logo da Tendência | Estratégias Digitais" 
                className="h-10 md:h-12 w-auto mb-6"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/200x48/1A1F2C/00F2FF?text=TENDÊNCIA";
                }}
              />
            </a>
            <p className="text-gray-300 max-w-md">
              Agência especializada em tráfego pago para o mercado imobiliário,
              com foco em resultados reais para nossos clientes.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <button
              onClick={scrollToTop}
              className="bg-tendencia-dark p-4 rounded-full border border-tendencia-cyan/30 text-tendencia-cyan hover:bg-tendencia-cyan/20 transition-colors mb-6"
              aria-label="Voltar ao topo"
            >
              <ArrowUpIcon />
            </button>
            <a 
              href="https://wa.me/5521999999999" 
              className="bg-cyan-gradient text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <WhatsappIcon className="h-5 w-5" /> 
              Falar com um especialista
            </a>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 py-8 border-t border-tendencia-cyan/10">
          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-300">
              <li>contato@tendencia.digital</li>
              <li>(21) 99999-9999</li>
              <li>Rio de Janeiro, RJ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Navegação</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-tendencia-cyan transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-tendencia-cyan transition-colors">Sobre nós</a></li>
              <li><a href="#method" className="hover:text-tendencia-cyan transition-colors">Nosso método</a></li>
              <li><a href="#services" className="hover:text-tendencia-cyan transition-colors">Serviços</a></li>
              <li><a href="#clients" className="hover:text-tendencia-cyan transition-colors">Clientes</a></li>
              <li><a href="#faq" className="hover:text-tendencia-cyan transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-tendencia-cyan transition-colors">Contato</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-tendencia-dark p-2 rounded-full border border-tendencia-cyan/30 text-tendencia-cyan hover:bg-tendencia-cyan/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="bg-tendencia-dark p-2 rounded-full border border-tendencia-cyan/30 text-tendencia-cyan hover:bg-tendencia-cyan/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="bg-tendencia-dark p-2 rounded-full border border-tendencia-cyan/30 text-tendencia-cyan hover:bg-tendencia-cyan/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-400 text-sm pt-6 border-t border-tendencia-cyan/10">
          <p>&copy; {new Date().getFullYear()} Tendência | Estratégias Digitais. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
