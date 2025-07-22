"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/auth/auth-context";

export default function ReviewForm({ lake, onClose, onSubmit: onSubmitProp }) {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!currentUser) return;

    setSubmitting(true);

    try {
      // Create review object
      const review = {
        id: `review-${Date.now()}`,
        userId: currentUser.id,
        userName: currentUser.name,
        lakeId: lake.id,
        rating: rating,
        comment: data.comment,
        fishCaught: data.fishCaught,
        weather: data.weather,
        date: new Date(),
      };

      // In a real app, you would make an API call here
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call the parent's onSubmit function
      if (onSubmitProp) {
        onSubmitProp(review);
      }

      // Close the form
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg max-w-2xl w-full p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Write a Review for {lake.name}</h3>
        <button onClick={onClose} className="text-gray-700 hover:text-gray-900" disabled={submitting}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Rating Stars */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-2">Overall Rating</label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} className="text-2xl focus:outline-none">
                <span className={star <= rating ? "text-yellow-400" : "text-gray-300"}>★</span>
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-700">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </span>
          </div>
        </div>

        {/* Review Comment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-2">Your Review</label>
          <textarea
            rows={4}
            placeholder="Share your experience fishing at this lake..."
            {...register("comment", {
              required: "Please write your review",
              minLength: {
                value: 10,
                message: "Your review is too short",
              },
            })}
            className={`w-full p-3 border rounded-md ${errors.comment ? "border-red-500" : "border-gray-300"}`}
          ></textarea>
          {errors.comment && <p className="text-sm text-red-600 mt-1">{errors.comment.message}</p>}
        </div>

        {/* Fish Caught */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-2">Fish Species Caught (optional)</label>
          <input
            type="text"
            placeholder="E.g., Trout, Bass, Catfish"
            {...register("fishCaught")}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Weather Conditions */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-2">Weather Conditions (optional)</label>
          <select {...register("weather")} className="w-full p-3 border border-gray-300 rounded-md">
            <option value="">Select weather conditions</option>
            <option value="sunny">Sunny</option>
            <option value="cloudy">Cloudy</option>
            <option value="rainy">Rainy</option>
            <option value="windy">Windy</option>
            <option value="stormy">Stormy</option>
            <option value="foggy">Foggy</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-2"
          >
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
}
