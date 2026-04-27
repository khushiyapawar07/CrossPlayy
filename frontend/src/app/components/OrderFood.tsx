import { FoodMenu } from './FoodMenu';
import { useState } from 'react';

interface OrderFoodProps {
  bookingId: string;
  onOrderComplete: () => void;
}

export function OrderFood({ bookingId, onOrderComplete }: OrderFoodProps) {
  const [foodCart, setFoodCart] = useState<{ [key: number]: number }>({});
  const [foodTotal, setFoodTotal] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleFoodUpdate = (items: { [key: number]: number }, total: number) => {
    setFoodCart(items);
    setFoodTotal(total);
  };

  const handleOrder = () => {
    // Here you would send the foodCart to your backend with the bookingId
    setOrderPlaced(true);
    setTimeout(() => {
      onOrderComplete();
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Order Placed!</h2>
          <p className="text-gray-400 mb-4">Your snacks will be delivered to your station.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
            Order Food & Snacks
          </span>
        </h1>
        <FoodMenu stationType="ps5" onUpdateCart={handleFoodUpdate} />
        <div className="mt-8 flex justify-between items-center">
          <span className="text-xl font-semibold">Total: ₹{foodTotal}</span>
          <button
            onClick={handleOrder}
            disabled={foodTotal === 0}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${foodTotal === 0 ? 'bg-gray-800 cursor-not-allowed opacity-50' : 'shadow-lg hover:scale-105'}`}
            style={foodTotal > 0 ? { background: 'linear-gradient(to right, var(--neon-cyan), var(--neon-purple))', color: '#0a0a0f' } : undefined}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
