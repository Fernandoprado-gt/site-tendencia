
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WhatsappIcon } from "./icons/WhatsappIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    position: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("Field updated:", name, value); // Log field changes
  };

  const handlePositionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      position: value
    }));
    console.log("Position updated:", value); // Log position changes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission started"); // Log submission start
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.email || !formData.position) {
      console.log("Form validation failed:", formData); // Log validation failure
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Debug log - for checking form data before submission
      console.log("Form data being submitted:", formData);
      
      // Prepare data object to match Supabase column names
      const leadData = { 
        nome: formData.name,
        telefone: formData.phone,
        email: formData.email,
        cargo: formData.position,
      };
      
      console.log("Lead data being inserted into Supabase:", leadData);
      
      // Insert lead into Supabase with explicit response handling
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData]);
      
      if (error) {
        console.error("Supabase insertion error:", error);
        throw error;
      }
      
      console.log("Supabase insertion successful:", data);
      
      // Show success message
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Obrigado! Em breve entraremos em contato para criar sua campanha personalizada.",
      });
      
      setFormSubmitted(true);
      
      // Create the WhatsApp message with form data
      const message = encodeURIComponent(
        `Olá! Meu nome é ${formData.name}, sou ${formData.position}. Tenho interesse em criar uma campanha com a Tendência Digital.`
      );
      
      // Redirect to WhatsApp after a short delay
      console.log("Preparing WhatsApp redirect with message:", message);
      setTimeout(() => {
        console.log("Redirecting to WhatsApp...");
        window.location.href = `https://wa.me/5521979613063?text=${message}`;
        setIsSubmitting(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao enviar formulário",
        description: "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
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
                onClick={() => window.location.href = "https://wa.me/5521979613063?text=Olá%2C%20tenho%20interesse%20em%20criar%20uma%20campanha%20com%20a%20Tendência%20Digital."}
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
            
            {formSubmitted ? (
              <div className="text-center py-8 space-y-6">
                <div className="text-tendencia-cyan text-5xl mb-4">✓</div>
                <h4 className="text-2xl font-bold">Formulário enviado com sucesso!</h4>
                <p className="text-gray-300">
                  Obrigado! Em breve entraremos em contato para criar sua campanha personalizada.
                </p>
                <p className="text-gray-300 text-sm">
                  Você será redirecionado para o WhatsApp em instantes...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">Nome</Label>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-tendencia-darker/50 border-tendencia-cyan/30 focus:border-tendencia-cyan focus:ring-tendencia-cyan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Telefone</Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-tendencia-darker/50 border-tendencia-cyan/30 focus:border-tendencia-cyan focus:ring-tendencia-cyan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">E-mail</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-tendencia-darker/50 border-tendencia-cyan/30 focus:border-tendencia-cyan focus:ring-tendencia-cyan"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-position">Cargo</Label>
                  <Select
                    value={formData.position}
                    onValueChange={handlePositionChange}
                  >
                    <SelectTrigger 
                      id="contact-position"
                      className="bg-tendencia-darker/50 border-tendencia-cyan/30 focus:border-tendencia-cyan focus:ring-tendencia-cyan text-white"
                    >
                      <SelectValue placeholder="Selecione seu cargo" />
                    </SelectTrigger>
                    <SelectContent className="bg-tendencia-dark border-tendencia-cyan/30 text-white">
                      <SelectItem value="Corretor autônomo">Corretor autônomo</SelectItem>
                      <SelectItem value="Corretor associado a uma imobiliária">Corretor associado a uma imobiliária</SelectItem>
                      <SelectItem value="Gerente de vendas">Gerente de vendas</SelectItem>
                      <SelectItem value="Diretor de vendas">Diretor de vendas</SelectItem>
                      <SelectItem value="Dono da imobiliária">Dono da imobiliária</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-cyan-gradient hover:opacity-90 transition-opacity mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Enviando..." : "Quero aumentar minhas vendas"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
