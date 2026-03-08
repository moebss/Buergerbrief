/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Hero from "./components/Hero";
import Contact from "./components/Contact";
import Form from "./components/Form";
import LegalModals from "./components/LegalModals";
import Navbar from "./components/Navbar";
import FAQ from "./components/FAQ";

export default function App() {
  const [activeModal, setActiveModal] = useState<"impressum" | "datenschutz" | null>(null);

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-rek-gelb selection:text-gray-900">
      <Navbar />
      <Hero />
      <Form />

      <FAQ />
      <Contact />

      {/* Footer */}
      <footer className="bg-gray-900 pt-24 pb-12 text-gray-400 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 text-center md:text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-6 h-6 rounded-md bg-rek-magenta" />
                <span className="text-xl font-black tracking-tighter text-white">
                  Bürgerbrief <span className="text-rek-magenta">REK</span>
                </span>
              </div>
              <p className="text-sm font-light leading-relaxed max-w-xs mx-auto md:mx-0">
                Ein Projekt von Alexander Rheindorf für aktive Bürgerbeteiligung im Rhein-Erft-Kreis. Gestalte deine Heimat direkt mit.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs">Navigation</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-rek-magenta transition-colors">Startseite</a></li>
                <li><a href="#buergerbrief" className="hover:text-rek-magenta transition-colors">Bürgerbrief schreiben</a></li>
                <li><a href="#faq" className="hover:text-rek-magenta transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold tracking-widest uppercase text-xs">Rechtliches</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <button onClick={() => setActiveModal("impressum")} className="hover:text-rek-magenta transition-colors">
                    Impressum
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal("datenschutz")} className="hover:text-rek-magenta transition-colors">
                    Datenschutz
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-light">
              &copy; {new Date().getFullYear()} Bürgerbrief Rhein-Erft-Kreis. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-rek-gelb" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Alexander Rheindorf</span>
            </div>
          </div>
        </div>
      </footer>

      <LegalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </main>
  );
}

