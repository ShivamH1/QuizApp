import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Home, Settings } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Q</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Quiz App</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {isAdminRoute ? (
                <Link to="/">
                  <Button variant="default" size="sm">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
              ) : (
                <Link to="/admin">
                  <Button variant="default" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main>{children}</main>
    </div>
  );
}

