
"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase, testSupabaseConnection } from "@/integrations/supabase/client";

export const LeadForm = () => {
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
        console.log("Field updated:", name, value);
      };

      const handlePositionChange = (value: string) => {
        setFormData(prev => ({
          ...prev,
          position: value
        }));
        console.log("Position updated:", value);
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submission started with data:", formData);
        setIsSubmitting(true);
        
        // Validate form
        if (!formData.name || !formData.phone || !formData.email || !formData.position) {
          console.log("Form validation failed:", formData);
          toast({
            title: "Erro no formulário",
            description: "Por favor, preencha todos os campos.",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
    
        try {
          // Debug Supabase client initialization
          console.log("Supabase client initialized:", !!supabase);
          console.log("Attempting to insert data into Supabase...");
          
          // Test connection to Supabase before attempting insert
          const connectionTest = await testSupabaseConnection();
          console.log("Supabase connection test result:", connectionTest);
          
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
          
          // Detailed error logging
          if (error) {
            console.error("Supabase insertion error details:", {
              message: error.message,
              details: error.details,
              hint: error.hint,
              code: error.code
            });
            throw error;
          }
          
          console.log("Supabase insertion successful:", data);
          
          // Show success message
          toast({
            title: "Formulário enviado com sucesso!",
            description: "Obrigado! Em breve entraremos em contato para criar sua campanha personalizada.",
          });
          
          setFormSubmitted(true);
          
          // Track CompleteRegistration event
          if (window.fbq) {
            window.fbq('track', 'CompleteRegistration');
            console.log("FB Pixel: CompleteRegistration event triggered");
          }
          
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
    <>
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
    </>
  );
};


export default LeadForm;
