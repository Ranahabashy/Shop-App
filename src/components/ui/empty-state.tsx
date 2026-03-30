import { SearchX } from 'lucide-react';

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="card-surface flex min-h-72 flex-col items-center justify-center gap-3 p-8 text-center">
      <SearchX className="h-10 w-10 text-slate-400" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-md text-sm text-slate-500">{description}</p>
    </div>
  );
}
