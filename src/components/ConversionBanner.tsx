import React from 'react';
import { Sparkles, MessageCircle, CheckCircle2 } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { PROJECT_DETAILS } from '../data/abiatarData';
import { trackWhatsAppClick } from '../utils/analytics';

interface ConversionBannerProps {
  formRef: React.RefObject<HTMLDivElement | null>;
  selectedInterest?: string;
}

export const ConversionBanner: React.FC<ConversionBannerProps> = ({ formRef, selectedInterest }) => {
  const handleWhatsapp = () => {
    trackWhatsAppClick('BottomConversionBanner');
    window.open(
      `https://wa.me/${PROJECT_DETAILS.defaultWhatsappNumber}?text=${encodeURIComponent(
        'Olá Eliezio! Gostaria de receber a tabela de preços oficial do Abiatar Conecta no WhatsApp.'
      )}`,
      '_blank'
    );
  };

  return (
    <section ref={formRef} id="cadastro" className="py-14 sm:py-20 bg-[#f4f2ec] border-t border-stone-200/90 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Text / Value Proposition */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wider uppercase bg-amber-100/70 border border-amber-300 px-3 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Condições Oficiais de Lançamento</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
              Conquiste o seu apartamento no <span className="text-amber-700">Abiatar Conecta</span>.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Consulte a tabela com Eliezio Corretor de Imóveis (CRECI-SP: 209.709), parcele sua entrada diretamente durante a obra e conquiste as taxas e subsídios do <strong>Minha Casa Minha Vida</strong>.
            </p>

            {/* Checklist of guarantees */}
            <div className="space-y-2.5 sm:space-y-3 pt-1">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Atendimento direto com Eliezio Corretor de Imóveis (CRECI-SP: 209.709)</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Simulação gratuita de parcelas e avaliação do potencial de FGTS</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Envio imediato da apresentação completa em PDF e plantas originais</span>
              </div>
            </div>

            {/* WhatsApp Alternative */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
              <div>
                <span className="text-xs font-bold text-slate-900 block">Deseja falar agora mesmo?</span>
                <span className="text-[11px] text-slate-500">Chame o corretor no WhatsApp: {PROJECT_DETAILS.displayWhatsappNumber}</span>
              </div>
              <button
                onClick={handleWhatsapp}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shrink-0 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp com Eliezio Corretor</span>
              </button>
            </div>
          </div>

          {/* Right Lead Capture Form */}
          <div className="lg:col-span-6">
            <LeadForm
              variant="section"
              defaultInterest={selectedInterest || '2 Dormitórios Standard'}
              title="Solicitar Atendimento Oficial"
              subtitle="Seus dados serão enviados para eliezio.consultor1@gmail.com e apnislopes@gmail.com com assunto NOVO LEAD ABIATAR CONECTA."
            />
          </div>

        </div>
      </div>
    </section>
  );
};
