import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-animate bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 flex items-center justify-center">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <Trophy className="w-24 h-24 text-yellow-300 drop-shadow-[0_0_15px_rgba(255,255,0,0.5)]" />
        <motion.div
          className="absolute inset-0"
          animate={{
            boxShadow: [
              "0 0 20px rgba(255,255,0,0.2)",
              "0 0 40px rgba(255,255,0,0.4)",
              "0 0 20px rgba(255,255,0,0.2)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-white text-xl mt-8 font-semibold"
      >
        Preparing Amazing Prizes...
      </motion.p>
    </div>
  );
};