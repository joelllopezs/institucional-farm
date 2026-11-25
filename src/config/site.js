// Configuração central do site. Valores de contato vêm de variáveis de ambiente (.env),
// então nenhum telefone, e-mail ou endereço é inventado no código.
const env = import.meta.env;

export const site = {
  name: 'Fazenda Horizonte Agro',
  slogan: 'Conhecimento no campo. Resultados para o futuro.',
  whatsapp: (env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  whatsappMessage:
    env.VITE_WHATSAPP_MESSAGE || 'Olá! Gostaria de falar com um especialista da Fazenda Horizonte Agro.',
  email: (env.VITE_CONTACT_EMAIL || '').trim(),
  phone: (env.VITE_CONTACT_PHONE || '').trim(),
  address: (env.VITE_CONTACT_ADDRESS || '').trim(),
  formEndpoint: (env.VITE_FORM_ENDPOINT || '').trim(),
};

export const whatsappUrl = (text = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  { id: 'inicio', label: 'Início' },
  { id: 'empresa', label: 'A empresa' },
  { id: 'solucoes', label: 'Soluções' },
  { id: 'tecnologia', label: 'Tecnologia' },
  { id: 'contato', label: 'Contato' },
];

export const services = [
  {
    value: 'Consultoria agrícola',
    title: 'Consultoria agrícola',
    icon: 'Sprout',
    image: 'consultoria',
    text: 'Acompanhamento técnico para orientar decisões no manejo, na escolha de práticas e na condução da lavoura, sempre respeitando a realidade de cada propriedade.',
  },
  {
    value: 'Planejamento e acompanhamento de safras',
    title: 'Planejamento e acompanhamento de safras',
    icon: 'ClipboardList',
    image: 'safras',
    text: 'Planejamento da safra antes do plantio e acompanhamento ao longo do ciclo, para antecipar etapas, organizar recursos e ajustar a rota quando necessário.',
  },
  {
    value: 'Gestão e eficiência rural',
    title: 'Gestão e eficiência rural',
    icon: 'Tractor',
    image: 'gestao',
    text: 'Organização da operação, das máquinas e da rotina do campo, com foco em reduzir desperdícios e dar clareza para quem administra a propriedade.',
  },
  {
    value: 'Tecnologia e agricultura de precisão',
    title: 'Tecnologia e agricultura de precisão',
    icon: 'Radar',
    image: 'tecnologia',
    text: 'Monitoramento e análise de dados do campo para apoiar decisões mais precisas, com tecnologia aplicada ao que de fato importa na lavoura.',
  },
];

export const serviceOptions = [...services.map((s) => s.value), 'Outro assunto'];
