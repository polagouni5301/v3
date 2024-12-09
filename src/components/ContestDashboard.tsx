import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import type { Guide, Winner } from '../types';
import { WinnerModal } from './WinnerModal';
import { CountdownOverlay } from './CountdownOverlay';

interface ContestDashboardProps {
  guides: Guide[];
  onSelectWinner: () => Winner;
}

export const ContestDashboard: React.FC<ContestDashboardProps> = ({
  guides,
  onSelectWinner,
}) => {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [currentWinner, setCurrentWinner] = useState<Winner | null>(null);
  const [showCountdown, setShowCountdown] = useState(false);

  const handleGenerateWinner = () => {
    if (winners.length >= 2) return;
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    const winner = onSelectWinner();
    setCurrentWinner(winner);
    setWinners((prev) => [...prev, winner]);
  };

  return (
    <div className="text-center space-y-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-center items-center space-x-4"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Trophy className="w-12 h-12 text-yellow-500" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Thrilling Contest Dashboard
        </h1>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Trophy className="w-12 h-12 text-yellow-500" />
        </motion.div>
      </motion.div>

      {winners.length < 2 ? (
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerateWinner}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg relative overflow-hidden group"
        >
          <span className="relative z-10">Reveal Lucky Winner!</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
      ) : (
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
        >
          All Winners Selected!
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {winners.map((winner, index) => (
          <motion.div
            key={winner.guide.jomax_id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-white to-purple-50 p-6 rounded-lg shadow-lg border border-purple-100 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <h3 className="text-xl font-bold mb-2">Winner {index + 1}</h3>
            <p className="text-gray-600">Guide ID: {winner.guide.jomax_id}</p>
            <p className="text-gray-600">Winning Ticket: {winner.ticket}</p>
            <p className="text-purple-600 font-bold">{winner.prize}</p>
          </motion.div>
        ))}
      </div>

      <CountdownOverlay isVisible={showCountdown} onComplete={handleCountdownComplete} />
      <WinnerModal winner={currentWinner} onClose={() => setCurrentWinner(null)} />
    </div>
  );
};