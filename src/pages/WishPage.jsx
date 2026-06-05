import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send, Sparkles, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Confetti from '../components/Confetti';

const shootingStars = Array.from({ length: 18 }).map((_, index) => ({
  id: index,
  top: 10 + ((index * 17) % 74),
  delay: index * 0.12,
  duration: 1.4 + (index % 4) * 0.18,
  size: 14 + (index % 3) * 5,
}));

function WishCelebration() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      <Confetti />
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ x: '-12vw', y: 0, opacity: 0, rotate: -18, scale: 0.7 }}
          animate={{ x: '112vw', y: [-8, 18, -6], opacity: [0, 1, 1, 0], rotate: 18, scale: [0.7, 1.12, 0.9] }}
          transition={{ duration: star.duration, delay: star.delay, ease: 'easeOut' }}
          className="absolute text-amber-300 drop-shadow-[0_0_14px_rgba(251,191,36,0.9)]"
          style={{ top: `${star.top}%` }}
        >
          <Star size={star.size} fill="currentColor" strokeWidth={1.4} />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.88, 1, 1.02, 0.96] }}
        transition={{ duration: 3.1, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center px-5"
      >
        <div className="rounded-[2rem] border border-white/80 bg-white/82 px-7 py-6 text-center shadow-2xl shadow-rose-200/60 backdrop-blur-xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-rose-500">Wish saved</p>
          <p className="birthday-heading mt-2 text-5xl leading-none text-rose-700 sm:text-6xl">A little magic is on the way</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function WishPage() {
  const navigate = useNavigate();
  const [wish, setWish] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status !== 'success') {
      return undefined;
    }

    const timer = setTimeout(() => {
      navigate('/letter');
    }, 3300);

    return () => clearTimeout(timer);
  }, [navigate, status]);

  const submitWish = async (event) => {
    event.preventDefault();

    const trimmedWish = wish.trim();
    if (trimmedWish.length < 3) {
      setStatus('error');
      setMessage('Please write a little wish first.');
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wish: trimmedWish,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Could not save the wish.');
      }

      setStatus('success');
      setMessage('Your wish is saved. Opening your letter...');
      setWish('');
    } catch (error) {
      setStatus('error');
      setMessage(error.message);
    }
  };

  return (
    <main className="cursive-text relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#ffe4e6_0,#fff7ed_32%,#fdf2f8_62%,#ecfeff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      {status === 'success' && <WishCelebration />}

      <div className="absolute inset-x-0 top-0 h-40 bg-white/45 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-rose-200/50 blur-3xl" aria-hidden="true" />
      <div className="absolute right-0 top-1/4 h-72 w-72 translate-x-1/3 rounded-full bg-cyan-100/70 blur-3xl" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-0">
        {[
          'left-[8%] top-[12%] text-rose-300',
          'right-[12%] top-[18%] text-amber-300',
          'bottom-[16%] left-[12%] text-fuchsia-300',
          'bottom-[22%] right-[10%] text-teal-300',
        ].map((className, index) => (
          <motion.div
            key={className}
            animate={{ y: [0, -16, 0], rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 3.2, delay: index * 0.25, ease: 'easeInOut' }}
            className={`absolute ${className}`}
          >
            <Sparkles className="h-8 w-8 drop-shadow-sm sm:h-10 sm:w-10" strokeWidth={1.8} />
          </motion.div>
        ))}
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-3xl items-center justify-center">
        <motion.form
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          onSubmit={submitWish}
          className="w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white/78 shadow-2xl shadow-rose-200/45 backdrop-blur-xl"
        >
          <div className="h-2 bg-gradient-to-r from-rose-400 via-amber-300 to-teal-300" />

          <div className="px-5 py-8 text-center sm:px-10 sm:py-10 lg:px-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500 shadow-inner shadow-white">
              <Heart className="h-8 w-8" strokeWidth={1.8} />
            </div>

            <p className="mb-3 text-xs font-bold uppercase tracking-[0.34em] text-rose-500">
              Make a birthday wish
            </p>

            <h1 className="birthday-heading text-6xl leading-none text-rose-700 sm:text-7xl">
              Write Your Wish
            </h1>

            <div className="mx-auto mt-7 max-w-xl text-left">
              <label className="block">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                  Wish
                </span>
                <textarea
                  value={wish}
                  onChange={(event) => setWish(event.target.value)}
                  className="min-h-40 w-full resize-none rounded-2xl border border-rose-100 bg-white/88 px-4 py-3 text-base leading-7 text-slate-800 outline-none shadow-lg shadow-rose-100/50 transition focus:border-rose-300 focus:ring-4 focus:ring-rose-100"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                  maxLength={800}
                  placeholder="Write the wish here..."
                  required
                />
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={status === 'saving'}
              whileHover={status === 'saving' ? undefined : { scale: 1.03, y: -2 }}
              whileTap={status === 'saving' ? undefined : { scale: 0.95 }}
              className="mt-7 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-slate-950 px-8 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-xl shadow-rose-200 transition disabled:cursor-not-allowed disabled:opacity-65"
            >
              <Send className="h-5 w-5" strokeWidth={2} />
              {status === 'saving' ? 'Saving...' : 'Save Wish'}
            </motion.button>

            {message && (
              <p className={`mt-5 text-sm font-semibold ${status === 'success' ? 'text-teal-600' : 'text-rose-600'}`}>
                {message}
              </p>
            )}
          </div>
        </motion.form>
      </section>
    </main>
  );
}
