"use client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";

export default function Header(){
    return(
        <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button asChild variant="ghost" className="font-heading font-bold text-xl text-teal-600">
              <Link href="/">
                ZD Design
              </Link>
            </Button>
            
            <nav className="hidden md:flex gap-2">
              <Button asChild variant="ghost">
                <Link href="#products">
                  Produtos
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="#services">
                  Serviços
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="#contact">
                  Contacto
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="#">
                  Sobre Nós
                </Link>
              </Button>
            </nav>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>
    )
}