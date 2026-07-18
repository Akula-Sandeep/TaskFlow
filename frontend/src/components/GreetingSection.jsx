import { formatLiveDateTime, getGreeting } from './ui';
import { useLiveClock } from '../hooks/useLiveClock';

export default function GreetingSection({ firstName }) {
  const now = useLiveClock();
  const greeting = getGreeting(now, firstName);
  const heading = firstName && !greeting.startsWith('Hello') ? `${greeting}, ${firstName}` : greeting;

  return (
    <section className="mb-3 animate-fade-in">
      <h1 className="text-xl font-bold tracking-tight text-text-primary lg:text-2xl">{heading}</h1>
      <p className="mt-0.5 text-xs tabular-nums text-text-secondary">{formatLiveDateTime(now)}</p>
    </section>
  );
}
