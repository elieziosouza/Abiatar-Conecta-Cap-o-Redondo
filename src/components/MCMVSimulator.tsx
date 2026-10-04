import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { trackSimulatorUsage } from '../utils/analytics';

interface SimulatorProps {
  onApplySimulation: (details: { renda: number; fgts: number; parcela: number }) => void;
}

export const MCMVSimulator: React.FC<SimulatorProps> = ({ onApplySimulation }) => {
  const [renda, setRenda] = useState<number>(3800);
  const [fgts, setFgts] = useState<number>(12000);
  const [entrada, setEntrada] = useState<number>(5000);

  // Dynamic simulation calculation according to Brazilian MCMV rules
  const calculateSubsidy = (income: number) => {
    if (income <= 2850) return 55000;
    if (income <= 3500) return 42000;
    if (income <= 4400) return 26000;
    if (income <= 6000) return 12000;
    return 0;
  };

  const subsidio = calculateSubsidy(renda);
  const maxCompromisso = renda * 0.28;
  const parcelaEstimada = Math.round(Math.max(680, maxCompromisso));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSimulateAction = () => {
    trackSimulatorUsage(renda, fgts, parcelaEstimada);
    onApplySimulation({ renda, fgts, parcela: parcelaEstimada });
  };

  return (
    <section id="simulador" className="py-20 bg-[#faf9f6] text-slate-800 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4" />
            <span>Simulador Caixa & Minha Casa Minha Vida</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 mb-4">
            Simule o financiamento do seu apartamento
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Informe sua renda familiar e saldo de FGTS para calcular a estimativa da parcela e subsídio do Governo Federal.
          </p>
        </div>

        {/* Simulator Container */}
        <div className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls: Sliders */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Renda Familiar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-800">
                    Renda Familiar Bruta (soma dos compradores)
                  </label>
                  <span className="text-sm sm:text-base font-bold text-amber-700 font-mono tabular-nums">
                    {formatCurrency(renda)}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="12000"
                  step="200"
                  value={renda}
                  onChange={(e) => setRenda(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>R$ 2.000</span>
                  <span>R$ 7.000</span>
                  <span>R$ 12.000+</span>
                </div>
              </div>

              {/* Slider 2: FGTS */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-800">
                    Saldo disponível no FGTS
                  </label>
                  <span className="text-sm sm:text-base font-bold text-amber-700 font-mono tabular-nums">
                    {formatCurrency(fgts)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60000"
                  step="1000"
                  value={fgts}
                  onChange={(e) => setFgts(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>R$ 0</span>
                  <span>R$ 30.000</span>
                  <span>R$ 60.000</span>
                </div>
              </div>

              {/* Slider 3: Entrada */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-800">
                    Entrada disponível inicial
                  </label>
                  <span className="text-sm sm:text-base font-bold text-amber-700 font-mono tabular-nums">
                    {formatCurrency(entrada)}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="40000"
                  step="500"
                  value={entrada}
                  onChange={(e) => setEntrada(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  *A entrada pode ser parcelada diretamente com a Abiatar Construtora durante o período de obras!
                </p>
              </div>

            </div>

            {/* Right Card: Result Calculation */}
            <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Estimativa da Simulação
                </div>

                <div>
                  <span className="text-xs text-slate-500 block mb-0.5">Parcela Mensal Estimada:</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tabular-nums">
                    {formatCurrency(parcelaEstimada)}
                    <span className="text-xs font-normal text-slate-500 ml-1">/mês</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                    Equivalente ou inferior ao valor médio de aluguel na Zona Sul!
                  </span>
                </div>

                <div className="pt-3 border-t border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-700">
                    <span>Subsídio Estimado MCMV:</span>
                    <span className="font-bold text-emerald-700 font-mono">
                      {subsidio > 0 ? formatCurrency(subsidio) : 'Taxa de Juros Reduzida'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700">
                    <span>Financiamento Bancário:</span>
                    <span className="font-bold text-slate-900 font-mono">Caixa Econômica Federal</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700">
                    <span>Amortização com FGTS:</span>
                    <span className="font-bold text-amber-800 font-mono">{formatCurrency(fgts)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleSimulateAction}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Garantir Condições da Simulação</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>

                <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 mt-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Análise de crédito gratuita pelo correspondente Caixa</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
