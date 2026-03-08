import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Send } from "lucide-react";

const NAV_LINKS = [
    { name: "Start", href: "#" },
    { name: "Bürgerbrief", href: "#buergerbrief" },
    { name: "Kontakt", href: "#ansprechpartner" },
    { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? "py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
                : "py-6 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-rek-magenta flex items-center justify-center text-white shadow-lg">
                            <Send className="w-4 h-4 translate-x-[1px] translate-y-[-1px]" />
                        </div>
                        <span className={`text-xl font-black tracking-tighter transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}>
                            Bürgerbrief <span className="text-rek-magenta">REK</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-rek-magenta ${isScrolled ? "text-gray-600" : "text-white/80"
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <motion.a
                            href="#buergerbrief"
                            initial={false}
                            animate={{
                                opacity: isScrolled ? 1 : 0,
                                x: isScrolled ? 0 : 20,
                                scale: isScrolled ? 1 : 0.8
                            }}
                            className="px-6 py-2.5 bg-rek-magenta text-white text-sm font-bold rounded-xl shadow-lg shadow-rek-magenta/20"
                        >
                            Jetzt schreiben
                        </motion.a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={`md:hidden p-2 rounded-xl transition-colors ${isScrolled ? "text-gray-900 bg-gray-100" : "text-white bg-white/10"
                            }`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-lg font-bold text-gray-900 flex items-center justify-between"
                                >
                                    {link.name}
                                    <div className="w-2 h-2 rounded-full bg-rek-magenta" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
