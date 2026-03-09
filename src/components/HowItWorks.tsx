import { motion } from "framer-motion";
import { MessageSquare, Eye, Reply } from "lucide-react";

const STEPS = [
    {
        icon: MessageSquare,
        title: "Du schreibst mir",
        description: "Egal ob großes Problem oder kleine Sorge – schreib mir einfach, was dich gerade beschäftigt.",
        color: "bg-rek-magenta/10 text-rek-magenta",
    },
    {
        icon: Eye,
        title: "Ich lese persönlich",
        description: "Keine Filter, keine Umwege. Dein Brief landet direkt bei mir auf dem Schreibtisch. Versprochen.",
        color: "bg-rek-gelb/10 text-rek-gelb",
    },
    {
        icon: Reply,
        title: "Du bekommst Antwort",
        description: "Ich antworte dir so schnell wie möglich – echt und ohne Politikerfloskeln.",
        color: "bg-rek-magenta/10 text-rek-magenta",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {STEPS.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500`}>
                                <step.icon className="w-10 h-10" />
                            </div>
                            <h4 className="text-2xl font-black text-gray-900 mb-4">{step.title}</h4>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-xs">{step.description}</p>

                            {index < STEPS.length - 1 && (
                                <div className="hidden md:block absolute top-10 -right-6 w-12 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
