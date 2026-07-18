import { formatDateTime } from './ui';

const priorityStyles = {
  High: 'bg-danger/15 text-danger ring-1 ring-danger/20',
  Medium: 'bg-warning/15 text-warning ring-1 ring-warning/20',
  Low: 'bg-accent/15 text-accent ring-1 ring-accent/20',
};

const statusStyles = {
  Pending: 'bg-surface-elevated text-text-secondary ring-1 ring-border',
  Completed: 'bg-success/15 text-success ring-1 ring-success/20',
};

export default function TaskCard({ task, onView, onEdit, onDelete, onComplete }) {
  const dueDateTime = formatDateTime(task.due_date);
  const createdDateTime = formatDateTime(task.created_at);
  const isCompleted = task.status === 'Completed';

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onView(task)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onView(task);
        }
      }}
      className="card group flex h-[240px] cursor-pointer flex-col p-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3
          className={`line-clamp-2 text-sm font-semibold leading-snug tracking-tight ${
            isCompleted ? 'text-text-muted line-through' : 'text-text-primary'
          }`}
        >
          {task.title}
        </h3>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          <span className={`badge ${priorityStyles[task.priority]}`}>{task.priority}</span>
          <span className={`badge ${statusStyles[task.status]}`}>{task.status}</span>
        </div>
      </div>

      {task.description ? (
        <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-text-secondary">
          {task.description}
        </p>
      ) : (
        <p className="mb-4 flex-1 text-sm italic text-text-muted">No description provided</p>
      )}

      <div className="mb-4 space-y-2 text-xs text-text-muted">
        <div className="flex items-start gap-1.5">
          <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div>
            <span className="font-medium text-text-secondary">Due</span>
            <p className="mt-0.5 tabular-nums">{dueDateTime}</p>
          </div>
        </div>
        <div className="flex items-start gap-1.5">
          <svg className="mt-0.5 h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <span className="font-medium text-text-secondary">Created</span>
            <p className="mt-0.5 tabular-nums">{createdDateTime}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-nowrap gap-2 border-t border-border pt-2">
        <button type="button" onClick={(e) => { e.stopPropagation(); onEdit(task); }} className="btn-secondary !px-2.5 !py-1.5 text-[11px] whitespace-nowrap">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        {!isCompleted && (
          <button type="button" onClick={(e) => { e.stopPropagation(); onComplete(task); }} className="btn-primary !px-2.5 !py-1.5 text-[11px] whitespace-nowrap">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Complete
          </button>
        )}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDelete(task); }}
          className="btn-ghost !px-2.5 !py-1.5 text-[11px] text-danger hover:!bg-danger/10 hover:!text-danger whitespace-nowrap"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </article>
  );
}
