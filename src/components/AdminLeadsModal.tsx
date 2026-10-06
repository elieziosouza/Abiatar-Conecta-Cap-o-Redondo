import React, { useState, useEffect } from 'react';
import { X, Download, MessageCircle, Mail, RefreshCw, BarChart2, Shield, CheckCircle, Tag, Lock, KeyRound } from 'lucide-react';
import { getAnalyticsConfig, saveAnalyticsConfig, getTrackedEvents } from '../utils/analytics';
import { PROJECT_DETAILS } from '../data/abiatarData';

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LeadRecord {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  unitInterest?: string;
  fgtsInterest?: boolean;
  timestamp: string;
}

const DEFAULT_PIN = '1234';

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'pixel'>('leads');
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Security Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [authError, setAuthError] = useState(false);

  // Analytics configuration state
  const [gaId, setGaId] = useState('');
  const [pixelId, setPixelId] = useState('');
  const [saveStatus, setSaveStatus] = useState(false);
  const [recentEvents, setRecentEvents] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      const storedAuth = sessionStorage.getItem('abiatar_admin_auth');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
        fetchLeads();
      }
      const config = getAnalyticsConfig();
      setGaId(config.gaId || '');
      setPixelId(config.pixelId || '');
      setRecentEvents(getTrackedEvents());
    } else {
      setInputPin('');
      setAuthError(false);
    }
  }, [isOpen]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin === DEFAULT_PIN || inputPin === 'abiatar2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('abiatar_admin_auth', 'true');
      setAuthError(false);
      fetchLeads();
    } else {
      setAuthError(true);
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.warn('Could not fetch server leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePixelConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveAnalyticsConfig({ gaId: gaId.trim(), pixelId: pixelId.trim() });
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 3000);
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Nome', 'E-mail', 'WhatsApp', 'Interesse', 'Usa FGTS', 'Data/Hora'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.whatsapp}"`,
      `"${l.unitInterest || ''}"`,
      l.fgtsInterest ? 'Sim' : 'Não',
      `"${new Date(l.timestamp).toLocaleString('pt-BR')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_abiatar_conecta_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDirectWhatsapp = (lead: LeadRecord) => {
    const rawNumber = lead.whatsapp.replace(/\D/g, '');
    const phone = rawNumber.startsWith('55') ? rawNumber : `55${rawNumber}`;
    const text = encodeURIComponent(
      `Olá ${lead.name}! Sou Eliezio Corretor de Imóveis (CRECI-SP: 209.709). Recebi seu contato sobre o Abiatar Conecta referente à unidade ${lead.unitInterest || '2 dormitórios'}. Como posso te ajudar?`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* If Not Authenticated: Security PIN Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-700 border border-amber-200">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold font-display text-slate-900 mb-1">
              Área Restrita do Corretor de Imóveis
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Digite o PIN de acesso para gerenciar leads e configurar tags de remarketing.
            </p>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  autoFocus
                  value={inputPin}
                  onChange={(e) => {
                    setInputPin(e.target.value);
                    setAuthError(false);
                  }}
                  placeholder="PIN de acesso (Padrão: 1234)"
                  className="w-full text-center tracking-widest text-lg font-mono bg-stone-50 border border-stone-300 focus:border-amber-600 rounded-xl py-3 px-4 outline-none transition"
                />
                {authError && (
                  <span className="text-xs text-red-600 font-medium block mt-1.5">
                    PIN incorreto. Tente novamente.
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-slate-600 hover:bg-stone-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Entrar</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="bg-stone-50 border-b border-stone-200 p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-700" />
                  <h3 className="font-bold text-lg font-display text-slate-900">
                    Painel do Corretor · Eliezio Corretor de Imóveis (CRECI-SP: 209.709)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Notificação configurada para: <strong className="text-slate-800">eliezio.consultor1@gmail.com</strong> e <strong className="text-slate-800">apnislopes@gmail.com</strong>
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-stone-200 transition"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Selection */}
            <div className="flex border-b border-stone-200 bg-white px-5 pt-3">
              <button
                onClick={() => setActiveTab('leads')}
                className={`pb-3 px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
                  activeTab === 'leads'
                    ? 'border-amber-600 text-amber-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>Leads Recebidos</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                  {leads.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('pixel');
                  setRecentEvents(getTrackedEvents());
                }}
                className={`pb-3 px-4 text-xs font-bold transition border-b-2 flex items-center gap-2 ${
                  activeTab === 'pixel'
                    ? 'border-amber-600 text-amber-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>Google Analytics & Meta Pixel</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto flex-1">
              {activeTab === 'leads' ? (
                <div>
                  {/* Actions row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="text-xs text-slate-600">
                      Assunto Oficial de Envio: <span className="font-mono text-slate-900 font-semibold">{PROJECT_DETAILS.emailSubject}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={fetchLeads}
                        className="p-2 text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs flex items-center gap-1.5 transition"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                        <span>Atualizar</span>
                      </button>
                      <button
                        onClick={exportCSV}
                        disabled={leads.length === 0}
                        className="px-3 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Exportar CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Table or Empty State */}
                  {leads.length === 0 ? (
                    <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-200">
                      <Mail className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-700 font-medium">Nenhum lead cadastrado ainda nesta sessão.</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Preencha o formulário na página inicial para testar o envio para os dois e-mails.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-stone-200 bg-white">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-stone-50 text-slate-500 uppercase text-[10px] tracking-wider font-semibold border-b border-stone-200">
                          <tr>
                            <th className="p-3">Nome</th>
                            <th className="p-3">E-mail</th>
                            <th className="p-3">WhatsApp</th>
                            <th className="p-3">Interesse</th>
                            <th className="p-3">Data</th>
                            <th className="p-3 text-right">Ação</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 font-sans">
                          {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-stone-50 transition">
                              <td className="p-3 font-semibold text-slate-900 whitespace-nowrap">{lead.name}</td>
                              <td className="p-3 font-mono text-slate-600">{lead.email}</td>
                              <td className="p-3 font-mono text-amber-800 font-semibold whitespace-nowrap">{lead.whatsapp}</td>
                              <td className="p-3 text-slate-600">{lead.unitInterest}</td>
                              <td className="p-3 text-[11px] text-slate-400 font-mono whitespace-nowrap">
                                {new Date(lead.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleDirectWhatsapp(lead)}
                                  className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>WhatsApp</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Pixel configuration form */}
                  <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
                    <h4 className="font-bold text-sm text-slate-900 mb-1 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-amber-700" />
                      Configuração de Tags para Remarketing
                    </h4>
                    <p className="text-xs text-slate-500 mb-4">
                      Insira seus IDs reais para vincular às campanhas de tráfego pago (Meta Ads e Google Ads). O sistema já dispara automaticamente os eventos de conversão (Lead, Contact, ViewContent, SimulatorCompleted).
                    </p>

                    <form onSubmit={handleSavePixelConfig} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Meta Pixel ID (Facebook Ads)
                        </label>
                        <input
                          type="text"
                          value={pixelId}
                          onChange={(e) => setPixelId(e.target.value)}
                          placeholder="Ex: 123456789012345"
                          className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-amber-600 outline-none"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Dispara eventos: <strong>PageView, Lead, Contact, ViewContent</strong>
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Google Analytics 4 (Measurement ID)
                        </label>
                        <input
                          type="text"
                          value={gaId}
                          onChange={(e) => setGaId(e.target.value)}
                          placeholder="Ex: G-XXXXXXXXXX"
                          className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-amber-600 outline-none"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Dispara eventos: <strong>page_view, generate_lead, contact</strong>
                        </span>
                      </div>

                      <div className="sm:col-span-2 flex items-center justify-between pt-2">
                        <button
                          type="submit"
                          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-lg text-xs transition"
                        >
                          Salvar IDs de Rastreamento
                        </button>

                        {saveStatus && (
                          <span className="text-xs text-emerald-700 flex items-center gap-1 font-semibold">
                            <CheckCircle className="w-3.5 h-3.5" /> Configuração salva e ativa!
                          </span>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* Event audit trail */}
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-2">
                      Registro de Eventos Disparados em Tempo Real (Auditoria de Remarketing)
                    </h5>
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 max-h-56 overflow-y-auto space-y-2 text-xs font-mono">
                      {recentEvents.length === 0 ? (
                        <div className="text-slate-400 text-center py-4">Nenhum evento registrado ainda.</div>
                      ) : (
                        recentEvents.map((ev, idx) => (
                          <div key={idx} className="flex items-start justify-between border-b border-stone-200 pb-1.5 text-slate-700">
                            <div>
                              <span className="text-amber-800 font-semibold">{ev.event}</span>
                              <span className="text-slate-400 text-[10px] ml-2">({ev.type})</span>
                            </div>
                            <span className="text-slate-400 text-[10px]">{ev.time}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Footer info */}
            <div className="bg-stone-50 border-t border-stone-200 p-3 px-5 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Eliezio Corretor de Imóveis (CRECI-SP: 209.709) · Painel Protegido</span>
              <button onClick={onClose} className="hover:text-slate-900 underline">
                Fechar Painel
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
