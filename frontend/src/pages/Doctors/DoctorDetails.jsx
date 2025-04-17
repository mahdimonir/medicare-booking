import { useEffect, useState } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import DoctorFeedback from "./DoctorFeedback";
import SidePanel from "./SidePanel";

import { useParams } from "react-router-dom";
import Error from "../../components/Error/Error.jsx";
import Loading from "../../components/Loader/Loading.jsx";
import { BASE_URL } from "../../config.js";
import useFetchData from "../../hooks/useFetchData.jsx";

function DoctorDetails() {
  const [tab, setTab] = useState("about");

  const { id } = useParams();
  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`, false);

  // State for reviews, averageRating, and totalRating
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);

  // Update reviews, averageRating, and totalRating when doctor data is fetched
  useEffect(() => {
    if (doctor) {
      setReviews(doctor.reviews || []);
      setAverageRating(doctor.averageRating || 0);
      setTotalRating(doctor.totalRating || 0);
    }
  }, [doctor]);

  // Function to handle adding a new review
  const handleAddReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]); // Add the new review to the list
    setTotalRating((prevTotal) => prevTotal + 1); // Increment total rating count

    // Recalculate the average rating using all reviews
    const updatedTotalRating = totalRating + 1; // Increment total rating count
    const updatedAverageRating =
      (averageRating * totalRating + newReview.rating) / updatedTotalRating; // Use the existing averageRating and totalRating
    setAverageRating(updatedAverageRating.toFixed(1)); // Update averageRating
  };

  return (
    <section>
      <div className="container">
        {loading && <Loading />}
        {error && <Error errMessage={error} />}
        {!loading && !error && doctor && (
          <div className="grid md:grid-cols-3 gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="max-w-[200px] max-h-[200px]">
                  <img src={doctor?.photo} alt="" className="w-full" />
                </figure>
                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded-sm">
                    {doctor?.specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {doctor?.name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" />
                      {averageRating} {/* Updated averageRating */}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({totalRating}) {/* Updated totalRating */}
                    </span>
                  </div>

                  <p className="text_para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                    {doctor?.bio}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Feedback
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "about" ? (
                  <DoctorAbout doctor={doctor} />
                ) : (
                  <DoctorFeedback
                    reviews={reviews}
                    totalRating={totalRating}
                    onAddReview={handleAddReview} // Pass the handler to DoctorFeedback
                  />
                )}
              </div>
            </div>

            <div>
              <SidePanel doctor={doctor} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default DoctorDetails;
