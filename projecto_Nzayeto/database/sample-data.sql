-- ==========================================
-- DADOS DE EXEMPLO PARA TESTES
-- ==========================================
-- Copie e cole cada seção no Supabase SQL Editor

-- ==========================================
-- 1. INSERIR PRODUTO
-- ==========================================

INSERT INTO products (name, description, price, original_price, badge)
VALUES (
  'Branding Sob Medida',
  'Transforme a identidade visual da sua empresa com nosso serviço de Branding Sob Medida. Este pacote premium inclui a criação de logotipos exclusivos, paleta de cores personalizada, e manual de marca completo. Ideal para empresas que buscam se posicionar como líderes em seus nichos, com um visual que transmita confiança e sofisticação.',
  2450.00,
  3200.00,
  'Serviço Premium'
) RETURNING id;

-- ⚠️ IMPORTANTE: Copie o ID retornado e substitua em {PRODUCT_ID} nos comandos abaixo

-- ==========================================
-- 2. INSERIR IMAGENS
-- ==========================================

INSERT INTO product_images (product_id, image_url, is_primary)
VALUES
  ('{PRODUCT_ID}', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80', true),
  ('{PRODUCT_ID}', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', false),
  ('{PRODUCT_ID}', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', false),
  ('{PRODUCT_ID}', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', false);

-- ==========================================
-- 3. INSERIR VARIANTES
-- ==========================================

INSERT INTO product_variants (product_id, sku, color, size, stock, price)
VALUES
  ('{PRODUCT_ID}', 'BRAND-SM-001', 'Digital', 'Padrão', 100, 2450.00),
  ('{PRODUCT_ID}', 'BRAND-SM-002', 'Impresso', 'Padrão', 50, 2950.00),
  ('{PRODUCT_ID}', 'BRAND-SM-003', 'Digital + Impresso', 'Completo', 30, 3450.00);

-- ==========================================
-- 4. INSERIR ATRIBUTOS
-- ==========================================

INSERT INTO product_attributes (product_id, attribute_name, attribute_value)
VALUES
  ('{PRODUCT_ID}', 'Design Exclusivo', 'Sim, traço único refletindo sua essência'),
  ('{PRODUCT_ID}', 'Manual da Marca', 'Guia técnico para aplicação correta em todos os pontos de contato'),
  ('{PRODUCT_ID}', 'Reunião de Briefing', 'Chamada de 30min para alinhar expectativas'),
  ('{PRODUCT_ID}', 'Entregas', 'Receba os arquivos editáveis em AI, PDF e PSD'),
  ('{PRODUCT_ID}', 'Paleta de Cores', 'Personalizada com códigos RGB, CMYK e HEX'),
  ('{PRODUCT_ID}', 'Suporte', 'Assistência técnica pós-projeto');

-- ==========================================
-- EXEMPLO DE OUTRO PRODUTO (Camiseta)
-- ==========================================

-- 1. Inserir produto
INSERT INTO products (name, description, price, original_price, badge)
VALUES (
  'Camiseta Premium Algodão',
  'Camiseta de alta qualidade em 100% algodão puro. Confortável e durável, perfeita para uso diário. Disponível em múltiplas cores e tamanhos.',
  49.90,
  79.90,
  'Destaque'
) RETURNING id;

-- 2. Inserir imagens
INSERT INTO product_images (product_id, image_url, is_primary)
VALUES
  ('{PRODUCT_ID_2}', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80', true),
  ('{PRODUCT_ID_2}', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80', false);

-- 3. Inserir variantes
INSERT INTO product_variants (product_id, sku, color, size, stock, price)
VALUES
  ('{PRODUCT_ID_2}', 'TSHIRT-001', 'Branco', 'P', 50, 49.90),
  ('{PRODUCT_ID_2}', 'TSHIRT-002', 'Branco', 'M', 60, 49.90),
  ('{PRODUCT_ID_2}', 'TSHIRT-003', 'Branco', 'G', 55, 49.90),
  ('{PRODUCT_ID_2}', 'TSHIRT-004', 'Branco', 'GG', 40, 49.90),
  ('{PRODUCT_ID_2}', 'TSHIRT-005', 'Preto', 'P', 45, 49.90),
  ('{PRODUCT_ID_2}', 'TSHIRT-006', 'Preto', 'M', 50, 49.90);

-- 4. Inserir atributos
INSERT INTO product_attributes (product_id, attribute_name, attribute_value)
VALUES
  ('{PRODUCT_ID_2}', 'Material', '100% Algodão'),
  ('{PRODUCT_ID_2}', 'Gramatura', '180g/m²'),
  ('{PRODUCT_ID_2}', 'Lavagem', 'Lave em água fria, seque na sombra'),
  ('{PRODUCT_ID_2}', 'Embalagem', 'Camiseta individual em embalagem personalizada');

-- ==========================================
-- VERIFICAR DADOS INSERIDOS
-- ==========================================

-- Listar todos os produtos
SELECT * FROM products;

-- Listar imagens de um produto específico
SELECT * FROM product_images WHERE product_id = '{PRODUCT_ID}';

-- Listar variantes de um produto específico
SELECT * FROM product_variants WHERE product_id = '{PRODUCT_ID}';

-- Listar atributos de um produto específico
SELECT * FROM product_attributes WHERE product_id = '{PRODUCT_ID}';

-- ==========================================
-- ATUALIZAR ESTOQUE (Se necessário)
-- ==========================================

UPDATE product_variants
SET stock = stock - 5
WHERE product_id = '{PRODUCT_ID}'
AND color = 'Digital'
AND size = 'Padrão';

-- ==========================================
-- DELETAR DADOS (Se precisar recomeçar)
-- ==========================================

-- ⚠️ CUIDADO: Isso deletará todos os dados!
-- DELETE FROM product_attributes WHERE product_id = '{PRODUCT_ID}';
-- DELETE FROM product_variants WHERE product_id = '{PRODUCT_ID}';
-- DELETE FROM product_images WHERE product_id = '{PRODUCT_ID}';
-- DELETE FROM products WHERE id = '{PRODUCT_ID}';
