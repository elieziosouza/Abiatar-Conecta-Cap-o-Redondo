export interface Amenity {
  id: string;
  name: string;
  category: 'aquatico' | 'bem-estar' | 'social' | 'comodidade';
  description: string;
}

export interface FloorPlan {
  id: string;
  name: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  highlight: string;
  description: string;
  features: string[];
}

export const PROJECT_DETAILS = {
  name: 'Abiatar Conecta',
  tagline: 'O seu novo endereço conectado com o melhor de São Paulo',
  location: 'Capão Redondo, Zona Sul - São Paulo/SP',
  subwayDistance: '5 minutos a pé da Estação Capão Redondo (Linha 5-Lilás)',
  towers: 3,
  totalUnits: 607,
  typologies: '2 Dormitórios (Opções com Suíte e Giardino)',
  privateAreaRange: '34,99 m² a 65,27 m²',
  amenitiesCount: 'Mais de 50 itens de lazer em 3 pavimentos',
  developer: 'Abiatar Construtora e Incorporadora',
  developerExperience: 'Mais de 18 anos de mercado imobiliário',
  programs: ['Minha Casa Minha Vida', 'FGTS', 'Entrada Parcelada'],
  deliveryEstimate: 'Março de 2030',
  launchDate: 'Lançamento Exclusivo',
  leadNotificationEmails: ['eliezio.consultor1@gmail.com', 'apnislopes@gmail.com'],
  emailSubject: 'NOVO LEAD ABIATAR CONECTA',
  defaultWhatsappNumber: '5511971118620', // Format for WhatsApp link
  displayWhatsappNumber: '(11) 97111-8620' // Formatted for visual display
};

export const AMENITIES_LIST: Amenity[] = [
  // Aquático & Solarium
  { id: '1', name: 'Piscina Adulto com Raia', category: 'aquatico', description: 'Ampla piscina com orientação solar privilegiada.' },
  { id: '2', name: 'Piscina Infantil Segura', category: 'aquatico', description: 'Área com profundidade ideal para os pequenos se divertirem.' },
  { id: '3', name: 'Deck Molhado com Espreguiçadeiras', category: 'aquatico', description: 'Espaço lounge com cadeiras semi-submersas para relaxar.' },
  { id: '4', name: 'Solarium Integrado', category: 'aquatico', description: 'Deck de madeira nobre para banho de sol e descanso.' },
  { id: '5', name: 'Ducha e Vestiários Aquáticos', category: 'aquatico', description: 'Infraestrutura completa de apoio às piscinas.' },

  // Bem-Estar & Saúde
  { id: '6', name: 'Academia Fitness Completa', category: 'bem-estar', description: 'Equipamentos modernos de cardio e musculação profissional.' },
  { id: '7', name: 'Espaço Funcional & Cross Outdoor', category: 'bem-estar', description: 'Área ao ar livre para treinos funcionais e calistenia.' },
  { id: '8', name: 'Pista de Caminhada Interna', category: 'bem-estar', description: 'Circuito arborizado e seguro para caminhadas diárias.' },
  { id: '9', name: 'Praça de Alongamento & Yoga', category: 'bem-estar', description: 'Espaço zen cercado por paisagismo tropical nativo.' },
  { id: '10', name: 'Quadra Recreativa', category: 'bem-estar', description: 'Quadra poliesportiva para futebol, basquete e vôlei.' },

  // Social & Celebração
  { id: '11', name: 'Espaço Gourmet Climatizado', category: 'social', description: 'Ambiente requintado para jantares e encontros especiais.' },
  { id: '12', name: '2 Churrasqueiras com Forno de Pizza', category: 'social', description: 'Áreas cobertas e privativas para confraternizações.' },
  { id: '13', name: 'Salão de Festas Principal', category: 'social', description: 'Capacidade confortável com copa de apoio e lounge.' },
  { id: '14', name: 'Salão de Jogos Multigeracional', category: 'social', description: 'Mesa de bilhar, pebolim, cartas e games.' },
  { id: '15', name: 'Lounge Fire Pit ao Ar Livre', category: 'social', description: 'Praça da lareira para noites aconchegantes com amigos.' },
  { id: '16', name: 'Brinquedoteca Temática', category: 'social', description: 'Espaço lúdico, seguro e acolhedor para as crianças.' },
  { id: '17', name: 'Playground Aventura', category: 'social', description: 'Brinquedos ao ar livre com piso emborrachado e anti-impacto.' },

  // Comodidade & Conexão
  { id: '18', name: 'Coworking com Cabines Privativas', category: 'comodidade', description: 'Home office profissional, Wi-Fi veloz e sala de reuniões.' },
  { id: '19', name: 'Pet Place & Agility', category: 'comodidade', description: 'Área cercada com circuito de treinamento para seu pet.' },
  { id: '20', name: 'Pet Care Equipado', category: 'comodidade', description: 'Espaço para banho e tosa sem sujar seu apartamento.' },
  { id: '21', name: 'Mini Market 24 Horas', category: 'comodidade', description: 'Mercadinho autônomo dentro do condomínio para compras rápidas.' },
  { id: '22', name: 'Bicicletário com Ponto de Recarga e Oficina', category: 'comodidade', description: 'Guarda segura e ferramentas para manutenção de bikes.' },
  { id: '23', name: 'Delivery Center com Lockers Inteligentes', category: 'comodidade', description: 'Armazenamento seguro de encomendas e compras online.' },
  { id: '24', name: 'Portaria Blindada com Controle de Acesso Facial', category: 'comodidade', description: 'Segurança 24h e monitoramento CFTV de última geração.' }
];

export const FLOOR_PLANS: FloorPlan[] = [
  {
    id: 'standard-35',
    name: 'Planta Smart Conecta',
    area: '34,99 m²',
    bedrooms: 2,
    bathrooms: 1,
    highlight: 'Ideal para 1º Imóvel ou Investimento',
    description: 'Planta otimizada sem corredores perdidos, living integrado com cozinha americana e dormitórios bem iluminados.',
    features: ['Cozinha e living integrados', 'Janelas amplas com ventilação natural', 'Ponto para ar-condicionado', 'Piso laminado entregue nos quartos']
  },
  {
    id: 'classic-42',
    name: 'Planta Confort',
    area: '42,50 m²',
    bedrooms: 2,
    bathrooms: 1,
    highlight: 'Varanda Ampla e Sala em 2 Ambientes',
    description: 'Conforto equilibrado com varanda espaçosa para relaxar após o trabalho e área social perfeita para receber.',
    features: ['Varanda com vista aberta', 'Sala de jantar e estar definidas', 'Banheiro com ventilação natural', 'Espaço planejado para home office']
  },
  {
    id: 'suite-48',
    name: 'Planta Master com Suíte',
    area: '48,20 m²',
    bedrooms: 2,
    bathrooms: 2,
    highlight: 'Suíte Casal Privativa + Varanda Grill',
    description: 'A sofisticação de ter uma suíte exclusiva para o casal, 2 banheiros completos e infraestrutura para varanda grill.',
    features: ['Suíte master com closet', '2 banheiros completos', 'Ponto grill na varanda', 'Cozinha linear com bancada estendida']
  },
  {
    id: 'giardino-65',
    name: 'Planta Giardino Garden',
    area: '65,27 m²',
    bedrooms: 2,
    bathrooms: 1,
    highlight: 'Quintal Privativo e Espaço ao Ar Livre',
    description: 'A sensação de morar em uma casa com a segurança de um condomínio fechado. Quintal privativo perfeito para pets e plantas.',
    features: ['Quintal privativo gramado e descoberto', 'Área gourmet privativa ao ar livre', 'Espaço para horta ou deck', 'Total liberdade para seus animais de estimação']
  }
];

export const LOCATION_HIGHLIGHTS = [
  {
    time: '5 min a pé',
    place: 'Estação Capão Redondo (Metrô Linha 5-Lilás)',
    description: 'Acesso expresso a Santo Amaro, Moema, Vila Mariana e Paulista sem trânsito.'
  },
  {
    time: '4 min',
    place: 'Parque Santo Dias',
    description: 'Bosques de mata atlântica, pistas de cooper, quadras e ar puro ao lado de casa.'
  },
  {
    time: '8 min',
    place: 'Shopping Campo Limpo & Cinemark',
    description: 'Lojas âncoras, praça de alimentação completa, cinemas e supermercado.'
  },
  {
    time: '3 min',
    place: 'Hospital Municipal Campo Limpo & Postos',
    description: 'Saúde e pronto atendimento médico a poucos minutos da sua residência.'
  },
  {
    time: '2 min',
    place: 'Rede de Comércio da Estrada de Itapecerica',
    description: 'Bancos (Itaú, Bradesco, Caixa), drogarias, padarias tradicionais e escolas.'
  }
];
