import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, MessageCircle, ArrowRight, ShieldCheck, Calculator, MapPin, Building2, Wallet } from 'lucide-react';
import { PROJECT_DETAILS } from '../data/abiatarData';
import { trackWhatsAppClick } from '../utils/analytics';

interface FAQItem {
  id: string;
  category: 'mcmv' | 'pagamento' | 'localizacao' | 'projeto';
  question: string;
  answer: string;
  badge?: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'mcmv-1',
    category: 'mcmv',
    badge: 'Minha Casa Minha Vida',
    question: 'Quem tem direito aos benefícios e subsídios do Minha Casa Minha Vida?',
    answer: 'Famílias com renda mensal bruta de até R$ 8.000,00 que não possuam imóvel próprio no município. Pelo programa, você pode conquistar subsídios do Governo Federal de até R$ 55.000,00 (que abatem diretamente o valor de compra) e ter acesso às menores taxas de juros do mercado habitacional praticadas pela Caixa Econômica Federal.'
  },
  {
    id: 'mcmv-2',
    category: 'mcmv',
    badge: 'Composição de Renda',
    question: 'Posso juntar minha renda com a de outra pessoa para aprovar o financiamento?',
    answer: 'Sim! A Caixa Econômica Federal permite a composição de renda entre até 3 pessoas — sejam cônjuges, noivos, namorados, pais e filhos, irmãos ou até amigos. Somar as rendas aumenta a sua capacidade de financiamento, reduz a necessidade de entrada e facilita a aprovação imediata do crédito.'
  },
  {
    id: 'mcmv-3',
    category: 'mcmv',
    badge: 'Autônomos',
    question: 'Profissionais autônomos, MEI ou sem carteira assinada conseguem financiar?',
    answer: 'Com certeza! Você não precisa ter carteira assinada (CLT) para financiar seu apartamento. A comprovação de renda para autônomos e MEI é feita através dos extratos bancários dos últimos 6 meses, declaração recente de Imposto de Renda (IRPF) ou recibos de prestação de serviços. Nossa assessoria Caixa cuida de todo o processo gratuitamente.'
  },
  {
    id: 'pagamento-1',
    category: 'pagamento',
    badge: 'Entrada Facilitada',
    question: 'Como funciona o parcelamento da entrada durante o período de obras?',
    answer: 'A entrada não precisa ser desembolsada de uma só vez. A Abiatar Construtora permite parcelar o valor de entrada direto durante todo o período de obras em parcelas suaves que cabem no seu orçamento familiar, sem burocracia bancária para essa etapa.'
  },
  {
    id: 'pagamento-2',
    category: 'pagamento',
    badge: 'Uso do FGTS',
    question: 'Posso usar o meu saldo de FGTS para abater a entrada?',
    answer: 'Sim. Você pode utilizar 100% do saldo disponível no seu FGTS como parte ou totalidade da entrada, ou ainda para abater o saldo devedor e reduzir as parcelas mensais do financiamento Caixa. Para isso, basta possuir ao menos 3 anos de trabalho sob o regime do FGTS (somando todos os períodos trabalhados).'
  },
  {
    id: 'pagamento-3',
    category: 'pagamento',
    badge: 'Financiamento Caixa',
    question: 'Quando começam as parcelas oficiais do financiamento imobiliário?',
    answer: 'Durante a fase de obras, você paga apenas o fluxo acordado de entrada com a construtora e a taxa de evolução de obra proporcional. As parcelas definitivas do seu financiamento habitacional com a Caixa Econômica Federal começam a ser pagas somente após a conclusão da obra e entrega das chaves.'
  },
  {
    id: 'localizacao-1',
    category: 'localizacao',
    badge: '5 Min a Pé',
    question: 'Qual é a distância real do empreendimento até a Estação Capão Redondo?',
    answer: 'O Abiatar Conecta está a aproximadamente 400 metros da Estação Capão Redondo da Linha 5-Lilás do Metrô — uma caminhada plana e tranquila de apenas 5 minutos. O acesso é facilitado tanto pela Rua Dr. Sergio Jabur Maluf quanto pela Rua Paulino Vital de Morais.'
  },
  {
    id: 'localizacao-2',
    category: 'localizacao',
    badge: 'Linha 5-Lilás',
    question: 'Quais as principais conexões e linhas de metrô integradas?',
    answer: 'A Linha 5-Lilás conecta rapidamente você aos principais polos de trabalho e estudo de São Paulo: integração direta com a Linha 9-Esmeralda (Santo Amaro / Berrini), Linha 1-Azul (Santa Cruz) e Linha 2-Verde (Chácara Klabin / Av. Paulista), evitando horas de congestionamento no trânsito.'
  },
  {
    id: 'projeto-1',
    category: 'projeto',
    badge: 'Solidez & Garantia',
    question: 'Qual é a construtora responsável e qual a segurança jurídica da compra?',
    answer: 'O projeto é desenvolvido pela Abiatar Construtora e Incorporadora, empresa com mais de 18 anos de mercado e histórico consolidado de pontualidade. O empreendimento conta com patrimônio de afetação registrado em cartório (garantindo que os recursos da obra são exclusivos do projeto) e fiscalização contínua da Caixa Econômica Federal.'
  },
  {
    id: 'projeto-2',
    category: 'projeto',
    badge: 'Lazer Entregue Equipado',
    question: 'Os mais de 50 itens de lazer serão entregues prontos para uso?',
    answer: 'Sim! Todas as áreas de lazer distribuídas nos 3 pavimentos — incluindo o complexo aquático com piscinas e solarium, academia fitness completa, salões de festas, churrasqueiras gourmets, playground, pet place e áreas verdes — serão entregues totalmente equipadas, mobiliadas e decoradas conforme o memorial descritivo da incorporação.'
  }
];

interface FAQSectionProps {
  onSimulateClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onSimulateClick }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mcmv' | 'pagamento' | 'localizacao' | 'projeto'>('all');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'mcmv-1': true,
    'pagamento-1': true
  });

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleWhatsapp = () => {
    trackWhatsAppClick('FAQSection');
    window.open(
      `https://wa.me/${PROJECT_DETAILS.defaultWhatsappNumber}?text=${encodeURIComponent(
        'Olá Eliezio! Tenho uma dúvida sobre o financiamento e as condições do Abiatar Conecta.'
      )}`,
      '_blank'
    );
  };

  const categories = [
    { id: 'all', label: 'Todas as Perguntas', icon: HelpCircle },
    { id: 'mcmv', label: 'Minha Casa Minha Vida', icon: Calculator },
    { id: 'pagamento', label: 'Pagamento & FGTS', icon: Wallet },
    { id: 'localizacao', label: 'Localização & Metrô', icon: MapPin },
    { id: 'projeto', label: 'Construtora & Garantias', icon: Building2 },
  ];

  const filteredItems = activeCategory === 'all'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white border-t border-stone-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/70 px-3 py-1 rounded-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Tire Suas Dúvidas Sem Complicação</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-3 sm:mb-4">
            Perguntas Frequentes sobre o Abiatar Conecta
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Esclareça pontos fundamentais sobre o programa <strong>Minha Casa Minha Vida</strong>, uso do FGTS, entrada facilitada e a localização a 5 minutos do metrô.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1 bg-stone-100 rounded-2xl max-w-3xl mx-auto mb-8 sm:mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold rounded-xl transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm border border-stone-200/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3 sm:space-y-3.5">
          {filteredItems.map((item) => {
            const isOpen = !!openItems[item.id];
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#faf9f6] border-amber-600/40 shadow-sm'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 pr-2">
                    {item.badge && (
                      <span className="inline-block text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100/60 px-2 py-0.5 rounded-md mb-0.5">
                        {item.badge}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display group-hover:text-amber-800 transition-colors">
                      {item.question}
                    </h3>
                  </div>
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-amber-100 text-amber-900 rotate-180'
                        : 'bg-stone-100 text-slate-500 group-hover:bg-stone-200'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 mt-1">
                    <p className="pt-2">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Trust & Direct Help Callout Banner */}
        <div className="mt-10 sm:mt-12 bg-gradient-to-br from-stone-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Atendimento Consultivo Personalizado</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
                Ainda tem alguma dúvida sobre renda ou documentos?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Nossa equipe analisa seu perfil gratuitamente e calcula exatamente seu potencial de subsídio e valor de entrada pelo Minha Casa Minha Vida.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={onSimulateClick}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
              >
                <span>Simular Meu Crédito</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleWhatsapp}
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-xl text-xs sm:text-sm transition border border-white/20 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp com Eliezio</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
