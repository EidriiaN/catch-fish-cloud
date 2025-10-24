"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { mockLakes } from "@/lib/db/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import LakeMap from "@/components/maps/LakeMap";
import ReservationForm from "@/components/reservations/ReservationForm";
import ReviewForm from "@/components/reviews/ReviewForm";
import { use } from "react";

export default function LakeDetail({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const lakeId = unwrappedParams.id;

  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuth();
  const [lake, setLake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("details");
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    // Fetch lake data based on ID
    const fetchLake = async () => {
      // In a real app, this would be an API call
      // For now, we'll use mock data
      const foundLake = mockLakes.find((l) => l.id === lakeId);

      if (foundLake) {
        setLake(foundLake);
      } else {
        // Handle lake not found
        router.push("/lakes");
      }

      setLoading(false);
    };

    fetchLake();
  }, [lakeId, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-700">Se încarcă informațiile despre lac...</p>
        </div>
      </div>
    );
  }

  if (!lake) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Lacul nu a fost găsit</h2>
          <p className="text-gray-700 mb-6">Lacul pe care îl cauți nu există sau a fost eliminat.</p>
          <Link href="/lakes" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
            Vezi toate bălțile
          </Link>
        </div>
      </div>
    );
  }

  // Calculate total ponds area
  const totalPondArea = lake.ponds.reduce((total, pond) => {
    // In a real app, you'd calculate area based on polygon coordinates
    // For now, we'll use a mock area (acres)
    const pondArea = pond.area || Math.floor(Math.random() * 5) + 1;
    return total + pondArea;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Lake Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{lake.name}</h1>
        <div className="flex flex-wrap items-center text-gray-700 mb-4">
          <div className="flex items-center mr-6 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{lake.location.address}</span>
          </div>
          <div className="flex items-center mr-6 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>
              {lake.rating} ({lake.reviews.length} reviews)
            </span>
          </div>
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              {lake.ponds.length} heleșteu{lake.ponds.length !== 1 ? "ri" : ""} disponibile
            </span>
          </div>
        </div>
      </div>

      {/* Photo Gallery (Placeholder for now) */}
      <div className="mb-8 bg-gray-200 h-80 rounded-lg flex items-center justify-center">
        <p className="text-gray-700">Galerie foto lac</p>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b">
        <nav className="flex space-x-8">
          <button
            onClick={() => setSelectedTab("details")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "details"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Detalii despre lac
          </button>
          <button
            onClick={() => setSelectedTab("ponds")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "ponds"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Heleșteie ({lake.ponds.length})
          </button>
          <button
            onClick={() => setSelectedTab("reviews")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "reviews"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Recenzii ({lake.reviews.length})
          </button>
          <button
            onClick={() => setSelectedTab("map")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              selectedTab === "map" ? "border-green-600 text-green-600" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"
            }`}
          >
            Hartă
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {/* Lake Details Tab */}
        {selectedTab === "details" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Prezentare generală</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{lake.ponds.length} heleșteie pentru pescuit</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Suprafață totală heleșteie: {totalPondArea} acri</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Specii de pești: {Array.from(new Set(lake.ponds.flatMap((pond) => pond.fishTypes))).join(", ")}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tarife</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Permis de zi (12h):</span>
                    <span className="font-semibold">{formatCurrency(lake.price.dayPass)} per heleșteu</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Permis de weekend (24h):</span>
                    <span className="font-semibold">{formatCurrency(lake.price.weekendPass)} per heleșteu</span>
                  </li>
                  {lake.price.weekPass && (
                    <li className="flex justify-between">
                      <span>Permis de 2 zile (48h):</span>
                      <span className="font-semibold">{formatCurrency(lake.price.weekPass)} per heleșteu</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Facilități</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Parcare disponibilă</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Toalete la locație</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Închiriere echipament de pescuit</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Despre acest lac</h3>
              <p className="text-gray-700 mb-4">{lake.description}</p>
              <p className="text-gray-700">
                Acest lac privat de pescuit oferă un mediu liniștit pentru pescari de toate nivelurile. Fiecare heleșteu este populat periodic cu
                diverse specii de pești pentru a asigura o experiență reușită. Proprietatea este bine întreținută și oferă facilități esențiale pentru
                o zi confortabilă la pescuit.
              </p>
            </div>
          </div>
        )}

        {/* Ponds Tab */}
        {selectedTab === "ponds" && (
          <div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Heleșteie disponibile</h3>
              <p className="text-gray-700 mb-4">
                Acest lac are {lake.ponds.length} heleșteie disponibile pentru rezervare. Fiecare heleșteu are caracteristici și specii de pești
                proprii.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lake.ponds.map((pond, index) => {
                // Calculate distances between ponds (mock data for now)
                const nextPond = lake.ponds[index + 1];
                const distance = nextPond ? Math.floor(Math.random() * 200) + 50 : null;
                // Mock pond area
                const pondArea = pond.area || Math.floor(Math.random() * 5) + 1;

                return (
                  <div key={pond.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-40 bg-gray-200 relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-700">
                        <span>Imagine heleșteu</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold mb-2">{pond.name}</h4>

                      <div className="mb-4">
                        <h5 className="font-medium text-gray-700 mb-1">Detalii heleșteu:</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Suprafață: {pondArea} acri</li>
                          <li>• Capacitate maximă: {pond.maxCapacity} pescari</li>
                          <li>• Specii de pești: {pond.fishTypes.join(", ")}</li>
                          {distance && (
                            <li>
                              • Distanță până la {nextPond.name}: {distance} metri
                            </li>
                          )}
                        </ul>
                      </div>

                      <button
                        onClick={() => setShowReservationModal(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200"
                      >
                        Rezervă acest heleșteu
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {selectedTab === "reviews" && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-1">Recenzii</h3>
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill={star <= Math.round(lake.rating) ? "currentColor" : "none"}
                        stroke="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700">
                    {lake.rating} din 5 ({lake.reviews.length} recenzii)
                  </p>
                </div>
              </div>

              {isAuthenticated && (
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200"
                >
                  Scrie o recenzie
                </button>
              )}
            </div>

            {lake.reviews.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-700">Încă nu există recenzii. Fii primul care lasă o recenzie!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {lake.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{review.userName}</h4>
                        <div className="flex text-yellow-400 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill={star <= review.rating ? "currentColor" : "none"}
                              stroke="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{formatDate(review.date)}</p>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Map Tab */}
        {selectedTab === "map" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Harta lacului</h3>
            <p className="text-gray-700 mb-4">Vezi locația lacului și toate heleșteiele disponibile. Apasă pe un heleșteu pentru detalii.</p>
            <div className="h-[500px] w-full">
              <LakeMap location={lake.location} ponds={lake.ponds} />
            </div>
          </div>
        )}
      </div>

      {/* Reservation CTA */}
      <div className="bg-green-50 rounded-lg p-6 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Gata de pescuit?</h3>
            <p className="text-gray-700">Rezervă acum heleșteul pentru a-ți asigura locul.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setSelectedTab("ponds")}
              className="bg-white border border-green-600 text-green-600 hover:bg-green-50 py-2 px-6 rounded transition duration-200"
            >
              Vezi heleșteiele
            </button>
            <button
              onClick={() => setShowReservationModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded transition duration-200"
            >
              Fă o rezervare
            </button>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <ReservationForm lake={lake} onClose={() => setShowReservationModal(false)} />
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <ReviewForm
            lake={lake}
            onClose={() => setShowReviewModal(false)}
            onSubmit={(newReview) => {
              // In a real app, you would make an API call to add the review
              // For now, we'll just update the local state
              const updatedLake = {
                ...lake,
                reviews: [newReview, ...lake.reviews],
                // Recalculate the rating
                rating: (lake.rating * lake.reviews.length + newReview.rating) / (lake.reviews.length + 1),
              };
              setLake(updatedLake);
              setShowReviewModal(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
