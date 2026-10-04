import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// File storage for captured leads
const LEADS_FILE = path.join(__dirname, 'leads.json');

interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  unitInterest?: string;
  fgtsInterest?: boolean;
  notes?: string;
  timestamp: string;
  sentTo: string[];
}

function getLeads(): Lead[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const data = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading leads file:', err);
  }
  return [];
}

function saveLead(lead: Lead) {
  try {
    const leads = getLeads();
    leads.unshift(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving lead:', err);
  }
}

// Target emails as requested by user
const TARGET_EMAILS = [
  'eliezio.consultor1@gmail.com',
  'apnislopes@gmail.com'
];
const EMAIL_SUBJECT = 'NOVO LEAD ABIATAR CONECTA';

// API route to capture and send lead
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, whatsapp, unitInterest, fgtsInterest, notes } = req.body;

    if (!name || !email || !whatsapp) {
      return res.status(400).json({
        success: false,
        message: 'Nome, E-mail e Whatsapp são obrigatórios.'
      });
    }

    const newLead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      whatsapp: String(whatsapp).trim(),
      unitInterest: unitInterest || 'Apartamento 2 Dormitórios',
      fgtsInterest: !!fgtsInterest,
      notes: notes || '',
      timestamp: new Date().toISOString(),
      sentTo: TARGET_EMAILS
    };

    // Save locally
    saveLead(newLead);

    // Send notifications to the 2 specified emails:
    // eliezio.consultor1@gmail.com & apnislopes@gmail.com
    // with Subject: NOVO LEAD ABIATAR CONECTA
    let emailDispatchSuccess = false;
    let dispatchDetails = '';

    try {
      // Dispatch via FormSubmit AJAX service without credentials requirement
      // Formsubmit accepts multiple recipients or primary + _cc
      const formSubmitResponse = await fetch('https://formsubmit.co/ajax/eliezio.consultor1@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: EMAIL_SUBJECT,
          _cc: 'apnislopes@gmail.com',
          _template: 'table',
          'Empreendimento': 'Abiatar Conecta (Capão Redondo - Zona Sul/SP)',
          'Nome do Cliente': newLead.name,
          'E-mail': newLead.email,
          'WhatsApp': newLead.whatsapp,
          'Interesse': newLead.unitInterest,
          'Uso do FGTS/MCMV': newLead.fgtsInterest ? 'Sim' : 'Não informado',
          'Observações': newLead.notes || 'Lead cadastrado via Landing Page Oficial',
          'Data e Hora': new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        })
      });

      if (formSubmitResponse.ok) {
        emailDispatchSuccess = true;
        dispatchDetails = 'Notificação enviada com sucesso para eliezio.consultor1@gmail.com e apnislopes@gmail.com';
      } else {
        const text = await formSubmitResponse.text();
        console.warn('FormSubmit responded with non-200:', text);
        dispatchDetails = 'Lead gravado com sucesso; notificação despachada.';
      }
    } catch (dispatchErr) {
      console.warn('External email dispatch error (lead safely stored):', dispatchErr);
      dispatchDetails = 'Lead armazenado no sistema.';
    }

    return res.status(200).json({
      success: true,
      message: 'Lead registrado com sucesso!',
      leadId: newLead.id,
      dispatch: {
        recipients: TARGET_EMAILS,
        subject: EMAIL_SUBJECT,
        status: emailDispatchSuccess ? 'sent' : 'stored'
      }
    });
  } catch (error: any) {
    console.error('Lead submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao processar lead.'
    });
  }
});

// Route to get leads (for Eliezio and APNIS Lopes admin review)
app.get('/api/leads', (_req, res) => {
  const leads = getLeads();
  return res.json({
    total: leads.length,
    targetEmails: TARGET_EMAILS,
    subject: EMAIL_SUBJECT,
    leads
  });
});

// Setup Vite middleware in dev or static serve in prod
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
