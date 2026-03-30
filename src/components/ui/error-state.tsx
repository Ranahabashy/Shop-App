import { AlertTriangle } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="card-surface flex min-h-72 flex-col items-center justify-center gap-3 p-8 text-center">
      <AlertTriangle className="h-10 w-10 text-amber-500" />
      <h3 className="text-lg font-semibold">Something went wrong</h3>
      <p className="max-w-md text-sm text-slate-500">{message}</p>
      {onRetry ? <Button onClick={onRetry}>Try again</Button> : null}
    </div>
  );
}
