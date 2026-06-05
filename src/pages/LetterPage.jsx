import { motion } from 'framer-motion';
import { ArrowRight, Heart, Music2, Sparkles } from 'lucide-react';
import Confetti from '../components/Confetti';

export default function LetterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#fff1f2_0,#fff7ed_34%,#fdf2f8_68%,#ecfeff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <Confetti />

      <div className="absolute inset-x-0 top-0 h-44 bg-white/45 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-rose-200/50 blur-3xl" aria-hidden="true" />
      <div className="absolute right-0 top-1/4 h-72 w-72 translate-x-1/3 rounded-full bg-cyan-100/70 blur-3xl" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-0">
        {[
          'left-[7%] top-[14%] text-rose-300',
          'right-[9%] top-[16%] text-amber-300',
          'bottom-[18%] left-[10%] text-fuchsia-300',
          'bottom-[20%] right-[11%] text-teal-300',
        ].map((className, index) => (
          <motion.div
            key={className}
            animate={{ y: [0, -18, 0], rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 3.4, delay: index * 0.24, ease: 'easeInOut' }}
            className={`absolute ${className}`}
          >
            <Sparkles className="h-8 w-8 drop-shadow-sm sm:h-10 sm:w-10" strokeWidth={1.8} />
          </motion.div>
        ))}
      </div>

      <section className="relative z-20 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-4xl items-center justify-center">
        <motion.article
          initial={{ opacity: 0, y: 26, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full overflow-hidden rounded-[2rem] border border-white/75 bg-white/82 shadow-2xl shadow-rose-200/50 backdrop-blur-xl"
        >
          <div className="h-2 bg-gradient-to-r from-rose-400 via-amber-300 to-teal-300" />

          <div className="px-5 py-8 text-center sm:px-10 sm:py-10 lg:px-14">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.45, ease: 'easeOut' }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500 shadow-inner shadow-white"
            >
              <Heart className="h-8 w-8" fill="currentColor" strokeWidth={1.6} />
            </motion.div>

            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.32em] text-rose-500">
              A letter for you
            </p>

            <h1 className="birthday-heading text-6xl leading-none text-rose-700 sm:text-7xl md:text-8xl">
              Dear Beautiful Soul
            </h1>

            <div className="mx-auto mt-8 max-w-2xl space-y-5 text-left font-sans text-xl font-normal leading-8 text-slate-700 sm:text-2xl sm:leading-9">
              <p>
                Best friend, manjar, gondas, ani ata navin padlel kajukatli.
              </p>
              <p>
                Tula jevdhe nav deu tevdha kami ah aso sarvapratham wish happy happy happy happiest birthday..!!🫶🫶🫶🫶
              </p>
              <p>
                Kay lihych tujhya badal ani ka nahi lihych khara tr mi vichar kela hota jas dar veles tujhya badal je sagl lihito khup kahi bhar bharun lihito tas sagl lihil pn nahi hya veles nahi hya veles kahi tri vegla gift deu mhanla nakkich kas vatala sang mala and ashich mothi hota rha ani nehmi happy raha rad rahu nako tu sad asli mi mala changla nahi vatat hasat ja aplyatle problems bolun clear karat ja🫠 I know mala nahi kalat manatala but i still love u ❤️khup khup prem tula majhya kadhi ani best wishes to you mi tula khup chan chan gift deu shakto but you can't accept iknow aso khup bak bak nahi karnar mi once again happy birthday to you mansiiiii..!!🥰💓
              </p>
              <p>
                And love you🫶😚
              </p>
            </div>

            <motion.a
              href="/playlist"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-xl shadow-rose-200 transition sm:px-10"
            >
              <Music2 className="h-5 w-5" strokeWidth={2} />
              Open Playlist
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </motion.a>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
