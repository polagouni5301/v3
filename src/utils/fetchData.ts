import type { Guide } from '../types';

export const fetchGuideData = async (): Promise<Guide[]> => {
  try {
    const response = await fetch('/tickets.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Transform the data to match our Guide interface
    return data.map((item: any) => ({
      jomax_id: item.Jomax,
      tickets: item.TicketAssigned.split(',').map(Number)
    }));
  } catch (error) {
    console.error('Error fetching guide data:', error);
    throw error;
  }
};