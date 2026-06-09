# 🎨 Guia de Customização - Cores e Design

## 🌈 Alterar Cores do Tema

### 1. Cores Principais

Edite `tailwind.config.ts`:

```ts
module.exports = {
  theme: {
    colors: {
      // Cores primárias (botões, links, destaques)
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        500: '#0ea5e9',      // ← Mude isto
        600: '#0284c7',
        700: '#0369a1',
      },
      
      // Cores secundárias
      secondary: {
        500: '#8b5cf6',      // ← Mude isto
        600: '#7c3aed',
      },
      
      // Cores de sucesso, erro, aviso
      success: '#10b981',
      error: '#ef4444',
      warning: '#f59e0b',
    },
  },
}
```

### 2. Variáveis de Cores CSS

Edite `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.6%;
  
  --primary: 0 84% 60%;        /* Cor principal */
  --primary-foreground: 0 0% 100%;
  
  --secondary: 280 85% 64%;    /* Cor secundária */
  --secondary-foreground: 0 0% 100%;
  
  --muted: 0 0% 96.1%;        /* Cor neutra */
  --muted-foreground: 0 0% 45.1%;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98%;
    --primary: 0 84% 60%;
    --muted: 0 0% 14.3%;
  }
}
```

---

## 🎯 Temas Pré-configurados

### Tema 1: Moderno Azul
```tsx
// primary: azul vibrante
// secondary: roxo
// Design: Clean, minimalista
```

Altere em `tailwind.config.ts`:
```ts
primary: '#0ea5e9',     // Azul
secondary: '#8b5cf6',   // Roxo
```

### Tema 2: Corporativo Verde
```tsx
// primary: verde profissional
// secondary: cinza
// Design: Elegante, confiável
```

```ts
primary: '#059669',     // Verde
secondary: '#6b7280',   // Cinza
```

### Tema 3: Luxo Dourado
```tsx
// primary: ouro
// secondary: preto
// Design: Premium, sofisticado
```

```ts
primary: '#d4af37',     // Ouro
secondary: '#1a1a1a',   // Preto
```

### Tema 4: Vibrante Laranja
```tsx
// primary: laranja
// secondary: azul
// Design: Divertido, moderno
```

```ts
primary: '#f97316',     // Laranja
secondary: '#3b82f6',   // Azul
```

---

## 🎨 Customizar Componentes

### Alterar Cor do Botão Principal

Edite `components/product-details.tsx`:

```tsx
<Button
  onClick={handleAddToCart}
  disabled={!selectedVariant}
  className="flex-1 gap-2 bg-amber-600 hover:bg-amber-700"  // ← Mude aqui
  size="lg"
>
  <ShoppingCart size={20} />
  Adicionar ao Carrinho
</Button>
```

### Alterar Cor de Destaque (Badge)

```tsx
{badge && <Badge className="mb-2 bg-emerald-600">{badge}</Badge>}
                        // ↑ Mude a cor aqui
```

### Alterar Cor do Ícone Favoritar

```tsx
<Heart
  size={24}
  className={liked ? 'fill-red-500 text-red-500' : ''}
/>
// Troque 'red' por sua cor preferida
```

---

## 📐 Ajustar Espaçamento

### Aumentar/Diminuir Gaps (Espaços)

```tsx
// Antes: gap-6
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Conteúdo */}
</div>

// Maior espaçamento: gap-8
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Conteúdo */}
</div>

// Menor espaçamento: gap-4
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Conteúdo */}
</div>
```

### Tabela de Valores Tailwind
| Classe | Pixels |
|--------|--------|
| gap-2 | 0.5rem (8px) |
| gap-4 | 1rem (16px) |
| gap-6 | 1.5rem (24px) |
| gap-8 | 2rem (32px) |
| gap-12 | 3rem (48px) |

---

## 🔤 Ajustar Tipografia

### Tamanhos de Fonte

```tsx
// Título grande (atual)
<h1 className="text-4xl font-bold">
  {name}
</h1>

// Ainda maior
<h1 className="text-5xl font-bold">
  {name}
</h1>

// Menor
<h1 className="text-3xl font-bold">
  {name}
</h1>
```

### Pesos de Fonte

```tsx
// Mais leve
className="font-normal"   // 400

// Normal
className="font-semibold" // 600

// Mais pesado
className="font-bold"     // 700

// Muito pesado
className="font-black"    // 900
```

---

## 🎭 Modo Escuro (Dark Mode)

O projeto já suporta modo escuro! As cores se adaptam automaticamente.

Para forçar um tema:

```tsx
// No layout.tsx
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}
```

---

## 🌍 Exemplos de Customização Completas

### Exemplo 1: Loja de Moda (Rosa)

```css
:root {
  --primary: 327 73% 97%;      /* Rosa */
  --secondary: 0 0% 0%;        /* Preto */
}
```

### Exemplo 2: Tech Store (Azul Neon)

```css
:root {
  --primary: 200 100% 50%;     /* Azul Neon */
  --secondary: 0 0% 10%;       /* Cinza Escuro */
}
```

### Exemplo 3: Loja Sustentável (Verde)

```css
:root {
  --primary: 142 72% 29%;      /* Verde Floresta */
  --secondary: 168 80% 51%;    /* Turquesa */
}
```

### Exemplo 4: Luxo (Dourado)

```css
:root {
  --primary: 40 99% 64%;       /* Dourado */
  --secondary: 0 0% 5%;        /* Preto */
}
```

---

## 🎪 Bordas e Raios

### Aumentar Raio (Mais arredondado)

```tsx
// Antes: rounded-lg (8px)
<div className="rounded-xl p-4">
  {/* Conteúdo */}
</div>

// Mais arredondado
<div className="rounded-2xl p-4">
  {/* Conteúdo */}
</div>

// Muito arredondado
<div className="rounded-full p-4">
  {/* Conteúdo */}
</div>
```

### Tabela Tailwind

| Classe | Raio |
|--------|------|
| rounded | 4px |
| rounded-lg | 8px |
| rounded-xl | 12px |
| rounded-2xl | 16px |
| rounded-full | 9999px |

---

## 💫 Adicionar Sombras

```tsx
// Antes: nenhuma sombra
<Card className="p-6">
  {/* Conteúdo */}
</Card>

// Sombra leve
<Card className="p-6 shadow">
  {/* Conteúdo */}
</Card>

// Sombra média
<Card className="p-6 shadow-lg">
  {/* Conteúdo */}
</Card>

// Sombra forte
<Card className="p-6 shadow-2xl">
  {/* Conteúdo */}
</Card>
```

---

## 🎬 Transições e Animações

### Velocidade de Transição

```tsx
// Rápido
className="transition-colors duration-150"

// Normal (padrão)
className="transition-colors duration-300"

// Lento
className="transition-colors duration-500"

// Muito lento
className="transition-colors duration-700"
```

### Adicionar Hover Effects

```tsx
// Escurecer ao passar mouse
className="hover:opacity-80 transition-opacity"

// Expandir ao passar mouse
className="hover:scale-105 transition-transform"

// Cambiar cor
className="hover:bg-primary transition-colors"
```

---

## 🎯 Resumo de Classes Tailwind Úteis

```tsx
// Cores
bg-primary           // Background primária
text-primary         // Texto primária
border-primary       // Borda primária

// Responsividade
md:text-3xl         // Texto grande em desktop
sm:px-4             // Padding em mobile
lg:grid-cols-3      // 3 colunas em desktop

// Espaçamento
p-4                 // Padding
m-4                 // Margin
gap-4               // Gap entre items

// Tamanhos
w-full              // Largura 100%
h-auto              // Altura automática
aspect-square       // Quadrado

// Efeitos
hover:              // Ao passar mouse
active:             // Ao clicar
disabled:           // Quando desabilitado
```

---

## ✨ Dica Pro

Teste suas cores antes de colocar em produção:

1. Abra DevTools (F12)
2. Edite as classes em tempo real
3. Quando gostar, copie para o código

---

**Pronto para customizar! 🎨**
