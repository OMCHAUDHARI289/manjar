import { motion } from 'framer-motion';
import { Gift, Heart, Sparkles, Star } from 'lucide-react';
import Confetti from '../components/Confetti';

const floatingDecor = [
  { icon: Heart, className: 'left-[7%] top-[13%] text-rose-300', delay: 0 },
  { icon: Star, className: 'right-[11%] top-[16%] text-amber-300', delay: 0.24 },
  { icon: Sparkles, className: 'bottom-[18%] left-[10%] text-fuchsia-300', delay: 0.48 },
  { icon: Heart, className: 'bottom-[22%] right-[9%] text-teal-300', delay: 0.72 },
];

export default function FinalWishPage() {
  return (
    <main className="cursive-text relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#ffe4e6_0,#fff7ed_32%,#fdf2f8_62%,#ecfeff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <Confetti />

      <div className="absolute inset-x-0 top-0 h-40 bg-white/45 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/3 rounded-full bg-rose-200/55 blur-3xl" aria-hidden="true" />
      <div className="absolute right-0 top-1/4 h-72 w-72 translate-x-1/3 rounded-full bg-cyan-100/75 blur-3xl" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-0">
        {floatingDecor.map(({ icon: Icon, className, delay }) => (
          <motion.div
            key={className}
            animate={{ y: [0, -18, 0], rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 3.2, delay, ease: 'easeInOut' }}
            className={`absolute ${className}`}
          >
            <Icon className="h-8 w-8 drop-shadow-sm sm:h-10 sm:w-10" fill="currentColor" strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      <section className="relative z-20 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-4xl items-center justify-center">
        <motion.article
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="w-full overflow-hidden rounded-[2rem] border border-white/75 bg-white/82 shadow-2xl shadow-rose-200/50 backdrop-blur-xl"
        >
          <div className="h-2 bg-gradient-to-r from-rose-400 via-amber-300 to-teal-300" />

          <div className="px-5 py-9 text-center sm:px-10 sm:py-12 lg:px-14">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.1, duration: 0.55, ease: 'easeOut' }}
              className="mx-auto mb-6 flex h-18 w-18 items-center justify-center rounded-full bg-rose-100 text-rose-500 shadow-inner shadow-white"
            >
              <Gift className="h-9 w-9" strokeWidth={1.8} />
            </motion.div>

            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.34em] text-rose-500">
              One last wish
            </p>

            <h1 className="birthday-heading text-6xl leading-none text-rose-700 sm:text-7xl md:text-8xl">
              Happy Birthday
              <br />
              <span className="text-5xl text-fuchsia-500 sm:text-6xl md:text-7xl">Beautiful Soul</span>
            </h1>

            <div className="mx-auto mt-8 max-w-2xl space-y-5 text-left text-2xl leading-9 text-slate-700 sm:text-3xl sm:leading-10">
              <p>
                May your smile stay this bright, your heart stay this soft, and your every dream find its way to you.
              </p>
              <p>
                You deserve a year full of love, peace, surprises, and the kind of happiness that stays quietly with you.
              </p>
              <p className="text-center text-rose-600">
                Happiest birthday, always.
              </p>
            </div>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
