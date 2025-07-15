"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockReservations, mockLakes } from "@/lib/db/mock-data";
import { formatDate, formatCurrency } from "@/lib/utils/format";

export default function UserDashboard() {
  const { currentUser, isAuthenticated } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated or not a regular user
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (currentUser?.role === "admin") {
      router.push("/dashboard/admin");
      return;
    }

    // Load user's reservations
    const fetchReservations = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get user's reservations from mock data
      const userReservations = mockReservations
        .filter((res) => res.userId === currentUser.id)
        .map((res) => {
          // Add lake and pond details to each reservation
          const lake = mockLakes.find((lake) => lake.id === res.lakeId);
          const pond = lake?.ponds.find((pond) => pond.id === res.pondId);

          return {
            ...res,
            lakeName: lake?.name || "Unknown Lake",
            pondName: pond?.name || "Unknown Pond",
          };
        });

      setReservations(userReservations);
      setLoading(false);
    };

    fetchReservations();
  }, [isAuthenticated, currentUser, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {currentUser?.name}</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Upcoming Reservations</h2>

        {reservations.length === 0 ? (
          <div className="text-gray-600">
            <p>You don&apos;t have any reservations yet.</p>
            <Link href="/lakes" className="text-green-600 hover:underline mt-2 inline-block">
              Find a lake to book
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lake</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pond</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/lakes/${reservation.lakeId}`} className="text-green-600 hover:underline">
                        {reservation.lakeName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.pondName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(reservation.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          reservation.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(reservation.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-red-600 hover:text-red-900 mr-4">Cancel</button>
                      <Link href={`/lakes/${reservation.lakeId}`} className="text-green-600 hover:text-green-900">
                        View Lake
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
        <p className="text-gray-600 mb-4">Have you visited a lake recently? Share your experience with other fishermen!</p>
        <Link
          href="/dashboard/user/reviews"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200 inline-block"
        >
          Write a Review
        </Link>
      </div>
    </div>
  );
}
