import { useEffect, useState } from 'react';
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal.jsx';
import { serviceOptions, site, whatsappUrl } from '../config/site.js';

const empty = { name: '', company: '', phone: '', email: '', type: '', message: '', website: '' };

const maskPhone = (value) => {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const validate = (v) => {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Informe seu nome.';
  if (v.phone.replace(/\D/g, '').length < 10) e.phone = 'Informe um telefone com DDD.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Informe um e-mail válido.';
  if (!v.type) e.type = 'Selecione o tipo de atendimento.';
  return e;
};

const buildText = (v) =>
  [
    'Olá! Gostaria de solicitar atendimento.',
    '',
    `Nome: ${v.name.trim()}`,
    v.company.trim() && `Empresa/propriedade: ${v.company.trim()}`,
    `Telefone: ${v.phone}`,
    `E-mail: ${v.email.trim()}`,
    `Atendimento desejado: ${v.type}`,
    v.message.trim() && `Mensagem: ${v.message.trim()}`,
  ]
    .filter((l) => l !== false)
    .join('\n');

function Field({ id, label, optional, error, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>
        {label} {optional && <span className="field__opt">(opcional)</span>}
      </label>
      {children}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact({ service }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | fail
  const [via, setVia] = useState('');

  // Quando o visitante clica em "Conhecer solução", o tipo de atendimento já vem preenchido
  useEffect(() => {
    if (service?.value) {
      setValues((v) => ({ ...v, type: service.value }));
      setErrors((er) => ({ ...er, type: undefined }));
    }
  }, [service]);

  const set = (name) => (e) => {
    const value = name === 'phone' ? maskPhone(e.target.value) : e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const aria = (name) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.website) return; // campo isca anti-spam
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    const text = buildText(values);

    // 1) Endpoint próprio / serviço de formulários
    if (site.formEndpoint) {
      setStatus('sending');
      try {
        const { website, ...payload } = values;
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('bad status');
        setVia('endpoint');
        setStatus('done');
      } catch {
        setStatus('fail');
      }
      return;
    }

    // 2) WhatsApp configurado: abre a conversa com a mensagem pronta
    if (site.whatsapp) {
      window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
      setVia('whatsapp');
      setStatus('done');
      return;
    }

    // 3) E-mail configurado: abre o app de e-mail
    if (site.email) {
      const subject = `Solicitação de atendimento – ${values.type}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      setVia('email');
      setStatus('done');
      return;
    }

    // 4) Nenhum canal configurado ainda: confirma o envio na tela
    setVia('local');
    setStatus('done');
  };

  const reset = () => {
    setValues(empty);
    setErrors({});
    setStatus('idle');
  };

  const doneText = {
    endpoint: 'Recebemos sua solicitação. Em breve um especialista entrará em contato.',
    whatsapp: 'Abrimos o WhatsApp com a sua mensagem pronta. Basta enviá-la para iniciar o atendimento.',
    email: 'Abrimos o seu aplicativo de e-mail com a mensagem pronta. Basta enviá-la para concluir.',
    local: 'Recebemos sua solicitação. Em breve um especialista entrará em contato.',
  }[via];

  return (
    <section id="contato" className="section section--green contact">
      <div className="container contact__grid">
        <Reveal className="contact__info">
          <p className="eyebrow eyebrow--light">Contato</p>
          <h2 className="h2 h2--light">Vamos conversar sobre a sua propriedade.</h2>
          <p className="lead lead--light">
            Conte um pouco sobre o seu momento e o que você busca. Um especialista retorna para entender a sua
            necessidade e indicar o melhor caminho.
          </p>

          <ul className="contact__list">
            <li>
              <MessageCircle size={20} aria-hidden="true" />
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                Falar pelo WhatsApp
              </a>
            </li>
            {site.email && (
              <li>
                <Mail size={20} aria-hidden="true" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            )}
            {site.phone && (
              <li>
                <Phone size={20} aria-hidden="true" />
                <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}>{site.phone}</a>
              </li>
            )}
            {site.address && (
              <li>
                <MapPin size={20} aria-hidden="true" />
                <span>{site.address}</span>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal className="contact__panel" delay={0.1}>
          {status === 'done' ? (
            <div className="success" role="status">
              <CheckCircle2 size={44} aria-hidden="true" />
              <h3>Solicitação registrada</h3>
              <p>{doneText}</p>
              <button type="button" className="btn btn--outline" onClick={reset}>
                Enviar outra solicitação
              </button>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate>
              <Field id="name" label="Nome" error={errors.name}>
                <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={set('name')} {...aria('name')} />
              </Field>

              <Field id="company" label="Empresa ou propriedade" optional>
                <input id="company" name="company" type="text" autoComplete="organization" value={values.company} onChange={set('company')} />
              </Field>

              <div className="form__row">
                <Field id="phone" label="Telefone" error={errors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                    value={values.phone}
                    onChange={set('phone')}
                    {...aria('phone')}
                  />
                </Field>
                <Field id="email" label="E-mail" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={set('email')}
                    {...aria('email')}
                  />
                </Field>
              </div>

              <Field id="type" label="Tipo de atendimento desejado" error={errors.type}>
                <select id="type" name="type" value={values.type} onChange={set('type')} {...aria('type')}>
                  <option value="">Selecione uma opção</option>
                  {serviceOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="message" label="Mensagem" optional>
                <textarea id="message" name="message" rows={4} value={values.message} onChange={set('message')} />
              </Field>

              {/* campo isca para robôs */}
              <div className="form__trap" aria-hidden="true">
                <label htmlFor="website">Não preencha este campo</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
              </div>

              {status === 'fail' && (
                <p className="form__alert" role="alert">
                  Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.
                </p>
              )}

              <button type="submit" className="btn btn--gold btn--block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando…' : 'Solicitar atendimento'} <Send size={18} aria-hidden="true" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
