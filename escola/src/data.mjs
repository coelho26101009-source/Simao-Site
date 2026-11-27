// Todo o conteúdo do site do Agrupamento de Escolas Tomaz Pelayo.
// As ligações apontam para o site atual (home.tomazpelayo.com) e para os sites de cada serviço.

export const O = "https://home.tomazpelayo.com";
const l = (label, href) => ({ label, href });

export const site = {
  name: "Agrupamento de Escolas Tomaz Pelayo",
  city: "Santo Tirso",
  lead:
    "O Agrupamento de Escolas Tomaz Pelayo proporciona oferta formativa para o ensino secundário, profissional, básico (1º, 2º e 3º ciclo), pré-escolar e educação de adultos.",
  facebook: "https://www.facebook.com/Agrupamento-de-Escolas-Tomaz-Pelayo-101204378608580",
  facebook2: "https://www.facebook.com/Aetpface",
  instagram: "https://www.instagram.com/agrupamentotomazpelayo/",
  login: O + "/wp-login.php",
  search: O + "/",
  phone: "+351 252 852 356",
  phoneHref: "tel:+351252852356",
  address: ["Rua Dr. Fernando Pires de Lima", "4780-531 Santo Tirso"],
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Rua+Dr.+Fernando+Pires+de+Lima%2C+4780-531+Santo+Tirso",
  hours: "2ª a 6ª feira das 9h15 às 16h30",
  privacy: O + "/politica-de-privacidade/",
  contacts: O + "/contatos/",
};

// Menu principal (os mesmos grupos e ligações do site atual).
export const menu = [
  {
    label: "Notícias",
    groups: [
      {
        items: [
          l("Últimas Notícias", O + "/noticias/"),
          l("Atividades", O + "/atividades/"),
          l("Ofícios e Circulares", O + "/oficios-e-circulares/"),
          l("Mostra 2026", "https://mostra.tomazpelayo.com/"),
        ],
      },
    ],
  },
  {
    label: "Agrupamento",
    groups: [
      {
        title: "ESTP",
        items: [
          l("Arqueologia", O + "/agrupamento-de-escolas-tomaz-pelayo-santo-tirso/arqueologia/"),
          l("Origens da Escola", O + "/agrupamento-de-escolas-tomaz-pelayo-santo-tirso/origens/"),
          l("Patrono Tomaz Pelayo", O + "/agrupamento-de-escolas-tomaz-pelayo-santo-tirso/patrono-tomaz-pelayo/"),
        ],
      },
      {
        title: "Administração e Gestão",
        items: [
          l("Conselho Geral", O + "/agrupamento-de-escolas-tomaz-pelayo-santo-tirso/conselho-geral/"),
          l("Direção", O + "/direcao/"),
          l("Conselho Pedagógico", O + "/agrupamento-de-escolas-tomaz-pelayo-santo-tirso/elementos-c-pedagogico/"),
          l("Conselho Administrativo", O + "/agrupamento-de-escolas-tomaz-pelayo-santo-tirso/conselho-administrativo/"),
          l("Coordenadores Estabelecimento", O + "/agrupamento-de-escolas-tomaz-pelayo-santo-tirso/coordenadores-de-estabelecimento/"),
          l("DPO/EPD", O + "/agrupamento-de-escolas-tomaz-pelayo-santo-tirso/rgpd2018/"),
        ],
      },
      {
        title: "Organização Pedagógica",
        items: [
          l("EMAEI", "https://sites.google.com/tomazpelayo.com/emaei/p%C3%A1gina-inicial"),
          l("EQAVET", "http://home.tomazpelayo.com/quadro-eqavet/"),
          l("Departamentos Curriculares", O + "/departamentos-curriculares/"),
          l("Coordenação dos Diretores de Turma", O + "/agrupamento-de-escolas-tomaz-pelayo-santo-tirso/conselho-dos-directores-de-turma/"),
          l("S.O.V.A.S", O + "/servico-de-orientacao-vocacional-e-apoio-socioeducativo/"),
          l("Centro Qualifica", O + "/agrupamento-de-escolas-tomaz-pelayo-santo-tirso/cqualifica/"),
          l("VET CHARTER", O + "/erasmus-leen-p00/vet-mc-2020/"),
        ],
      },
      {
        title: "Documentos de Autonomia",
        items: [
          l("Projeto Educativo do Agrupamento", O + "/informacoes/PEA%20-%20VF_2024.pdf"),
          l("Regulamento Interno", O + "/informacoes24/RI_CGeral_25_novembro_2025.pdf"),
          l("Plano Anual de Atividades", O + "/informacoes/Relat%C3%B3rio%20PAA%20vf%20(3).pdf"),
          l("Relatório Final EAA", "http://home.tomazpelayo.com/wp-content/uploads/2010/12/RF-EEA1415.pdf"),
          l("Relatório da Avaliação Externa", "http://home.tomazpelayo.com/wp-content/uploads/2010/12/AEE_2016_AE_Tomaz_Pelayo_R_Homologado.pdf"),
          l("Plano de Melhoria", "http://home.tomazpelayo.com/wp-content/uploads/2010/12/Planomelhoria2016.pdf"),
          l("PADDE", "http://home.tomazpelayo.com/wp-content/uploads/2022/04/PADDE-AETP-23-07-2021.pdf"),
        ],
      },
    ],
  },
  {
    label: "Serviços",
    groups: [
      {
        items: [
          l("Serviços Administrativos", O + "/secretaria/"),
          l("Serviço Bufete", O + "/secretaria/bar-professores/"),
          l("Refeitório Escolar", O + "/secretaria/cantina/"),
          l("Papelaria/Reprografia", O + "/secretaria/reprografia/"),
          l("Sala de Estudo", O + "/secretaria/sala-de-estudo/"),
          l("SPO", O + "/secretaria/servicos-psicologia-e-orientacao/"),
          l("Gabinete de Gestão Disciplinar", O + "/secretaria/gestdisciplinar/"),
          l("Oficinas/Clubes", O + "/secretaria/oficinasclubes/"),
        ],
      },
      {
        title: "Documentos",
        items: [l("Manuais 2024-2025", O + "/manuais-2024-2025/"), l("Exames", O + "/exames/"), l("MENAC", O + "/menac/")],
      },
    ],
  },
  {
    label: "Acessos",
    groups: [
      {
        items: [
          l("GIAE Online", "https://aetpst.giae.pt/"),
          l("Escola Digital", "https://escoladigital.tomazpelayo.com/"),
          l("Moodle", "http://aetp.sytes.net/moodle/"),
          l("Centro Qualifica", "https://qualifica.tomazpelayo.com/"),
          l("Biblioteca", "https://bibliotecasaetp.blogspot.com/"),
          l("Clubes Ciência Viva", O + "/clubes-ciencia-viva-no-agrupamento-de-escolas/"),
        ],
      },
    ],
  },
  { label: "Associação de Pais", href: O + "/associacao-de-pais/" },
  { label: "Contactos", href: O + "/contatos/" },
];

export const preinscricao = l("Pré-Inscrição 2026/2027", O + "/pre-inscricao/");

// Atalhos de destaque (os ícones são desenhados em template.mjs).
export const shortcuts = [
  { label: "Ano Letivo 2026/2027", href: O + "/ano-letivo-20262027/", icon: "calendar" },
  { label: "SIGA / INOVAR / SIGE3 / GIAE", href: "http://home.tomazpelayo.com/siga-sige3-giae/", icon: "grid" },
  { label: "Oferta Formativa 2026-2027", href: "http://home.tomazpelayo.com/oferta-formativa", icon: "book" },
  { label: "Exames 2026", href: "http://home.tomazpelayo.com/exames/", icon: "pencil" },
  { label: "Contratação OE 2026-2027", href: O + "/contratacao-em-oferta-de-escolas-2026-2027/", icon: "briefcase" },
  { label: "Ano Letivo 2025-2026", href: "http://home.tomazpelayo.com/ano-letivo-2025-2026/", icon: "archive" },
  { label: "Estação Meteorológica", href: "https://www.wunderground.com/dashboard/pws/ISANTO338", icon: "cloud" },
  { label: "Download de dados", href: "https://tomaz-ws-data-download.onrender.com/", icon: "download" },
];

// Atalhos para plataformas de uso diário.
export const access = [
  { label: "GIAE Online", note: "Gestão escolar", href: "https://aetpst.giae.pt/" },
  { label: "Escola Digital", note: "Recursos digitais", href: "https://escoladigital.tomazpelayo.com/" },
  { label: "Moodle", note: "Plataforma de aprendizagem", href: "http://aetp.sytes.net/moodle/" },
  { label: "Biblioteca", note: "Bibliotecas do agrupamento", href: "https://bibliotecasaetp.blogspot.com/" },
  { label: "Clubes Ciência Viva", note: "Ciência no agrupamento", href: O + "/clubes-ciencia-viva-no-agrupamento-de-escolas/" },
  { label: "Associação de Pais", note: "APEEESTP", href: O + "/associacao-de-pais/" },
];

export const news = [
  {
    title: "Campanha de Recolha de Bens da APEEESTP",
    date: "27 de Novembro, 2026",
    text: "A solidariedade começa com pequenos gestos! A Associação de Pais e Encarregados de Educação da…",
    href: O + "/campanha-natal-2026-apeeestp/",
    img: "news-natal", w: 640, h: 853, alt: "Cartaz da campanha Sê o Pai Natal de alguém este ano",
  },
  {
    title: "Encerramento das Escolas",
    date: "10 de Novembro, 2026",
    text: "Na sequência da publicação do Despacho n.º 13773-A/2026, de 10 de novembro, que declara a…",
    href: O + "/encerramento/",
    img: "escola", w: 1200, h: 539, alt: "Edifício da Escola Secundária Tomaz Pelayo",
  },
  {
    title: "Convocatória para a Assembleia Geral da APEEESTP",
    date: "6 de Novembro, 2026",
    text: "",
    href: O + "/convocatoria-para-a-assembleia-geral-da-apeeestp-2026/",
    img: "logo-apeeestp", w: 600, h: 321, alt: "Logótipo da APEEESTP", contain: true,
  },
  {
    title: "Tomada de posse do Diretor do Agrupamento",
    date: "30 de Junho, 2026",
    text: "O Presidente do Conselho Geral do Agrupamento de Escolas Tomaz Pelayo, Álvaro Jorge Campos Serrão…",
    href: O + "/tomada-de-posse-do-diretor-do-agrupamento-2026/",
    img: "news-posse", w: 720, h: 444, alt: "Convite para a tomada de posse do Diretor",
  },
  {
    title: "Procedimento de Recrutamento Externo para Professor Bibliotecário",
    date: "26 de Junho, 2026",
    text: "Procedimento de Recrutamento Externo para Professor Bibliotecário no Agrupamento de Escolas Tomaz Pelayo para o…",
    href: O + "/procedimento-de-recrutamento-externo-para-professor-bibliotecario-2026/",
  },
  {
    title: "Procedimentos Concursais",
    date: "26 de Maio, 2026",
    text: "Procedimento concursal comum para o preenchimento de 1 (um) posto de trabalho no Agrupamento de…",
    href: O + "/procedimentos-concursais-2026/",
    img: "news-bep", w: 143, h: 99, alt: "Logótipo da Bolsa de Emprego Público", contain: true,
  },
  {
    title: "Selo Escola Saudável",
    date: "21 de Maio, 2026",
    text: "O Agrupamento de Escolas Tomaz Pelayo, Santo Tirso foi distinguido com o Selo de Escola…",
    href: O + "/selo-escola-saudavel-2026/",
    img: "logo-escola-saudavel", w: 700, h: 419, alt: "Selo Escola Saudável 2026", contain: true,
  },
  {
    title: "Páscoa Feliz",
    date: "1 de Abril, 2026",
    text: "A Direção do Agrupamento de Escolas Tomaz Pelayo, deseja a toda a comunidade educativa os…",
    href: O + "/pascoa-feliz-2026/",
  },
];

export const ranking = {
  title: "Ranking das Escolas 2024",
  text:
    "A Direção do Agrupamento de Escolas Tomaz Pelayo felicita os alunos, os professores, os pais e encarregados de educação, o pessoal não docente pela prestação nos exames nacionais de 2024, cujos rankings colocam a Escola Secundária Tomaz Pelayo entre as melhores escolas públicas a nível nacional.",
  places: [
    { n: "11º", label: "no Ranking Público", href: "https://www.publico.pt/ranking-escolas/lugar-sua-escola#-escola-sec-659" },
    { n: "35º", label: "no Ranking Expresso", href: "https://expresso.pt/ranking-das-escolas/2024" },
    { n: "47º", label: "no Ranking JN", href: "https://www.jn.pt/8095232459/saiba-em-que-lugar-ficou-a-sua-escola-no-ranking-2025/" },
  ],
  media: l("A Tomaz Pelayo nos Media", "http://home.tomazpelayo.com/wp-content/uploads/2025/04/Ranking-das-Escolas-2024-Expresso-JN.pdf"),
  page: l("Todos os rankings", O + "/ranking-das-escolas-2024/"),
};

// Projetos, programas e parceiros, com o logótipo de cada um.
export const partners = [
  { name: "Equipa de Autoavaliação", note: "EAA · AETP", img: "logo-eaa", w: 450, h: 197, href: "https://eaa.tomazpelayo.com/" },
  { name: "Pessoas 2030", note: "Operação de importância estratégica", img: "logo-pessoas2030-selo", w: 229, h: 220, href: O + "/pessoas2030/" },
  { name: "Centros Tecnológicos Especializados", note: "CTE", img: "logo-cte", w: 150, h: 150, href: O + "/cte/" },
  { name: "EQAVET", note: "Selo de conformidade", img: "logo-eqavet", w: 300, h: 131, href: "http://home.tomazpelayo.com/quadro-eqavet/" },
  { name: "Erasmus+", note: "Educação e Formação", img: "logo-erasmus", w: 210, h: 102, href: "https://erasmus.tomazpelayo.com/" },
  { name: "Educação para a Cidadania", note: "Agrupamento de Escolas Tomaz Pelayo", img: "logo-cidadania", w: 300, h: 132, href: "https://cidadania99.wixsite.com/educidadania" },
  { name: "Selo Escola Saudável", note: "2026", img: "logo-escola-saudavel", w: 700, h: 419, href: O + "/selo-escola-saudavel-2026/" },
  { name: "Associação de Pais", note: "APEEESTP", img: "logo-apeeestp", w: 600, h: 321, href: O + "/associacao-de-pais/" },
  { name: "Programa QUALIFICA", note: "Centro Qualifica", href: O + "/agrupamento-de-escolas-tomaz-pelayo-santo-tirso/cqualifica/", text: "Q" },
];

export const formation = ["Pré-escolar", "1º ciclo", "2º ciclo", "3º ciclo", "Ensino secundário", "Ensino profissional", "Educação de adultos"];
