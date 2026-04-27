import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, ShoppingBag, Pizza, Coffee, IceCream } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  category: 'food' | 'beverage' | 'snack';
  price: number;
  image: string;
  description: string;
}

interface FoodMenuProps {
  stationType: 'ps5' | 'pc';
  onUpdateCart: (items: { [key: number]: number }, total: number) => void;
}

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: 'Gamer Burger',
    category: 'food',
    price: 249,
    image: 'https://images.unsplash.com/photo-1673166516558-3f1b88a22db8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxmb29kJTIwbWVudSUyMHBpenphJTIwYnVyZ2VyJTIwZnJpZXMlMjBkYXJrJTIwbW9vZHl8ZW58MXx8fHwxNzc3MjY5NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Loaded burger with cheese & fries',
  },
  {
    id: 2,
    name: 'Victory Pizza',
    category: 'food',
    price: 399,
    image: 'https://images.unsplash.com/photo-1638425793674-32119fffb3d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxmb29kJTIwbWVudSUyMHBpenphJTIwYnVyZ2VyJTIwZnJpZXMlMjBkYXJrJTIwbW9vZHl8ZW58MXx8fHwxNzc3MjY5NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Personal size wood-fired pizza',
  },
  {
    id: 3,
    name: 'Loaded Fries',
    category: 'snack',
    price: 149,
    image: 'https://images.unsplash.com/photo-1687764628150-1dc8afa7ba52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwbWVudSUyMHBpenphJTIwYnVyZ2VyJTIwZnJpZXMlMjBkYXJrJTIwbW9vZHl8ZW58MXx8fHwxNzc3MjY5NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Crispy fries with cheese & bacon',
  },
  {
    id: 4,
    name: 'Energy Boost',
    category: 'beverage',
    price: 99,
    image: 'https://images.unsplash.com/photo-1629090736831-09ce6134af0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxlbmVyZ3klMjBkcmluayUyMGJldmVyYWdlJTIwbmVvbiUyMGxpZ2h0cyUyMGRhcmt8ZW58MXx8fHwxNzc3MjY5NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'High-caffeine energy drink',
  },
  {
    id: 5,
    name: 'Combo Meal',
    category: 'food',
    price: 349,
    image: 'https://images.unsplash.com/photo-1518304256228-bb65fd3df672?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxmb29kJTIwbWVudSUyMHBpenphJTIwYnVyZ2VyJTIwZnJpZXMlMjBkYXJrJTIwbW9vZHl8ZW58MXx8fHwxNzc3MjY5NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Burger, fries & drink combo',
  },
  {
    id: 6,
    name: 'Soda Can',
    category: 'beverage',
    price: 60,
    image: 'https://images.unsplash.com/photo-1771025677848-a3b4de7f8d63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxlbmVyZ3klMjBkcmluayUyMGJldmVyYWdlJTIwbmVvbiUyMGxpZ2h0cyUyMGRhcmt8ZW58MXx8fHwxNzc3MjY5NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Chilled soft drink',
  },
  {
    id: 7,
    name: 'Nachos Supreme',
    category: 'snack',
    price: 179,
    image: 'https://images.unsplash.com/photo-1692197275931-0793e08efcc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxmb29kJTIwbWVudSUyMHBpenphJTIwYnVyZ2VyJTIwZnJpZXMlMjBkYXJrJTIwbW9vZHl8ZW58MXx8fHwxNzc3MjY5NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Crispy nachos with cheese dip',
  },
  {
    id: 8,
    name: 'Iced Coffee',
    category: 'beverage',
    price: 129,
    image: 'https://images.unsplash.com/photo-1700847110450-a8b185e8c3b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBkcmluayUyMGJldmVyYWdlJTIwbmVvbiUyMGxpZ2h0cyUyMGRhcmt8ZW58MXx8fHwxNzc3MjY5NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Cold brew coffee with ice',
  },
];

export function FoodMenu({ stationType, onUpdateCart }: FoodMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'food' | 'beverage' | 'snack'>('all');
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const accentColor = stationType === 'ps5' ? 'var(--neon-cyan)' : 'var(--neon-purple)';

  const filteredItems = selectedCategory === 'all'
    ? foodItems
    : foodItems.filter(item => item.category === selectedCategory);

  const updateQuantity = (itemId: number, delta: number) => {
    const currentQty = cart[itemId] || 0;
    const newQty = Math.max(0, currentQty + delta);

    const newCart = { ...cart };
    if (newQty === 0) {
      delete newCart[itemId];
    } else {
      newCart[itemId] = newQty;
    }

    setCart(newCart);

    const total = Object.entries(newCart).reduce((sum, [id, qty]) => {
      const item = foodItems.find(i => i.id === parseInt(id));
      return sum + (item ? item.price * qty : 0);
    }, 0);

    onUpdateCart(newCart, total);
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const categories = [
    { id: 'all', label: 'All Items', icon: ShoppingBag },
    { id: 'food', label: 'Meals', icon: Pizza },
    { id: 'beverage', label: 'Drinks', icon: Coffee },
    { id: 'snack', label: 'Snacks', icon: IceCream },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl mb-2">Add Food & Drinks</h3>
          <p className="text-gray-400 text-sm">Optional - Fuel your gaming session</p>
        </div>
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)]"
          >
            <span className="text-sm font-semibold text-[#0a0a0f]">{totalItems} items</span>
          </motion.div>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'shadow-lg'
                  : 'bg-[var(--muted)] hover:bg-[var(--muted)]/70'
              }`}
              style={isActive ? {
                background: `linear-gradient(135deg, ${accentColor}, ${stationType === 'ps5' ? 'var(--neon-blue)' : 'var(--neon-pink)'})`,
                color: stationType === 'ps5' ? '#0a0a0f' : 'white',
              } : undefined}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-semibold">{category.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => {
          const quantity = cart[item.id] || 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group relative rounded-2xl overflow-hidden bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] hover:border-opacity-100 transition-all"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-4">
                <h4 className="font-semibold mb-1">{item.name}</h4>
                <p className="text-xs text-gray-400 mb-3">{item.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold" style={{ color: accentColor }}>
                    ₹{item.price}
                  </span>

                  {quantity === 0 ? (
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 rounded-lg bg-[var(--muted)] hover:bg-[var(--muted)]/70 transition-all"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-semibold">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 rounded-lg transition-all"
                        style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
