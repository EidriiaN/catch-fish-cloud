"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { mockLakes } from "@/lib/db/mock-data";
import { formatCurrency } from "@/lib/utils/format";

export default function Lakes() {
  const [lakes, setLakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrice, setFilterPrice] = useState("all");
  const [filterRating, setFilterRating] = useState("all");

  // Simulate data loading from API
  useEffect(() => {
    const timer = setTimeout(() => {
      setLakes(mockLakes);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter lakes based on search and filters
  const filteredLakes = lakes.filter((lake) => {
    // Filter by search term
    const matchesSearch =
      lake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lake.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lake.location.address.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by price
    let matchesPrice = true;
    if (filterPrice === "low") {
      matchesPrice = lake.price.dayPass < 30;
    } else if (filterPrice === "medium") {
      matchesPrice = lake.price.dayPass >= 30 && lake.price.dayPass < 50;
    } else if (filterPrice === "high") {
      matchesPrice = lake.price.dayPass >= 50;
    }

    // Filter by rating
    let matchesRating = true;
    if (filterRating === "4plus") {
      matchesRating = lake.rating >= 4;
    } else if (filterRating === "3plus") {
      matchesRating = lake.rating >= 3;
    }

    return matchesSearch && matchesPrice && matchesRating;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Your Perfect Fishing Spot</h1>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="mb-4">
          <label htmlFor="search" className="block text-gray-800 font-medium mb-2">
            Search Lakes
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by name, description, or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priceFilter" className="block text-gray-800 font-medium mb-2">
              Price Range
            </label>
            <select
              id="priceFilter"
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="all">All Prices</option>
              <option value="low">Economy (Under $30)</option>
              <option value="medium">Standard ($30-$50)</option>
              <option value="high">Premium ($50+)</option>
            </select>
          </div>

          <div>
            <label htmlFor="ratingFilter" className="block text-gray-800 font-medium mb-2">
              Minimum Rating
            </label>
            <select
              id="ratingFilter"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="all">All Ratings</option>
              <option value="3plus">3+ Stars</option>
              <option value="4plus">4+ Stars</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lake Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading placeholders
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-4/6"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))
        ) : filteredLakes.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-lg text-gray-700">No lakes match your search criteria. Try adjusting your filters.</p>
          </div>
        ) : (
          filteredLakes.map((lake) => (
            <div key={lake.id} className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
              <div className="h-48 bg-gray-200 relative">
                {/* This would be a real image in production */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                  <span>Lake Image Placeholder</span>
                </div>
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{lake.name}</h2>
                <p className="text-gray-700 mb-2 text-sm">{lake.location.address}</p>

                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}>
                        {star <= Math.floor(lake.rating) ? (
                          // Full star
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ) : star === Math.ceil(lake.rating) && !Number.isInteger(lake.rating) ? (
                          // Half star (simplified as a smaller star for this example)
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ) : (
                          // Empty star
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        )}
                      </span>
                    ))}
                  </div>
                  <span className="ml-1 text-gray-700">
                    {lake.rating} ({lake.reviews.length} reviews)
                  </span>
                </div>

                <p className="text-gray-700 mb-4 flex-grow">{lake.description.substring(0, 100)}...</p>

                <div className="mt-auto">
                  <p className="font-semibold text-lg text-green-700 mb-3">From {formatCurrency(lake.price.dayPass)} / day</p>

                  <Link
                    href={`/lakes/${lake.id}`}
                    className="block text-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
