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

function DetailRow({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-text-muted">{label}</dt>
      <dd className="mt-1 text-sm text-text-primary">{value || '—'}</dd>
    </div>
  );
}

export default function TaskDetailsModal({ open, onClose, task }) {
  if (!open || !task) return null;

  const isCompleted = task.status === 'Completed';
  const updatedAt =
    task.updated_at &&
    new Date(task.updated_at).getTime() !== new Date(task.created_at).getTime()
      ? formatDateTime(task.updated_at)
      : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-details-title"
    >
      <div
        className="animate-scale-in w-full max-h-[92vh] overflow-y-auto rounded-t-3xl bg-surface-card shadow-card sm:max-w-lg sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div className="min-w-0 flex-1 pr-4">
            <h2
              id="task-details-title"
              className={`text-xl font-bold tracking-tight ${
                isCompleted ? 'text-text-muted line-through' : 'text-text-primary'
              }`}
            >
              {task.title}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={`badge ${priorityStyles[task.priority]}`}>{task.priority}</span>
              <span className={`badge ${statusStyles[task.status]}`}>{task.status}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost shrink-0 !rounded-xl !p-2"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <dl className="space-y-5 p-6">
          <DetailRow
            label="Description"
            value={task.description || 'No description provided'}
          />
          <DetailRow label="Due Date & Time" value={formatDateTime(task.due_date)} />
          <DetailRow label="Created Date & Time" value={formatDateTime(task.created_at)} />
          {updatedAt && <DetailRow label="Last Updated" value={updatedAt} />}
        </dl>

        <div className="flex justify-end border-t border-border px-6 py-4">
          <button type="button" onClick={onClose} className="btn-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
