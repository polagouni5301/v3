import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ContestDashboard } from './components/ContestDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { fetchGuideData } from './utils/fetchData';
import type { Guide, Winner } from './types';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [activeTab, setActiveTab] = useState<'contest' | 'admin'>('contest');
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [usedTickets, setUsedTickets] = useState<number[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGuideData();
        setGuides(data);
      } catch (error) {
        toast.error('Failed to load guide data. Please try again later.');
        console.error('Error loading guide data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const selectWinner = (): Winner => {
    const availableGuides = guides.filter(guide =>
      guide.tickets.some(ticket => !usedTickets.includes(ticket))
    );
    
    if (availableGuides.length === 0) {
      throw new Error('No more available tickets');
    }
    
    const randomGuide = availableGuides[Math.floor(Math.random() * availableGuides.length)];
    const availableTickets = randomGuide.tickets.filter(ticket => !usedTickets.includes(ticket));
    const winningTicket = availableTickets[Math.floor(Math.random() * availableTickets.length)];
    
    setUsedTickets(prev => [...prev, winningTicket]);
    
    return {
      guide: randomGuide,
      ticket: winningTicket,
      prize: usedTickets.length === 0 ? 'Pulsar Bike' : 'Jupiter Scooty'
    };
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-animate bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 p-8">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-8">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          {activeTab === 'contest' ? (
            <ContestDashboard guides={guides} onSelectWinner={selectWinner} />
          ) : (
            <AdminDashboard guides={guides} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;