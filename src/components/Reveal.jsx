import { m, useReducedMotion } from 'framer-motion';

/** Entrada suave ao rolar. Respeita a preferência "reduzir movimento" do sistema. */
export default function Reveal({ children, delay = 0, y = 22, as = 'div', className }) {
  const reduce = useReducedMotion();
  const Tag = m[as] || m.div;

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
