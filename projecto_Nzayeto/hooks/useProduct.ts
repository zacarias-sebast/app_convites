import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Product,
  ProductImage,
  ProductVariant,
  ProductAttribute,
} from '@/types/product';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

interface UseProductDataReturn {
  product: Product | null;
  images: ProductImage[];
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook customizado para buscar dados de um produto do Supabase
 * @param productId - ID do produto a ser buscado
 * @returns Dados do produto, imagens, variantes, atributos, estado de loading e função refetch
 */
export function useProductData(productId: string): UseProductDataReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      if (productError) {
        throw new Error(productError.message);
      }
      setProduct(productData);

      // Fetch images
      const { data: imagesData, error: imagesError } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', productId)
        .order('is_primary', { ascending: false });

      if (imagesError) {
        throw new Error(imagesError.message);
      }
      setImages(imagesData || []);

      // Fetch variants
      const { data: variantsData, error: variantsError } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: true });

      if (variantsError) {
        throw new Error(variantsError.message);
      }
      setVariants(variantsData || []);

      // Fetch attributes
      const { data: attributesData, error: attributesError } = await supabase
        .from('product_attributes')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: true });

      if (attributesError) {
        throw new Error(attributesError.message);
      }
      setAttributes(attributesData || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro desconhecido ao carregar o produto';
      setError(errorMessage);
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  return {
    product,
    images,
    variants,
    attributes,
    loading,
    error,
    refetch: fetchProductData,
  };
}

/**
 * Hook para adicionar um produto ao carrinho
 * (Você pode integrar com um gerenciador de estado como Zustand)
 */
export function useAddToCart() {
  const addToCart = (
    productId: string,
    variantId: string,
    quantity: number
  ) => {
    // Implementar lógica de carrinho aqui
    console.log('Added to cart:', {
      productId,
      variantId,
      quantity,
      timestamp: new Date(),
    });

    // Exemplo com localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(
      (item: any) => item.variantId === variantId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, variantId, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  return { addToCart };
}
