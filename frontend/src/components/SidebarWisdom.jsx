import { RotatingQuote } from './RotatingText';
import { WISDOM_QUOTES } from '../constants/quotes';

export default function SidebarWisdom({ stats }) {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex-shrink-0 px-1">
        <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
          Insights
        </h2>
        <p className="text-sm leading-relaxed text-text-secondary">
          Keep momentum going and let your tasks guide the next step.
        </p>
      </section>

      <section className="flex-shrink-0 px-1">
        <div className="w-full">
          <RotatingQuote quotes={WISDOM_QUOTES} />
        </div>
      </section>
    </div>
  );
}
