
import React, { useEffect, useState } from "react";
import { WhatsappIcon } from "./icons/WhatsappIcon";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  
  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300", 
      scrolled ? "bg-tendencia-darker/90 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-3 md:py-4"
    )}>
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img 
            src="/lovable-uploads/2d44a52f-ca96-4705-a9c3-92094ae60aa5.png" 
            alt="Logo da Tendência | Estratégias Digitais" 
            className="max-h-[40px] md:max-h-[50px]"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/200x50/1A1F2C/00F2FF?text=TENDÊNCIA";
            }} 
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="gap-4 lg:gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink className="text-gray-300 hover:text-tendencia-cyan transition-colors" href="#about">
                  Sobre
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-gray-300 hover:text-tendencia-cyan transition-colors" href="#method">
                  Método
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-gray-300 hover:text-tendencia-cyan transition-colors" href="#services">
                  Serviços
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-gray-300 hover:text-tendencia-cyan transition-colors" href="#clients">
                  Clientes
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-gray-300 hover:text-tendencia-cyan transition-colors" href="#faq">
                  FAQ
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-gray-300 hover:text-tendencia-cyan transition-colors" href="#contact">
                  Contato
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button 
            size="sm" 
            className="bg-cyan-gradient hover:opacity-90 transition-opacity group whitespace-nowrap" 
            onClick={() => window.location.href = "https://wa.me/5521999999999"}
          >
            <WhatsappIcon className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            Falar conosco
          </Button>
        </div>

        {/* Mobile Navigation Button */}
        <Button 
          size="sm" 
          className="md:hidden bg-cyan-gradient hover:opacity-90 transition-opacity py-1 px-3" 
          onClick={() => window.location.href = "https://wa.me/5521999999999"}
        >
          <WhatsappIcon className="h-4 w-4 mr-1" />
          <span className="text-xs">Contato</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
