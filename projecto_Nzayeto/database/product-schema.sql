-- Product Details Tables Setup
-- Execute estas queries no Supabase SQL Editor

-- Tabela de Variantes de Produto
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  product_id UUID NULL,
  sku TEXT NULL,
  color TEXT NULL,
  size TEXT NULL,
  stock INTEGER NULL DEFAULT 0,
  price NUMERIC NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT product_variants_pkey PRIMARY KEY (id),
  CONSTRAINT product_variants_product_id_fkey FOREIGN KEY (product_id) 
    REFERENCES products (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Tabela de Imagens de Produto
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  product_id UUID NULL,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT product_images_pkey PRIMARY KEY (id),
  CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) 
    REFERENCES products (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Tabela de Atributos de Produto
CREATE TABLE IF NOT EXISTS public.product_attributes (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  product_id UUID NULL,
  attribute_name TEXT NOT NULL,
  attribute_value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT product_attributes_pkey PRIMARY KEY (id),
  CONSTRAINT product_attributes_product_id_fkey FOREIGN KEY (product_id) 
    REFERENCES products (id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- Se a tabela products não existir, crie:
CREATE TABLE IF NOT EXISTS public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  badge TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT products_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id 
  ON public.product_variants(product_id);

CREATE INDEX IF NOT EXISTS idx_product_images_product_id 
  ON public.product_images(product_id);

CREATE INDEX IF NOT EXISTS idx_product_attributes_product_id 
  ON public.product_attributes(product_id);
