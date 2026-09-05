/**
 * TUDO que você pode editar neste presente.
 *
 * ─────────────────────────────────────────
 * FOTOS (5 imagens)
 * 1. Substitua os arquivos em public/images/
 *    foto1.jpg  → vocês dois
 *    foto2.jpg  → vocês dois
 *    foto3.jpg  → ela
 *    foto4.jpg  → você
 *    foto5.jpg  → o que ainda vão viver
 * 2. Ajuste as legendas em `photos` abaixo.
 *    (memoria.jpg é usada só como fragmento visual — opcional)
 *
 * MÚSICA
 * 1. Coloque um arquivo que você tenha direito de usar em:
 *    public/audio/musica.mp3
 * 2. Preencha song.src com "/audio/musica.mp3"
 * 3. Ajuste title e artist.
 *    Sugestão de tom: piano lento, intimista, sem vocal comercial.
 *
 * SENHA
 * O valor de `password` não aparece na tela.
 * Aceita 22/11/2011, 22-11-2011 ou 22112011.
 */

export const relationshipConfig = {
  myName: "Eduardo",
  partnerName: "Rhanna",
  relationshipDate: "2026-08-05",
  relationshipDateLabel: "05.08.2026",
  anniversary: "2 meses",
  password: "22/11/2011",
  distance: "Rio de Janeiro, RJ → Cristal, RS",
  fromCity: "Rio de Janeiro",
  fromState: "RJ",
  toCity: "Cristal",
  toState: "RS",
  phrase:
    "Entre nós, o mapa mede quilômetros. Entre os corações, a escolha já foi feita.",
  futurePromise:
    "Viver juntos pelo resto da vida e construir uma linda família.",
  howWeMet: "Através de um amigo.",
  song: {
    title: "Nossa música",
    artist: "Adicione o arquivo em public/audio",
    src: "",
  },
  photos: [
    { src: "/images/foto1.jpg", caption: "Nós." },
    { src: "/images/foto2.jpg", caption: "Um momento que ficou." },
    { src: "/images/foto3.jpg", caption: "Você." },
    { src: "/images/foto4.jpg", caption: "Eu." },
    { src: "/images/foto5.jpg", caption: "E tudo que ainda vamos viver." },
  ],
  memoryStill: "/images/memoria.jpg",
  copy: {
    lockKicker: "Existe um lugar aqui que só pertence a você.",
    lockAsk: "Mas antes de entrar, preciso saber se é realmente você.",
    lockEnter: "Entrar",
    lockError: "Esse lugar não é para qualquer pessoa.",
    lockSuccess: "Eu sabia que era você.",
    intro: [
      "Rhanna...",
      "Eu poderia simplesmente te desejar feliz aniversário de namoro.",
      "Mas você nunca foi simplesmente alguém para mim.",
      "Então eu fiz um lugar.",
      "Um lugar onde dois meses cabem em alguns minutos.",
    ],
    introCta: "Entrar no nosso lugar.",
    beginningLead: "Foi aqui que começou.",
    beginning: [
      "Um amigo foi o acaso.",
      "Você foi a escolha.",
      "E desde então, algumas conversas passaram a significar mais do que deveriam.",
    ],
    counterTitle: "E enquanto você olha isso...",
    counterAfter: "nosso tempo continua aumentando.",
    monthsLead: "2 meses.",
    months: [
      "Parece pouco quando escrito.",
      "Mas quando penso em tudo que aconteceu nesse tempo...",
      "parece impossível colocar tudo em uma data.",
    ],
    monthFragments: ["o jeito", "as conversas", "ficar", "você", "nós"],
    talksLead: "Nossas conversas",
    talks: [
      "Conversas que começaram simples.",
      "Conversas que ficaram marcantes.",
      "Conversas que fizeram a distância parecer menor.",
    ],
    love: [
      "Eu amo o seu jeito.",
      "Não porque eu consiga explicar exatamente o que existe nele.",
      "Mas porque existe algo em você que simplesmente me faz querer ficar.",
      "E talvez seja isso que mais me prende...",
      "A forma como você ama.",
    ],
    distance: [
      "Existem quilômetros entre nós.",
      "Existem dias em que eles parecem enormes.",
      "Mas ainda assim...",
      "Você continua sendo perto de mim de um jeito que nenhuma distância consegue explicar.",
    ],
    letter: [
      "Dois meses cabem em uma palavra. O que aconteceu dentro deles, não.",
      "Eu penso no seu jeito. Não como uma lista. Como uma presença. Algo que eu reconheço mesmo em silêncio — e que me faz querer ficar, sem precisar de um argumento.",
      "Talvez seja isso que mais me prende: a forma como você ama. Inteira. Sem pressa de parecer grande. Sem medo de ser verdadeira.",
      "Houve conversas que começaram simples. E, em algum ponto, passaram a significar mais do que deveriam. A distância tentou entrar no meio. Alguns dias ela parece enorme. Ainda assim, você continua perto de um jeito que o mapa não sabe medir.",
      "Eu não te escolhi uma vez, num dia de agosto. Eu te escolho de novo. Nos dias em que a distância insiste. E nos outros também.",
      "Não quero te prometer apenas os próximos meses. Quero presença. Quero uma casa onde as nossas histórias continuem. Quero uma família que tenha o nosso amor como começo.",
      "Se a vida permitir, quero olhar para você daqui a muitos anos e ainda saber — com a mesma certeza de agora — que fiz a escolha certa.",
      "Feliz aniversário de namoro.",
    ],
    promise: [
      "Eu não quero te prometer apenas os próximos meses.",
      "Quero te prometer presença.",
      "Quero viver ao seu lado.",
      "Quero construir uma casa onde nossas histórias continuem.",
      "Quero uma família que tenha o nosso amor como começo.",
      "E se a vida permitir...",
      "quero olhar para você daqui a muitos anos e ainda saber que fiz a escolha certa.",
      "Minha promessa é continuar escolhendo você.",
    ],
    finale: [
      "Rhanna.",
      "Dois meses foram apenas o começo.",
      "Eu não sei tudo que o futuro vai trazer.",
      "Mas sei com quem quero tentar viver.",
      "Com você.",
      "Feliz aniversário de namoro.",
      "Eu te escolheria outra vez.",
      "E outra.",
      "E outra.",
      "Até que a distância deixe de existir.",
    ],
    secret: [
      "Você encontrou.",
      "Eu escondi isso porque algumas coisas não precisam ser entregues de imediato.",
      "Se algum dia você esquecer o quanto é importante para mim, volte aqui.",
      "Leia tudo novamente.",
      "Eu ainda vou estar aqui.",
    ],
    continue: "Continuar",
    photosTitle: "O que ficou",
    letterTitle: "Para Rhanna",
    closePhoto: "Fechar",
    closeSecret: "Voltar",
  },
} as const;

export type RelationshipConfig = typeof relationshipConfig;
