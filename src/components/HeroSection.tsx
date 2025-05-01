
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WhatsappIcon } from "./icons/WhatsappIcon";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HeroSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    position: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePositionChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      position: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.phone || !formData.email || !formData.position) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Show success message
    toast({
      title: "Formulário enviado com sucesso!",
      description: "Você será redirecionado para iniciar a conversa com um especialista."
    });

    // Simulate API call delay
    setTimeout(() => {
      // Create the WhatsApp message with form data
      const message = encodeURIComponent(`Olá! Meu nome é ${formData.name}, sou ${formData.position}. Gostaria de saber mais sobre as estratégias de tráfego pago para imobiliárias da Tendência.`);

      // Redirect to WhatsApp (using a placeholder phone number - replace with the actual one)
      window.location.href = `https://wa.me/5521999999999?text=${message}`;
      setIsSubmitting(false);
    }, 2000);
  };
  
  return (
    <section className="min-h-[90vh] flex items-center pt-8 pb-16 bg-hero-pattern bg-cover bg-center bg-no-repeat">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="mb-8">
              <a href="/">
                <img 
                  src="/tendencia-logo.png" 
                  alt="Logo da Tendência | Estratégias Digitais" 
                  className="h-16 md:h-20 w-auto mb-8"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/320x80/1A1F2C/00F2FF?text=TENDÊNCIA";
                  }}
                />
              </a>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Tráfego Pago Especializado para <span className="gradient-text">Imobiliárias.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300">9 anos de expertise no marketing digital,
5 anos transformando o mercado imobiliário.
Entregamos estratégias que geram resultado de verdade.</p>
            <div className="flex items-center gap-4 pt-4">
              <Button size="lg" className="bg-cyan-gradient hover:opacity-90 transition-opacity animate-pulse-glow group" onClick={() => window.location.href = "https://wa.me/5521999999999"}>
                <WhatsappIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
                Falar com um especialista agora
              </Button>
            </div>
          </div>

          <div className="bg-tendencia-dark/70 backdrop-blur-sm p-6 lg:p-8 rounded-2xl border border-tendencia-cyan/30 animate-fade-in" style={{
          animationDelay: '0.3s'
        }}>
            <h3 className="text-xl font-semibold mb-6 gradient-text">
              Solicite uma análise gratuita do seu negócio
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" placeholder="Seu nome completo" value={formData.name} onChange={handleChange} className="bg-tendencia-darker/50 border-tendencia-cyan/30 focus:border-tendencia-cyan focus:ring-tendencia-cyan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" placeholder="(00) 00000-0000" value={formData.phone} onChange={handleChange} className="bg-tendencia-darker/50 border-tendencia-cyan/30 focus:border-tendencia-cyan focus:ring-tendencia-cyan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} className="bg-tendencia-darker/50 border-tendencia-cyan/30 focus:border-tendencia-cyan focus:ring-tendencia-cyan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Cargo</Label>
                <Select value={formData.position} onValueChange={handlePositionChange}>
                  <SelectTrigger id="position" className="bg-tendencia-darker/50 border-tendencia-cyan/30 focus:border-tendencia-cyan focus:ring-tendencia-cyan text-white">
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
              <Button type="submit" className="w-full bg-cyan-gradient hover:opacity-90 transition-opacity mt-4" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Quero aumentar minhas vendas"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
