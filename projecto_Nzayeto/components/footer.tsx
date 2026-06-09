"use client";
export default function Footer(){
    return(
        <footer className="bg-slate-900 text-white py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="font-heading font-bold text-lg mb-4">ZD Design</h3>
                        <p className="text-sm text-slate-400 leading-relaxed font-light">Sua parceira em design e branding em Portugal e Angola.</p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="text-slate-400 hover:text-teal-400 font-semibold">f</a>
                            <a href="#" className="text-slate-400 hover:text-teal-400 font-semibold">in</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold mb-4">Explorar</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-teal-400 font-light">Produtos</a></li>
                            <li><a href="#" className="hover:text-teal-400 font-light">Services</a></li>
                            <li><a href="#" className="hover:text-teal-400 font-light">Custom Projects</a></li>
                            <li><a href="#" className="hover:text-teal-400 font-light">Portfólio</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold mb-4">Suporte</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li><a href="#" className="hover:text-teal-400 font-light">Produtos</a></li>
                            <li><a href="#" className="hover:text-teal-400 font-light">Help</a></li>
                            <li><a href="#" className="hover:text-teal-400 font-light">Termos de Serviço</a></li>
                            <li><a href="#" className="hover:text-teal-400 font-light">Privacidade</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold mb-4">Contacto</h4>
                        <ul className="space-y-2 text-sm text-slate-400 font-light">
                            <li>Email: info@zdesign.com</li>
                            <li>WhatsApp: +244 9XX XXX XXX</li>
                            <li><a href="#" className="text-teal-400">Online status</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
                    <p className="font-light">© 2024 ZD Design. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}