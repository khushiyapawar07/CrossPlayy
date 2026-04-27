import { FormEvent, useMemo, useState } from 'react';
import { Shield, User, ArrowLeft } from 'lucide-react';
import { api } from '../lib/api';

type AuthMode = 'user' | 'admin';
type AuthIntent = 'login' | 'register';

interface AuthPageProps {
  mode: AuthMode;
  onNavigate: (page: string, data?: any) => void;
  onAuthSuccess: (payload: { token: string; user: any }) => void;
}

export function AuthPage({ mode, onNavigate, onAuthSuccess }: AuthPageProps) {
  const [intent, setIntent] = useState<AuthIntent>(mode === 'admin' ? 'login' : 'login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const title = useMemo(() => (mode === 'admin' ? 'Admin Login' : intent === 'register' ? 'Create Account' : 'User Login'), [mode, intent]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (intent === 'register') {
        response = await api.auth.register({ username, email, password, phone });
      } else {
        response = await api.auth.login({ email, password });
      }

      if (mode === 'admin' && !response.user?.isAdmin) {
        throw new Error('This account is not an admin account.');
      }

      onAuthSuccess({ token: response.token, user: response.user });
    } catch (submitError: any) {
      setError(submitError.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="p-8 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)]">
              {mode === 'admin' ? <Shield className="w-5 h-5 text-[#0a0a0f]" /> : <User className="w-5 h-5 text-[#0a0a0f]" />}
            </div>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>

          {mode === 'user' && (
            <div className="flex gap-2 mb-6 rounded-xl bg-[var(--muted)] p-1">
              <button
                onClick={() => setIntent('login')}
                className={`flex-1 py-2 rounded-lg transition-colors ${intent === 'login' ? 'bg-[#12121a] text-white' : 'text-gray-400'}`}
              >
                Login
              </button>
              <button
                onClick={() => setIntent('register')}
                className={`flex-1 py-2 rounded-lg transition-colors ${intent === 'register' ? 'bg-[#12121a] text-white' : 'text-gray-400'}`}
              >
                Register
              </button>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {intent === 'register' && mode === 'user' && (
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
                required
                className="w-full rounded-xl px-4 py-3 bg-[var(--muted)] border border-[var(--glass-border)] outline-none focus:border-[var(--neon-cyan)]"
              />
            )}

            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-xl px-4 py-3 bg-[var(--muted)] border border-[var(--glass-border)] outline-none focus:border-[var(--neon-cyan)]"
            />

            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Password"
              required
              className="w-full rounded-xl px-4 py-3 bg-[var(--muted)] border border-[var(--glass-border)] outline-none focus:border-[var(--neon-cyan)]"
            />

            {intent === 'register' && mode === 'user' && (
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone (optional)"
                className="w-full rounded-xl px-4 py-3 bg-[var(--muted)] border border-[var(--glass-border)] outline-none focus:border-[var(--neon-cyan)]"
              />
            )}

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-[1.01]'} bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] text-[#0a0a0f]`}
            >
              {loading ? 'Please wait...' : mode === 'admin' ? 'Login as Admin' : intent === 'register' ? 'Create Account' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
