# 🔖 Referência Rápida - Snippets e Comandos

## 🏃 Comandos Rápidos

```bash
# Iniciar desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Linter
npm run lint
```

---

## 📋 URLs Principais

```
Demo:          http://localhost:3000/products/demo
Produto Real:  http://localhost:3000/products/[seu-id]
Listagem:      http://localhost:3000/products
```

---

## 📂 Arquivos Principais

```
components/product-details.tsx     ← Componente principal
app/products/[id]/page.tsx         ← Página dinâmica
hooks/useProduct.ts                ← Hook de dados
database/product-schema.sql        ← Criar tabelas
database/sample-data.sql           ← Dados teste
```

---

## 💻 Snippets de Código

### 1. Usar ProductDetails

```tsx
import ProductDetails from '@/components/product-details';

<ProductDetails
  id="product-1"
  name="Branding Sob Medida"
  description="Descrição aqui..."
  price={2450}
  originalPrice={3200}
  images={imagens}
  variants={variantes}
  attributes={atributos}
  badge="Premium"
/>
```

### 2. Usar useProductData Hook

```tsx
import { useProductData } from '@/hooks/useProduct';

const { product, images, variants, attributes, loading, error } = 
  useProductData('product-id');

if (loading) return <div>Carregando...</div>;
if (error) return <div>Erro: {error}</div>;

// Use os dados aqui
```

### 3. Usar ProductCard

```tsx
import ProductCard from '@/components/product-card';

<ProductCard
  product={product}
  primaryImage={image}
  onAddToCart={(id) => console.log('Adicionado:', id)}
/>
```

### 4. Adicionar ao Carrinho

```tsx
import { useAddToCart } from '@/hooks/useProduct';

const { addToCart } = useAddToCart();

const handleAdd = () => {
  addToCart(productId, variantId, quantity);
};
```

### 5. Buscar Produtos do Supabase

```tsx
const { data, error } = await supabase
  .from('products')
  .select('*')
  .eq('id', productId)
  .single();
```

---

## 🎨 Snippets de Estilo

### Alterar Cor Primária

```tsx
<Button className="bg-red-600 hover:bg-red-700">
  Comprar
</Button>
```

### Alterar Tamanho

```tsx
<h1 className="text-5xl font-bold">
  Título Grande
</h1>
```

### Adicionar Sombra

```tsx
<Card className="shadow-2xl">
  Conteúdo
</Card>
```

### Espaçamento

```tsx
<div className="gap-8 p-6 mb-12">
  Conteúdo
</div>
```

---

## 🗃️ Snippets SQL

### Inserir Produto

```sql
INSERT INTO products (name, description, price, original_price, badge)
VALUES (
  'Nome do Produto',
  'Descrição...',
  100.00,
  150.00,
  'Badge'
) RETURNING id;
```

### Inserir Imagem

```sql
INSERT INTO product_images (product_id, image_url, is_primary)
VALUES ('product-id', 'https://url.jpg', true);
```

### Inserir Variante

```sql
INSERT INTO product_variants (product_id, sku, color, size, stock, price)
VALUES ('product-id', 'SKU-001', 'Azul', 'M', 50, 100.00);
```

### Inserir Atributo

```sql
INSERT INTO product_attributes (product_id, attribute_name, attribute_value)
VALUES ('product-id', 'Material', '100% Algodão');
```

### Atualizar Estoque

```sql
UPDATE product_variants
SET stock = stock - 1
WHERE id = 'variant-id' AND stock > 0;
```

### Listar Tudo

```sql
SELECT * FROM products;
SELECT * FROM product_images WHERE product_id = 'id';
SELECT * FROM product_variants WHERE product_id = 'id';
SELECT * FROM product_attributes WHERE product_id = 'id';
```

---

## 🎨 Cores Tailwind

### Cores Primárias
```
primary-50      - Mais claro
primary-500     - Padrão
primary-900     - Mais escuro
```

### Exemplos
```tsx
bg-blue-500     // Azul
bg-red-500      // Vermelho
bg-green-500    // Verde
bg-yellow-500   // Amarelo
bg-purple-500   // Roxo
bg-pink-500     // Rosa
```

---

## 📱 Responsive Classes

```tsx
// Mobile
className="block"

// Tablet (md)
className="md:inline-block"

// Desktop (lg)
className="lg:grid-cols-3"

// Extra Large (xl)
className="xl:gap-8"
```

---

## 🪝 Estados do Hook

```tsx
const {
  product,       // Dados do produto
  images,        // Array de imagens
  variants,      // Array de variantes
  attributes,    // Array de atributos
  loading,       // boolean
  error,         // string ou null
  refetch,       // function para recarregar
} = useProductData(id);
```

---

## 🔄 Tipos TypeScript

```tsx
import {
  Product,
  ProductImage,
  ProductVariant,
  ProductAttribute,
  ProductDetailsProps
} from '@/types/product';
```

---

## 🚨 Erros Comuns e Soluções

### Erro: "Produto não encontrado"
```tsx
✗ Problema: ID inválido
✓ Solução: Verifique o ID no Supabase
```

### Erro: "Imagens não carregam"
```tsx
✗ Problema: URL inválida
✓ Solução: Teste a URL no navegador
```

### Erro: "Variantes vazias"
```tsx
✗ Problema: Nenhum registro inserido
✓ Solução: Execute database/sample-data.sql
```

### Erro: "Conexão Supabase"
```tsx
✗ Problema: Variáveis de ambiente
✓ Solução: Verifique .env.local
```

---

## 📊 Exemplo Completo

### Dados Mínimos Necessários

```tsx
const produto = {
  id: '123',
  name: 'Produto',
  description: 'Descrição',
  price: 100,
  
  images: [
    { id: '1', image_url: 'https://...', is_primary: true }
  ],
  
  variants: [
    { id: '1', sku: 'SKU-1', color: 'Azul', size: 'M', stock: 10, price: 100 }
  ],
  
  attributes: [
    { id: '1', attribute_name: 'Material', attribute_value: 'Algodão' }
  ]
};
```

---

## 🎯 Checklist de Configuração

- [ ] Supabase criado
- [ ] Variáveis .env.local configuradas
- [ ] Schema SQL executado
- [ ] Dados de teste inseridos
- [ ] Page.tsx aponta para hook correto
- [ ] npm run dev rodando
- [ ] Página demo funciona
- [ ] Página com ID real funciona

---

## 🔗 Links Úteis

```
Supabase:       https://supabase.com
Next.js:        https://nextjs.org
Tailwind:       https://tailwindcss.com
shadcn/ui:      https://ui.shadcn.com
TypeScript:     https://www.typescriptlang.org
Lucide Icons:   https://lucide.dev
```

---

## 💡 Dicas Pro

### Dica 1: Testar Rápido
Use a página demo para testar mudanças sem Supabase

### Dica 2: Debugar
Use `console.log()` para verificar dados do hook

### Dica 3: Performance
Use `next/image` para otimizar imagens

### Dica 4: Customização
Mantenha classes Tailwind separadas em constantes

---

## 🎓 Próximas Implementações

### Adicionar Carrinho
```tsx
const { addToCart } = useAddToCart();

<Button onClick={() => addToCart(id, variantId, qty)}>
  Comprar
</Button>
```

### Adicionar Favoritos
```tsx
const [isFavorite, setIsFavorite] = useState(false);

<Heart 
  onClick={() => setIsFavorite(!isFavorite)}
  fill={isFavorite ? 'red' : 'none'}
/>
```

### Adicionar Reviews
```tsx
// Criar tabela product_reviews
// Implementar star rating
// Exibir comentários
```

---

## 📞 Suporte Rápido

**Problema?** → Procure em `PRODUCT_DETAILS_GUIDE.md`  
**Cor errada?** → Veja `CUSTOMIZATION_GUIDE.md`  
**Não funciona?** → Consulte `QUICK_START.md`  
**Tudo junto?** → Leia `INDEX.md`  

---

**Pronto para codificar! 💻**
