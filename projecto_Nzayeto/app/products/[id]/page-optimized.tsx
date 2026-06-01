'use client';

import { useParams } from 'next/navigation';
import ProductDetails from '@/components/product-details';
import { useProductData } from '@/hooks/useProduct';

/**
 * Versão otimizada da página de detalhes usando o hook customizado
 * Com tratamento de erro e loading melhorados
 */
export default function ProductPageOptimized() {
  const params = useParams();
  const productId = params.id as string;

  const { product, images, variants, attributes, loading, error } =
    useProductData(productId);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produto...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-lg font-semibold mb-2">Erro ao carregar</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <a
            href="/products"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Voltar para produtos
          </a>
        </div>
      </div>
    );
  }

  // Not found state
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h1 className="text-lg font-semibold mb-2">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-4">
            Desculpe, não conseguimos encontrar o produto que você está procurando.
          </p>
          <a
            href="/products"
            className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Ver todos os produtos
          </a>
        </div>
      </div>
    );
  }

  // Render product
  return (
    <ProductDetails
      id={product.id}
      name={product.name}
      description={product.description}
      price={product.price}
      originalPrice={product.original_price}
      images={images}
      variants={variants}
      attributes={attributes}
      badge={product.badge}
    />
  );
}
