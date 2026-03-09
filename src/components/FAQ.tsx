import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
    {
        q: "Liest du das wirklich selbst?",
        a: "Ja, versprochen. Jede Nachricht landet ohne Umwege direkt bei mir. Keine Sekretariate, keine Filter. Ich möchte ungefiltert wissen, was die Menschen im Kreis beschäftigt.",
    },
    {
        q: "Wann bekomme ich eine Antwort von dir?",
        a: "Ich versuche, dir innerhalb weniger Werktage zu antworten. Manchmal dauert es bei komplexen Themen ein bisschen länger, aber ich melde mich auf jeden Fall bei dir.",
    },
    {
        q: "Was ist, wenn mein Anliegen sehr klein ist?",
        a: "Es gibt kein zu kleines Anliegen. Oft sind es gerade die alltäglichen Dinge – eine kaputte Ampel, ein unsicherer Schulweg –, die den Unterschied machen. Schreib es mir einfach.",
    },
    {
        q: "Ich kann mich nicht gut ausdrücken – ist das schlimm?",
        a: "Überhaupt nicht. Mir geht es um den Inhalt, nicht um perfekte Formulierungen. Schreib einfach so, wie du es einem Freund erzählen würdest.",
    },
    {
        q: "Was machst du mit dem, was ich schreibe?",
        a: "Ich nehme dein Feedback mit in meine politische Arbeit. Manchmal kann ich direkt helfen, manchmal ist es ein wichtiger Hinweis für neue Anträge oder Diskussionen im Kreistag.",
    },
    {
        q: "Kann ich auch anonym schreiben?",
        a: "Du kannst natürlich einen fiktiven Namen angeben, aber dann kann ich dir leider nicht antworten. Wenn du eine Rückmeldung möchtest, brauche ich deine E-Mail-Adresse.",
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
