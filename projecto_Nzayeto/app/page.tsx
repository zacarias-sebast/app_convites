'use client';

import Link from "next/link";
import {MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/hero";

export default function Home() {

  const products = [
    {
      id: 1,
      name: "Letreiro 3D Acrílico LED",
      category: "Sinalética Personalizada",
      price: "Contactar p/ Orçamento",
      image: "/api/placeholder/200/200",
      badge: "PREMIUM",
    },
    {
      id: 2,
      name: "T-Shirt Premium Algodão",
      category: "Estampagens Profissional",
      price: "A partir de 12,50€",
      image: "/api/placeholder/200/200",
    },
    {
      id: 3,
      name: "Caneca Corporativa Matte",
      category: "Merchandising",
      price: "8,90€",
      image: "/api/placeholder/200/200",
    },
    {
      id: 4,
      name: "Convites de Luxo - Eventos",
      category: "Papelaria Premium",
      price: "Sob Consulta",
      image: "/api/placeholder/200/200",
      badge: "BEST SELLER",
    },
  ];

  const services = [
    {
      title: "Identidade Visual Completa",
      description: "Criamos a alma do seu negócio. Do logotipo ao manual de normas, garantimos que a sua marca seja impeccável e profissional.",
      image: "/api/placeholder/200/150",
    },
    {
      title: "Estampagem Têxtil",
      description: "Personalização de fardamentos e têxteis com as melhores técnicas do mercado.",
      image: "/api/placeholder/200/150",
    },
    {
      title: "Sinalética & LED",
      description: "Letreiros luminosos e sinalização de interiors com materiais da alta durabilidade.",
      image: "/api/placeholder/200/150",
    },
    {
      title: "Panfletos & Convites",
      description: "Design editorial de alta qualidade para promover o seu evento ou negócio com o impacto que ele merece.",
      image: "/api/placeholder/200/150",
    },
  ];

  
  return (
    <main className="w-full">

      {/* Hero Carousel */}
      <Hero />

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24 px-4 md:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-white">Produtos em Destaque</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-light">Qualidade boutique para o seu negócio</p>
            </div>
            <Link href="#" className="text-teal-600 font-semibold hover:underline">
              Ver tudo →
            </Link>
          </div>

          {/* Product Tabs */}
          <div className="flex gap-4 mb-12 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
            <button className="pb-3 font-semibold text-slate-900 dark:text-white border-b-2 border-teal-600 whitespace-nowrap">
              Todos os Produtos
            </button>
            <button className="pb-3 font-medium text-slate-600 dark:text-slate-400 hover:text-teal-600 whitespace-nowrap">
              Letreiros & Sinalética
            </button>
            <button className="pb-3 font-medium text-slate-600 dark:text-slate-400 hover:text-teal-600 whitespace-nowrap">
              Estampagem & Têxtil
            </button>
            <button className="pb-3 font-medium text-slate-600 dark:text-slate-400 hover:text-teal-600 whitespace-nowrap">
              Papelaria & Eventos
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden mb-4 h-48">
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                      {product.badge}
                    </div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <h3 className="font-heading font-semibold text-base mb-1 text-slate-900 dark:text-white">{product.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-2">{product.category}</p>
                <p className="text-teal-600 font-semibold text-sm">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 px-4 md:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900 dark:text-white">Serviços Especializados</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Services */}
            <div className="space-y-8">
              {services.slice(0, 2).map((service, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                    <span className="text-teal-600 text-xl">✨</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-slate-900 dark:text-white">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">{service.description}</p>
                    <button className="mt-3 text-teal-600 font-semibold text-sm hover:underline">
                      Saber Mais
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Image or Featured Section */}
            <div className="bg-teal-600 rounded-lg p-8 text-white flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-2xl font-bold mb-4">Panfletos & Convites</h3>
                <p className="text-sm opacity-90 mb-6 leading-relaxed font-light">
                  Design editorial de alta qualidade para promover o seu evento ou negócio com o impacto que ele merece.
                </p>
              </div>
              <Button className="bg-white text-teal-600 hover:bg-slate-100 w-fit font-semibold">
                Selecionar Design
              </Button>
            </div>

            {/* Right Services */}
            <div className="space-y-8">
              {services.slice(2).map((service, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                    <span className="text-teal-600 text-xl">🎨</span>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2 text-slate-900 dark:text-white">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-light">{service.description}</p>
                    <button className="mt-3 text-teal-600 font-semibold text-sm hover:underline">
                      Saber Mais
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Featured */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 text-white">
              <h3 className="font-heading text-2xl font-bold mb-4">Sinalética & LED</h3>
              <p className="text-sm opacity-90 mb-6 leading-relaxed font-light">
                Letreiros luminosos e sinalização de interiores com materiais de alta durabilidade.
              </p>
              <Button className="bg-white text-slate-900 hover:bg-slate-100 w-fit font-semibold">
                Saber Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-blue-100 dark:bg-blue-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Pronto para elevar a sua marca?</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed font-light">
            Fale com os nossos especialistas e receba um orçamento personalizado em menos de 24 horas.
          </p>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg inline-flex items-center gap-2 font-semibold">
            <MessageCircle className="w-5 h-5" />
            Conversar no WhatsApp
          </Button>
        </div>
      </section>

      {/* Footer */}
      
    </main>
  );
}
