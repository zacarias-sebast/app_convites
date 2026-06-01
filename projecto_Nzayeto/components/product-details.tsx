'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

interface ProductDetailsProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  deliveryDays?: number;
  revisions?: number;
  badge?: string;
}

export default function ProductDetails({
  id,
  name,
  description,
  price,
  originalPrice,
  images,
  variants,
  attributes,
  deliveryDays = 15,
  revisions = 3,
  badge,
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(
    images.find((img) => img.is_primary) || images[0]
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    variants[0] || null
  );
  const [selectedColor, setSelectedColor] = useState<string>(variants[0]?.color || '');
  const [selectedSize, setSelectedSize] = useState<string>(variants[0]?.size || '');
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  const colors = Array.from(new Set(variants.map((v) => v.color)));
  const sizes = Array.from(new Set(variants.map((v) => v.size)));

  const filteredVariants = variants.filter(
    (v) => (!selectedColor || v.color === selectedColor) &&
           (!selectedSize || v.size === selectedSize)
  );

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    console.log('Added to cart:', {
      productId: id,
      variantId: selectedVariant.id,
      quantity,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative bg-muted rounded-lg overflow-hidden aspect-square">
              {selectedImage && (
                <Image
                  src={selectedImage.image_url}
                  alt={name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage?.id === img.id
                      ? 'border-primary'
                      : 'border-transparent hover:border-muted-foreground'
                  }`}
                >
                  <Image
                    src={img.image_url}
                    alt="Thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  {badge && <Badge className="mb-2">{badge}</Badge>}
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {name}
                  </h1>
                </div>
                <button
                  onClick={() => setLiked(!liked)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Heart
                    size={24}
                    className={liked ? 'fill-red-500 text-red-500' : ''}
                  />
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                R$ {price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  R$ {originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              {description}
            </p>

            {/* Variants Selection */}
            {colors.length > 0 && (
              <div>
                <label className="text-sm font-semibold mb-3 block">Cor</label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                        selectedColor === color
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-muted-foreground'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div>
                <label className="text-sm font-semibold mb-3 block">Tamanho</label>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-lg border-2 transition-colors text-sm font-medium ${
                        selectedSize === size
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-muted-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Info */}
            {selectedVariant && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Disponível:{' '}
                  <span className="font-semibold text-foreground">
                    {selectedVariant.stock} unidades
                  </span>
                </p>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex gap-3">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-muted transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className="flex-1 gap-2"
                size="lg"
              >
                <ShoppingCart size={20} />
                Adicionar ao Carrinho
              </Button>
            </div>

            {/* Satisfaction Guarantee */}
            <div className="p-4 border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  Garantia de Satisfação ZD Design
                </span>
                <br />
                Sua satisfação é nossa prioridade. Se não estiver feliz, oferecemos
                suporte completo.
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Delivery Info */}
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Prazo de Entrega</h3>
            <p className="text-2xl font-bold text-primary mb-2">
              Padrão (15 dias)
            </p>
            <p className="text-sm text-muted-foreground">
              Prazo padrão para entrega do seu pedido.
            </p>
          </Card>

          {/* Revisions */}
          <Card className="p-6">
            <h3 className="font-semibold mb-2">Revisões</h3>
            <p className="text-2xl font-bold text-primary mb-2">{revisions} Rodadas</p>
            <p className="text-sm text-muted-foreground">
              Número de revisões incluídas no serviço.
            </p>
          </Card>

          {/* Business Rule */}
          <Card className="p-6 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
            <h3 className="font-semibold mb-2">Regra de Negócio</h3>
            <p className="text-sm text-muted-foreground">
              Pagamento integral do sinal de 50% deve ser realizado
              <span className="font-semibold text-foreground">
                "imediatamente"
              </span>
              após a reunião de briefing.
            </p>
          </Card>
        </div>

        {/* Attributes Section */}
        {attributes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Especificações do Produto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attributes.map((attr) => (
                <Card key={attr.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {attr.attribute_name}
                    </span>
                    <span className="font-semibold text-foreground">
                      {attr.attribute_value}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Dúvidas Frequentes</h2>
          <div className="space-y-3">
            <FAQItem
              question="Como funciona a chamada de 30min para alinhar expectativas?"
              answer="Realizamos uma chamada de 30min para entender seus requisitos e expectativas antes de iniciar o projeto."
            />
            <FAQItem
              question="Recebo os arquivos editáveis? Sim, entregaremos em AI, PDF e PSD"
              answer="Sim, você receberá todos os arquivos em formatos editáveis incluindo AI, PDF e PSD."
            />
            <FAQItem
              question="Qual é a política de reembolso?"
              answer="Oferecemos satisfação garantida. Entre em contato com nosso suporte para informações sobre reembolsos."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-muted transition-colors"
      >
        <span className="font-semibold text-left text-sm">{question}</span>
        <ChevronDown
          size={20}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="border-t px-4 py-3 bg-muted/50">
          <p className="text-sm text-muted-foreground">{answer}</p>
        </div>
      )}
    </Card>
  );
}
