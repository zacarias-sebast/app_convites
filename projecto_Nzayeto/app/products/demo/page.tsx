'use client';

import ProductDetails from '@/components/product-details';

// Dados de exemplo para demonstração
const mockData = {
  id: 'product-1',
  name: 'Branding Sob Medida',
  description:
    'Transforme a identidade visual da sua empresa com nosso serviço de Branding Sob Medida. Este pacote premium inclui a criação de logotipos exclusivos, paleta de cores personalizada, e manual de marca completo. Ideal para empresas que buscam se posicionar como líderes em seus nichos, com um visual que transmita confiança e sofisticação.',
  price: 2450.0,
  originalPrice: 3200.0,
  badge: 'Serviço Premium',
  images: [
    {
      id: 'img-1',
      image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      is_primary: true,
    },
    {
      id: 'img-2',
      image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      is_primary: false,
    },
    {
      id: 'img-3',
      image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      is_primary: false,
    },
    {
      id: 'img-4',
      image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
      is_primary: false,
    },
  ],
  variants: [
    {
      id: 'var-1',
      sku: 'BRAND-SM-001',
      color: 'Digital',
      size: 'Padrão',
      stock: 100,
      price: 2450.0,
    },
    {
      id: 'var-2',
      sku: 'BRAND-SM-002',
      color: 'Impresso',
      size: 'Padrão',
      stock: 50,
      price: 2950.0,
    },
    {
      id: 'var-3',
      sku: 'BRAND-SM-003',
      color: 'Digital + Impresso',
      size: 'Completo',
      stock: 30,
      price: 3450.0,
    },
  ],
  attributes: [
    {
      id: 'attr-1',
      attribute_name: 'Design Exclusivo',
      attribute_value: 'Sim, traço único refletindo sua essência',
    },
    {
      id: 'attr-2',
      attribute_name: 'Manual da Marca',
      attribute_value: 'Guia técnico para aplicação correta em todos os pontos de contato',
    },
    {
      id: 'attr-3',
      attribute_name: 'Reunião de Briefing',
      attribute_value: 'Chamada de 30min para alinhar expectativas',
    },
    {
      id: 'attr-4',
      attribute_name: 'Entregas',
      attribute_value: 'Receba os arquivos editáveis em AI, PDF e PSD',
    },
    {
      id: 'attr-5',
      attribute_name: 'Paleta de Cores',
      attribute_value: 'Personalizada com códigos RGB, CMYK e HEX',
    },
    {
      id: 'attr-6',
      attribute_name: 'Suporte',
      attribute_value: 'Assistência técnica pós-projeto',
    },
  ],
  deliveryDays: 15,
  revisions: 3,
};

export default function ProductDemoPage() {
  return (
    <ProductDetails
      id={mockData.id}
      name={mockData.name}
      description={mockData.description}
      price={mockData.price}
      originalPrice={mockData.originalPrice}
      images={mockData.images}
      variants={mockData.variants}
      attributes={mockData.attributes}
      badge={mockData.badge}
      deliveryDays={mockData.deliveryDays}
      revisions={mockData.revisions}
    />
  );
}
