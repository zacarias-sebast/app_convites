import { ChevronLeft, ChevronRight} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      title: "Letreiros Luminosos & Sinalética",
      description: "Soluções premium de iluminação interior e exterior para destacar o seu negócio com sofisticação e visibilidade.",
      image: "/api/placeholder/600/400",
    },
    {
      title: "Soluções de Iluminação LED",
      description: "Tecnologia LED de última geração para máxima eficiência energética.",
      image: "/api/placeholder/600/400",
    },
    {
      title: "Design Personalizado",
      description: "Criamos designs únicos tailored para sua marca.",
      image: "/api/placeholder/600/400",
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-96 md:h-[500px] bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative h-full flex items-center justify-between px-4 md:px-8">
          <Button
            onClick={prevSlide}
            className="z-10 p-2 hover:bg-white/20 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </Button>

          <div className="flex-1 px-4 md:px-12 text-white">
            <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              {slides[activeSlide].title}
            </h1>
            <p className="text-base md:text-lg mb-8 opacity-90 max-w-xl leading-relaxed font-light">
              {slides[activeSlide].description}
            </p>
            <div className="flex gap-4">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold">
                Start Custom Project
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 font-semibold">
                Ver Catálogo
              </Button>
            </div>
          </div>

          <Button
            onClick={nextSlide}
            className="z-10 p-2 hover:bg-white/20 rounded-lg transition"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </Button>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === activeSlide ? "bg-teal-400" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>
  );
}
