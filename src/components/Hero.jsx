import { m, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Photo from './Photo.jsx';
import { site } from '../config/site.js';

export default function Hero() {
  const reduce = useReducedMotion();
  const item = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 0.61, 0.36, 1] },
        };

  return (
    <section id="inicio" className="hero">
      <Photo name="hero" priority sizes="100vw" className="hero__media" />
      <div className="hero__shade" aria-hidden="true" />

      <div className="container hero__content">
        <m.p className="eyebrow eyebrow--light" {...item(0)}>
          Agronegócio · Consultoria · Tecnologia rural
        </m.p>
        <m.h1 className="hero__title" {...item(1)}>
          Fortalecendo o presente. <em>Cultivando o futuro.</em>
        </m.h1>
        <m.p className="hero__lead" {...item(2)}>
          Soluções inteligentes para produtores que buscam eficiência, produtividade e evolução no campo.
        </m.p>
        <m.div className="hero__actions" {...item(3)}>
          <a href="#solucoes" className="btn btn--gold">
            Conheça nossas soluções <ArrowRight size={18} />
          </a>
          <a href="#contato" className="btn btn--ghost">
            Fale com um especialista
          </a>
        </m.div>
      </div>

      <div className="container hero__foot">
        <p className="hero__slogan">{site.slogan}</p>
        <a href="#empresa" className="hero__scroll" aria-label="Rolar para a próxima seção">
          <ChevronDown size={22} />
        </a>
      </div>
    </section>
  );
}
