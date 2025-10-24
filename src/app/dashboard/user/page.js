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
          <p className="text-gray-700">Se încarcă panoul tău...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Bun venit, {currentUser?.name}</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Rezervările tale viitoare</h2>

        {reservations.length === 0 ? (
          <div className="text-gray-700">
            <p>Încă nu ai nicio rezervare.</p>
            <Link href="/lakes" className="text-green-600 hover:underline mt-2 inline-block">
              Caută un lac pentru rezervare
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Lac</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Heleșteu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Stare</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Preț</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Acțiuni</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.slice(0, 3).map((reservation) => (
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
                      <button className="text-red-600 hover:text-red-900 mr-4">Anulează</button>
                      <Link href={`/lakes/${reservation.lakeId}`} className="text-green-600 hover:text-green-900">
                        Vezi lacul
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {reservations.length > 3 && (
              <div className="mt-4 text-right">
                <Link href="/dashboard/user/reservations" className="text-green-600 hover:text-green-700">
                  Vezi toate cele {reservations.length} rezervări →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Gestionează rezervările</h2>
          <p className="text-gray-700 mb-4">Vezi, modifică sau anulează rezervările curente.</p>
          <Link
            href="/dashboard/user/reservations"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200 inline-block"
          >
            Vezi toate rezervările
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Scrie o recenzie</h2>
          <p className="text-gray-700 mb-4">Ai fost recent la un lac? Împărtășește-ți experiența cu alți pescari!</p>
          <Link
            href="/dashboard/user/reservations"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200 inline-block"
          >
            Scrie o recenzie
          </Link>
        </div>
      </div>
    </div>
  );
}
