export default function EmptyState({ onAdd }) {
  return (
    <div className="card animate-fade-in flex w-full max-w-xl flex-col items-center justify-center px-5 py-3 text-center sm:px-6 sm:py-4">
      <div className="relative mb-3">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
          <svg
            className="h-7 w-7 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        </div>
      </div>
      <h3 className="text-base font-semibold tracking-tight text-text-primary">No tasks yet</h3>
      <p className="mt-1 max-w-sm text-sm text-text-secondary">
        Create your first task to start organizing your work and stay on top of your goals.
      </p>
      {onAdd && (
        <button type="button" onClick={onAdd} className="btn-primary mt-3">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create your first task
        </button>
      )}
    </div>
  );
}
