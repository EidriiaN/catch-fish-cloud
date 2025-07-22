"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import ReviewForm from "@/components/reviews/ReviewForm";

// Mock reservations (in a real app, these would come from an API/database)
const mockReservations = [
  {
    id: "res-1",
    userId: "user-1",
    lakeId: "lake-1",
    lakeName: "Pine Lake Retreat",
    date: new Date(2025, 7, 25), // July 25, 2025
    timeSlot: {
      id: "morning-12h",
      label: "6:00 AM - 6:00 PM (12 hours)",
      startHour: 6,
      duration: 12,
    },
    ponds: [
      { id: "pond-1", name: "North Pond" },
      { id: "pond-2", name: "East Pond" },
    ],
    totalPrice: 120,
    status: "upcoming",
    createdAt: new Date(2025, 7, 20),
  },
  {
    id: "res-2",
    userId: "user-1",
    lakeId: "lake-2",
    lakeName: "Oakwood Fishing Grounds",
    date: new Date(2025, 7, 10), // July 10, 2025
    timeSlot: {
      id: "morning-24h",
      label: "6:00 AM - 6:00 AM (24 hours)",
      startHour: 6,
      duration: 24,
    },
    ponds: [{ id: "pond-5", name: "Big Bass Pond" }],
    totalPrice: 100,
    status: "completed",
    createdAt: new Date(2025, 7, 5),
  },
  {
    id: "res-3",
    userId: "user-1",
    lakeId: "lake-3",
    lakeName: "Clear Water Lake",
    date: new Date(2025, 6, 15), // June 15, 2025
    timeSlot: {
      id: "evening-48h",
      label: "6:00 PM - 6:00 PM (48 hours)",
      startHour: 18,
      duration: 48,
    },
    ponds: [
      { id: "pond-10", name: "Trout Stream" },
      { id: "pond-11", name: "Catfish Hole" },
    ],
    totalPrice: 240,
    status: "completed",
    createdAt: new Date(2025, 6, 10),
  },
];

export default function UserReservations() {
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Fetch user's reservations
    const fetchReservations = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data
        // Simulate API latency
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Filter reservations for the current user
        const userReservations = mockReservations.filter((res) => res.userId === currentUser.id);

        setReservations(userReservations);
        setFilteredReservations(userReservations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setLoading(false);
      }
    };

    fetchReservations();
  }, [currentUser, isAuthenticated, router]);

  // Filter reservations based on status
  const filterReservations = (filter) => {
    setActiveFilter(filter);

    if (filter === "all") {
      setFilteredReservations(reservations);
    } else {
      setFilteredReservations(reservations.filter((res) => res.status === filter));
    }
  };

  // Handle review button click
  const handleReviewClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowReviewModal(true);
  };

  // Determine if a reservation is reviewable (completed and not already reviewed)
  const isReviewable = (reservation) => {
    return reservation.status === "completed";
    // In a real app, you would also check if the user has already reviewed this reservation
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-700">Loading your reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Reservations</h1>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap space-x-2">
          <button
            onClick={() => filterReservations("all")}
            className={`px-4 py-2 rounded-md ${activeFilter === "all" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
          >
            All
          </button>
          <button
            onClick={() => filterReservations("upcoming")}
            className={`px-4 py-2 rounded-md ${
              activeFilter === "upcoming" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => filterReservations("completed")}
            className={`px-4 py-2 rounded-md ${
              activeFilter === "completed" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => filterReservations("cancelled")}
            className={`px-4 py-2 rounded-md ${
              activeFilter === "cancelled" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Reservations List */}
      {filteredReservations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-700 mb-4">No reservations found.</p>
          <Link href="/lakes" className="text-green-600 hover:text-green-700 font-medium">
            Browse Lakes
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReservations.map((reservation) => {
            // Determine if the reservation date has passed
            const reservationDate = new Date(reservation.date);
            const endDateTime = new Date(reservationDate);
            endDateTime.setHours(endDateTime.getHours() + reservation.timeSlot.duration);
            const isPastReservation = endDateTime < new Date();

            return (
              <div key={reservation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{reservation.lakeName}</h2>
                      <p className="text-gray-700">
                        {formatDate(reservation.date)} • {reservation.timeSlot.label}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          reservation.status === "upcoming"
                            ? "bg-blue-100 text-blue-800"
                            : reservation.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {reservation.status === "upcoming" ? "Upcoming" : reservation.status === "completed" ? "Completed" : "Cancelled"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-b border-gray-200 py-4 my-4">
                    <div className="mb-2">
                      <span className="font-medium">Reserved Ponds:</span> {reservation.ponds.map((pond) => pond.name).join(", ")}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">Total Price:</span> {formatCurrency(reservation.totalPrice)}
                      </div>
                      <div>
                        <span className="font-medium">Reserved On:</span> {formatDate(reservation.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <Link href={`/lakes/${reservation.lakeId}`} className="text-green-600 hover:text-green-700 font-medium mb-4 sm:mb-0">
                      View Lake Details
                    </Link>

                    <div className="flex space-x-4">
                      {/* For past reservations, show review button */}
                      {isPastReservation && isReviewable(reservation) && (
                        <button
                          onClick={() => handleReviewClick(reservation)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                        >
                          Write a Review
                        </button>
                      )}

                      {/* For upcoming reservations, show cancel button */}
                      {!isPastReservation && reservation.status === "upcoming" && (
                        <button
                          onClick={() => {
                            // In a real app, this would make an API call to cancel the reservation
                            const updatedReservations = reservations.map((res) => {
                              if (res.id === reservation.id) {
                                return { ...res, status: "cancelled" };
                              }
                              return res;
                            });

                            setReservations(updatedReservations);
                            setFilteredReservations(
                              activeFilter === "all" ? updatedReservations : updatedReservations.filter((res) => res.status === activeFilter)
                            );
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                        >
                          Cancel Reservation
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <ReviewForm
            lake={{ id: selectedReservation.lakeId, name: selectedReservation.lakeName }}
            onClose={() => {
              setShowReviewModal(false);
              setSelectedReservation(null);
            }}
            onSubmit={(review) => {
              // In a real app, this would make an API call to submit the review
              console.log("Review submitted:", review);
              setShowReviewModal(false);
              setSelectedReservation(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
