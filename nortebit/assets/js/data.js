// Preços e catálogo de avarias da NorteBit (valores de referência, mão de obra).
// Os preços são atualizados a partir do Google Sheets quando a página abre.

export const DEFAULT_PRICES = [
  // DIAGNÓSTICO
  {
    id: 'diag-inicial',
    category: 'Diagnóstico',
    service: 'Diagnóstico Inicial (Grátis se orçamento aceite)',
    priceLabel: '15 €',
    priceValue: 15,
    description: 'Avaliação técnica completa da avaria em bancada. O valor é totalmente deduzido se avançar com a reparação.',
    badge: 'Grátis c/ Reparação'
  },

  // SOFTWARE
  {
    id: 'sw-format-simples',
    category: 'Software',
    service: 'Formatação Simples (S.O. + Drivers)',
    priceLabel: '35 €',
    priceValue: 35,
    description: 'Instalação limpa do Sistema Operativo (Windows / macOS / Linux), drivers oficiais atualizados e otimização.',
    badge: ''
  },
  {
    id: 'sw-format-backup',
    category: 'Software',
    service: 'Formatação Completa (com Backup)',
    priceLabel: '50 €',
    priceValue: 50,
    description: 'Cópia de segurança dos teus dados pessoais, formatação limpa, instalação de drivers e reposição dos ficheiros.',
    badge: 'Mais Pedido'
  },
  {
    id: 'sw-virus',
    category: 'Software',
    service: 'Limpeza de Vírus e Otimização',
    priceLabel: '30 €',
    priceValue: 30,
    description: 'Remoção profunda de vírus, malware, adware/pop-ups e aceleração do arranque e desempenho do sistema.',
    badge: ''
  },
  {
    id: 'sw-recuperacao',
    category: 'Software',
    service: 'Recuperação Lógica de Ficheiros',
    priceLabel: '45 €',
    priceValue: 45,
    description: 'Recuperação de documentos, fotografias e ficheiros apagados acidentalmente ou em discos/pens inacessíveis.',
    badge: ''
  },

  // MANUTENÇÃO PC / PORTÁTIL
  {
    id: 'man-torre',
    category: 'Manutenção PC',
    service: 'Limpeza Interna + Massa Térmica (Torre)',
    priceLabel: '30 €',
    priceValue: 30,
    description: 'Higienização interna completa de PC Desktop, limpeza de coolers/radiadores e aplicação de massa térmica de alta performance.',
    badge: ''
  },
  {
    id: 'man-portatil',
    category: 'Manutenção PC',
    service: 'Limpeza Interna + Massa Térmica (Portátil)',
    priceLabel: '40 €',
    priceValue: 40,
    description: 'Desmontagem, desobstrução do dissipador/ventoinha e substituição de massa térmica para eliminar aquecimento e ruído.',
    badge: 'Recomendado'
  },

  // HARDWARE
  {
    id: 'hw-componente',
    category: 'Hardware',
    service: 'Instalação de Componente',
    priceLabel: '15€ + Peça',
    priceValue: 15,
    description: 'Instalação física e configuração de Memória RAM, Placa Gráfica, Fonte de Alimentação, Disco ou Placa Wi-Fi.',
    badge: ''
  },
  {
    id: 'hw-ssd',
    category: 'Hardware',
    service: 'Upgrade para SSD com Clonagem',
    priceLabel: '35 €',
    priceValue: 35,
    description: 'Migração completa do sistema atual para um disco SSD ultrarrápido sem perderes programas, definições nem ficheiros.',
    badge: 'Top Upgrade'
  },
  {
    id: 'hw-montagem-pc',
    category: 'Hardware',
    service: 'Montagem Completa de PC Desktop',
    priceLabel: '50 €',
    priceValue: 50,
    description: 'Montagem cuidada de todas as peças, arrumação profissional de cabos (cable management) e testes de hardware.',
    badge: ''
  },
  {
    id: 'hw-montagem-so',
    category: 'Hardware',
    service: 'Montagem PC + Instalação de S.O.',
    priceLabel: '70 €',
    priceValue: 70,
    description: 'Montagem completa do PC Desktop, atualização de BIOS/XMP, instalação do Windows, drivers e testes de estabilidade.',
    badge: 'Chave na Mão'
  },
  {
    id: 'hw-ecra-teclado',
    category: 'Hardware',
    service: 'Substituição de Ecrã de Portátil',
    priceLabel: '35 €',
    priceValue: 35,
    description: 'Mão de obra para substituição de painel LCD/LED partido em portátil (peça orçamentada à parte).',
    badge: ''
  },
  {
    id: 'hw-teclado-touchpad',
    category: 'Hardware',
    service: 'Substituição de Teclado ou Touchpad de Portátil',
    priceLabel: 'Sob consulta (mão de obra + teclado)',
    priceValue: 0,
    description: 'Substituição de teclado ou touchpad danificado em portátil — valor de mão de obra e teclado sob consulta consoante o modelo.',
    badge: ''
  },
  {
    id: 'hw-dc-jack',
    category: 'Hardware',
    service: 'Substituição de DC Jack (Conector de Carga)',
    priceLabel: '45 €',
    priceValue: 45,
    description: 'Reparação ou substituição do conector de energia interno quando o portátil não carrega ou tem mau contacto no cabo.',
    badge: ''
  },

  // CONSOLAS & DESCODIFICAÇÃO
  {
    id: 'con-limpeza-ps4-xbox',
    category: 'Consolas',
    service: 'Limpeza Interna + Massa Térmica (PS4 / Xbox One)',
    priceLabel: '35 €',
    priceValue: 35,
    description: 'Desmontagem total, remoção de poeiras na fonte e dissipador e aplicação de massa térmica de topo (fim do ruído excessivo).',
    badge: 'Mais Pedido'
  },
  {
    id: 'con-limpeza-ps5-series',
    category: 'Consolas',
    service: 'Limpeza Interna + Metal Líquido / Massa (PS5 / Xbox Series X|S)',
    priceLabel: '45 €',
    priceValue: 45,
    description: 'Manutenção especializada de nova geração com correção/renovação segura de Metal Líquido (PS5) ou pasta térmica premium.',
    badge: 'Especialidade'
  },
  {
    id: 'con-limpeza-switch',
    category: 'Consolas',
    service: 'Limpeza Interna + Massa Térmica (Nintendo Switch / Portáteis)',
    priceLabel: '30 €',
    priceValue: 30,
    description: 'Limpeza interna, revisão de ventoinha silenciosa e renovação de pasta térmica para consolas portáteis.',
    badge: ''
  },
  {
    id: 'con-descod-sw',
    category: 'Consolas',
    service: 'Descodificação / Desbloqueio por Software (PS3, PS4, Wii, 3DS, Switch V1)',
    priceLabel: '35 €',
    priceValue: 35,
    description: 'Desbloqueio completo via software (CFW / HEN / Homebrew), configuração de armazenamento e otimização.',
    badge: 'Descodificação'
  },
  {
    id: 'con-descod-chip',
    category: 'Consolas',
    service: 'Descodificação por Modchip / RGH (Switch V2, Lite, OLED, Xbox 360)',
    priceLabel: '65 €',
    priceValue: 65,
    description: 'Instalação profissional com micro-soldadura de precisão para consolas que requerem chip físico + configuração completa.',
    badge: 'Micro-soldadura'
  },
  {
    id: 'con-comando',
    category: 'Consolas',
    service: 'Reparação de Comando (Drift Analógico / Botões)',
    priceLabel: '25 €',
    priceValue: 25,
    description: 'Correção definitiva de analógicos que mexem sozinhos (Stick Drift), botões R1/R2/LB/RB ou bateria em comandos PS4, PS5, Xbox e Joy-Con.',
    badge: ''
  },
  {
    id: 'con-hdmi-leitor',
    category: 'Consolas',
    service: 'Substituição de Porta HDMI / Leitor de Discos (Consolas)',
    priceLabel: '50 €',
    priceValue: 50,
    description: 'Substituição com micro-soldadura de porta HDMI partida (consola liga mas sem imagem na TV) ou reparação do leitor Blu-Ray.',
    badge: ''
  },

  // OUTROS
  {
    id: 'out-hora',
    category: 'Outros',
    service: 'Mão de Obra Horária (Ajustes / Consultoria)',
    priceLabel: '25 € / hora',
    priceValue: 25,
    description: 'Valor horário aplicável apenas a serviços avulsos, configuração de periféricos/redes ou pedidos extra.',
    badge: ''
  },
  {
    id: 'out-deslocacao',
    category: 'Outros',
    service: 'Deslocação ao Domicílio (Grande Porto)',
    priceLabel: '15 €',
    priceValue: 15,
    description: 'Recolha/entrega do equipamento ou assistência no domicílio na área do Grande Porto.',
    badge: ''
  },
  {
    id: 'out-urgencia',
    category: 'Outros',
    service: 'Taxa de Urgência (Serviço em 24h)',
    priceLabel: '+ 25 €',
    priceValue: 25,
    description: 'Atendimento prioritário expresso com diagnóstico e intervenção concluídos em até 24 horas.',
    badge: 'Expresso 24h'
  }
];

export const FAULT_CATALOG = [
  {
    categoryId: 'energia',
    categoryTitle: 'Energia e arranque',
    items: [
      {
        id: 'f-nao-liga',
        title: 'Não liga / Sem qualquer sinal de luz ou vida',
        sub: 'Carrego no botão de ligar e não acende LEDs nem roda ventoinhas',
        refPrice: 15,
        refLabel: 'Diagnóstico (15€ dedutível)'
      },
      {
        id: 'f-sem-imagem',
        title: 'Liga (acende luz/ventoinha) mas não dá imagem',
        sub: 'Ecrã fica totalmente preto ou o monitor/TV diz "Sem Sinal"',
        refPrice: 15,
        refLabel: 'Diagnóstico (15€ dedutível)'
      },
      {
        id: 'f-desliga-sozinho',
        title: 'Liga e desliga-se sozinho ou reinicia em loop',
        sub: 'Vai abaixo passado poucos segundos ou a meio da utilização',
        refPrice: 15,
        refLabel: 'Diagnóstico (15€ dedutível)'
      },
      {
        id: 'f-dc-jack',
        title: 'Portátil não carrega / Mau contacto na ficha (DC Jack)',
        sub: 'É preciso ajeitar o cabo do carregador para carregar ou a entrada está partida',
        refPrice: 45,
        refLabel: 'Ref: 45 €'
      },
      {
        id: 'f-bateria',
        title: 'Bateria viciada, inchada ou só funciona ligado à corrente',
        sub: 'Desliga-se mal tiro o carregador ou a bateria dura poucos minutos',
        refPrice: 15,
        refLabel: 'Ref: 15 € + Bateria'
      },
      {
        id: 'f-fonte-curto',
        title: 'Fonte de alimentação avariada / Cheiro a queimado / Estalido',
        sub: 'Suspeita de falha elétrica na fonte (PSU) ou curto-circuito após trovoada/pico',
        refPrice: 15,
        refLabel: 'Ref: 15 € + Peça'
      }
    ]
  },
  {
    categoryId: 'aquecimento',
    categoryTitle: 'Aquecimento e ruído',
    items: [
      {
        id: 'f-limpeza-portatil',
        title: 'Limpeza Interna + Mudança de Massa Térmica (Portátil)',
        sub: 'Portátil aquece muito, ventoinha sempre acelerada ou manutenção preventiva',
        refPrice: 40,
        refLabel: '40 €'
      },
      {
        id: 'f-limpeza-torre',
        title: 'Limpeza Interna + Mudança de Massa Térmica (PC Torre / Desktop)',
        sub: 'Remoção de pó acumulado, limpeza de coolers e massa térmica nova',
        refPrice: 30,
        refLabel: '30 €'
      },
      {
        id: 'f-barulho-ventoinha',
        title: 'Ventoinha a fazer barulho estranho (chiar, raspar ou vibrar)',
        sub: 'Cooler danificado, rolamento gasto ou obstruído com sujidade',
        refPrice: 35,
        refLabel: 'Ref: 30 € – 40 €'
      },
      {
        id: 'f-perda-fps-temp',
        title: 'Perda de desempenho (quedas de FPS) quando aquece',
        sub: 'O computador ou consola começa rápido mas fica lento passado 15 minutos (Thermal Throttling)',
        refPrice: 35,
        refLabel: 'Ref: 30 € – 45 €'
      }
    ]
  },
  {
    categoryId: 'software',
    categoryTitle: 'Sistema, vírus e dados',
    items: [
      {
        id: 'f-format-simples',
        title: 'Formatação Simples (Instalação de Windows/macOS + Drivers)',
        sub: 'Quero formatar o PC do zero (não preciso de guardar ficheiros antigos)',
        refPrice: 35,
        refLabel: '35 €'
      },
      {
        id: 'f-format-backup',
        title: 'Formatação Completa COM Backup de Ficheiros',
        sub: 'Guardar as minhas fotos/documentos, formatar o PC e voltar a colocar tudo no sítio',
        refPrice: 50,
        refLabel: '50 €'
      },
      {
        id: 'f-muito-lento',
        title: 'Computador muito lento a iniciar ou a abrir programas',
        sub: 'Demora imenso tempo a arrancar, bloqueia constantemente ou disco a 100%',
        refPrice: 30,
        refLabel: 'Ref: 30 € – 35 €'
      },
      {
        id: 'f-virus-malware',
        title: 'Limpeza de Vírus, Malware, Pop-ups ou Publicidade Intrusiva',
        sub: 'Janelas estranhas, navegador alterado, alertas falsos ou conta comprometida',
        refPrice: 30,
        refLabel: '30 €'
      },
      {
        id: 'f-ecra-azul',
        title: 'Ecrã Azul da Morte (BSOD) / Erros no arranque do Windows',
        sub: 'Aparece ecrã azul com código de erro ou fica preso em "Reparação Automática"',
        refPrice: 35,
        refLabel: 'Ref: 35 €'
      },
      {
        id: 'f-recuperacao-dados',
        title: 'Recuperação Lógica de Ficheiros / Disco Corrompido',
        sub: 'Apaguei ficheiros sem querer, o disco pede para formatar ou o PC já não arranca e preciso dos dados',
        refPrice: 45,
        refLabel: '45 €'
      }
    ]
  },
  {
    categoryId: 'hardware',
    categoryTitle: 'Ecrã, teclado, upgrades e montagem',
    items: [
      {
        id: 'f-upgrade-ssd',
        title: 'Upgrade para Disco SSD (com Clonagem do Sistema)',
        sub: 'Tornar o portátil/PC até 10x mais rápido mantendo tudo como está',
        refPrice: 35,
        refLabel: '35 € (+ SSD)'
      },
      {
        id: 'f-ecra-partido',
        title: 'Substituição de Ecrã de Portátil (Partido, Riscos ou Sem Luz)',
        sub: 'Vidro/LCD estalado, manchas pretas, linhas coloridas ou imagem muito escura',
        refPrice: 35,
        refLabel: '35 € (+ Ecrã)'
      },
      {
        id: 'f-teclado-touchpad',
        title: 'Substituição de Teclado ou Touchpad de Portátil',
        sub: 'Teclas que não escrevem, escrevem sozinhas ou teclas arrancadas',
        refPrice: 0,
        isConsult: true,
        refLabel: 'Sob consulta (mão de obra + teclado)'
      },
      {
        id: 'f-instalar-componente',
        title: 'Instalação de Componente (RAM, Placa Gráfica, Disco, Fonte, Cooler)',
        sub: 'Quero aumentar a Memória RAM ou instalar uma peça nova no meu computador',
        refPrice: 15,
        refLabel: '15€ + Peça'
      },
      {
        id: 'f-montagem-pc-so',
        title: 'Montagem Completa de PC Desktop + Instalação de Windows',
        sub: 'Tenho (ou vou comprar) as peças todas e quero o PC montado, configurado e pronto a jogar',
        refPrice: 70,
        refLabel: '70 €'
      },
      {
        id: 'f-montagem-pc-simples',
        title: 'Montagem Completa de PC Desktop (Apenas Hardware)',
        sub: 'Montagem profissional de todos os componentes na caixa e gestão de cabos',
        refPrice: 50,
        refLabel: '50 €'
      },
      {
        id: 'f-dobradicas-carcaca',
        title: 'Dobradiças Partidas / Carcaça a abrir ao fechar o portátil',
        sub: 'Plástico estalado junto ao ecrã ou tampa difícil de abrir/fechar',
        refPrice: 35,
        refLabel: 'Ref: 35 € – 45 €'
      },
      {
        id: 'f-portas-wifi-som',
        title: 'Portas USB / HDMI / Áudio avariadas ou Sem Wi-Fi / Bluetooth',
        sub: 'Entradas partidas, não deteta auscultadores/pens ou não apanha rede sem fios',
        refPrice: 25,
        refLabel: 'Ref: 15 € – 35 €'
      }
    ]
  },
  {
    categoryId: 'consolas',
    categoryTitle: 'Consolas e comandos',
    items: [
      {
        id: 'f-con-limpeza-ps4-xbox',
        title: 'Limpeza Interna + Massa Térmica (PS4 / PS4 Pro / Xbox One)',
        sub: 'Consola faz imenso barulho ("parece um avião"), aquece muito ou desliga-se em jogos',
        refPrice: 35,
        refLabel: '35 €'
      },
      {
        id: 'f-con-limpeza-ps5-series',
        title: 'Limpeza Interna + Metal Líquido / Massa Térmica (PS5 / Xbox Series X|S)',
        sub: 'Manutenção completa de nova geração com revisão segura do Metal Líquido (PS5)',
        refPrice: 45,
        refLabel: '45 €'
      },
      {
        id: 'f-con-limpeza-switch',
        title: 'Limpeza Interna + Massa Térmica (Nintendo Switch / Portáteis)',
        sub: 'Switch aquece demasiado ou a ventoinha faz ruído ao jogar',
        refPrice: 30,
        refLabel: '30 €'
      },
      {
        id: 'f-con-descod-software',
        title: 'Descodificação / Desbloqueio por Software (PS3, PS4, Switch V1, Wii, 3DS)',
        sub: 'Instalação de CFW / HEN / Homebrew para correr jogos a partir do disco/cartão SD e emuladores',
        refPrice: 35,
        refLabel: '35 €'
      },
      {
        id: 'f-con-descod-modchip',
        title: 'Descodificação por Modchip / RGH (Switch V2, Lite, OLED, Xbox 360)',
        sub: 'Desbloqueio avançado com instalação de chip (micro-soldadura) + configuração completa',
        refPrice: 65,
        refLabel: '65 €'
      },
      {
        id: 'f-con-comando-drift',
        title: 'Reparação de Comando (Drift nos Analógicos / Botões / Carregamento)',
        sub: 'O boneco ou a câmara mexe sozinha (Stick Drift), botões presos ou comando não carrega',
        refPrice: 25,
        refLabel: '25 €'
      },
      {
        id: 'f-con-hdmi',
        title: 'Substituição de Porta HDMI da Consola (Liga mas não dá imagem na TV)',
        sub: 'Ficha HDMI danificada/pinos tortos ou PS4/PS5 com luz branca/azul mas sem sinal de vídeo',
        refPrice: 50,
        refLabel: '50 €'
      },
      {
        id: 'f-con-leitor-discos',
        title: 'Consola não lê jogos em disco / Não puxa nem ejeta o disco',
        sub: 'Faz barulho ao tentar ler o Blu-Ray, dá "Disco não reconhecido" ou mecanismo preso',
        refPrice: 50,
        refLabel: 'Ref: 45 € – 50 €'
      },
      {
        id: 'f-con-erro-sistema',
        title: 'Erro de Sistema / Loop de Atualização / Upgrade de Disco em Consola',
        sub: 'Consola pede pen USB de reinstalação (Modo de Segurança) ou armazenamento avariado',
        refPrice: 35,
        refLabel: '35 €'
      }
    ]
  },
  {
    categoryId: 'outros',
    categoryTitle: 'Líquidos, quedas e outros',
    items: [
      {
        id: 'f-liquido',
        title: 'Caiu líquido no equipamento (Água, Café, Sumo, etc.)',
        sub: 'Necessita de banho químico urgente de desoxidação na motherboard e limpeza eletrónica',
        refPrice: 40,
        refLabel: 'Prioritário (Sob Diagnóstico)',
        isLiquid: true
      },
      {
        id: 'f-queda',
        title: 'Sofreu uma queda ou pancada física',
        sub: 'Ficou com mau funcionamento ou danos visíveis após cair ao chão',
        refPrice: 15,
        refLabel: 'Diagnóstico (15€ dedutível)'
      },
      {
        id: 'f-diagnostico-duvida',
        title: 'Não tenho a certeza da avaria — Quero Diagnóstico Inicial',
        sub: 'Quero que a NorteBit avalie o equipamento e me dê o orçamento exato (15 € grátis se aceitar)',
        refPrice: 15,
        refLabel: '15 € (Grátis c/ Reparação)'
      },
      {
        id: 'f-outro-problema',
        title: 'Outro problema ou pedido personalizado (Descrever nas notas abaixo)',
        sub: 'Qualquer outra avaria ou configuração que não esteja listada acima',
        refPrice: 25,
        refLabel: 'Sob Orçamento'
      }
    ]
  }
];
