import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with subtle Parallax */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={`${import.meta.env.BASE_URL}hero-bg.png`}
          alt="Rhein-Erft-Kreis Landschaft"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rek-magenta/80 to-rek-gelb/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center mt-[-2vh] md:mt-[-4vh]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 md:mb-8 leading-[1.05] md:leading-[1.1]"
          >
            Ihre Stimme im <br />
            <span className="text-rek-gelb drop-shadow-[0_0_15px_rgba(255,237,0,0.3)]">Rhein-Erft-Kreis</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 md:mt-6 text-lg md:text-2xl text-gray-100/90 max-w-2xl mx-auto font-light leading-relaxed px-2 md:px-0"
          >
            Gestalte deine Heimat aktiv mit. Schreibe deinen <span className="font-semibold text-white">Bürgerbrief</span> direkt an mich und bringe deine Themen voran.
          </motion.p>

          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <motion.a
              href="#buergerbrief"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(229, 0, 125, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-bold rounded-2xl text-white bg-rek-magenta transition-all shadow-xl shadow-rek-magenta/20"
            >
              Bürgerbrief verfassen
              <ArrowRight className="ml-3 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Modern bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />

    </section>
  );
}
