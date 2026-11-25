import { Sprout, ClipboardList, Tractor, Radar, ArrowUpRight } from 'lucide-react';
import Photo from './Photo.jsx';
import Reveal from './Reveal.jsx';
import { services } from '../config/site.js';

const icons = { Sprout, ClipboardList, Tractor, Radar };

export default function Solutions({ onSelectService }) {
  return (
    <section id="solucoes" className="section section--gray solutions">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Soluções</p>
          <h2 className="h2">Do planejamento à colheita, ao lado de quem produz.</h2>
          <p className="lead">
            Quatro frentes de atuação que se complementam e se adaptam ao momento e ao tamanho de cada operação.
          </p>
        </Reveal>

        <ul className="cards">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.value}>
                <Reveal as="article" delay={(i % 2) * 0.08} className="card">
                  <div className="card__media">
                    <Photo name={s.image} sizes="(min-width: 1180px) 22vw, (min-width: 700px) 45vw, 100vw" />
                    <span className="card__icon" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                  </div>
                  <div className="card__body">
                    <span className="card__num" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <h3 className="card__title">{s.title}</h3>
                    <p className="card__text">{s.text}</p>
                    <a
                      href="#contato"
                      className="card__link"
                      onClick={() => onSelectService(s.value)}
                      aria-label={`Conhecer a solução: ${s.title}`}
                    >
                      Conhecer solução <ArrowUpRight size={18} />
                    </a>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
