'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Product, ProductImage } from '@/types/product';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  primaryImage?: ProductImage;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({
  product,
  primaryImage,
  onAddToCart,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const discount = product.original_price
    ? Math.round(
        ((product.original_price - product.price) / product.original_price) * 100
      )
    : 0;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full cursor-pointer">
        {/* Image Container */}
        <div className="relative aspect-square bg-muted overflow-hidden group">
          {primaryImage && (
            <Image
              src={primaryImage.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Discount Badge */}
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              -{discount}%
            </Badge>
          )}

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-red-500 text-red-500' : ''}
            />
          </button>

          {/* Badge Type */}
          {product.badge && (
            <Badge className="absolute bottom-2 left-2">{product.badge}</Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3 flex-1">
          {/* Name */}
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          {product.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-lg font-bold text-foreground">
              R$ {product.price.toFixed(2)}
            </span>
            {product.original_price && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {product.original_price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {onAddToCart && (
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product.id);
              }}
              className="w-full"
            >
              Adicionar ao Carrinho
            </Button>
          )}
        </div>
      </Card>
    </Link>
  );
}
