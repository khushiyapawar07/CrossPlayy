import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  category: 'food' | 'beverage' | 'snack';
  price: number;
  image: string;
  description: string;
}

export function ManageFoodAdmin() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([/* TODO: Load from backend or static */]);
  const [newItem, setNewItem] = useState<Omit<FoodItem, 'id'>>({
    name: '',
    category: 'food',
    price: 0,
    image: '',
    description: '',
  });

  const handleAdd = () => {
    if (!newItem.name || !newItem.price) return;
    setFoodItems([
      ...foodItems,
      { ...newItem, id: Date.now() },
    ]);
    setNewItem({ name: '', category: 'food', price: 0, image: '', description: '' });
  };

  const handleDelete = (id: number) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  return (
    <div className="p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] mt-8">
      <h3 className="text-2xl mb-6">Manage Food Menu</h3>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--muted)]"
          placeholder="Name"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
        />
        <select
          className="p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--muted)]"
          value={newItem.category}
          onChange={e => setNewItem({ ...newItem, category: e.target.value as any })}
        >
          <option value="food">Meal</option>
          <option value="beverage">Beverage</option>
          <option value="snack">Snack</option>
        </select>
        <input
          className="p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--muted)]"
          placeholder="Price"
          type="number"
          value={newItem.price}
          onChange={e => setNewItem({ ...newItem, price: Number(e.target.value) })}
        />
        <input
          className="p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--muted)]"
          placeholder="Image URL"
          value={newItem.image}
          onChange={e => setNewItem({ ...newItem, image: e.target.value })}
        />
        <input
          className="p-3 rounded-xl border border-[var(--glass-border)] bg-[var(--muted)] col-span-2"
          placeholder="Description"
          value={newItem.description}
          onChange={e => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button
          className="col-span-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-white font-semibold flex items-center gap-2 justify-center"
          onClick={handleAdd}
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foodItems.map(item => (
          <div key={item.id} className="p-4 rounded-xl bg-[var(--muted)] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{item.name}</span>
              <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-gray-400">{item.category}</span>
            <span className="text-lg font-bold">₹{item.price}</span>
            <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded-lg" />
            <span className="text-xs text-gray-500">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
