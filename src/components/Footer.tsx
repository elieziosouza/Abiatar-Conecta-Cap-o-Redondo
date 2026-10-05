import React from 'react';
import { Mail, MessageCircle, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { PROJECT_DETAILS } from '../data/abiatarData';
import { OFFICIAL_IMAGES } from '../data/officialAssets';
import { trackWhatsAppClick } from '../utils/analytics';

interface FooterProps {
  onSecretAdminTrigger?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSecretAdminTrigger }) => {
  const handleWhatsapp = () => {
    trackWhatsAppClick('Footer');
    window.open(
      `https://wa.me/${PROJECT_DETAILS.defaultWhatsappNumber}?text=${encodeURIComponent(
        'Olá! Gostaria de mais informações sobre o empreendimento Abiatar Conecta.'
      )}`,
      '_blank'
    );
  };

  return (
    <footer className="bg-white text-slate-600 border-t border-stone-200/90 pt-12 sm:pt-16 pb-24 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-200">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={OFFICIAL_IMAGES.logo}
                alt="Abiatar Conecta"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                ABIATAR <span className="text-amber-600 font-extrabold">CONECTA</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              Apartamentos de 2 dormitórios com opções de suíte e giardino, complexo de clube com mais de 50 itens de lazer e a 5 minutos a pé do Metrô Capão Redondo.
            </p>
            <div className="text-xs text-slate-600 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Rua Dr. Sergio Jabur Maluf & Rua Paulino Vital de Morais · Capão Redondo, SP</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{PROJECT_DETAILS.developer} ({PROJECT_DETAILS.developerExperience})</span>
              </p>
            </div>
          </div>

          {/* Direct Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Consultoria & Atendimento
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-slate-700">eliezio.consultor1@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-slate-700">apnislopes@gmail.com</span>
              </li>
              <li className="pt-1">
                <button
                  onClick={handleWhatsapp}
                  className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp: {PROJECT_DETAILS.displayWhatsappNumber}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Plantão de Atendimento */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Plantão de Vendas</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Segunda a Sábado: 09h às 19h<br />
              Domingos e Feriados: 10h às 17h
            </p>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-slate-600">
              Agende sua visita ao apartamento decorado com o consultor Eliezio.
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 text-[11px] text-slate-400 space-y-2.5 leading-relaxed">
          <p>
            *Empreendimento <strong>Abiatar Conecta</strong> realizado nos termos da Lei nº 4.591/64. Todas as imagens, ilustrações artísticas, perspectivas, vegetação e acabamentos são meramente ilustrativos e poderão sofrer alterações decorrentes de necessidades técnicas e diretrizes dos órgãos públicos competentes. O detalhamento dos acabamentos, equipamentos e itens de lazer integrará o memorial descritivo da incorporação.
          </p>
          <p>
            *As condições de financiamento imobiliário e concessão de subsídios vinculados ao Programa Minha Casa Minha Vida (MCMV) e utilização do saldo de FGTS estão sujeitas à análise prévia e aprovação de crédito pela Caixa Econômica Federal na data da contratação.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-stone-200 gap-2">
            <span>© {new Date().getFullYear()} Abiatar Conecta. Todos os direitos reservados.</span>
            <span
              onClick={onSecretAdminTrigger}
              className="cursor-default select-none"
              title=""
            >
              Atendimento comercial credenciado: Eliezio Consultoria Imobiliária
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
