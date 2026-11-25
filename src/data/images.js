// Todas as fotografias do site ficam aqui.
//
// Cada foto existe em /public/images em várias larguras (nome-640.jpg, nome-1024.jpg…).
// `file` é o nome-base e `widths` lista as larguras disponíveis; o navegador escolhe a mais adequada.
// Para trocar uma foto: gere as versões com o mesmo padrão de nome, ou aponte `file` para outra.
// `position` define qual parte da foto fica visível quando ela é recortada (ex.: 'center 45%').
// Se uma foto não carregar, o site mostra um fundo de lavoura em CSS no lugar.
const W = [640, 1024, 1600];
const WIDE = [640, 1024, 1600, 2000];

const photos = {
  aerea: {
    file: 'vista-aerea-fazenda',
    widths: WIDE,
    alt: 'Vista aérea da sede de uma fazenda cercada por eucaliptos, com pastagens e gado',
  },
  canteiros: {
    file: 'canteiros-galpoes',
    widths: WIDE,
    alt: 'Canteiros de flores e hortaliças diante de galpões de madeira e estufas em propriedade rural',
  },
  trator: {
    file: 'trator-preparo-solo',
    widths: W,
    alt: 'Produtor conduzindo motocultivador no preparo do solo, com colinas ao fundo',
  },
  galpao: {
    file: 'galpao-bambu',
    widths: W,
    alt: 'Galpão de bambu e madeira com cerca rústica e canteiro de flores',
  },
  ovelhas: {
    file: 'ovelhas',
    widths: W,
    alt: 'Cordeiro em primeiro plano em meio ao rebanho de ovelhas, na luz do fim de tarde',
  },
  vaca: {
    file: 'vaca-pasto',
    widths: W,
    alt: 'Vaca holandesa em pasto, recebendo um afago na cabeça',
  },
  casarao: {
    file: 'casarao-colonial',
    widths: W,
    alt: 'Casarão branco de telhado colonial, com cerca de madeira e palmeiras',
  },
  lago: {
    file: 'lago-sede',
    widths: W,
    alt: 'Lago em propriedade rural com casa de madeira e gramado ao fundo, ao entardecer',
  },
};

export const images = {
  hero: { ...photos.aerea, position: '28% 55%' },

  empresaPrincipal: { ...photos.lago, position: 'center 60%' },
  empresaDetalhe: { ...photos.ovelhas, position: 'center 38%' },

  consultoria: { ...photos.trator, position: 'center 46%' },
  safras: { ...photos.canteiros, position: 'center 60%' },
  gestao: { ...photos.galpao, position: 'center 62%' },
  tecnologia: { ...photos.aerea, position: 'center 55%' },

  tecnologiaDestaque: { ...photos.trator, position: 'center 50%' },

  atuacaoLavouras: { ...photos.canteiros, position: 'center 62%' },
  atuacaoPecuaria: { ...photos.vaca, position: 'center 28%' },
  atuacaoEstrutura: { ...photos.casarao, position: 'center 58%' },
  atuacaoPropriedades: { ...photos.lago, position: 'center 46%' },
};
