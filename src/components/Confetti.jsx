import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const pieces = ['✦', '★', '❤', '◆', '●', '✧'];
const colors = ['#fb7185', '#f59e0b', '#a855f7', '#14b8a6', '#f43f5e'];

const Confetti = () => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const createConfetti = () => {
      const newConfetti = Array.from({ length: 42 }).map((_, i) => ({
        id: `${Date.now()}-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 3.6 + Math.random() * 1.8,
        drift: -30 + Math.random() * 60,
        rotate: -180 + Math.random() * 360,
        piece: pieces[Math.floor(Math.random() * pieces.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      setConfetti(newConfetti);
    };

    createConfetti();
    const interval = setInterval(createConfetti, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: -32, x: 0, rotate: 0, opacity: 0 }}
          animate={{ y: '108vh', x: item.drift, rotate: item.rotate, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: 'easeInOut',
          }}
          className="absolute text-xl md:text-2xl"
          style={{ left: `${item.left}%`, color: item.color }}
        >
          {item.piece}
        </motion.div>
      ))}
    </div>
  );
};

export default Confetti;
