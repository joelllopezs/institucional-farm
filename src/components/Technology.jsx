import { Radar, BarChart3, Crosshair } from 'lucide-react';
import Photo from './Photo.jsx';
import Reveal from './Reveal.jsx';

const concepts = [
  {
    icon: Radar,
    title: 'Monitoramento',
    text: 'Acompanhar a lavoura de perto, com informações do campo reunidas de forma organizada, para enxergar o que está acontecendo antes que vire problema.',
  },
  {
    icon: BarChart3,
    title: 'Análise de dados',
    text: 'Transformar registros e observações em leitura clara da operação, apoiando escolhas com base em informação, e não só em intuição.',
  },
  {
    icon: Crosshair,
    title: 'Agricultura de precisão',
    text: 'Tratar cada área conforme a sua necessidade, usando recursos de forma mais direcionada e consciente.',
  },
];

export default function Technology() {
  return (
    <section id="tecnologia" className="section section--dark tech">
      <div className="container tech__grid">
        <div className="tech__content">
          <Reveal>
            <p className="eyebrow eyebrow--light">Tecnologia</p>
            <h2 className="h2 h2--light">O futuro da agricultura começa com boas decisões.</h2>
            <p className="lead lead--light">
              Inovação no agronegócio não é sobre ter mais equipamentos, e sim sobre ter mais clareza. Aplicamos
              tecnologia para ajudar o produtor a decidir melhor em cada etapa.
            </p>
          </Reveal>

          <ul className="concepts">
            {concepts.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 0.08} className="concepts__item">
                <span className="concepts__icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="tech__media" delay={0.1}>
          <Photo name="tecnologiaDestaque" sizes="(min-width: 1024px) 45vw, 100vw" />
        </Reveal>
      </div>
    </section>
  );
}
