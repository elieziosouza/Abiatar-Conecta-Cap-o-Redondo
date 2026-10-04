// Vercel Serverless Function for /api/leads
export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { name, email, whatsapp, unitInterest, fgtsInterest } = req.body || {};

    if (!name || !email || !whatsapp) {
      return res.status(400).json({ error: 'Nome, E-mail e WhatsApp são obrigatórios.' });
    }

    try {
      // Forward to FormSubmit to notify both emails
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
          'Nome': name,
          'E-mail': email,
          'WhatsApp': whatsapp,
          'Interesse': unitInterest || '2 Dormitórios Standard',
          'Usa FGTS': fgtsInterest ? 'Sim' : 'Não',
          'Data': new Date().toLocaleString('pt-BR')
        })
      });
    } catch (err) {
      console.warn('FormSubmit backup forward failed:', err);
    }

    return res.status(200).json({
      success: true,
      message: 'Lead registrado com sucesso!',
      lead: {
        name,
        email,
        whatsapp,
        unitInterest,
        fgtsInterest,
        timestamp: new Date().toISOString()
      },
      dispatch: {
        recipients: ['eliezio.consultor1@gmail.com', 'apnislopes@gmail.com'],
        subject: 'NOVO LEAD ABIATAR CONECTA'
      }
    });
  }

  return res.status(200).json({
    status: 'online',
    project: 'Abiatar Conecta',
    targetEmails: ['eliezio.consultor1@gmail.com', 'apnislopes@gmail.com'],
    subject: 'NOVO LEAD ABIATAR CONECTA'
  });
}
