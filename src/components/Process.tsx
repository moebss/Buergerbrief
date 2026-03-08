import { motion } from "motion/react";
import { PenLine, Sparkles, SendHorizontal } from "lucide-react";

const STEPS = [
    {
        icon: <PenLine className="w-8 h-8" />,
        title: "Brief verfassen",
        desc: "Teile dein Anliegen mit uns. Egal ob Foto oder Text – alles zählt.",
        color: "bg-blue-50 text-blue-600",
    },
    {
        icon: <Sparkles className="w-8 h-8" />,
        title: "KI-Optimierung",
        desc: "Nutze unsere KI, um Bilder zu bearbeiten oder Texte zu schärfen.",
        color: "bg-rek-gelb/10 text-yellow-600",
    },
    {
        icon: <SendHorizontal className="w-8 h-8" />,
        title: "Direktversand",
        desc: "Dein Brief geht ohne Umwege direkt an Alexander Rheindorf.",
        color: "bg-rek-magenta/10 text-rek-magenta",
    },
];

export default function Process() {
    return (
        <section id="prozess" className="py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full bg-gray-100 border border-gray-200"
                    >
                        <span className="text-sm font-bold tracking-widest text-gray-600 uppercase">
                            Wie es funktioniert
                        </span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Dein Weg zum <span className="text-rek-magenta">Bürgerbrief</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gray-100 z-0" />

                    {STEPS.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative z-10 text-center flex flex-col items-center"
                        >
                            <div className={`w-24 h-24 rounded-[2rem] ${step.color} flex items-center justify-center mb-8 shadow-xl shadow-current/5 border border-white`}>
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                            <p className="text-gray-500 font-light leading-relaxed max-w-[250px]">
                                {step.desc}
                            </p>

                            {/* Step indicator */}
                            <div className="mt-8 px-4 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs font-black text-gray-300 uppercase tracking-widest">
                                Schritt 0{idx + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
