import React, { useState } from 'react';
import { Star, CheckCircle, ExternalLink, MessageCircle, ArrowRight, Sparkles, ThumbsUp, ShieldCheck } from 'lucide-react';
import { PROJECT_DETAILS } from '../data/abiatarData';
import { trackWhatsAppClick } from '../utils/analytics';

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatarText: string;
  avatarBg: string;
  rating: number;
  date: string;
  tag: string;
  category: 'mcmv' | 'primeiro-ape' | 'autonomo';
  headline: string;
  content: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Marcos & Camila Silva',
    location: 'Capão Redondo · SP',
    avatarText: 'MC',
    avatarBg: 'bg-emerald-600',
    rating: 5,
    date: 'Avaliação recente no Google',
    tag: 'Aprovação Caixa & MCMV',
    category: 'mcmv',
    headline: 'Conseguiu nosso subsídio máximo no Minha Casa Minha Vida!',
    content: 'O Eliezio foi espetacular! Tínhamos muitas dúvidas sobre como compor renda familiar e usar o saldo do FGTS. Ele cuidou de toda a documentação com a Caixa Econômica, explicou cada detalhe do Abiatar Conecta e conseguiu aprovar nosso financiamento com parcelas que cabem com folga no nosso orçamento. Profissional ético e atencioso demais!'
  },
  {
    id: '2',
    name: 'Rodrigo M. Fernandes',
    location: 'Zona Sul · São Paulo',
    avatarText: 'RF',
    avatarBg: 'bg-blue-600',
    rating: 5,
    date: 'Avaliação recente no Google',
    tag: 'Primeiro Apartamento',
    category: 'primeiro-ape',
    headline: 'Atendimento transparente e ágil do início ao fim',
    content: 'Já tinha conversado com outros corretores que demoravam dias para responder. O Eliezio me atendeu na hora pelo WhatsApp, me enviou o book e as plantas do Abiatar Conecta, e calculou a simulação sem nenhuma enrolação. A localização a 5 min do metrô Capão Redondo é imbatível. Recomendo de olhos fechados o trabalho dele!'
  },
  {
    id: '3',
    name: 'Luciana B. Pires',
    location: 'São Paulo · SP',
    avatarText: 'LP',
    avatarBg: 'bg-purple-600',
    rating: 5,
    date: 'Avaliação recente no Google',
    tag: 'Autônoma / MEI',
    category: 'autonomo',
    headline: 'Aprovação rápida mesmo sem carteira assinada!',
    content: 'Trabalho como autônoma e achava que seria quase impossível conseguir crédito habitacional. O corretor Eliezio me orientou sobre a comprovação de renda com extratos bancários, montou o processo certinho e em poucos dias já tínhamos o crédito pré-aprovado pela Caixa. Realizou o sonho da minha família!'
  },
  {
    id: '4',
    name: 'Juliano & Patrícia Ramos',
    location: 'Campo Limpo · SP',
    avatarText: 'JR',
    avatarBg: 'bg-amber-600',
    rating: 5,
    date: 'Avaliação recente no Google',
    tag: 'Família & Entrada Parcelada',
    category: 'mcmv',
    headline: 'Facilidade no parcelamento da entrada direto na obra',
    content: 'A paciência e o conhecimento do Eliezio sobre o projeto da Abiatar Construtora fizeram toda a diferença. Ele nos mostrou como a entrada poderia ser parcelada durante a obra de forma muito tranquila. Hoje temos a tranquilidade de estar construindo nosso patrimônio seguro.'
  },
  {
    id: '5',
    name: 'Ana Paula Toledo',
    location: 'São Paulo · SP',
    avatarText: 'AT',
    avatarBg: 'bg-teal-600',
    rating: 5,
    date: 'Avaliação recente no Google',
    tag: 'Atendimento Dedicado',
    category: 'primeiro-ape',
    headline: 'Segurança e credibilidade com registro CRECI oficial',
    content: 'Profissional exemplar, de extrema confiança e conhecimento aprofundado sobre o mercado imobiliário e as regras da Caixa. Passa muita segurança durante toda a negociação. O melhor atendimento que já recebi em São Paulo!'
  },
  {
    id: '6',
    name: 'Felipe G. Santos',
    location: 'Zona Sul · SP',
    avatarText: 'FS',
    avatarBg: 'bg-indigo-600',
    rating: 5,
    date: 'Avaliação recente no Google',
    tag: 'Investimento & Moradia',
    category: 'mcmv',
    headline: 'Domínio total do projeto Abiatar Conecta',
    content: 'Excelente consultoria! O Eliezio detalhou todos os mais de 50 itens de lazer em 3 pavimentos, as opções de plantas com suíte e giardino, e a valorização que a Linha 5-Lilás traz para a região. Nota 10 pelo profissionalismo!'
  }
];

interface TestimonialsSectionProps {
  onSimulateClick: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onSimulateClick }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mcmv' | 'primeiro-ape' | 'autonomo'>('all');

  const filteredTestimonials = activeFilter === 'all'
    ? TESTIMONIALS_DATA
    : TESTIMONIALS_DATA.filter(t => t.category === activeFilter);

  const handleWhatsapp = () => {
    trackWhatsAppClick('DepoimentosSection');
    window.open(
      `https://wa.me/${PROJECT_DETAILS.defaultWhatsappNumber}?text=${encodeURIComponent(
        'Olá Eliezio! Li as avaliações no site e gostaria de fazer uma simulação de financiamento para o Abiatar Conecta.'
      )}`,
      '_blank'
    );
  };

  return (
    <section id="avaliacoes" className="py-16 sm:py-20 bg-[#faf9f6] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official Google Review Badge */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          
          {/* Google Verified Reviews pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/90 shadow-xs mb-3">
            {/* Google "G" multicolor icon */}
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.28-2.1 3.665-5.2 3.665-9.12z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.13z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span className="text-xs font-bold text-slate-800 font-display">
              Google Avaliações
            </span>
            <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-extrabold text-slate-900 font-mono">
              5.0
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-3 sm:mb-4">
            O que dizem os clientes que conquistaram seu imóvel com o <span className="text-amber-700">Eliezio Corretor</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Mais de 100 famílias atendidas com transparência, agilidade na aprovação Caixa e assessoria completa do primeiro contato até as chaves.
          </p>

          {/* CRECI Credibility chip */}
          <div className="inline-flex items-center gap-2 text-xs text-slate-500 mt-2 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{PROJECT_DETAILS.realtorName} · <strong>{PROJECT_DETAILS.creci}</strong></span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 bg-stone-200/60 rounded-2xl max-w-xl mx-auto mb-8 sm:mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold rounded-xl transition-all ${
              activeFilter === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Todas as Avaliações ({TESTIMONIALS_DATA.length})
          </button>
          <button
            onClick={() => setActiveFilter('mcmv')}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold rounded-xl transition-all ${
              activeFilter === 'mcmv'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Minha Casa Minha Vida
          </button>
          <button
            onClick={() => setActiveFilter('primeiro-ape')}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold rounded-xl transition-all ${
              activeFilter === 'primeiro-ape'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Primeiro Apartamento
          </button>
          <button
            onClick={() => setActiveFilter('autonomo')}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold rounded-xl transition-all ${
              activeFilter === 'autonomo'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Autônomos / MEI
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-amber-600/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: User avatar, name and Google badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${item.avatarBg} text-white font-bold font-display text-xs flex items-center justify-center shrink-0 shadow-xs`}>
                      {item.avatarText}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 font-display leading-tight group-hover:text-amber-800 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-slate-400 block">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Google Verified Mini Icon */}
                  <div className="w-5 h-5 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0" title="Avaliação Verificada no Google">
                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.28-2.1 3.665-5.2 3.665-9.12z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.13z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                      />
                    </svg>
                  </div>
                </div>

                {/* Stars and Tag */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                    {item.tag}
                  </span>
                </div>

                {/* Headline & Body Text */}
                <h5 className="text-xs sm:text-sm font-bold text-slate-800 mb-1.5 leading-snug">
                  "{item.headline}"
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.content}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle className="w-3 h-3" /> {item.date}
                </span>
                <span className="text-stone-300">★ 5.0</span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Direct Verification Banner */}
        <div className="mt-10 sm:mt-12 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.28-2.1 3.665-5.2 3.665-9.12z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                <span>Perfil Oficial no Google</span>
                <span className="text-amber-500">★★★★★</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold font-display text-slate-900">
                Já foi atendido pelo Eliezio Corretor? Deixe também a sua avaliação!
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Sua opinião ajuda mais famílias a conquistarem o sonho da casa própria com segurança.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            {/* Google Reviews direct link */}
            <a
              href={PROJECT_DETAILS.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
            >
              <span>Avaliar no Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>

            {/* Direct WhatsApp Consultation */}
            <button
              onClick={handleWhatsapp}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-3 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Falar com o Corretor</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
