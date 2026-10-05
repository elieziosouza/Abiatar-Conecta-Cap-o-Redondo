import React from 'react';
import { MapPin, Navigation, Train, ShoppingBag, TreePine } from 'lucide-react';
import { LOCATION_HIGHLIGHTS, PROJECT_DETAILS } from '../data/abiatarData';
import { trackWhatsAppClick } from '../utils/analytics';
import { OFFICIAL_IMAGES } from '../data/officialAssets';

export const LocationSection: React.FC = () => {
  const openLocationOnMap = () => {
    trackWhatsAppClick('MapaLocalizacao');
    window.open('https://maps.google.com/?q=Metro+Capao+Redondo+Sao+Paulo', '_blank');
  };

  return (
    <section id="localizacao" className="py-20 bg-white text-slate-800 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4" />
            <span>Mobilidade Total na Zona Sul</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-4">
            Apenas 5 minutos a pé do Metrô Capão Redondo
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Acesso facilitado pela <strong>Rua Dr. Sergio Jabur Maluf</strong> e <strong>Rua Paulino Vital de Morais</strong>, a poucos passos da Linha 5-Lilás do Metrô.
          </p>
        </div>

        {/* Location Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Key Connections List */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-amber-600" />
              Tudo o que você precisa a poucos passos
            </h3>

            <div className="space-y-3">
              {LOCATION_HIGHLIGHTS.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#faf9f6] border border-stone-200 hover:border-amber-600/40 rounded-xl p-4 transition flex items-start gap-4"
                >
                  <div className="px-2.5 py-1 rounded-md bg-white border border-stone-200 text-amber-800 font-bold text-xs shrink-0 font-mono shadow-xs">
                    {item.time}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-display">
                      {item.place}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Subway Route Info Card */}
            <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 mt-6">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-sm mb-1">
                <Train className="w-4 h-4 text-purple-700" /> Linha 5-Lilás do Metrô: Conexão Rápida
              </div>
              <p className="text-xs text-purple-950/80 leading-relaxed">
                Integração direta com Santo Amaro (Linha 9), Santa Cruz (Linha 1-Azul) e Chácara Klabin (Linha 2-Verde / Av. Paulista) sem enfrentar o trânsito da cidade.
              </p>
            </div>
          </div>

          {/* Right Column: Implantação Aérea Real do Terreno */}
          <div className="lg:col-span-6">
            <div className="bg-[#faf9f6] border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="relative group cursor-pointer overflow-hidden">
                <img
                  src={OFFICIAL_IMAGES.implantacaoGeral}
                  alt="Implantação aérea do Abiatar Conecta"
                  className="w-full h-60 sm:h-80 object-cover object-center group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md text-[11px] sm:text-xs font-semibold text-slate-900 border border-stone-200 shadow-sm flex items-center gap-1.5 max-w-[calc(100%-1.25rem)] truncate">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">Implantação · Metrô a 5 min</span>
                </div>
              </div>

              {/* Bottom card action */}
              <div className="p-4 sm:p-5 bg-white border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                <div className="w-full sm:w-auto">
                  <h4 className="text-sm font-bold text-slate-900">Capão Redondo · Zona Sul</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Próximo ao terminal de ônibus e principais vias de acesso</p>
                </div>
                <button
                  onClick={openLocationOnMap}
                  className="w-full sm:w-auto justify-center bg-stone-100 hover:bg-stone-200 text-slate-900 text-xs font-semibold px-4 py-2.5 rounded-xl border border-stone-300 transition flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-600" />
                  <span>Ver Rota no Google Maps</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
