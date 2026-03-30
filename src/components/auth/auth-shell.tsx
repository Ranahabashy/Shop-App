import { ReactNode } from 'react';

export function AuthShell({ title, description, footer, children }: { title: string; description: string; footer: ReactNode; children: ReactNode; }) {
  return (
    <div className="container-page grid min-h-[calc(100vh-4rem)] items-center py-10">
      <div className="hidden lg:block">
        {/* <div className="rounded-[2rem] bg-gradient-to-br from-brand-500 to-slate-900 p-10 text-white shadow-soft">
          <p className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em]">
            Frontend Technical Task
          </p>
          <h1 className="text-4xl font-bold leading-tight">Clean architecture, reusable UI, solid UX.</h1>
          <p className="mt-4 max-w-lg text-sm text-white/80">
            This project is structured so you can swap APIs, test components easily, and extend features without rewriting the whole app.
          </p>
        </div> */}
      </div>
      <div className="card-surface mx-auto w-full max-w-xl p-6 sm:p-8">
        <div className="mb-6 space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        {children}
        <div className="mt-6 text-sm text-slate-500">{footer}</div>
      </div>
    </div>
  );
}
