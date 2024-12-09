export interface Guide {
  jomax_id: string;
  tickets: number[];
}

export interface Winner {
  guide: Guide;
  ticket: number;
  prize: 'Pulsar Bike' | 'Jupiter Scooty';
}