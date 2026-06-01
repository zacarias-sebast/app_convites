---
name: Executive Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#404944'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#003623'
  on-tertiary: '#ffffff'
  tertiary-container: '#004f34'
  on-tertiary-container: '#31c98f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  emerald-deep: '#064E3B'
  slate-900: '#0F172A'
  surface-gray: '#F8FAFC'
  status-pending: '#F59E0B'
  status-success: '#10B981'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The visual identity is anchored in **Modern Minimalism**, prioritizing functional clarity and a premium e-commerce feel. It balances the industrial efficiency of a logistics platform (Mercado Livre) with the refined, customizable aesthetics of a high-end boutique (Shopify). 

The design system targets professional clients and businesses seeking both ready-made products and bespoke branding services. The emotional response is one of **unwavering trust, technical precision, and premium quality**. 

Key design characteristics include:
- **Generous negative space** to elevate product imagery.
- **Micro-interactions** that provide immediate feedback for a "high-performance" feel.
- **Structured information architecture** to handle complex business rules (e.g., custom uploads and multi-province shipping logic) without overwhelming the user.

## Colors

The palette is led by **Emerald Deep**, a color signifying stability, growth, and premium craftsmanship. This is paired with **Slate 900** for high-contrast typography and structural elements, ensuring a "Premium" tier feel.

- **Primary (Emerald Deep):** Reserved for core brand actions, primary buttons, and active navigation states.
- **Secondary (Slate 900):** Used for deep backgrounds in Dark Mode and high-level headers in Light Mode.
- **Accents:** A vibrant Emerald-Green (#10B981) is used for success states and calls-to-action that require high visibility against neutral backgrounds.
- **Neutrals:** A scale of cool grays (Slate) provides the scaffolding for the UI, ensuring the interface remains unobtrusive.

**Dark Mode Strategy:** The interface utilizes a "Deep Navy" base rather than pure black, maintaining depth and reducing eye strain while preserving the premium aesthetic.

## Typography

This design system utilizes **Inter** exclusively to achieve a systematic, utilitarian, and modern aesthetic. The focus is on exceptional legibility across dense data environments like dashboards and checkout flows.

- **Hierarchy:** Use tight letter-spacing on Display and Headline levels to create a "compact" and authoritative look.
- **Utility Labels:** Small-caps or heavy-weight labels are used for metadata, status tags (e.g., "PENDING APPROVAL"), and categories.
- **Responsiveness:** Large display titles scale down by 25% on mobile devices to prevent excessive line-breaking.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain a premium "editorial" feel, transitioning to a **Fluid** model for tablet and mobile.

- **Desktop (1280px+):** 12-column grid with 24px gutters. Content is centered with significant outer margins to focus the user's eye.
- **Tablet (768px - 1024px):** 8-column grid with 20px gutters. Sidebars collapse into drawers.
- **Mobile (<768px):** 4-column grid with 16px margins. Vertical stacks are preferred for all product listings and form elements.

A strict **4px baseline grid** governs all internal component spacing, ensuring that even complex forms for customized services remain visually aligned and rhythmically consistent.

## Elevation & Depth

Visual hierarchy is managed through **Tonal Layers** and **Subtle Shadows**, moving away from flat design into a more tactile, "premium" space.

- **Surface Levels:** 
    - Level 0: Background (#F8FAFC).
    - Level 1: Cards and main containers (White).
    - Level 2: Modals, Popovers, and Floating Action Buttons.
- **Shadows:** Use extra-diffused, low-opacity shadows with a hint of the secondary color (Slate) in the tint. This creates a "soft glow" rather than a harsh drop shadow. 
- **Depth in Dark Mode:** Depth is communicated via subtle border highlights (1px solid light-slate) and slightly lighter surface colors rather than shadows.

## Shapes

The shape language is defined as **Rounded**, utilizing a `1.5rem` (24px) radius for major containers to align with the "2xl" requirement.

- **Buttons & Inputs:** Follow the base `0.5rem` (8px) for a professional look.
- **Cards & Featured Sections:** Use `1.5rem` (24px) to create the soft, premium "Shopify-style" containers.
- **Chips & Badges:** Fully pill-shaped to contrast against the more geometric buttons.
- **Visual Continuity:** All image containers must mirror the roundedness of their parent cards to maintain the high-end aesthetic.

## Components

### Buttons
- **Primary:** Emerald Deep background, white text. Soft shadow on hover.
- **Secondary:** Transparent background, Slate 900 border.
- **Service CTA:** High-contrast Emerald-Green for "Start Custom Project."

### Input Fields
- **States:** Default fields use a 1px Slate-200 border. On focus, the border transitions to Emerald Deep with a subtle 2px outer glow.
- **Uploaders:** Specific "Custom Branding" upload zones use dashed borders and a soft gray background to indicate interactivity.

### Cards
- **Product Cards:** Minimalist. Large image at the top, followed by center-aligned or left-aligned typography. No borders; use Level 1 shadows for separation.
- **Service Cards:** Feature an icon or illustrative graphic alongside a "Get Quote" button.

### Feedback & Status
- **Status Badges:** "Reserva Pendente" uses an amber-tinted background with dark amber text. "Pago" uses an emerald-tinted background.
- **Empty States:** Use monochromatic line art to maintain the professional, uncluttered feel.

### Dashboard Elements
- **Data Grids:** High-density rows with subtle zebra-striping. Action buttons (Edit/View) are icon-only until hovered to reduce visual noise.