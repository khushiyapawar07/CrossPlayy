import { useState } from 'react';
import { StationCard } from './StationCard';
import { Monitor, Gamepad2 } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

const ps5Stations = [
  {
    id: 1,
    name: 'PS5 Station 01',
    image: 'https://images.unsplash.com/photo-1709587796970-4e6bae1d4c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBzZXR1cCUyMHBzNSUyMGNvbnNvbGUlMjBkYXJrJTIwbmVvbiUyMHJnYnxlbnwxfHx8fDE3NzcyNjg2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available' as const,
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
  },
  {
    id: 2,
    name: 'PS5 Station 02',
    image: 'https://images.unsplash.com/photo-1709587797077-7a2c94411514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMHBzNSUyMGNvbnNvbGUlMjBkYXJrJTIwbmVvbiUyMHJnYnxlbnwxfHx8fDE3NzcyNjg2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available' as const,
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
  },
  {
    id: 3,
    name: 'PS5 Station 03',
    image: 'https://images.unsplash.com/photo-1709587797209-7f3015fc8d35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxnYW1pbmclMjBzZXR1cCUyMHBzNSUyMGNvbnNvbGUlMjBkYXJrJTIwbmVvbiUyMHJnYnxlbnwxfHx8fDE3NzcyNjg2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'booked' as const,
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
  },
  {
    id: 4,
    name: 'PS5 Station 04',
    image: 'https://images.unsplash.com/photo-1664092815290-545fefded940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxnYW1pbmclMjBzZXR1cCUyMHBzNSUyMGNvbnNvbGUlMjBkYXJrJTIwbmVvbiUyMHJnYnxlbnwxfHx8fDE3NzcyNjg2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available' as const,
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
  },
  {
    id: 5,
    name: 'PS5 Station 05',
    image: 'https://images.unsplash.com/photo-1611829713792-e1841cbe2cf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxnYW1pbmclMjBzZXR1cCUyMHBzNSUyMGNvbnNvbGUlMjBkYXJrJTIwbmVvbiUyMHJnYnxlbnwxfHx8fDE3NzcyNjg2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available' as const,
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
  },
  {
    id: 6,
    name: 'PS5 Station 06',
    image: 'https://images.unsplash.com/photo-1651954396816-7a7a59df322e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxnYW1pbmclMjBzZXR1cCUyMHBzNSUyMGNvbnNvbGUlMjBkYXJrJTIwbmVvbiUyMHJnYnxlbnwxfHx8fDE3NzcyNjg2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'booked' as const,
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
  },
  {
    id: 7,
    name: 'PS5 Station 07',
    image: 'https://images.unsplash.com/photo-1659546565872-063edf45fd18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxnYW1pbmclMjBzZXR1cCUyMHBzNSUyMGNvbnNvbGUlMjBkYXJrJTIwbmVvbiUyMHJnYnxlbnwxfHx8fDE3NzcyNjg2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available' as const,
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
  },
  {
    id: 8,
    name: 'PS5 Station 08',
    image: 'https://images.unsplash.com/photo-1709587797203-b28ef0e16e31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxnYW1pbmclMjBzZXR1cCUyMHBzNSUyMGNvbnNvbGUlMjBkYXJrJTIwbmVvbiUyMHJnYnxlbnwxfHx8fDE3NzcyNjg2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available' as const,
    price: 200,
    specs: ['4K Display', 'DualSense Controller', 'Premium Audio'],
  },
];

const pcStations = [
  {
    id: 1,
    name: 'Gaming PC 01',
    image: 'https://images.unsplash.com/photo-1771014817844-327a14245bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBQQyUyMHNldHVwJTIwcmdiJTIwa2V5Ym9hcmQlMjBkYXJrJTIwbmVvbiUyMGxpZ2h0c3xlbnwxfHx8fDE3NzcyNjg2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available' as const,
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
  },
  {
    id: 2,
    name: 'Gaming PC 02',
    image: 'https://images.unsplash.com/photo-1771014846919-3a1cf73aeea1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBQQyUyMHNldHVwJTIwcmdiJTIwa2V5Ym9hcmQlMjBkYXJrJTIwbmVvbiUyMGxpZ2h0c3xlbnwxfHx8fDE3NzcyNjg2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available' as const,
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
  },
  {
    id: 3,
    name: 'Gaming PC 03',
    image: 'https://images.unsplash.com/photo-1613442986373-af81e5c618d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxnYW1pbmclMjBQQyUyMHNldHVwJTIwcmdiJTIwa2V5Ym9hcmQlMjBkYXJrJTIwbmVvbiUyMGxpZ2h0c3xlbnwxfHx8fDE3NzcyNjg2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'booked' as const,
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
  },
  {
    id: 4,
    name: 'Gaming PC 04',
    image: 'https://images.unsplash.com/photo-1603481546579-65d935ba9cdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxnYW1pbmclMjBQQyUyMHNldHVwJTIwcmdiJTIwa2V5Ym9hcmQlMjBkYXJrJTIwbmVvbiUyMGxpZ2h0c3xlbnwxfHx8fDE3NzcyNjg2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available' as const,
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
  },
  {
    id: 5,
    name: 'Gaming PC 05',
    image: 'https://images.unsplash.com/photo-1636036824578-d0d300a4effb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxnYW1pbmclMjBQQyUyMHNldHVwJTIwcmdiJTIwa2V5Ym9hcmQlMjBkYXJrJTIwbmVvbiUyMGxpZ2h0c3xlbnwxfHx8fDE3NzcyNjg2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'available' as const,
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
  },
  {
    id: 6,
    name: 'Gaming PC 06',
    image: 'https://images.unsplash.com/photo-1636036798069-195bd06f340c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxnYW1pbmclMjBQQyUyMHNldHVwJTIwcmdiJTIwa2V5Ym9hcmQlMjBkYXJrJTIwbmVvbiUyMGxpZ2h0c3xlbnwxfHx8fDE3NzcyNjg2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    status: 'booked' as const,
    price: 300,
    specs: ['RTX 4070 GPU', '165Hz Monitor', 'Mechanical RGB Keyboard'],
  },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'ps5' | 'pc'>('ps5');

  const handleBook = (id: number, type: 'ps5' | 'pc') => {
    onNavigate('booking', { stationId: id, stationType: type });
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
          {activeTab === 'ps5' && ps5Stations.map(station => (
            <StationCard
              key={station.id}
              id={station.id}
              type="ps5"
              name={station.name}
              image={station.image}
              status={station.status}
              price={station.price}
              specs={station.specs}
              onBook={handleBook}
            />
          ))}

          {activeTab === 'pc' && pcStations.map(station => (
            <StationCard
              key={station.id}
              id={station.id}
              type="pc"
              name={station.name}
              image={station.image}
              status={station.status}
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
