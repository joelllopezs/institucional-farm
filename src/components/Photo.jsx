import { useState } from 'react';
import { images } from '../data/images.js';

/**
 * Fotografia responsiva (srcset com várias larguras). Por baixo da imagem há sempre
 * um fundo de lavoura em CSS, que aparece enquanto a foto carrega ou caso ela falhe.
 */
export default function Photo({ name, priority = false, sizes = '100vw', className = '' }) {
  const img = images[name];
  const [state, setState] = useState('loading'); // loading | ready | error

  if (!img) return null;

  const url = (w) => `/images/${img.file}-${w}.jpg`;
  const srcSet = img.widths.map((w) => `${url(w)} ${w}w`).join(', ');
  const fallbackWidth = img.widths.includes(1024) ? 1024 : img.widths[img.widths.length - 1];

  return (
    <span className={`photo ${className}`} role="img" aria-label={img.alt}>
      <span className="photo__fallback" aria-hidden="true" />
      {state !== 'error' && (
        <img
          className={`photo__img ${state === 'ready' ? 'is-ready' : ''}`}
          src={url(fallbackWidth)}
          srcSet={srcSet}
          sizes={sizes}
          alt=""
          style={{ objectPosition: img.position }}
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setState('ready')}
          onError={() => setState('error')}
          ref={(el) => {
            // imagem já em cache pode ter carregado antes do React anexar o onLoad
            if (el && el.complete && el.naturalWidth > 0 && state === 'loading') setState('ready');
          }}
        />
      )}
    </span>
  );
}
