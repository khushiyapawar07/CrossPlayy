import { TrendingUp, Users, Gamepad2, IndianRupee } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const statsData = [
  { label: 'Total Bookings', value: '248', change: '+12%', icon: Gamepad2, color: 'var(--neon-cyan)' },
  { label: 'Active Users', value: '89', change: '+8%', icon: Users, color: 'var(--neon-purple)' },
  { label: 'Revenue Today', value: '₹24,500', change: '+18%', icon: IndianRupee, color: 'var(--neon-blue)' },
  { label: 'Avg. Session', value: '2.4h', change: '+5%', icon: TrendingUp, color: 'var(--neon-pink)' },
];

const bookingsData = [
  { name: 'Mon', ps5: 32, pc: 28 },
  { name: 'Tue', ps5: 38, pc: 31 },
  { name: 'Wed', ps5: 35, pc: 29 },
  { name: 'Thu', ps5: 42, pc: 35 },
  { name: 'Fri', ps5: 48, pc: 42 },
  { name: 'Sat', ps5: 55, pc: 48 },
  { name: 'Sun', ps5: 52, pc: 45 },
];

const recentBookings = [
  { id: 'B001', user: 'Alex Kumar', station: 'PS5 Station 02', time: '14:00 - 16:00', status: 'Active', type: 'ps5' },
  { id: 'B002', user: 'Priya Shah', station: 'Gaming PC 05', time: '15:00 - 18:00', status: 'Active', type: 'pc' },
  { id: 'B003', user: 'Rahul Verma', station: 'PS5 Station 07', time: '16:00 - 18:00', status: 'Pending', type: 'ps5' },
  { id: 'B004', user: 'Sneha Patel', station: 'Gaming PC 01', time: '14:00 - 15:00', status: 'Completed', type: 'pc' },
  { id: 'B005', user: 'Arjun Singh', station: 'PS5 Station 01', time: '13:00 - 16:00', status: 'Active', type: 'ps5' },
];

export function AdminDashboard() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h1>
          <p className="text-gray-400">Monitor your gaming café performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] hover:border-opacity-100 transition-all hover:shadow-xl"
              style={{ '--stat-color': stat.color } as React.CSSProperties}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--stat-color)]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-sm text-green-400">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)]">
            <h3 className="text-2xl mb-6">Weekly Bookings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a24" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12121a',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="ps5" fill="var(--neon-cyan)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="pc" fill="var(--neon-purple)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)]">
            <h3 className="text-2xl mb-6">Station Status</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[var(--muted)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">PS5 Stations</span>
                  <span className="text-[var(--neon-cyan)]">6/8 Active</span>
                </div>
                <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)]" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--muted)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">PC Stations</span>
                  <span className="text-[var(--neon-purple)]">4/6 Active</span>
                </div>
                <div className="w-full h-2 bg-[#0a0a0f] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)]" style={{ width: '67%' }}></div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-[var(--neon-cyan)]/10 to-[var(--neon-purple)]/10 border border-[var(--glass-border)]">
                <div className="text-sm text-gray-400 mb-1">Peak Hour</div>
                <div className="text-2xl font-bold">18:00 - 21:00</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)]">
          <h3 className="text-2xl mb-6">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--glass-border)]">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Booking ID</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">User</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Station</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Time</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-[var(--glass-border)] hover:bg-[var(--muted)]/30 transition-colors">
                    <td className="py-4 px-4">{booking.id}</td>
                    <td className="py-4 px-4">{booking.user}</td>
                    <td className="py-4 px-4">
                      <span
                        className="px-3 py-1 rounded-lg text-sm"
                        style={{
                          backgroundColor: booking.type === 'ps5' ? 'rgba(0, 217, 255, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                          color: booking.type === 'ps5' ? 'var(--neon-cyan)' : 'var(--neon-purple)',
                        }}
                      >
                        {booking.station}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{booking.time}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm ${
                          booking.status === 'Active'
                            ? 'bg-green-500/20 text-green-400'
                            : booking.status === 'Pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-gray-500/20 text-gray-400'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
