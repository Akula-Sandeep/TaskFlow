import { useRotatingText } from '../hooks/useRotatingText';

export function RotatingTagline({ items, className = '' }) {
  const { index, visible } = useRotatingText(items, 9000, 500);

  return (
    <p
      className={`text-center font-medium tracking-wide transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-live="polite"
    >
      {items[index]}
    </p>
  );
}

export function RotatingQuote({ quotes, className = '' }) {
  const { index, visible } = useRotatingText(quotes, 9000, 500);
  const quote = quotes[index];

  return (
    <blockquote
      className={`flex h-28 min-h-[7rem] w-full flex-shrink-0 flex-col justify-center gap-2 rounded-xl border border-border/60 bg-surface-elevated/60 px-3 py-3 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'} ${className}`}
      aria-live="polite"
    >
      <p className="text-sm leading-6 text-text-secondary">&ldquo;{quote.text}&rdquo;</p>
      <footer className="text-xs text-text-muted">&mdash; {quote.author}</footer>
    </blockquote>
  );
}
