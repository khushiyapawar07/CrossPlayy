import { ArrowRight, Zap, Clock, Trophy } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0a0a0f]/95 to-[#0a0a0f] z-10"></div>
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1691397392679-a2f12aa9fecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjYWYlQzMlQTklMjBpbnRlcmlvciUyMGRhcmslMjBuZW9uJTIwYXRtb3NwaGVyZSUyMGVzcG9ydHN8ZW58MXx8fHwxNzc3MjY4NjIzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Gaming Café Atmosphere"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] text-[var(--neon-cyan)] text-sm">
                Premium Gaming Experience
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-white via-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
                Elite Gaming Lounge
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              State-of-the-art PS5 consoles and high-end gaming PCs. Book your slot and experience gaming at its finest.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => onNavigate('dashboard')}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)] hover:shadow-2xl hover:shadow-[var(--neon-cyan)]/50 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center gap-2 text-[#0a0a0f] font-semibold">
                  Book Your Slot
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button className="px-8 py-4 rounded-2xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] text-white hover:bg-[var(--glass-bg)]/80 transition-all">
                View Pricing
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent z-20"></div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Why Choose crossplay?
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] hover:border-[var(--neon-cyan)]/50 transition-all hover:shadow-xl hover:shadow-[var(--neon-cyan)]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-cyan)]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-blue)] flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-[#0a0a0f]" />
                </div>
                <h3 className="text-2xl mb-4">Premium Hardware</h3>
                <p className="text-gray-400">Latest PS5 consoles and RTX-powered gaming rigs for the ultimate performance.</p>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] hover:border-[var(--neon-purple)]/50 transition-all hover:shadow-xl hover:shadow-[var(--neon-purple)]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-purple)]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-pink)] flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl mb-4">Flexible Booking</h3>
                <p className="text-gray-400">Book by the hour with real-time availability and instant confirmation.</p>
              </div>
            </div>

            <div className="group relative p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)] hover:border-[var(--neon-blue)]/50 transition-all hover:shadow-xl hover:shadow-[var(--neon-blue)]/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-blue)]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-purple)] flex items-center justify-center mb-6">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl mb-4">Esports Ready</h3>
                <p className="text-gray-400">High refresh rate monitors and low-latency setups for competitive gaming.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-[var(--glass-bg)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] bg-clip-text text-transparent">
              Our Gaming Stations
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative rounded-3xl overflow-hidden bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--neon-cyan)]/50 transition-all">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1709587796970-4e6bae1d4c68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBzZXR1cCUyMHBzNSUyMGNvbnNvbGUlMjBkYXJrJTIwbmVvbiUyMHJnYnxlbnwxfHx8fDE3NzcyNjg2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="PS5 Gaming Station"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl mb-3 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)] bg-clip-text text-transparent">PS5 Zone</h3>
                <p className="text-gray-400 mb-4">8 premium PlayStation 5 stations with 4K displays and immersive audio</p>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--neon-cyan)]">₹200/hour</span>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-blue)] text-[#0a0a0f] hover:shadow-lg hover:shadow-[var(--neon-cyan)]/50 transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--neon-purple)]/50 transition-all">
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1771014817844-327a14245bd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBQQyUyMHNldHVwJTIwcmdiJTIwa2V5Ym9hcmQlMjBkYXJrJTIwbmVvbiUyMGxpZ2h0c3xlbnwxfHx8fDE3NzcyNjg2MTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Gaming PC Station"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl mb-3 bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] bg-clip-text text-transparent">PC Zone</h3>
                <p className="text-gray-400 mb-4">High-end gaming PCs with RTX GPUs and 144Hz+ monitors</p>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--neon-purple)]">₹300/hour</span>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-pink)] text-white hover:shadow-lg hover:shadow-[var(--neon-purple)]/50 transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
