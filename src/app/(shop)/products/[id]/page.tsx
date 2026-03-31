import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, BadgeDollarSign, Boxes, Star } from 'lucide-react';
import { serviceContainer } from '@services/container';
import { currency } from '@lib/utils';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await serviceContainer.getProductDetails.execute(Number(id));

  return (
    <main className="container-page py-8">
      <Link href="/products" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" />
        Back to products
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card-surface relative min-h-[420px] overflow-hidden bg-slate-100">
          <Image src={product.images[0] ?? product.thumbnail} alt={product.title} fill className="object-cover" />
        </div>

        <div className="card-surface space-y-6 p-6 sm:p-8">
          <div className="space-y-3">
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-600">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>
            <p className="text-base leading-7 text-slate-600">{product.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[8px] bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                <BadgeDollarSign className="h-4 w-4" /> Price
              </div>
              <p className="text-xl font-bold text-brand-600">{currency(product.price)}</p>
            </div>
            <div className="rounded-[8px] bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                <Star className="h-4 w-4" /> Rating
              </div>
              <p className="text-xl font-bold text-slate-900">{product.rating}</p>
            </div>
            {/* <div className="rounded-[8px] bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
                <Boxes className="h-4 w-4" /> Stock
              </div>
              <p className="text-xl font-bold text-slate-900">{product.stock}</p>
            </div> */}
          </div>

          {product.brand ? (
            <div className="rounded-[8px] border border-slate-200 p-4 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Brand:</span> {product.brand}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
