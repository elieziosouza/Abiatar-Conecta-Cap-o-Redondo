import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/analytics';
import { PROJECT_DETAILS } from '../data/abiatarData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [quickMsg, setQuickMsg] = useState('Olá Eliezio! Gostaria de receber a tabela de valores do Abiatar Conecta.');

  // Subtle prompt after 4 seconds to capture attention for remarketing
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = (customMsg?: string) => {
    trackWhatsAppClick('FloatingWidget', customMsg || quickMsg);
    const message = encodeURIComponent(customMsg || quickMsg);
    const url = `https://wa.me/${PROJECT_DETAILS.defaultWhatsappNumber}?text=${message}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      
      {/* Expanded Interactive Chat Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-[#101726] border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-neutral-900 border-2 border-white flex items-center justify-center font-bold text-amber-400 font-display text-sm">
                  EC
                </div>
                <div className="w-3 h-3 bg-emerald-400 border-2 border-emerald-800 rounded-full absolute bottom-0 right-0 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Eliezio Consultor</h4>
                <span className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" /> {PROJECT_DETAILS.displayWhatsappNumber} · Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#0c121e]">
            <div className="bg-[#151f33] rounded-xl p-3 text-xs text-neutral-200 border border-neutral-700/60">
              <p>
                Olá! Seja bem-vindo ao <strong>Abiatar Conecta</strong>. 🏢
              </p>
              <p className="mt-1 text-neutral-400">
                Está buscando seu primeiro apê, simulação Minha Casa Minha Vida ou tabela de lançamento?
              </p>
            </div>

            {/* Quick action chips */}
            <div className="space-y-1.5">
              <button
                onClick={() => handleOpenChat('Olá! Gostaria de receber a Tabela de Preços e Valores de Lançamento.')}
                className="w-full text-left text-xs bg-[#121a2c] hover:bg-emerald-500/20 text-neutral-300 hover:text-emerald-300 border border-neutral-800 rounded-lg p-2 transition flex items-center justify-between"
              >
                <span>📊 Ver Tabela de Preços</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </button>
              <button
                onClick={() => handleOpenChat('Olá Eliezio! Gostaria de agendar uma visita ao Decorado no Capão Redondo.')}
                className="w-full text-left text-xs bg-[#121a2c] hover:bg-emerald-500/20 text-neutral-300 hover:text-emerald-300 border border-neutral-800 rounded-lg p-2 transition flex items-center justify-between"
              >
                <span>🏠 Visitar Apartamento Decorado</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </button>
              <button
                onClick={() => handleOpenChat('Olá! Gostaria de simular as parcelas com meu FGTS pelo Minha Casa Minha Vida.')}
                className="w-full text-left text-xs bg-[#121a2c] hover:bg-emerald-500/20 text-neutral-300 hover:text-emerald-300 border border-neutral-800 rounded-lg p-2 transition flex items-center justify-between"
              >
                <span>💰 Simulação Caixa Econômica</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </button>
            </div>

            {/* Input field */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={quickMsg}
                onChange={(e) => setQuickMsg(e.target.value)}
                placeholder="Escreva sua dúvida..."
                className="w-full bg-[#080d15] border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 outline-none focus:border-emerald-400"
              />
              <button
                onClick={() => handleOpenChat()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition shrink-0"
                aria-label="Enviar WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teaser prompt tooltip (before clicked) */}
      {!isOpen && hasPrompted && (
        <div
          onClick={() => setIsOpen(true)}
          className="mb-2 bg-[#101726]/95 border border-emerald-500/40 text-white rounded-xl py-2 px-3.5 shadow-xl text-xs max-w-[240px] cursor-pointer hover:border-emerald-400 transition animate-bounce flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Fale com <strong>Eliezio</strong> agora no WhatsApp!</span>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
            trackWhatsAppClick('FloatingTrigger');
          } else {
            setIsOpen(false);
          }
        }}
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-900/60 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white/20"
        aria-label="Abrir WhatsApp Oficial"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[9px] font-bold text-neutral-950 items-center justify-center">1</span>
        </span>
      </button>

    </div>
  );
};
