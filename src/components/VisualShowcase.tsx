import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { trackFloorPlanView } from '../utils/analytics';
import { OFFICIAL_IMAGES } from '../data/officialAssets';

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  aspect: string;
  description: string;
}

const GALLERY_ITEMS: ShowcaseItem[] = [
  {
    id: 'vista-aerea',
    title: 'Vista Aérea do Complexo de Lazer Térreo',
    subtitle: 'Mais de 50 itens integrados em meio ao verde',
    tag: 'Implantação do Lazer',
    image: OFFICIAL_IMAGES.vistaAereaLazer,
    aspect: 'lg:col-span-8',
    description: 'Perspectiva aérea real mostrando o complexo aquático com piscinas, deck molhado, pergolado sombreado, solarium e paisagismo tropical entre as torres residenciais.'
  },
  {
    id: 'piscina',
    title: 'Piscina Adulto com Raia & Deck Molhado',
    subtitle: 'Estrutura completa com solarium integrado',
    tag: 'Aquático & Relax',
    image: OFFICIAL_IMAGES.piscina,
    aspect: 'lg:col-span-4',
    description: 'Piscina ampla com deck molhado, cadeiras semi-submersas e espreguiçadeiras com orientação solar privilegiada para seus momentos de descanso.'
  },
  {
    id: 'fachada-noturna',
    title: 'Fachada Noturna com Iluminação Cênica',
    subtitle: 'Arquitetura contemporânea de destaque na Zona Sul',
    tag: 'Arquitetura & Torres',
    image: OFFICIAL_IMAGES.fachadaNoturna,
    aspect: 'lg:col-span-4',
    description: 'Iluminação cênica nas três torres residenciais com varandas envidraçadas e portaria central monitorada 24 horas.'
  },
  {
    id: 'academia',
    title: 'Academia & Fitness Funcional',
    subtitle: 'Treine sem sair de casa com aparelhos modernos',
    tag: 'Saúde & Treino',
    image: OFFICIAL_IMAGES.academia,
    aspect: 'lg:col-span-4',
    description: 'Espaço fitness climatizado com aparelhos de cardio, musculação e área dedicada a exercícios funcionais e alongamento.'
  },
  {
    id: 'churrasqueira',
    title: 'Praça de Apoio à Churrasqueira',
    subtitle: 'Espaço gourmet ao ar livre para reunir a família',
    tag: 'Espaço Social',
    image: OFFICIAL_IMAGES.churrasqueira,
    aspect: 'lg:col-span-4',
    description: 'Área com churrasqueira equipada, bancada de granito e mesas sob pergolado para confraternizações privativas.'
  },
  {
    id: 'praca-fogo',
    title: 'Lounge Fire Pit (Praça do Fogo)',
    subtitle: 'Ambiente acolhedor para as noites frescas',
    tag: 'Convivência',
    image: OFFICIAL_IMAGES.pracaFogo,
    aspect: 'lg:col-span-4',
    description: 'Espaço circular da lareira com sofás embutidos e paisagismo contemporâneo para bate-papos e relaxamento.'
  },
  {
    id: 'pet-place',
    title: 'Pet Place & Circuito Agility',
    subtitle: 'Liberdade e diversão para o seu melhor amigo',
    tag: 'Espaço Pet',
    image: OFFICIAL_IMAGES.petPlace,
    aspect: 'lg:col-span-4',
    description: 'Área gramada e cercada com obstáculos para recreação canina segura sem sair do condomínio.'
  },
  {
    id: 'implantacao',
    title: 'Implantação Geral do Empreendimento',
    subtitle: 'Planejamento urbanístico detalhado com as 3 torres',
    tag: 'Masterplan',
    image: OFFICIAL_IMAGES.implantacaoGeral,
    aspect: 'lg:col-span-4',
    description: 'Planta de implantação oficial demonstrando o acesso de veículos, vagas de garagem cobertas, portaria e distribuição das áreas comuns.'
  }
];

export const VisualShowcase: React.FC<{ onSelectSpace: (title: string) => void }> = ({ onSelectSpace }) => {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveModalIndex(index);
    trackFloorPlanView(GALLERY_ITEMS[index].title);
  };

  const closeLightbox = () => setActiveModalIndex(null);

  const nextImage = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevImage = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="sobre" className="py-20 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fotos Oficiais do Empreendimento</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
              Perspectivas reais do Abiatar Conecta
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Conheça as ilustrações e projetos arquitetônicos originais elaborados pela <strong>Abiatar Construtora e Incorporadora</strong>.
          </p>
        </div>

        {/* Bento Grid Gallery with Light Minimalist Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-stone-200/80 bg-stone-100 hover:border-amber-600/50 transition duration-300 ${item.aspect} min-h-[260px] sm:min-h-[320px] shadow-sm hover:shadow-md`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
              />
              
              {/* Refined gradient scrim for clean text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Tag text metadata */}
              <div className="absolute top-4 left-4 text-[11px] font-semibold text-white/90 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-md uppercase tracking-wider">
                {item.tag}
              </div>

              {/* Action zoom icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-base sm:text-lg font-bold font-display leading-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal with Light Surfaces */}
      {activeModalIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
          <div className="relative max-w-5xl w-full bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 z-20 p-2 text-white bg-slate-900/70 hover:bg-slate-900 rounded-full"
              aria-label="Fechar galeria"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 text-white bg-slate-900/70 hover:bg-slate-900 rounded-full"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 text-white bg-slate-900/70 hover:bg-slate-900 rounded-full"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex-1 bg-stone-900 flex items-center justify-center min-h-[350px] sm:min-h-[460px] overflow-hidden">
              <img
                src={GALLERY_ITEMS[activeModalIndex].image}
                alt={GALLERY_ITEMS[activeModalIndex].title}
                className="max-h-[62vh] max-w-full object-contain"
              />
            </div>

            <div className="p-5 bg-white border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold block mb-0.5">
                  {GALLERY_ITEMS[activeModalIndex].tag} · {activeModalIndex + 1} de {GALLERY_ITEMS.length}
                </span>
                <h4 className="text-lg sm:text-xl font-bold font-display text-slate-900">
                  {GALLERY_ITEMS[activeModalIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
                  {GALLERY_ITEMS[activeModalIndex].description}
                </p>
              </div>

              <button
                onClick={() => {
                  const title = GALLERY_ITEMS[activeModalIndex].title;
                  closeLightbox();
                  onSelectSpace(title);
                }}
                className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition"
              >
                Quero Visitar Este Espaço
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
