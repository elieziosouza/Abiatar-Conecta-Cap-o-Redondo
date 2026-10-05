import React, { useState } from 'react';
import { MessageCircle, Menu, X, Database } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/analytics';
import { PROJECT_DETAILS } from '../data/abiatarData';
import { OFFICIAL_IMAGES } from '../data/officialAssets';

interface NavbarProps {
  onScrollToForm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToForm }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsapp = () => {
    trackWhatsAppClick('TopNav');
    const url = `https://wa.me/${PROJECT_DETAILS.defaultWhatsappNumber}?text=${encodeURIComponent(
      'Olá Eliezio! Acessei a página do Abiatar Conecta e gostaria de informações sobre o lançamento.'
    )}`;
    window.open(url, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-stone-200/80 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        
        {/* Zone 1: Official Logo or Brand Wordmark */}
        <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0">
          <img
            src={OFFICIAL_IMAGES.logo}
            alt="Abiatar Conecta"
            className="h-8 sm:h-10 w-auto object-contain shrink-0"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="font-display font-bold text-base sm:text-xl tracking-tight text-slate-900 group-hover:text-amber-700 transition truncate">
            ABIATAR <span className="text-amber-600 font-extrabold">CONECTA</span>
          </span>
        </a>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-600">
          <a href="#sobre" className="hover:text-slate-900 transition-colors">
            O Projeto
          </a>
          <a href="#lazer" className="hover:text-slate-900 transition-colors">
            Lazer Club (+50 Itens)
          </a>
          <a href="#plantas" className="hover:text-slate-900 transition-colors">
            Plantas Originais
          </a>
          <a href="#localizacao" className="hover:text-slate-900 transition-colors">
            Localização & Metrô
          </a>
          <a href="#simulador" className="hover:text-slate-900 transition-colors">
            Simulador MCMV
          </a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">
            Dúvidas
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Direct WhatsApp Action */}
          <button
            onClick={handleWhatsapp}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-600/20" />
            <span>(11) 97111-8620</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onScrollToForm}
            className="px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition shadow-sm whitespace-nowrap"
          >
            <span className="hidden xs:inline">Receber </span>Tabela
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <a
            href="#sobre"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-700 hover:text-amber-600 py-1 font-medium"
          >
            O Projeto
          </a>
          <a
            href="#lazer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-700 hover:text-amber-600 py-1 font-medium"
          >
            Lazer Club (+50 Itens)
          </a>
          <a
            href="#plantas"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-700 hover:text-amber-600 py-1 font-medium"
          >
            Plantas Originais
          </a>
          <a
            href="#localizacao"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-700 hover:text-amber-600 py-1 font-medium"
          >
            Localização & Metrô
          </a>
          <a
            href="#simulador"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-700 hover:text-amber-600 py-1 font-medium"
          >
            Simulador MCMV
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-slate-700 hover:text-amber-600 py-1 font-medium"
          >
            Perguntas Frequentes (FAQ)
          </a>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsapp();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp (11) 97111-8620
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
