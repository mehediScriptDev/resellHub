"use client";

import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export function ProductReviews({ productId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/reviews/product/${productId}`);
      if (data.success) {
        setReviews(data.data);
        setAverageRating(data.averageRating || 0);
      }
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await api.post("/reviews", { productId, rating, comment });
      setComment("");
      setRating(5);
      await fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-16 pt-12 border-t">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2 text-yellow-500">
            <Star className="w-5 h-5 fill-yellow-500" />
            <span className="font-bold text-foreground">{averageRating}</span>
            <span className="text-muted-foreground text-sm">({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      {user?.role === "buyer" && (
        <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 mb-8 space-y-4">
          <h3 className="font-semibold text-foreground">Write a Review</h3>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div>
            <label className="text-sm font-medium block mb-2">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full md:w-48 px-3 py-2 border rounded bg-background text-sm"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Comment</label>
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded bg-background text-sm"
              placeholder="Share your experience with this product..."
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-card border rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-foreground">{review.reviewerId?.name || "Buyer"}</div>
                <div className="flex items-center text-yellow-500 text-sm">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm">{review.comment}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
