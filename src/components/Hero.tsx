import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}hero-bg.png`}
          alt="Rhein-Erft-Kreis Landschaft"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e5007d]/80 to-[#ffed00]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Ihre Stimme im <br />
            <span className="text-rek-gelb">Rhein-Erft-Kreis</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light">
            Gestalte deine Heimat aktiv mit. Schreibe deinen Bürgerbrief direkt an mich und bringe deine Themen voran.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <a
              href="#buergerbrief"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-full text-white bg-rek-magenta hover:bg-[#c4006a] transition-all shadow-lg hover:shadow-rek-magenta/30"
            >
              Bürgerbrief verfassen
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#ansprechpartner"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-full text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all"
            >
              Über Alexander Rheindorf
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom wave or angle */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
