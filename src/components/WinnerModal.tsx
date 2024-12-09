import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Bike, Car } from 'lucide-react';
import type { Winner } from '../types';

interface WinnerModalProps {
  winner: Winner | null;
  onClose: () => void;
}

export const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
  if (!winner) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Confetti />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-2xl text-white text-center shadow-xl max-w-md w-full mx-4"
        >
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold mb-4"
          >
            Winner {winner.prize === 'Pulsar Bike' ? '1' : '2'}
          </motion.h2>
          <p className="text-xl mb-6">Congratulations! You've won:</p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-6"
          >
            {winner.prize}
          </motion.div>
          <div className="text-8xl mb-6 flex justify-center">
            {winner.prize === 'Pulsar Bike' ? (
              <Bike className="text-white w-24 h-24" />
            ) : (
              <Car className="text-white w-24 h-24" />
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-white text-purple-500 px-8 py-2 rounded-full font-semibold"
          >
            Continue
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};