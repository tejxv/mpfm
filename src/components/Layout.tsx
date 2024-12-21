import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Camera } from 'lucide-react';

const Layout = () => {
  const { user, signOut } = useAuthStore();

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              {/* <Camera className="h-8 w-8" /> */}
              <span className="text-xl font-semibold">MANYA</span><span className='text-xl font-normal'>KAUSHIK</span>
            </Link>
            <div>
              {user ? (
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;