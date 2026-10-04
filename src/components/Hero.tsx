import React from 'react';
import { MapPin, Sparkles, Building2, ShieldCheck, ChevronRight } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { OFFICIAL_IMAGES } from '../data/officialAssets';

interface HeroProps {
  onScrollToForm: () => void;
  onScrollToPlans: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToPlans }) => {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-[#faf9f6] pt-10 pb-16">
      
      {/* Background subtle architectural grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Official Image Showcase & Editorial Text */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Subtle editorial kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wider uppercase bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Empreendimento Oficial · Capão Redondo - Zona Sul / SP</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 tracking-tight leading-[1.1] text-balance">
              Conecte sua vida ao seu <span className="text-amber-700">novo apartamento</span> a 5 min do metrô.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              O <strong>Abiatar Conecta</strong> reúne 2 dormitórios com plantas inteligentes, lazer de clube completo em 3 pavimentos e as facilidades do programa <strong>Minha Casa Minha Vida</strong>.
            </p>

            {/* Official Facade Preview Frame (Original Photo) */}
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 group max-w-xl">
              <img
                src={OFFICIAL_IMAGES.heroFachada}
                alt="Perspectiva original da fachada oficial do Abiatar Conecta em São Paulo"
                className="w-full h-64 sm:h-72 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold text-slate-800 border border-stone-200 shadow-sm">
                Foto Oficial da Fachada Residencial · 3 Torres
              </div>
            </div>

            {/* Key Value Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
              <div className="border-l-2 border-amber-600 pl-3.5 py-1">
                <span className="block text-2xl font-extrabold text-slate-900 font-display tabular-nums">5 MIN</span>
                <span className="text-xs text-slate-500">A pé da Estação Capão Redondo</span>
              </div>
              <div className="border-l-2 border-amber-600 pl-3.5 py-1">
                <span className="block text-2xl font-extrabold text-slate-900 font-display tabular-nums">+50 ITENS</span>
                <span className="text-xs text-slate-500">Lazer Club em 3 pavimentos</span>
              </div>
              <div className="border-l-2 border-amber-600 pl-3.5 py-1 col-span-2 sm:col-span-1">
                <span className="block text-2xl font-extrabold text-slate-900 font-display tabular-nums">MCMV</span>
                <span className="text-xs text-slate-500">Subsídio Caixa + Use seu FGTS</span>
              </div>
            </div>

            {/* Micro Highlights */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 pt-1">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                <span>Rua Dr. Sergio Jabur Maluf</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>3 torres modernas · 607 unidades</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>18+ anos Grupo Abiatar</span>
              </div>
            </div>

            {/* Quick action button */}
            <div className="pt-2">
              <button
                onClick={onScrollToPlans}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 underline decoration-amber-600/60 underline-offset-4 transition"
              >
                <span>Ver opções de plantas originais (35 a 65 m²)</span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>
            </div>
          </div>

          {/* Right Column: Light Minimalist High-Converting Lead Form */}
          <div className="lg:col-span-5">
            <LeadForm
              variant="hero"
              title="Tabela & Condições Oficiais"
              subtitle="Preencha seus dados para receber o book oficial com o consultor Eliezio."
            />
          </div>

        </div>
      </div>
    </section>
  );
};
