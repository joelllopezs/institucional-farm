import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import Logo from './Logo.jsx';
import { navLinks, site, whatsappUrl } from '../config/site.js';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trava a rolagem do fundo e permite fechar com Esc
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  // Destaca o item do menu da seção visível
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const close = () => setOpen(false);
  const solid = scrolled || open;

  return (
    <header className={`header ${solid ? 'is-solid' : ''}`}>
      <div className="container header__bar">
        <a href="#inicio" className="header__logo" aria-label={`${site.name} – início`} onClick={close}>
          <Logo />
        </a>

        <nav className="header__nav" aria-label="Navegação principal">
          {navLinks.map((l) => (
            <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : ''}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contato" className="btn btn--gold header__cta">
          Solicitar atendimento
        </a>

        <button
          type="button"
          className="header__burger"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div id="menu-mobile" className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav className="drawer__nav" aria-label="Menu mobile">
          {navLinks.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={close}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="drawer__actions">
          <a href="#contato" className="btn btn--gold btn--block" onClick={close} tabIndex={open ? 0 : -1}>
            Solicitar atendimento
          </a>
          <a
            href={whatsappUrl()}
            className="btn btn--ghost btn--block"
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
