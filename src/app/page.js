import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center bg-green-900 overflow-hidden">
        {/* Background image would go here in production */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/70 z-10"></div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Private Fishing Paradises</h1>
            <p className="text-xl mb-8">Find, reserve, and enjoy exclusive access to premium fishing lakes and ponds.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/lakes"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg font-medium inline-block text-center"
              >
                Find Lakes
              </Link>
              <Link
                href="/auth/register"
                className="bg-white hover:bg-gray-100 text-green-800 px-6 py-3 rounded-md text-lg font-medium inline-block text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FishingLakes?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Exclusive Locations</h3>
              <p className="text-gray-600">Access private lakes and ponds not available to the general public.</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Experience</h3>
              <p className="text-gray-600">Enjoy well-stocked waters, better catch rates, and less crowded fishing spots.</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Reservations</h3>
              <p className="text-gray-600">Book your fishing time in advance to ensure availability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600">Sign up and create your profile in minutes.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Discover Lakes</h3>
              <p className="text-gray-600">Browse through our selection of premium fishing spots.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Make Reservation</h3>
              <p className="text-gray-600">Book your preferred date and pond.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold mb-2">Go Fishing!</h3>
              <p className="text-gray-600">Enjoy your exclusive fishing experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Fishing Spot?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of anglers who&apos;ve discovered premium fishing through our platform.</p>
          <Link href="/lakes" className="bg-white hover:bg-gray-100 text-green-800 px-8 py-3 rounded-md text-lg font-medium inline-block">
            Browse Lakes Now
          </Link>
        </div>
      </section>
    </div>
  );
}
