import { Spinner } from './ui';

export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20" role="status">
      <Spinner className="h-8 w-8 text-primary" />
      <p className="text-sm text-text-secondary">{label}</p>
    </div>
  );
}
