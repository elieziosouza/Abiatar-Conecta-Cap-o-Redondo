import React, { useState } from 'react';
import { Waves, Dumbbell, Users, Coffee, Check, ArrowRight } from 'lucide-react';
import { AMENITIES_LIST, Amenity } from '../data/abiatarData';
import { OFFICIAL_IMAGES } from '../data/officialAssets';

interface AmenitiesProps {
  onInterestClick: (amenityName: string) => void;
}

export const AmenitiesSection: React.FC<AmenitiesProps> = ({ onInterestClick }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'aquatico' | 'bem-estar' | 'social' | 'comodidade'>('all');

  const categories = [
    { id: 'all', label: 'Todos os +50 Itens' },
    { id: 'aquatico', label: 'Aquático & Solarium', icon: Waves },
    { id: 'bem-estar', label: 'Saúde & Fitness', icon: Dumbbell },
    { id: 'social', label: 'Social & Festas', icon: Users },
    { id: 'comodidade', label: 'Facilidades & Pet', icon: Coffee }
  ];

  const filteredAmenities = activeTab === 'all'
    ? AMENITIES_LIST
    : AMENITIES_LIST.filter(item => item.category === activeTab);

  return (
    <section id="lazer" className="py-20 bg-[#faf9f6] text-slate-800 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-amber-700 tracking-wider uppercase block mb-2">
            Lazer Club Completo em 3 Pavimentos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-4">
            Mais de 50 opções de lazer e convivência
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Ambientes entregues equipados e decorados para você e sua família aproveitarem momentos de descanso, saúde e celebração.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-stone-200/60 rounded-xl max-w-2xl mx-auto mb-8 sm:mb-10">
          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Amenities Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {filteredAmenities.map((amenity: Amenity) => (
            <div
              key={amenity.id}
              className="bg-white border border-stone-200/90 hover:border-amber-600/40 rounded-xl p-4 sm:p-5 transition duration-200 flex flex-col justify-between shadow-sm hover:shadow group"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 font-display group-hover:text-amber-700 transition-colors">
                    {amenity.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pl-8">
                  {amenity.description}
                </p>
              </div>

              <div className="pt-3 pl-8 mt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 capitalize">
                  {amenity.category}
                </span>
                <button
                  onClick={() => onInterestClick(amenity.name)}
                  className="text-xs text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Saber mais</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Floors Breakdown Banner with Official Aerial Photo */}
        <div className="mt-10 sm:mt-12 bg-white border border-stone-200 rounded-2xl p-5 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 sm:gap-6 shadow-sm">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
              Conceito Arquitetônico Inteligente
            </span>
            <h4 className="text-lg sm:text-2xl font-bold font-display text-slate-900">
              Lazer distribuído estrategicamente em 3 níveis
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Térreo integrado à natureza, mezanino social e pavimento de descanso com piscina, quadra poliesportiva e redário zen.
            </p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
            <img
              src={OFFICIAL_IMAGES.redarioZen}
              alt="Redário Zen do Abiatar Conecta"
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl object-cover border border-stone-200 shrink-0"
            />
            <button
              onClick={() => onInterestClick('Memorial Descritivo do Lazer')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-3 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm transition shadow-sm whitespace-nowrap"
            >
              Baixar Memorial Descritivo
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
