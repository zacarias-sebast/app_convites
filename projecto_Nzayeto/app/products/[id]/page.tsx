'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductDetails from '@/components/product-details';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  badge?: string;
}

interface ProductImage {
  id: string;
  image_url: string;
  is_primary: boolean;
}

interface ProductVariant {
  id: string;
  sku: string;
  color: string;
  size: string;
  stock: number;
  price: number;
}

interface ProductAttribute {
  id: string;
  attribute_name: string;
  attribute_value: string;
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (productError) throw productError;
        setProduct(productData);

        // Fetch images
        const { data: imagesData, error: imagesError } = await supabase
          .from('product_images')
          .select('*')
          .eq('product_id', productId)
          .order('is_primary', { ascending: false });

        if (imagesError) throw imagesError;
        setImages(imagesData || []);

        // Fetch variants
        const { data: variantsData, error: variantsError } = await supabase
          .from('product_variants')
          .select('*')
          .eq('product_id', productId);

        if (variantsError) throw variantsError;
        setVariants(variantsData || []);

        // Fetch attributes
        const { data: attributesData, error: attributesError } = await supabase
          .from('product_attributes')
          .select('*')
          .eq('product_id', productId);

        if (attributesError) throw attributesError;
        setAttributes(attributesData || []);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Erro ao carregar o produto. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-2">
            {error || 'Produto não encontrado'}
          </p>
          <a href="/products" className="text-primary hover:underline">
            Voltar para produtos
          </a>
        </div>
      </div>
    );
  }

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
