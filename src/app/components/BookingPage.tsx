import { useState } from 'react';
import { Calendar, Clock, CreditCard, CheckCircle2, ArrowLeft, UtensilsCrossed } from 'lucide-react';
import { motion } from 'motion/react';
import { FoodMenu } from './FoodMenu';

interface BookingPageProps {
  stationData?: { stationId: number; stationType: 'ps5' | 'pc' };
  onNavigate: (page: string) => void;
}

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00'
];

export function BookingPage({ stationData, onNavigate }: BookingPageProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [foodCart, setFoodCart] = useState<{ [key: number]: number }>({});
  const [foodTotal, setFoodTotal] = useState(0);

  const stationType = stationData?.stationType || 'ps5';
  const stationId = stationData?.stationId || 1;
  const pricePerHour = stationType === 'ps5' ? 200 : 300;
  const accentColor = stationType === 'ps5' ? 'var(--neon-cyan)' : 'var(--neon-purple)';

  const handleFoodUpdate = (items: { [key: number]: number }, total: number) => {
    setFoodCart(items);
    setFoodTotal(total);
  };

  const toggleSlot = (slot: string) => {
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const stationPrice = selectedSlots.length * pricePerHour;
  const totalPrice = stationPrice + foodTotal;

  const handleBooking = () => {
    setBookingComplete(true);
    setTimeout(() => {
      onNavigate('dashboard');
    }, 3000);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 blur-3xl opacity-50"
                style={{ backgroundColor: accentColor }}
              ></div>
              <CheckCircle2 className="w-24 h-24 relative z-10" style={{ color: accentColor }} />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4">Booking Confirmed!</h2>
          <p className="text-gray-400 text-lg">Your gaming session is ready. See you soon!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Stations
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Book Your Session
            </span>
          </h1>
          <p className="text-gray-400">
            {stationType === 'ps5' ? 'PS5' : 'Gaming PC'} Station #{stationId.toString().padStart(2, '0')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)]">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6" style={{ color: accentColor }} />
                <h3 className="text-2xl">Select Date</h3>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  const isSelected = date.toDateString() === selectedDate.toDateString();

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={`p-4 rounded-xl transition-all ${
                        isSelected
                          ? 'shadow-lg'
                          : 'bg-[var(--muted)] hover:bg-[var(--muted)]/70'
                      }`}
                      style={isSelected ? {
                        background: `linear-gradient(135deg, ${accentColor}, ${stationType === 'ps5' ? 'var(--neon-blue)' : 'var(--neon-pink)'})`,
                      } : undefined}
                    >
                      <div className="text-xs opacity-70 mb-1">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-semibold">
                        {date.getDate()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)]">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6" style={{ color: accentColor }} />
                <h3 className="text-2xl">Select Time Slots</h3>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {timeSlots.map(slot => {
                  const isSelected = selectedSlots.includes(slot);
                  const isBooked = Math.random() > 0.7;

                  return (
                    <button
                      key={slot}
                      onClick={() => !isBooked && toggleSlot(slot)}
                      disabled={isBooked}
                      className={`p-3 rounded-xl transition-all ${
                        isBooked
                          ? 'bg-gray-800 opacity-40 cursor-not-allowed'
                          : isSelected
                          ? 'shadow-lg'
                          : 'bg-[var(--muted)] hover:bg-[var(--muted)]/70'
                      }`}
                      style={isSelected && !isBooked ? {
                        background: `linear-gradient(135deg, ${accentColor}, ${stationType === 'ps5' ? 'var(--neon-blue)' : 'var(--neon-pink)'})`,
                      } : undefined}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)]">
              <div className="flex items-center gap-3 mb-6">
                <UtensilsCrossed className="w-6 h-6" style={{ color: accentColor }} />
                <h3 className="text-2xl">Food & Beverages</h3>
              </div>
              <FoodMenu stationType={stationType} onUpdateCart={handleFoodUpdate} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)]">
              <h3 className="text-2xl mb-6">Booking Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between py-3 border-b border-[var(--glass-border)]">
                  <span className="text-gray-400">Station Type</span>
                  <span className="font-semibold">{stationType === 'ps5' ? 'PS5' : 'Gaming PC'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--glass-border)]">
                  <span className="text-gray-400">Station ID</span>
                  <span className="font-semibold">#{stationId.toString().padStart(2, '0')}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--glass-border)]">
                  <span className="text-gray-400">Date</span>
                  <span className="font-semibold">
                    {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--glass-border)]">
                  <span className="text-gray-400">Time Slots</span>
                  <span className="font-semibold">{selectedSlots.length}h</span>
                </div>
                <div className="flex justify-between py-3 border-b border-[var(--glass-border)]">
                  <span className="text-gray-400">Station Price</span>
                  <span className="font-semibold">₹{stationPrice}</span>
                </div>
                {foodTotal > 0 && (
                  <div className="flex justify-between py-3 border-b border-[var(--glass-border)]">
                    <span className="text-gray-400">Food & Drinks</span>
                    <span className="font-semibold">₹{foodTotal}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6 p-4 rounded-xl bg-[var(--muted)]">
                <span className="text-xl">Total</span>
                <span className="text-3xl font-bold" style={{ color: accentColor }}>
                  ₹{totalPrice}
                </span>
              </div>

              <button
                onClick={handleBooking}
                disabled={selectedSlots.length === 0}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  selectedSlots.length === 0
                    ? 'bg-gray-800 cursor-not-allowed opacity-50'
                    : 'shadow-lg hover:scale-105'
                }`}
                style={selectedSlots.length > 0 ? {
                  background: `linear-gradient(to right, ${accentColor}, ${stationType === 'ps5' ? 'var(--neon-blue)' : 'var(--neon-pink)'})`,
                  color: stationType === 'ps5' ? '#0a0a0f' : 'white',
                } : undefined}
              >
                <CreditCard className="w-5 h-5" />
                Confirm Booking
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Cancellation allowed up to 2 hours before
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
