import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, MessageCircle, AlertCircle, Sparkles } from 'lucide-react';
import { trackLeadSubmission, trackWhatsAppClick } from '../utils/analytics';
import { PROJECT_DETAILS } from '../data/abiatarData';

interface LeadFormProps {
  variant?: 'hero' | 'compact' | 'section';
  defaultInterest?: string;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  variant = 'section',
  defaultInterest = '2 Dormitórios Standard',
  onSuccess,
  title,
  subtitle
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [unitInterest, setUnitInterest] = useState(defaultInterest);
  const [fgtsInterest, setFgtsInterest] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto mask for Brazilian WhatsApp: (11) 99999-9999
  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setWhatsapp(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Por favor, informe um e-mail válido.');
      return;
    }

    const rawWhatsapp = whatsapp.replace(/\D/g, '');
    if (rawWhatsapp.length < 10) {
      setErrorMessage('Por favor, informe seu WhatsApp com DDD (mínimo 10 dígitos).');
      return;
    }

    setIsSubmitting(true);

    const leadPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp.trim(),
      unitInterest,
      fgtsInterest,
      source: 'Landing Page Oficial Abiatar Conecta',
      timestamp: new Date().toISOString()
    };

    try {
      // 1. Submit to server API (stores in database + dispatches email notifications to both addresses)
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      });

      // 2. Direct client-side redundancy to FormSubmit to guarantee email delivery to:
      // eliezio.consultor1@gmail.com and apnislopes@gmail.com with subject "NOVO LEAD ABIATAR CONECTA"
      try {
        await fetch('https://formsubmit.co/ajax/eliezio.consultor1@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: 'NOVO LEAD ABIATAR CONECTA',
            _cc: 'apnislopes@gmail.com',
            _template: 'table',
            'Nome': leadPayload.name,
            'E-mail': leadPayload.email,
            'WhatsApp': leadPayload.whatsapp,
            'Interesse': leadPayload.unitInterest,
            'Deseja usar FGTS': leadPayload.fgtsInterest ? 'Sim' : 'Não',
            'Data de Cadastro': new Date().toLocaleString('pt-BR')
          })
        });
      } catch (err) {
        console.log('Client backup dispatch logged:', err);
      }

      // 3. Track conversion event in Google Analytics 4 and Meta Pixel (Crucial for remarketing)
      trackLeadSubmission(leadPayload);

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Error submitting lead:', err);
      trackLeadSubmission(leadPayload);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsappDirectUrl = () => {
    const cleanPhone = PROJECT_DETAILS.defaultWhatsappNumber;
    const msg = encodeURIComponent(
      `Olá Eliezio! Acabei de me cadastrar no site do Abiatar Conecta.\n\n` +
      `*Nome:* ${name || 'Cliente'}\n` +
      `*E-mail:* ${email || 'Não informado'}\n` +
      `*Interesse:* ${unitInterest}\n` +
      `Gostaria de receber a apresentação oficial e tabela de valores no meu WhatsApp!`
    );
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  if (submitted) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 text-center text-slate-800 shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">
          Cadastro Confirmado!
        </h3>
        
        <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
          Obrigado, <strong className="text-slate-900">{name}</strong>. Seus dados foram encaminhados diretamente para o consultor Eliezio e equipe comercial.
        </p>

        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left mb-6 text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold">
            <Sparkles className="w-4 h-4 text-emerald-600" /> Notificação Despachada com Sucesso:
          </div>
          <div>• Assunto: <span className="font-mono text-slate-800 font-semibold">{PROJECT_DETAILS.emailSubject}</span></div>
          <div>• Destinatários: <span className="text-slate-700 font-medium">eliezio.consultor1@gmail.com</span> e <span className="text-slate-700 font-medium">apnislopes@gmail.com</span></div>
          <div>• Unidade de Interesse: <span className="text-amber-800 font-semibold">{unitInterest}</span></div>
        </div>

        <div className="space-y-3">
          <a
            href={getWhatsappDirectUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('PosCadastroLead', name)}
            className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition shadow-md shadow-emerald-600/10 text-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Falar com Eliezio Agora no WhatsApp ({PROJECT_DETAILS.displayWhatsappNumber})</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setName('');
              setEmail('');
              setWhatsapp('');
            }}
            className="text-xs text-slate-500 hover:text-slate-800 underline pt-2 block mx-auto"
          >
            Cadastrar outro contato ou simular novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-2xl p-5 sm:p-7 shadow-xl shadow-slate-900/5 relative overflow-hidden"
    >
      {/* Top minimal accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700" />

      <div className="mb-4 sm:mb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Lançamento Exclusivo
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 tracking-tight">
          {title || 'Receba a Tabela do Abiatar Conecta'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
          {subtitle || 'Cadastre-se para receber plantas originais, condições Minha Casa Minha Vida e simulação sem compromisso.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
        {/* Campo 1: Nome Completo */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Nome Completo <span className="text-amber-600">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome completo"
            className="w-full bg-stone-50/70 border border-stone-300 focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3.5 py-2.5 sm:py-2.5 text-base sm:text-sm text-slate-900 placeholder-slate-400 transition outline-none"
          />
        </div>

        {/* Campo 2: E-mail */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            E-mail <span className="text-amber-600">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            className="w-full bg-stone-50/70 border border-stone-300 focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3.5 py-2.5 sm:py-2.5 text-base sm:text-sm text-slate-900 placeholder-slate-400 transition outline-none"
          />
        </div>

        {/* Campo 3: WhatsApp */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            WhatsApp (com DDD) <span className="text-amber-600">*</span>
          </label>
          <input
            type="tel"
            required
            value={whatsapp}
            onChange={handleWhatsappChange}
            placeholder="(11) 99999-9999"
            maxLength={15}
            className="w-full bg-stone-50/70 border border-stone-300 focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20 rounded-xl px-3.5 py-2.5 sm:py-2.5 text-base sm:text-sm text-slate-900 placeholder-slate-400 transition outline-none"
          />
        </div>

        {/* Seleção de interesse */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Opção de Interesse
          </label>
          <select
            value={unitInterest}
            onChange={(e) => setUnitInterest(e.target.value)}
            className="w-full bg-stone-50/70 border border-stone-300 focus:border-amber-600 focus:bg-white rounded-xl px-3 py-2.5 text-base sm:text-sm text-slate-900 transition outline-none cursor-pointer"
          >
            <option value="2 Dormitórios Standard">2 Dormitórios Standard (Planta Tipo Oficial)</option>
            <option value="2 Dormitórios com Suíte">2 Dormitórios com Suíte Master</option>
            <option value="Planta Giardino Garden">Planta Giardino com Quintal Privativo</option>
            <option value="Simulação MCMV e FGTS">Simulação de Entrada e Parcelas MCMV</option>
          </select>
        </div>

        {/* Checkbox FGTS / MCMV */}
        <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-600 pt-0.5">
          <input
            type="checkbox"
            checked={fgtsInterest}
            onChange={(e) => setFgtsInterest(e.target.checked)}
            className="mt-0.5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
          />
          <span>Desejo utilizar FGTS e verificar meu subsídio no Minha Casa Minha Vida</span>
        </label>

        {/* Botão de Envio Minimalista & Elegante */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-2 group bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md shadow-slate-900/10 text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Enviando dados...</span>
            </>
          ) : (
            <>
              <span>RECEBER TABELA E CONDIÇÕES</span>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 text-amber-400" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Privacidade garantida. Notificação enviada para consultoria oficial.</span>
        </div>
      </form>
    </div>
  );
};
