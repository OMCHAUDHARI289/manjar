import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Heart, Music2, Pause, Play, Sparkles, Star } from 'lucide-react';
import Confetti from '../components/Confetti';

const playlist = [
  {
    title: 'Mala Ved Lagle',
    artist: 'Unknown',
    tag: 'First photo',
    duration: '3:26',
    cover: '/pic1.jpg.jpeg',
    src: '/Mala Ved Laagale - Full Audio  Time Pass  Swapnil Bandodkar  Chinar-Mahesh  Guru Thakur.mp3',
    startAt: 206,
    memory: 'For the very first memory that still feels special.',
  },
  {
    title: 'Pehli Nazar Mein',
    artist: 'Pritam and Atif Aslam',
    tag: 'Second photo',
    duration: '4:23',
    cover: '/pic2.jpg.jpeg',
    src: '/Pehli Nazar Mein  Atif Aslam  Blackscreen WhatsApp Status.mp3',
    startAt: 3,
    memory: 'A song for the first look that still feels unforgettable.',
  },
  {
    title: 'Darasal',
    artist: 'Atif Aslam',
    tag: 'Third photo',
    duration: '4:29',
    cover: '/pic3.jpg.jpeg',
    src: '/Atif Aslam _ Darasal Full Video Song  Raabta  Sushant Singh Rajput & Kriti Sanon  Pritam.mp3',
    startAt: 0,
    memory: 'For quiet nights, soft talks, and every starry memory.',
  },
  {
    title: 'Taarif Karoon Kya Uski',
    artist: 'Sanam',
    tag: 'Fourth photo',
    duration: '3:02',
    cover: '/pic4.jpg.jpeg',
    src: '/Taarif Karoon Kya Uski  Recreated  तरफ कर कय उसक  SANAM.mp3',
    startAt: 0,
    memory: 'Because some songs simply sound like admiration.',
  },
];

const floatingDecor = [
  'left-[6%] top-[12%] text-rose-300',
  'right-[10%] top-[14%] text-amber-300',
  'bottom-[15%] left-[9%] text-fuchsia-300',
  'bottom-[22%] right-[8%] text-teal-300',
];

export default function PlaylistPage() {
  const audioRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [burstIndex, setBurstIndex] = useState(null);
  const activeSong = activeIndex === null ? null : playlist[activeIndex];

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleSong = (index) => {
    const song = playlist[index];

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    if (activeIndex === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.src = song.src;
    audioRef.current.currentTime = song.startAt ?? 0;
    audioRef.current.play()
      .then(() => {
        setActiveIndex(index);
        setIsPlaying(true);
        setBurstIndex(index);
        setTimeout(() => setBurstIndex(null), 1100);
      })
      .catch(() => {
        setActiveIndex(index);
        setIsPlaying(false);
        setBurstIndex(index);
        setTimeout(() => setBurstIndex(null), 1100);
      });
  };

  return (
    <main className="cursive-text relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#ffe4e6_0,#fff7ed_32%,#fdf2f8_62%,#ecfeff_100%)] px-4 py-6 pb-28 text-slate-900 sm:px-6 lg:px-8">
      <Confetti />

      <div className="absolute inset-x-0 top-0 h-40 bg-white/45 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-rose-200/50 blur-3xl" aria-hidden="true" />
      <div className="absolute right-0 top-1/4 h-72 w-72 translate-x-1/3 rounded-full bg-cyan-100/70 blur-3xl" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-0">
        {floatingDecor.map((className, index) => (
          <motion.div
            key={className}
            animate={{ y: [0, -18, 0], rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 3.2, delay: index * 0.28, ease: 'easeInOut' }}
            className={`absolute ${className}`}
          >
            <Sparkles className="h-8 w-8 drop-shadow-sm sm:h-10 sm:w-10" strokeWidth={1.8} />
          </motion.div>
        ))}
      </div>

      <section className="relative z-20 mx-auto w-full max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mx-auto max-w-3xl py-8 text-center sm:py-10"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500 shadow-inner shadow-white">
            <Music2 className="h-8 w-8" strokeWidth={1.8} />
          </div>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.34em] text-rose-500">
            Final surprise
          </p>
          <h1 className="birthday-heading text-6xl leading-none text-rose-700 sm:text-7xl md:text-8xl">
            Our Playlist
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Every beat, every lyric, every little memory gathered into one last birthday surprise.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {playlist.map((song, index) => {
            const playingThis = activeIndex === index && isPlaying;

            return (
              <motion.article
                key={song.title}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className={`relative overflow-hidden rounded-[2rem] border bg-white/80 p-4 shadow-xl shadow-rose-100/70 backdrop-blur-xl transition ${playingThis ? 'border-rose-300 ring-4 ring-rose-200/70' : 'border-white/75'}`}
              >
                {burstIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1.35] }}
                    transition={{ duration: 1.05, ease: 'easeOut' }}
                    className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-white/35"
                    aria-hidden="true"
                  >
                    <Star className="h-24 w-24 text-amber-300 drop-shadow-[0_0_18px_rgba(251,191,36,0.85)]" fill="currentColor" strokeWidth={1.4} />
                  </motion.div>
                )}

                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-rose-50">
                  <img src={song.cover} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-rose-600">
                    {song.tag}
                  </div>
                </div>

                <div className="px-1 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-3xl leading-8 text-rose-700">{song.title}</h2>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{song.artist}</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-extrabold text-amber-700">
                      {song.duration}
                    </span>
                  </div>

                  <p className="mt-4 min-h-14 text-sm leading-6 text-slate-600">
                    {song.memory}
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <motion.button
                      type="button"
                      onClick={() => toggleSong(index)}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-lg shadow-rose-100 transition"
                    >
                      {playingThis ? <Pause className="h-4 w-4" fill="currentColor" /> : <Play className="h-4 w-4" fill="currentColor" />}
                      {playingThis ? 'Pause' : 'Play'}
                    </motion.button>
                    <button
                      type="button"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-100 bg-white text-rose-500 shadow-lg shadow-rose-100/70 transition hover:bg-rose-50"
                      aria-label={`Favorite ${song.title}`}
                    >
                      <Heart className="h-5 w-5" fill="currentColor" strokeWidth={1.6} />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-9 text-center">
          <motion.a
            href="/final-wish"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-extrabold uppercase tracking-[0.18em] text-white shadow-xl shadow-rose-200 transition sm:px-10"
          >
            <Gift className="h-5 w-5" strokeWidth={2} />
            Final Birthday Wish
            <ArrowRight className="h-5 w-5" strokeWidth={2} />
          </motion.a>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: activeSong ? 1 : 0, y: activeSong ? 0 : 28 }}
        className="fixed inset-x-4 bottom-5 z-40 mx-auto flex max-w-2xl items-center gap-4 rounded-full border border-white/80 bg-white/88 px-4 py-3 shadow-2xl shadow-rose-200/60 backdrop-blur-xl"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
          {isPlaying ? <Pause className="h-5 w-5" fill="currentColor" /> : <Music2 className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-slate-800">
            {activeSong ? `${isPlaying ? 'Playing' : 'Ready'}: ${activeSong.title}` : ''}
          </p>
          <div className="mt-2 flex h-4 items-end gap-1">
            {[0, 1, 2, 3, 4].map((bar) => (
              <motion.span
                key={bar}
                animate={{ height: isPlaying ? [6, 16, 8] : 6 }}
                transition={{ repeat: Infinity, duration: 0.8, delay: bar * 0.08, ease: 'easeInOut' }}
                className="w-1 rounded-full bg-rose-400"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
