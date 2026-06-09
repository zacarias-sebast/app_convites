# ⚡ Quick Start - Detalhes de Produto

## 🎯 Comece em 5 minutos!

### 1. Testar SEM Supabase (Agora mesmo!)
```bash
npm run dev
```

Abra no navegador:
```
http://localhost:3000/products/demo
```

✅ Pronto! Você verá a página completa com dados mockados.

---

## 2. Usar com Supabase (5 mais minutos)

### Passo A: Criar as Tabelas
1. Abra https://app.supabase.com
2. Vá para **SQL Editor**
3. Clique em **"New Query"**
4. Copie TODO o conteúdo de `database/product-schema.sql`
5. Cole e clique **"Run"** ▶️

### Passo B: Adicionar Dados de Teste
1. Clique em **"New Query"** novamente
2. Copie o conteúdo de `database/sample-data.sql`
3. Na primeira query, copie o ID que apareceu em verde (exemplo: `123e4567-e89b-12d3-a456-426614174000`)
4. No SQL, troque `{PRODUCT_ID}` pelo ID
5. Cole e clique **"Run"** ▶️

### Passo C: Acessar a Página
```
http://localhost:3000/products/123e4567-e89b-12d3-a456-426614174000
```

(Substitua o ID pelo seu)

---

## 3. Entender a Estrutura

```
📁 Arquivos Criados:
├── components/
│   └── product-details.tsx           ← Componente principal
├── app/
│   └── products/
│       ├── [id]/
│       │   └── page.tsx              ← Página com dados reais
│       └── demo/
│           └── page.tsx              ← Página de teste
├── hooks/
│   └── useProduct.ts                 ← Hook para buscar dados
├── types/
│   └── product.ts                    ← Tipos TypeScript
└── database/
    ├── product-schema.sql            ← Criar tabelas
    └── sample-data.sql               ← Dados de teste
```

---

## 4. O que Funciona

✅ Galeria de imagens (com thumbnails)
✅ Seleção de cor e tamanho
✅ Atualização dinâmica de preço
✅ Indicador de estoque
✅ Atributos customizados
✅ Seção de FAQ
✅ Responsivo (mobile, tablet, desktop)
✅ Design seguindo a imagem fornecida

---

## 5. Próximos Passos

### Para Usar em Produção:

1. **Adicionar Autenticação**
   ```tsx
   import { useUser } from '@supabase/auth-helpers-react';
   const { user } = useUser();
   ```

2. **Integrar Carrinho**
   - Trocar `console.log` por lógica real
   - Adicionar a localStorage ou Zustand

3. **Adicionar Mais Produtos**
   - Copiar a estrutura SQL
   - Inserir novos produtos com dados

4. **Customizar Design**
   - Editar cores em `tailwind.config.ts`
   - Modificar layout em `product-details.tsx`

---

## 6. Dúvidas Comuns

### "Como adicionar mais imagens?"
```sql
INSERT INTO product_images (product_id, image_url, is_primary)
VALUES ('seu-id', 'https://sua-imagem.jpg', false);
```

### "Como mudar o preço?"
```sql
UPDATE product_variants
SET price = 99.90
WHERE id = 'seu-variant-id';
```

### "Como adicionar novo atributo?"
```sql
INSERT INTO product_attributes (product_id, attribute_name, attribute_value)
VALUES ('seu-id', 'Seu Atributo', 'Seu Valor');
```

### "Por que aparecem alguns atributos e outros não?"
Verifique se:
- ✅ O `product_id` está correto
- ✅ `attribute_name` e `attribute_value` estão preenchidos
- ✅ Recarregue a página (F5)

---

## 7. Arquivos de Referência

| Arquivo | Uso |
|---------|-----|
| `IMPLEMENTATION_SUMMARY.md` | Documentação técnica completa |
| `PRODUCT_DETAILS_GUIDE.md` | Guia detalhado |
| `sample-data.sql` | Exemplos de dados |

---

## ✨ Pronto!

Você agora tem uma página de detalhes de produto profissional! 🎉

**Próximo:** Adicione mais produtos usando o SQL de exemplo.

---

**Precisa de ajuda?** Verifique a documentação completa em `PRODUCT_DETAILS_GUIDE.md`
