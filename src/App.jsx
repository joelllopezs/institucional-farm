import { useCallback, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Solutions from './components/Solutions.jsx';
import Technology from './components/Technology.jsx';
import Operations from './components/Operations.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  // Serviço escolhido nos cards ou no rodapé, repassado ao formulário de contato
  // (objeto com carimbo, para reaplicar mesmo quando o mesmo serviço é clicado de novo)
  const [service, setService] = useState(null);
  const selectService = useCallback((value) => setService({ value, at: Date.now() }), []);

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Solutions onSelectService={selectService} />
        <Technology />
        <Operations />
        <Contact service={service} />
      </main>
      <Footer onSelectService={selectService} />
    </>
  );
}
