import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { BookingPage } from './components/BookingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthPage } from './components/AuthPage';

type AppPage = 'landing' | 'dashboard' | 'booking' | 'admin' | 'auth';

interface SessionUser {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [pageData, setPageData] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string>(() => localStorage.getItem('crossplayy_token') || '');
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(() => {
    const raw = localStorage.getItem('crossplayy_user');
    return raw ? JSON.parse(raw) : null;
  });

  const handleNavigate = (page: string, data?: any) => {
    if (page === 'admin' && !currentUser?.isAdmin) {
      setCurrentPage('auth');
      setPageData({ mode: 'admin' });
      return;
    }

    if (page === 'booking' && !authToken) {
      setCurrentPage('auth');
      setPageData({ mode: 'user', redirect: { page, data } });
      return;
    }

    setCurrentPage(page);
    setPageData(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthSuccess = ({ token, user }: { token: string; user: SessionUser }) => {
    setAuthToken(token);
    setCurrentUser(user);
    localStorage.setItem('crossplayy_token', token);
    localStorage.setItem('crossplayy_user', JSON.stringify(user));

    const redirect = pageData?.redirect;
    if (redirect?.page) {
      setCurrentPage(redirect.page);
      setPageData(redirect.data || null);
      return;
    }

    setCurrentPage(user.isAdmin ? 'admin' : 'dashboard');
    setPageData(null);
  };

  const handleLogout = () => {
    setAuthToken('');
    setCurrentUser(null);
    localStorage.removeItem('crossplayy_token');
    localStorage.removeItem('crossplayy_user');
    setCurrentPage('landing');
    setPageData(null);
  };

  useEffect(() => {
    if (currentPage === 'admin' && currentUser && !currentUser.isAdmin) {
      setCurrentPage('auth');
      setPageData({ mode: 'admin' });
    }
  }, [currentPage, currentUser]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--neon-cyan)] rounded-full filter blur-[128px] opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--neon-purple)] rounded-full filter blur-[128px] opacity-20"></div>
      </div>

      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <div className="relative z-10">
        {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
        {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} isAuthenticated={Boolean(authToken)} />}
        {currentPage === 'booking' && <BookingPage stationData={pageData} onNavigate={handleNavigate} authToken={authToken} />}
        {currentPage === 'admin' && currentUser?.isAdmin && <AdminDashboard authToken={authToken} />}
        {currentPage === 'auth' && (
          <AuthPage
            mode={pageData?.mode === 'admin' ? 'admin' : 'user'}
            onNavigate={handleNavigate}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
      </div>
    </div>
  );
}