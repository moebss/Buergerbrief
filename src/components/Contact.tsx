import { motion } from "motion/react";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="ansprechpartner" className="py-32 bg-white relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rek-gelb/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rek-magenta/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] bg-gray-100">
              <img
                src={`${import.meta.env.BASE_URL}alexander-rheindorf.jpg`}
                alt="Alexander Rheindorf"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Premium Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rek-gelb/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-rek-magenta/20 rounded-full blur-3xl animate-pulse" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 mb-6 rounded-full bg-rek-magenta/10 border border-rek-magenta/20"
            >
              <span className="text-sm font-bold tracking-widest text-rek-magenta uppercase">
                Ihr Ansprechpartner
              </span>
            </motion.div>

            <h3 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">
              Alexander <br />
              <span className="text-rek-magenta">Rheindorf</span>
            </h3>

            <div className="text-xl text-gray-600 mb-10 leading-relaxed space-y-6 font-light">
              <p>
                Als engagierter Kommunalpolitiker im <span className="font-semibold text-gray-900">Rhein-Erft-Kreis</span> setze ich mich leidenschaftlich für Ihre Belange ein. Ob Infrastruktur, Bildung oder Digitalisierung – Ihre Themen sind mein Antrieb.
              </p>
              <p>
                Ich bin fest davon überzeugt, dass positive Veränderungen durch einen <span className="font-semibold text-gray-900">direkten Dialog</span> entstehen. Gemeinsam schaffen wir zukunftssichere Rahmenbedingungen für Bürger und Unternehmen.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <div className="flex items-center group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-rek-magenta/5 text-rek-magenta group-hover:bg-rek-magenta group-hover:text-white transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                </div>
                <div className="ml-5">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Schreiben Sie mir</h4>
                  <a href="mailto:alexander.rheindorf@fdp-rek.de" className="text-xl font-bold text-gray-900 hover:text-rek-magenta transition-colors">
                    alexander.rheindorf@fdp-rek.de
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>

  );
}
