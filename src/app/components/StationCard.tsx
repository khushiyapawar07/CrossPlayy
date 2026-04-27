import { motion } from 'motion/react';
import { Circle, Clock } from 'lucide-react';

interface StationCardProps {
  id: number;
  type: 'ps5' | 'pc';
  name: string;
  image: string;
  status: 'available' | 'booked';
  price: number;
  specs?: string[];
  onBook: (id: number, type: 'ps5' | 'pc') => void;
}

export function StationCard({ id, type, name, image, status, price, specs, onBook }: StationCardProps) {
  const isAvailable = status === 'available';
  const accentColor = type === 'ps5' ? 'var(--neon-cyan)' : 'var(--neon-purple)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-3xl overflow-hidden bg-[var(--glass-bg)] backdrop-blur-sm border transition-all duration-300 ${
        isAvailable
          ? 'border-[var(--glass-border)] hover:border-opacity-100 hover:shadow-2xl'
          : 'border-gray-800 opacity-60'
      }`}
      style={{
        '--hover-glow': accentColor,
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40 z-10"></div>

      {isAvailable && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-0"
          style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}, transparent 70%)` }}
        ></div>
      )}

      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isAvailable ? 'group-hover:scale-110' : 'grayscale'
          }`}
        />

        <div className="absolute top-4 right-4 z-20">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md ${
            isAvailable
              ? 'bg-green-500/20 border border-green-500/50'
              : 'bg-red-500/20 border border-red-500/50'
          }`}>
            <Circle
              className={`w-2 h-2 ${isAvailable ? 'fill-green-400 text-green-400' : 'fill-red-400 text-red-400'}`}
            />
            <span className={`text-xs ${isAvailable ? 'text-green-300' : 'text-red-300'}`}>
              {isAvailable ? 'Available' : 'Booked'}
            </span>
          </div>
        </div>

        {type === 'ps5' && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-[var(--neon-cyan)]/20 backdrop-blur-md border border-[var(--neon-cyan)]/50">
            <span className="text-xs text-[var(--neon-cyan)]">PS5</span>
          </div>
        )}
        {type === 'pc' && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-[var(--neon-purple)]/20 backdrop-blur-md border border-[var(--neon-purple)]/50">
            <span className="text-xs text-[var(--neon-purple)]">GAMING PC</span>
          </div>
        )}
      </div>

      <div className="relative z-10 p-6">
        <h3 className="text-xl mb-2">{name}</h3>

        {specs && specs.length > 0 && (
          <div className="mb-4 space-y-1">
            {specs.map((spec, index) => (
              <p key={index} className="text-sm text-gray-400">{spec}</p>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Per hour</span>
          </div>
          <div className="text-2xl" style={{ color: accentColor }}>
            ₹{price}
          </div>
        </div>

        <button
          onClick={() => isAvailable && onBook(id, type)}
          disabled={!isAvailable}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            isAvailable
              ? 'bg-gradient-to-r hover:shadow-lg'
              : 'bg-gray-800 cursor-not-allowed'
          }`}
          style={isAvailable ? {
            backgroundImage: type === 'ps5'
              ? 'linear-gradient(to right, var(--neon-cyan), var(--neon-blue))'
              : 'linear-gradient(to right, var(--neon-purple), var(--neon-pink))',
            color: type === 'ps5' ? '#0a0a0f' : 'white',
          } : undefined}
        >
          {isAvailable ? 'Book Now' : 'Unavailable'}
        </button>
      </div>
    </motion.div>
  );
}
