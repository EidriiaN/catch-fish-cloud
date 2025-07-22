"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils/format";

export default function ReservationForm({ lake, onClose }) {
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedPonds, setSelectedPonds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Calculate available dates (next 30 days)
  const availableDates = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    availableDates.push(date);
  }

  // Time slots based on requirements
  const timeSlots = [
    { id: "morning-12h", label: "6:00 AM - 6:00 PM (12 hours)", startHour: 6, duration: 12 },
    { id: "evening-12h", label: "6:00 PM - 6:00 AM (12 hours)", startHour: 18, duration: 12 },
    { id: "morning-24h", label: "6:00 AM - 6:00 AM (24 hours)", startHour: 6, duration: 24 },
    { id: "evening-24h", label: "6:00 PM - 6:00 PM (24 hours)", startHour: 18, duration: 24 },
    { id: "morning-48h", label: "6:00 AM - 6:00 AM (48 hours)", startHour: 6, duration: 48 },
    { id: "evening-48h", label: "6:00 PM - 6:00 PM (48 hours)", startHour: 18, duration: 48 },
  ];

  // Calculate total price whenever selected ponds or time slot changes
  useEffect(() => {
    if (selectedTimeSlot && selectedPonds.length > 0) {
      let basePrice = 0;

      if (selectedTimeSlot.duration === 12) {
        basePrice = lake.price.dayPass;
      } else if (selectedTimeSlot.duration === 24) {
        basePrice = lake.price.weekendPass;
      } else if (selectedTimeSlot.duration === 48) {
        basePrice = lake.price.weekPass || lake.price.weekendPass * 2;
      }

      setTotalPrice(basePrice * selectedPonds.length);
    } else {
      setTotalPrice(0);
    }
  }, [selectedTimeSlot, selectedPonds, lake.price]);

  // Handle pond selection/deselection
  const togglePondSelection = (pondId) => {
    if (selectedPonds.includes(pondId)) {
      setSelectedPonds(selectedPonds.filter((id) => id !== pondId));
    } else {
      setSelectedPonds([...selectedPonds, pondId]);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/login?redirect=reservation");
      return;
    }

    setLoading(true);

    // In a real app, this would be an API call to create a reservation
    // For now, we'll simulate a delay and then redirect to the user dashboard
    try {
      // Get the selected pond objects
      const ponds = lake.ponds.filter((pond) => selectedPonds.includes(pond.id));

      // Create a reservation object
      const reservation = {
        id: `res-${Date.now()}`,
        userId: currentUser.id,
        lakeId: lake.id,
        lakeName: lake.name,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        ponds: ponds,
        totalPrice: totalPrice,
        status: "pending",
        paymentInfo: {
          cardNumber: data.cardNumber.replace(/\s/g, "").slice(-4),
          nameOnCard: data.nameOnCard,
        },
        createdAt: new Date(),
      };

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would normally save the reservation to your database
      console.log("Reservation created:", reservation);

      // Redirect to success page or user dashboard
      router.push("/dashboard/user");
    } catch (error) {
      console.error("Error creating reservation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg max-w-4xl w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Reserve a Fishing Experience</h2>
        <button onClick={onClose} className="text-gray-700 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Steps Indicator */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              1
            </div>
            <span className="text-sm mt-2">Select Date</span>
          </div>

          <div className="flex-1 h-1 bg-gray-200 mx-4">
            <div className={`h-full ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`} style={{ width: step >= 2 ? "100%" : "0%" }}></div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              2
            </div>
            <span className="text-sm mt-2">Select Ponds</span>
          </div>

          <div className="flex-1 h-1 bg-gray-200 mx-4">
            <div className={`h-full ${step >= 3 ? "bg-green-600" : "bg-gray-200"}`} style={{ width: step >= 3 ? "100%" : "0%" }}></div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              3
            </div>
            <span className="text-sm mt-2">Payment</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* Step 1: Select Date and Time Slot */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Date and Time Slot</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select a Date</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableDates.slice(0, 8).map((date) => (
                  <button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 border rounded-md text-center ${
                      selectedDate && selectedDate.toDateString() === date.toDateString()
                        ? "border-green-600 bg-green-50 text-green-800"
                        : "border-gray-300 hover:border-gray-400 text-gray-800"
                    }`}
                  >
                    <div className="font-medium">{date.toLocaleDateString("en-US", { weekday: "short" })}</div>
                    <div className="text-2xl font-bold">{date.getDate()}</div>
                    <div className="text-xs text-gray-700">{date.toLocaleDateString("en-US", { month: "short" })}</div>
                  </button>
                ))}
              </div>
              {!selectedDate && <p className="text-sm text-red-600 mt-1">Please select a date</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select a Time Slot</label>
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`w-full p-3 border rounded-md text-left ${
                      selectedTimeSlot && selectedTimeSlot.id === slot.id
                        ? "border-green-600 bg-green-50 text-green-800"
                        : "border-gray-300 hover:border-gray-400 text-gray-700"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{slot.label}</span>
                      <span className="font-medium text-gray-800">
                        {formatCurrency(
                          slot.duration === 12
                            ? lake.price.dayPass
                            : slot.duration === 24
                            ? lake.price.weekendPass
                            : lake.price.weekPass || lake.price.weekendPass * 2
                        )}{" "}
                        per pond
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {!selectedTimeSlot && <p className="text-sm text-red-600 mt-1">Please select a time slot</p>}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (selectedDate && selectedTimeSlot) {
                    setStep(2);
                  }
                }}
                disabled={!selectedDate || !selectedTimeSlot}
                className={`px-6 py-2 rounded-md font-medium ${
                  selectedDate && selectedTimeSlot ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-700 cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Ponds */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Ponds</h3>
            <p className="text-gray-700 mb-4">You can select multiple ponds. The price will scale linearly with the number of ponds selected.</p>
            <div className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lake.ponds.map((pond) => (
                  <div
                    key={pond.id}
                    onClick={() => togglePondSelection(pond.id)}
                    className={`border rounded-md p-4 cursor-pointer ${
                      selectedPonds.includes(pond.id) ? "border-green-600 bg-green-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {" "}
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{pond.name}</h4>
                        <div className="text-sm text-gray-700 mt-1">
                          <p>Size: {pond.area || Math.floor(Math.random() * 5) + 1} acres</p>
                          <p>Fish: {pond.fishTypes.join(", ")}</p>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 border rounded-sm flex items-center justify-center ${
                          selectedPonds.includes(pond.id) ? "bg-green-600 border-green-600" : "border-gray-400"
                        }`}
                      >
                        {selectedPonds.includes(pond.id) && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedPonds.length === 0 && <p className="text-sm text-red-600 mt-2">Please select at least one pond</p>}
            </div>{" "}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">Summary</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {selectedDate ? formatDate(selectedDate) : "No date selected"} •{" "}
                    {selectedTimeSlot ? selectedTimeSlot.label : "No time slot selected"}
                  </p>
                  <p className="text-sm text-gray-700">
                    {selectedPonds.length} pond{selectedPonds.length !== 1 ? "s" : ""} selected
                  </p>
                </div>
                <div className="text-xl font-bold text-gray-800">{formatCurrency(totalPrice)}</div>
              </div>
            </div>
            <div className="flex justify-between">
              <button type="button" onClick={() => setStep(1)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Back
              </button>

              <button
                type="button"
                onClick={() => {
                  if (selectedPonds.length > 0) {
                    setStep(3);
                  }
                }}
                disabled={selectedPonds.length === 0}
                className={`px-6 py-2 rounded-md font-medium ${
                  selectedPonds.length > 0 ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-700 cursor-not-allowed"
                }`}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>{" "}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-800">Reservation Summary</h4>
                <span className="text-sm text-blue-600 cursor-pointer" onClick={() => setStep(2)}>
                  Edit
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium text-gray-800">Date:</span> {formatDate(selectedDate)}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Time Slot:</span> {selectedTimeSlot.label}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Ponds:</span> {selectedPonds.length} selected (
                  {lake.ponds
                    .filter((p) => selectedPonds.includes(p.id))
                    .map((p) => p.name)
                    .join(", ")}
                  )
                </p>
                <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between items-center font-medium">
                  <span className="text-gray-800">Total:</span>
                  <span className="text-lg text-gray-800">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  {...register("cardNumber", {
                    required: "Card number is required",
                    pattern: {
                      value: /^[\d\s]{16,19}$/,
                      message: "Please enter a valid card number",
                    },
                  })}
                  className={`w-full p-2 border rounded-md ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.cardNumber && <p className="text-sm text-red-600 mt-1">{errors.cardNumber.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    {...register("expirationDate", {
                      required: "Expiration date is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                        message: "Please enter a valid expiration date (MM/YY)",
                      },
                    })}
                    className={`w-full p-2 border rounded-md ${errors.expirationDate ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.expirationDate && <p className="text-sm text-red-600 mt-1">{errors.expirationDate.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    {...register("cvc", {
                      required: "CVC is required",
                      pattern: {
                        value: /^\d{3,4}$/,
                        message: "Please enter a valid CVC",
                      },
                    })}
                    className={`w-full p-2 border rounded-md ${errors.cvc ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.cvc && <p className="text-sm text-red-600 mt-1">{errors.cvc.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("nameOnCard", {
                    required: "Name on card is required",
                  })}
                  className={`w-full p-2 border rounded-md ${errors.nameOnCard ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.nameOnCard && <p className="text-sm text-red-600 mt-1">{errors.nameOnCard.message}</p>}
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button type="button" onClick={() => setStep(2)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 rounded-md font-medium ${
                  loading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {loading ? "Processing..." : "Complete Reservation"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
