'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Product } from '@/types';
import useCartStore from '@/store/cartStore';

type AddToCartButtonProps = {
  product: Product;
  quantity?: number;
  disabled?: boolean;
};

export default function AddToCartButton({ product, quantity = 1, disabled }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (disabled) return;
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      aria-label={isAdding ? 'Added to bag' : 'Add to bag'}
      className={clsx(
        'group relative inline-flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2',
        disabled || isAdding
          ? 'cursor-not-allowed bg-neutral-100 text-neutral-400'
          : 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:scale-110 hover:shadow-glow-md hover:shadow-primary-500/40 focus:ring-primary-200 active:scale-95'
      )}
    >
      <ShoppingCartIcon className={clsx('h-5 w-5 transition-transform duration-300', isAdding && 'scale-110 rotate-12')} />
      {isAdding && (
        <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
      )}
      {!disabled && !isAdding && (
        <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
    </button>
  );
}

