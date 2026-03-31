import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@domain/entities/product';
import { currency } from '@lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const isInStock = product.rating;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group card-surface overflow-hidden transition hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <Image
          src={product.images[0] ?? product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-4">
        {/* category */}
        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600">
          {product.category}
        </span>

        <div className='flex justify-between items-center '>
          {/* title */}
          <h3 className="text-base font-semibold text-slate-900">
            {product.title}
          </h3>


          {/* stock status */}
          <span
            className={`inline-block text-xs font-semibold ${isInStock ? 'text-green-600' : 'text-red-500'
              }`}
          >
            {isInStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* price + rating */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-brand-600">
            {currency(product.price)}
          </span>
          <span className="text-sm text-slate-500">
            ⭐ {product.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}