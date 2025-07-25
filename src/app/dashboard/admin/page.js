"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockLakes, mockReservations } from "@/lib/db/mock-data";
import { formatDate, formatCurrency } from "@/lib/utils/format";

export default function AdminDashboard() {
  const { currentUser, isAuthenticated } = useAuth();
  const router = useRouter();
  const [adminLakes, setAdminLakes] = useState([]);
  const [pendingReservations, setPendingReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect if not authenticated or not an admin
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (currentUser?.role !== "admin") {
      router.push("/dashboard/user");
      return;
    }

    // Load admin's lakes and pending reservations
    const fetchData = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get admin's lakes from mock data
      const lakes = mockLakes.filter((lake) => lake.ownerId === currentUser.id);

      // Get pending reservations for admin's lakes
      const lakeIds = lakes.map((lake) => lake.id);
      const reservations = mockReservations
        .filter((res) => lakeIds.includes(res.lakeId) && res.status === "pending")
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

      setAdminLakes(lakes);
      setPendingReservations(reservations);
      setLoading(false);
    };

    fetchData();
  }, [isAuthenticated, currentUser, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold">Lake Administrator Dashboard</h1>
        <Link
          href="/dashboard/admin/add-lake"
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200 inline-block"
        >
          Add New Lake
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Your Lakes</h3>
          <p className="text-3xl font-bold text-green-600">{adminLakes.length}</p>
          <p className="text-gray-700 mt-2">Total lakes you manage</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Pending Reservations</h3>
          <p className="text-3xl font-bold text-yellow-600">{pendingReservations.length}</p>
          <p className="text-gray-700 mt-2">Reservations awaiting approval</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Total Ponds</h3>
          <p className="text-3xl font-bold text-blue-600">{adminLakes.reduce((total, lake) => total + lake.ponds.length, 0)}</p>
          <p className="text-gray-700 mt-2">Across all your lakes</p>
        </div>
      </div>

      {/* Pending Reservations */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Pending Reservations</h2>

        {pendingReservations.length === 0 ? (
          <p className="text-gray-700">No pending reservations at this time.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Lake</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Pond</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingReservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.lakeName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{reservation.pondName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(reservation.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(reservation.price)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-green-600 hover:text-green-900 mr-4">Approve</button>
                      <button className="text-red-600 hover:text-red-900">Decline</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Your Lakes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Lakes</h2>

        {adminLakes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-700 mb-4">You haven&apos;t added any lakes yet.</p>
            <Link
              href="/dashboard/admin/add-lake"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200 inline-block"
            >
              Add Your First Lake
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminLakes.map((lake) => (
              <div key={lake.id} className="border rounded-lg overflow-hidden">
                <div className="h-32 bg-gray-200 flex items-center justify-center text-gray-700">
                  <span>Lake Image</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{lake.name}</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    {lake.ponds.length} pond{lake.ponds.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-gray-700 mb-4">{lake.description.substring(0, 80)}...</p>
                  <Link href={`/dashboard/admin/lake/${lake.id}`} className="text-green-600 hover:text-green-800 font-medium">
                    Manage Lake →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
