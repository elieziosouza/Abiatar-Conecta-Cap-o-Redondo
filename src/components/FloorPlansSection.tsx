import React, { useState } from 'react';
import { Bed, Bath, Sparkles, Check, ArrowRight, Eye } from 'lucide-react';
import { FLOOR_PLANS, FloorPlan } from '../data/abiatarData';
import { OFFICIAL_IMAGES } from '../data/officialAssets';
import { trackFloorPlanView } from '../utils/analytics';

interface FloorPlansProps {
  onSelectPlan: (plan: FloorPlan) => void;
}

export const FloorPlansSection: React.FC<FloorPlansProps> = ({ onSelectPlan }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(FLOOR_PLANS[0].id);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const currentPlan = FLOOR_PLANS.find(p => p.id === selectedPlanId) || FLOOR_PLANS[0];

  const handlePlanClick = (plan: FloorPlan) => {
    setSelectedPlanId(plan.id);
    trackFloorPlanView(plan.name);
  };

  // Select appropriate official original floor plan image
  const planImage = currentPlan.id === 'giardino-65'
    ? OFFICIAL_IMAGES.plantaGarden
    : OFFICIAL_IMAGES.plantaTipo;

  return (
    <section id="plantas" className="py-20 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-amber-700 tracking-wider uppercase block mb-2">
            Plantas Originais do Empreendimento
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-4">
            Espaços inteligentes desenhados para o seu bem-estar
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Plantas modernas de 34,99 m² a 65,27 m² com 2 dormitórios, opções com suíte e unidades giardino com quintal privativo, seguindo as melhores tendências de arquitetura para{' '}
            <a
              href="https://ezbrokers.com.br/imovel/up-sports-home-1-e-2-dormitorios/"
              className="text-inherit hover:text-slate-900 transition-colors underline decoration-stone-300 hover:decoration-stone-600 underline-offset-4"
            >
              1 e 2 dormitórios
            </a>{' '}
            com lazer de clube integrado e mobilidade urbana.
          </p>
        </div>

        {/* Plan Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {FLOOR_PLANS.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            return (
              <button
                key={plan.id}
                onClick={() => handlePlanClick(plan)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-amber-50/70 border-amber-600 text-slate-900 shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                  {plan.area}
                </div>
                <div className="font-bold text-sm text-slate-900 font-display">
                  {plan.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3" /> {plan.bedrooms} dorms
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 h-3" /> {plan.bathrooms} banh
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Plan Details & Official Floor Plan Image */}
        <div className="bg-[#faf9f6] border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            
            {/* Left: Original Official Floor Plan Image */}
            <div className="lg:col-span-6 bg-white rounded-xl p-6 border border-stone-200 flex flex-col items-center justify-center relative min-h-[380px] shadow-sm">
              
              <div className="absolute top-3 left-3 text-[11px] font-semibold text-slate-700 bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
                PLANTA OFICIAL ABIATAR CONECTA
              </div>

              <div
                onClick={() => setZoomImage(planImage)}
                className="relative cursor-pointer group w-full flex items-center justify-center p-2"
              >
                <img
                  src={planImage}
                  alt={`Planta original oficial: ${currentPlan.name}`}
                  className="max-h-[340px] w-auto object-contain rounded-lg group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition-opacity">
                  <span className="bg-white text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Clique para ampliar planta
                  </span>
                </div>
              </div>

              <span className="text-[11px] text-slate-400 mt-3 block text-center">
                *Imagem oficial extraída do projeto da Abiatar Construtora e Incorporadora.
              </span>
            </div>

            {/* Right: Plan Specs & Action */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {currentPlan.highlight}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
                  {currentPlan.name} · <span className="text-amber-700">{currentPlan.area}</span>
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {currentPlan.description}
                </p>
              </div>

              {/* Spec bullets */}
              <div className="space-y-2.5">
                {currentPlan.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action and Minha Casa Minha Vida badge */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                  onClick={() => onSelectPlan(currentPlan)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Simular Financiamento Desta Planta</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>

                <div className="text-xs text-slate-500">
                  <span>Enquadrado no <strong>Minha Casa Minha Vida</strong></span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Plan Zoom Modal */}
      {zoomImage && (
        <div
          onClick={() => setZoomImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl bg-white p-4 rounded-2xl shadow-2xl">
            <img
              src={zoomImage}
              alt="Planta Ampliada"
              className="max-h-[80vh] w-auto object-contain mx-auto"
            />
            <p className="text-center text-xs text-slate-500 mt-2">Clique em qualquer lugar para fechar</p>
          </div>
        </div>
      )}
    </section>
  );
};
