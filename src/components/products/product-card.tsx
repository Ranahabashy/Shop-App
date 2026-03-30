import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/src/domain/entities/product';
import { currency } from '@/src/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group card-surface overflow-hidden transition hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-4">
        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
          {product.category}
        </span>
        <h3 className="line-clamp-2 min-h-[3.5rem] text-base font-semibold text-slate-900">{product.title}</h3>
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-brand-600">{currency(product.price)}</span>
          <span className="text-sm text-slate-500">⭐ {product.rating}</span>
        </div>
      </div>
    </Link>
  );
}
