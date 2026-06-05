import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Pause, Play, SkipForward, Volume2 } from 'lucide-react';

const tracks = [
  {
    title: 'Tum Se',
    artist: 'Sachin-Jigar, Raghav, Varun, Indraneel',
    src: '/Tum Se(Full Video)_ Shahid, Kriti  Sachin-Jigar,Raghav,Varun,Indraneel Teri Baaton Mein Uljha Jiya.mp3',
  },
  {
    title: 'Pehli Nazar Mein',
    artist: 'Pritam and Atif Aslam',
    src: '/Pehli Nazar Mein  Atif Aslam  Blackscreen WhatsApp Status.mp3',
  },
  {
    title: 'Darasal',
    artist: 'Pritam and Atif Aslam',
    src: '/Atif Aslam _ Darasal Full Video Song  Raabta  Sushant Singh Rajput & Kriti Sanon  Pritam.mp3',
  },
];

export default function FloatingMusicPlayer() {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [notice, setNotice] = useState('');
  const currentTrack = tracks[trackIndex];

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const playCurrent = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    audioRef.current.src = currentTrack.src;
    audioRef.current.currentTime = 23;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setNotice('');
      })
      .catch(() => {
        setIsPlaying(false);
        setNotice('Add the song file to public to play it.');
      });
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    playCurrent();
  };

  const nextTrack = () => {
    const nextIndex = (trackIndex + 1) % tracks.length;
    setTrackIndex(nextIndex);
    setIsPlaying(false);
    setNotice('');

    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="fixed right-4 top-4 z-40 w-[min(92vw,21rem)] rounded-[2rem] border border-white/75 bg-white/84 p-3 text-slate-800 shadow-2xl shadow-rose-200/50 backdrop-blur-xl sm:right-6 sm:top-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500 shadow-inner shadow-white">
          {isPlaying ? <Volume2 className="h-6 w-6" strokeWidth={1.8} /> : <Music2 className="h-6 w-6" strokeWidth={1.8} />}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-2xl leading-7 text-rose-700">{currentTrack.title}</p>
          <p className="truncate text-sm font-semibold text-slate-500">{currentTrack.artist}</p>
        </div>

        <button
          type="button"
          onClick={togglePlay}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg shadow-rose-100 transition hover:-translate-y-0.5"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5" fill="currentColor" />}
        </button>

        <button
          type="button"
          onClick={nextTrack}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-rose-100 bg-white text-rose-500 shadow-lg shadow-rose-100/70 transition hover:-translate-y-0.5 hover:bg-rose-50"
          aria-label="Next song"
        >
          <SkipForward className="h-5 w-5" fill="currentColor" />
        </button>
      </div>

      {notice && (
        <p className="mt-2 px-2 text-center text-sm font-semibold text-rose-600">
          {notice}
        </p>
      )}
    </motion.div>
  );
}
