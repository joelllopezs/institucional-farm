import Logo from './Logo.jsx';
import { navLinks, services, site, whatsappUrl } from '../config/site.js';

export default function Footer({ onSelectService }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>{site.slogan}</p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h3>Navegação</h3>
          <ul>
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Serviços">
          <h3>Soluções</h3>
          <ul>
            {services.map((s) => (
              <li key={s.value}>
                <a href="#contato" onClick={() => onSelectService(s.value)}>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3>Contato</h3>
          <ul>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            )}
            {site.phone && (
              <li>
                <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}>{site.phone}</a>
              </li>
            )}
            {site.address && <li>{site.address}</li>}
          </ul>
        </div>
      </div>

      <div className="container footer__legal">
        <p>
          © {year} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
