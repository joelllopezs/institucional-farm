export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <svg className="logo__mark" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="21" r="8" fill="#C7A45A" />
        <path d="M4 33c7-5 13-7 20-7s13 2 20 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M4 41c7-5 13-7 20-7s13 2 20 7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" opacity=".55" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">Fazenda Horizonte</span>
        <span className="logo__tag">Agro</span>
      </span>
    </span>
  );
}
