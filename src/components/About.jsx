import Photo from './Photo.jsx';
import Reveal from './Reveal.jsx';

const pillars = [
  {
    title: 'Missão',
    text: 'Apoiar produtores rurais em decisões mais seguras, unindo experiência de campo, conhecimento técnico e inovação.',
  },
  {
    title: 'Filosofia de trabalho',
    text: 'Presença no campo, escuta atenta e orientação clara. Cada propriedade tem uma história, e é dela que parte qualquer recomendação.',
  },
  {
    title: 'Compromisso',
    text: 'Contribuir com o desenvolvimento do agronegócio, com responsabilidade, transparência e visão de longo prazo.',
  },
];

export default function About() {
  return (
    <section id="empresa" className="section about">
      <div className="container about__grid">
        <div className="about__text">
          <Reveal>
            <p className="eyebrow">A empresa</p>
            <h2 className="h2">Experiência que nasce no campo.</h2>
            <p className="lead">
              A Fazenda Horizonte Agro é uma empresa de consultoria e soluções para o agronegócio. Combinamos vivência
              prática, conhecimento técnico e tecnologia para ajudar produtores rurais a desenvolverem seus negócios com
              mais clareza e eficiência.
            </p>
          </Reveal>

          <dl className="pillars">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="pillars__item">
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal className="about__media" delay={0.1}>
          <Photo name="empresaPrincipal" sizes="(min-width: 1024px) 45vw, 100vw" className="about__main" />
          <Photo name="empresaDetalhe" sizes="(min-width: 1024px) 22vw, 50vw" className="about__detail" />
        </Reveal>
      </div>
    </section>
  );
}
