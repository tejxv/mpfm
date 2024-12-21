import React from "react"
import { Link, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { Instagram } from "lucide-react"

const Layout = () => {
  const { user, signOut } = useAuthStore()

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b sticky top-0 bg-[#fafafccc] backdrop-blur-[20px] saturate-[180%] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              {/* <Camera className="h-8 w-8" /> */}
              <span className="text-xl font-semibold">MANYA</span>
              <span className="text-xl font-normal">KAUSHIK</span>
            </Link>
            <div>
              <a
                href="https://www.instagram.com/hellextraa/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <span className="text-gray-600 font-thin">© 2025 Manya Kaushik</span>
          {user ? (
            <button
              onClick={() => signOut()}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              🐒
            </Link>
          )}
        </div>
      </footer>
    </div>
  )
}

export default Layout
