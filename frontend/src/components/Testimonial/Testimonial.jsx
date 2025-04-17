import React from "react";
import { HiStar } from "react-icons/hi";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import patientAvatar from "../../assets/images/patient-avatar.png";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Error from "../Error/Error";
import Loading from "../Loader/Loading";

function Testimonial() {
  // Fetch the latest 6 reviews with a rating of 5
  const {
    data: reviews,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/reviews?rating=5&limit=6`);

  return (
    <div className="mt-[30px] lg:mt-[55px]">
      {loading && !error && <Loading />}
      {error && !loading && <Error errMessage={error} />}
      {!loading && !error && reviews && reviews.length > 0 ? (
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="py-[30px] px-5 rounded-3">
                <div className="flex items-center gap-[13px]">
                  <img
                    src={review.user?.photo || patientAvatar}
                    alt={review.user?.name || "Patient"}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div>
                    <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                      {review.user?.name || "Anonymous"}
                    </h4>
                    <div className="flex items-center gap-[2px]">
                      {[...Array(review.rating)].map((_, index) => (
                        <HiStar
                          key={index}
                          className="text-yellowColor w-[18px] h-5"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
                  {review.reviewText}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">No reviews found.</p>
      )}
    </div>
  );
}

export default Testimonial;
