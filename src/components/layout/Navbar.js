"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";

export default function Navbar() {
  const { currentUser, logout, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className={`fixed w-full z-30 transition-all duration-300 ${scrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-xl font-bold text-green-600">FishingLakes</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <Link href="/lakes" className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium">
                Find Lakes
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium">
                Contact
              </Link>
            </div>
          </div>

          {/* Auth Navigation */}
          <div className="hidden md:flex items-center">
            {currentUser ? (
              <div className="flex items-center">
                <Link
                  href={isAdmin ? "/dashboard/admin" : "/dashboard/user"}
                  className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium"
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login" className="text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium">
                  Login
                </Link>
                <Link href="/auth/register" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-600 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Heroicon name: menu */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Heroicon name: x */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-white dark:bg-gray-900 shadow-md`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/lakes" className="block text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium">
            Find Lakes
          </Link>
          <Link href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium">
            About
          </Link>
          <Link href="/contact" className="block text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium">
            Contact
          </Link>

          {currentUser ? (
            <>
              <Link
                href={isAdmin ? "/dashboard/admin" : "/dashboard/user"}
                className="block text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="block text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium">
                Login
              </Link>
              <Link href="/auth/register" className="block text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-md font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
