import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
    {
        q: "Wer liest eigentlich meinen Bürgerbrief?",
        a: "Jeder Brief landet ohne Umwege direkt bei mir. Eine KI unterstützt dich zwar optional bei der Bildbearbeitung oder Textstrukturierung, aber die eigentlichen Inhalte sichte und beantworte ich persönlich.",
    },
    {
        q: "Muss ich das Bild-Tool nutzen?",
        a: "Absolut nicht. Wenn du lieber nur Text schreiben möchtest, ist das völlig okay. Das Tool ist nur ein Angebot, um dein Anliegen optisch zu unterstreichen.",
    },
    {
        q: "Wann bekomme ich eine Antwort von dir?",
        a: "Ich versuche, dir innerhalb weniger Werktage eine Rückmeldung zu geben. Je nachdem, wie komplex dein Thema ist, kann es manchmal ein kleines bisschen länger dauern – aber ich melde mich auf jeden Fall.",
    },
    {
        q: "Was passiert mit meinen Daten?",
        a: "Deine Privatsphäre ist mir wichtig. Deine Daten werden verschlüsselt übertragen und nur für unser Gespräch genutzt. Danach werden sie gemäß der strengen DSGVO-Regeln wieder gelöscht.",
    },
];

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    return (
        <section id="faq" className="py-20 md:py-32 bg-gray-50 overflow-hidden">

            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full bg-rek-gelb/20 border border-rek-gelb/20"
                    >
                        <span className="text-sm font-bold tracking-widest text-yellow-700 uppercase">
                            Häufige Fragen
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Noch Fragen? <br className="md:hidden" />
                        <span className="text-rek-magenta">Ich helfe dir gerne weiter.</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`rounded-3xl border transition-all duration-300 ${openIdx === idx
                                ? "bg-white border-rek-magenta/20 shadow-xl shadow-rek-magenta/5"
                                : "bg-gray-100/50 border-transparent hover:bg-white hover:border-gray-200"
                                }`}
                        >
                            <button
                                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <HelpCircle className={`w-5 h-5 ${openIdx === idx ? "text-rek-magenta" : "text-gray-400"}`} />
                                    <span className={`text-lg font-bold ${openIdx === idx ? "text-gray-900" : "text-gray-600"}`}>
                                        {faq.q}
                                    </span>
                                </div>
                                <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openIdx === idx ? "rotate-180 text-rek-magenta" : "text-gray-400"}`} />
                            </button>

                            <AnimatePresence>
                                {openIdx === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-8 pb-8 pt-2 text-gray-500 font-light leading-relaxed border-t border-gray-50">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
