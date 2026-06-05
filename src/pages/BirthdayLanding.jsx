import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, Sparkles } from 'lucide-react';
import Confetti from '../components/Confetti';

export default function BirthdayLanding() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const nextMidnight = new Date(now);
      nextMidnight.setHours(24, 0, 0, 0);
      const distance = nextMidnight - now;

      setTimeLeft({
        days: 0,
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => time.toString().padStart(2, '0');

  const handleGiftClick = () => {
    window.location.href = '/memorylane.html';
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: 'easeOut',
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const floatingDecor = [
    { icon: Heart, className: 'top-[9%] left-[8%] text-rose-300', delay: 0 },
    { icon: Sparkles, className: 'top-[14%] right-[12%] text-amber-300', delay: 0.35 },
    { icon: Heart, className: 'bottom-[16%] left-[12%] text-fuchsia-300', delay: 0.7 },
    { icon: Sparkles, className: 'bottom-[24%] right-[9%] text-teal-300', delay: 1.05 },
  ];

  return (
    <main className="cursive-text relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#ffe4e6_0,#fff7ed_32%,#fdf2f8_62%,#ecfeff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <Confetti />

      <div className="absolute inset-x-0 top-0 h-40 bg-white/45 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-rose-200/50 blur-3xl" aria-hidden="true" />
      <div className="absolute right-0 top-1/4 h-72 w-72 translate-x-1/3 rounded-full bg-cyan-100/70 blur-3xl" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-0">
        {floatingDecor.map(({ icon: Icon, className, delay }) => (
          <motion.div
            key={className}
            animate={{ y: [0, -18, 0], rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 3.2, delay, ease: 'easeInOut' }}
            className={`absolute ${className}`}
          >
            <Icon className="h-8 w-8 drop-shadow-sm sm:h-10 sm:w-10" strokeWidth={1.8} />
          </motion.div>
        ))}
      </div>

      <section className="relative z-20 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-5xl items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 shadow-2xl shadow-rose-200/45 backdrop-blur-xl"
        >
          <div className="h-2 bg-gradient-to-r from-rose-400 via-amber-300 to-teal-300" />

          <div className="px-5 py-8 text-center sm:px-10 sm:py-10 lg:px-14">
            <motion.div
              variants={itemVariants}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500 shadow-inner shadow-white"
            >
              <Gift className="h-8 w-8" strokeWidth={1.8} />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mb-3 text-xs font-bold uppercase tracking-[0.34em] text-rose-500"
            >
              The celebration begins soon
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="birthday-heading text-6xl leading-none text-rose-700 sm:text-7xl md:text-8xl"
            >
              Happy Birthday
              <br />
              <span className="text-5xl text-fuchsia-500 sm:text-6xl md:text-7xl">Manjar</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg"
            >
              A tiny page for a very big day, counting down to midnight with sparkle, sweetness, and a little extra magic.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            >
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-rose-100 bg-gradient-to-br from-white to-rose-50 p-4 shadow-lg shadow-rose-100/70"
                >
                  <div className="text-3xl font-extrabold tabular-nums text-rose-600 sm:text-4xl">
                    {formatTime(item.value)}
                  </div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              variants={itemVariants}
              onClick={handleGiftClick}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative mt-8 inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-slate-950 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-xl shadow-rose-200 transition sm:px-10"
            >
              <Gift className="relative z-10 h-5 w-5" strokeWidth={2} />
              <span className="relative z-10">Unwrap Your Gift</span>
              <motion.div
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              />
            </motion.button>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-sm font-medium text-slate-500"
            >
              Made with love, color, and a countdown to the happiest minute.
            </motion.p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
