import { useEffect, useMemo, useState } from 'react';
import { StationCard } from './StationCard';
import { Monitor, Gamepad2 } from 'lucide-react';
import { api } from '../lib/api';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
  isAuthenticated: boolean;
}
interface Station {
  _id: string;
  name: string;
  image: string;
  status: 'available' | 'booked' | 'maintenance';
  price: number;
  type: 'ps5' | 'pc';
  specs?: string[];
}

export function Dashboard({ onNavigate, isAuthenticated }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'ps5' | 'pc'>('ps5');
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setError('');
        const result = await api.stations.all();
        setStations(result.stations || []);
      } catch (fetchError: any) {
        setError(fetchError.message || 'Failed to load stations');
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const ps5Stations = useMemo(() => stations.filter((station) => station.type === 'ps5'), [stations]);
  const pcStations = useMemo(() => stations.filter((station) => station.type === 'pc'), [stations]);

  const handleBook = (id: string, type: 'ps5' | 'pc') => {
    const station = stations.find((item) => item._id === id);

    if (!isAuthenticated) {
      onNavigate('auth', { mode: 'user', redirect: { page: 'booking', data: { stationId: id, stationType: type, price: station?.price } } });
      return;
    }

    onNavigate('booking', {
      stationId: id,
      stationType: type,
      stationName: station?.name,
      price: station?.price,
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">
              Choose Your Station
            </span>
          </h1>
          <p className="text-gray-400 text-lg">Select from our premium gaming setups and book your slot</p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-2xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] p-1.5">
            <button
              onClick={() => setActiveTab('ps5')}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 ${
                activeTab === 'ps5'
                  ? 'bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)] text-[#0a0a0f] shadow-lg shadow-[var(--neon-cyan)]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-5 h-5" />
              <span className="font-semibold">PS5 Zone</span>
              <span className={`px-2 py-1 rounded-lg text-xs ${
                activeTab === 'ps5' ? 'bg-[#0a0a0f]/20' : 'bg-[var(--glass-bg)]'
              }`}>
                {ps5Stations.filter(s => s.status === 'available').length} Available
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pc')}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 ${
                activeTab === 'pc'
                  ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] text-white shadow-lg shadow-[var(--neon-purple)]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Monitor className="w-5 h-5" />
              <span className="font-semibold">PC Zone</span>
              <span className={`px-2 py-1 rounded-lg text-xs ${
                activeTab === 'pc' ? 'bg-white/20' : 'bg-[var(--glass-bg)]'
              }`}>
                {pcStations.filter(s => s.status === 'available').length} Available
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading && <p className="text-gray-400 col-span-full">Loading stations...</p>}
          {!loading && error && <p className="text-red-400 col-span-full">{error}</p>}

          {activeTab === 'ps5' && ps5Stations.map(station => (
            <StationCard
              key={station._id}
              id={station._id}
              type="ps5"
              name={station.name}
              image={station.image}
              status={station.status === 'available' ? 'available' : 'booked'}
              price={station.price}
              specs={station.specs}
              onBook={handleBook}
            />
          ))}

          {activeTab === 'pc' && pcStations.map(station => (
            <StationCard
              key={station._id}
              id={station._id}
              type="pc"
              name={station.name}
              image={station.image}
              status={station.status === 'available' ? 'available' : 'booked'}
              price={station.price}
              specs={station.specs}
              onBook={handleBook}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
