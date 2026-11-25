# Fazenda Horizonte Agro – site institucional

React 18 + Vite 5, JavaScript, CSS3, Lucide React e Framer Motion (carregado via `LazyMotion`, ~27 kB gzip).

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera /dist
npm run preview    # serve o build de produção
```

## Publicar na Vercel

1. Envie a pasta para um repositório (GitHub, GitLab ou Bitbucket) e importe em vercel.com/new.
2. A Vercel detecta Vite sozinha (`vercel.json` já traz build, saída `dist` e cache de assets).
3. Em *Settings → Environment Variables*, preencha as variáveis abaixo (opcional) e faça um novo deploy.

Também funciona com `npx vercel` direto da pasta do projeto.

## Configuração (variáveis de ambiente)

Copie `.env.example` para `.env`. Nada é inventado no código: o que ficar vazio não aparece no site.

| Variável | Para quê |
| --- | --- |
| `VITE_WHATSAPP_NUMBER` | Número com DDI + DDD, só dígitos. Alimenta todos os botões de WhatsApp |
| `VITE_WHATSAPP_MESSAGE` | Mensagem inicial padrão |
| `VITE_CONTACT_EMAIL` / `VITE_CONTACT_PHONE` / `VITE_CONTACT_ADDRESS` | Contatos exibidos na seção Contato e no rodapé |
| `VITE_FORM_ENDPOINT` | URL que recebe o formulário por POST JSON (Formspree, Getform, API própria) |

### O que o formulário faz

Em ordem de prioridade:

1. `VITE_FORM_ENDPOINT` definido: envia os dados por POST e mostra confirmação (ou erro com alternativa).
2. `VITE_WHATSAPP_NUMBER` definido: abre o WhatsApp com a mensagem já montada.
3. `VITE_CONTACT_EMAIL` definido: abre o app de e-mail com a mensagem pronta.
4. Nenhum definido (modo demonstração): valida e mostra a confirmação na tela, sem enviar os dados a lugar nenhum.

Há validação com mensagens por campo, máscara de telefone e campo isca anti-spam.

## Fotografias

As 8 fotos ficam em `public/images/`, cada uma em várias larguras (`nome-640.jpg`, `nome-1024.jpg`, `nome-1600.jpg`…),
e o navegador baixa só a versão adequada ao aparelho. A distribuição pelas 12 posições do site está em
`src/data/images.js` (campo `position` controla o enquadramento do recorte).

Para trocar uma foto, gere as versões com o mesmo padrão de nome e ajuste `file` e `alt` no mesmo arquivo.

## Estrutura

```
src/
  App.jsx                 composição da página
  config/site.js          textos fixos, serviços, links e contatos
  data/images.js          fotografias
  components/             Header, Hero, About, Solutions, Technology, Operations, Contact, Footer, Photo, Reveal, Logo
  styles/global.css       tokens (paleta, tipografia fluida), base, botões, fotos
  styles/components.css   estilos por seção, mobile-first
```
# institucional-farm
