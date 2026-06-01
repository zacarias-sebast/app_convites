'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import ProductCard from '@/components/product-card';
import { Product, ProductImage } from '@/types/product';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface ProductWithImage extends Product {
  primary_image?: ProductImage;
}

export default function ProductsListPage() {
  const [products, setProducts] = useState<ProductWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch all products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (productsError) throw productsError;

        // Fetch primary images for each product
        const productsWithImages = await Promise.all(
          (productsData || []).map(async (product) => {
            const { data: imageData } = await supabase
              .from('product_images')
              .select('*')
              .eq('product_id', product.id)
              .eq('is_primary', true)
              .single();

            return {
              ...product,
              primary_image: imageData,
            };
          })
        );

        setProducts(productsWithImages);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log('Adicionado ao carrinho:', productId);
    // Implementar lógica de carrinho aqui
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Nossos Produtos</h1>
          <p className="text-muted-foreground">
            Encontre os melhores produtos para sua necessidade
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                primaryImage={product.primary_image}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Nenhum produto disponível</p>
            <a
              href="/"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Voltar para Home
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
