import Photo from './Photo.jsx';
import Reveal from './Reveal.jsx';

const items = [
  { image: 'atuacaoLavouras', title: 'Lavouras e cultivos', text: 'Acompanhamento do cultivo em campo.', area: 'a' },
  { image: 'atuacaoPecuaria', title: 'Pecuária', text: 'Manejo e cuidado com o rebanho.', area: 'b' },
  { image: 'atuacaoEstrutura', title: 'Estrutura rural', text: 'Sede, currais e instalações.', area: 'c' },
  { image: 'atuacaoPropriedades', title: 'Propriedades rurais', text: 'Visão completa da operação.', area: 'd' },
];

export default function Operations() {
  return (
    <section id="atuacao" className="section operations">
      <div className="container">
        <Reveal className="section__head section__head--split">
          <div>
            <p className="eyebrow">Nossa atuação</p>
            <h2 className="h2">Presença onde as decisões acontecem: no campo.</h2>
          </div>
          <p className="lead">
            Trabalhamos junto às propriedades, entendendo o solo, a rotina e os desafios de cada produtor, para que as
            soluções façam sentido na prática.
          </p>
        </Reveal>

        <div className="mosaic">
          {items.map((it, i) => (
            <Reveal key={it.title} as="figure" delay={(i % 2) * 0.08} className={`mosaic__item mosaic__item--${it.area}`}>
              <Photo name={it.image} sizes="(min-width: 1024px) 40vw, 100vw" />
              <figcaption>
                <strong>{it.title}</strong>
                <span>{it.text}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
