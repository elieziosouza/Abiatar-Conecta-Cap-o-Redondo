import React from 'react';
import { Heart, ShieldCheck, Smile, Clock, Sparkles, ArrowRight } from 'lucide-react';
import happyFamilyImg from '../assets/images/familia_feliz_abiatar_1791135766684.jpg';
import { OFFICIAL_IMAGES } from '../data/officialAssets';

interface FamilySectionProps {
  onSimulateClick: () => void;
}

export const FamilySection: React.FC<FamilySectionProps> = ({ onSimulateClick }) => {
  return (
    <section className="py-20 bg-white border-t border-stone-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Photo of Happy Family in Bright Sunlit Apartment */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-lg bg-stone-100 group">
              <img
                src={happyFamilyImg}
                alt="Família feliz celebrando a conquista do apartamento no Abiatar Conecta"
                className="w-full h-auto object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
            </div>

            {/* Credibility badge - clean below on mobile, floating on desktop */}
            <div className="mt-3.5 sm:mt-0 sm:absolute sm:bottom-4 sm:left-4 sm:right-auto bg-white/95 sm:backdrop-blur-md border border-stone-200/90 rounded-2xl p-3 sm:p-4 shadow-sm sm:shadow-lg flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block font-display">
                  O Seu Primeiro Lar Próprio
                </span>
                <span className="text-[11px] text-slate-500 block">
                  Parcelas que cabem no orçamento familiar
                </span>
              </div>
            </div>

            {/* Small thumbnail preview of official playground / pool alongside */}
            <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-white p-2 rounded-2xl border border-stone-200 shadow-xl items-center gap-3">
              <img
                src={OFFICIAL_IMAGES.playground}
                alt="Playground oficial"
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="pr-3">
                <span className="text-xs font-bold text-slate-800 block">Playground & Piscinas</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Espaço seguro para crianças</span>
              </div>
            </div>
          </div>

          {/* Right Column: Emotional & Practical Copy */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wider uppercase bg-amber-50 border border-amber-200 px-3 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Qualidade de Vida para Quem Você Ama</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
              Mais que um apartamento: o cenário das melhores memórias da sua família.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Ver seus filhos brincando em segurança, desfrutar de finais de semana com piscina e churrasco sem sair do condomínio e trocar o aluguel por parcelas do que é seu. No <strong>Abiatar Conecta</strong>, esse sonho se torna realidade.
            </p>

            {/* Family Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Segurança 24 Horas</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Portaria com reconhecimento facial e câmeras para seus filhos brincarem com total tranquilidade.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5">
                  <Smile className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Lazer Completo</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Piscina infantil, playground, brinquedoteca e pet place para todos os momentos de alegria.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-2.5">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Mais Tempo em Família</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  A 5 min do metrô Capão Redondo: gaste menos tempo no transporte e aproveite mais a sua casa.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center mb-2.5">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">Patrimônio Seguro</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Conquiste a escritura e transforme o valor do aluguel em investimento para o futuro dos seus filhos.
                </p>
              </div>

            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={onSimulateClick}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition inline-flex items-center gap-2 shadow-sm"
              >
                <span>Fazer Simulação para Minha Família</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
