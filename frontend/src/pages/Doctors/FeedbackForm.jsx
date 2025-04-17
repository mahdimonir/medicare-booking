import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

function FeedbackForm({ onClose, onAddReview }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText.trim()) {
        setLoading(false);
        return toast.error("Rating and feedback text are required.");
      }

      const token = localStorage.getItem("token"); // Dynamically fetch token
      if (!token) {
        setLoading(false);
        return toast.error("You must be logged in to submit feedback.");
      }

      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, reviewText: reviewText.trim() }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to submit feedback.");
      }

      // Add the new review to the parent component
      onAddReview(result.data); // Assuming the API returns the new review in `result.data`

      toast.success(result.message || "Feedback submitted successfully!");

      // Clear the form and close it
      setRating(0);
      setReviewText("");
      onClose();
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitReview}>
      {/* Rating Section */}
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          How would you rate the overall experience?*
        </h3>
        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;

            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= (hover || rating)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-hidden text-[22px] cursor-pointer`}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
                onClick={() => setRating(index)}
              >
                <AiFillStar />
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Text Section */}
      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback or suggestions*
        </h3>
        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="Write your message here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      {/* Submit Button */}
      <button disabled={loading} type="submit" className="btn mt-4">
        {loading ? <HashLoader size={18} color="#fff" /> : "Submit Feedback"}
      </button>
    </form>
  );
}

export default FeedbackForm;
