import { useState } from "react";
import StarIcon from "../../assets/images/Star.png";
import Error from "../../components/Error/Error.jsx";
import Loading from "../../components/Loader/Loading.jsx";
import { BASE_URL } from "../../config.js";
import useFetchData from "../../hooks/useFetchData";
import DoctorAbout from "../../pages/Doctors/DoctorAbout.jsx";
import Appointments from "./Appointments.jsx";
import Profile from "./Profile.jsx";
import Tabs from "./Tabs.jsx";

function DoctorDashboard() {
  const [tab, setTab] = useState("overview");
  const [refresh, setRefresh] = useState(false);

  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/profile/me`, refresh);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Trigger re-fetch
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-[30px] md:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className="md:col-span-2">
              {doctor?.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <svg
                    aria-hidden="true"
                    className="shrink-0 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://wwww.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile. We'll review
                    manually and approve within 3days.
                  </div>
                </div>
              )}

              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        <img src={doctor?.photo} alt="" className="w-full" />
                      </figure>

                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded-sm text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                          {doctor?.specialization || "Your Speciality"}
                        </span>
                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {doctor?.name || "Your Name"}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            <img src={StarIcon} alt="" />
                            {doctor?.averageRating}
                          </span>
                          <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                            ({doctor?.totalRating})
                          </span>
                        </div>
                        <p className="text_para font-[15px] lg:max-w-[390px] leading-6">
                          {doctor?.bio || "Your Bio"}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout doctor={doctor} />
                  </div>
                )}
                {tab === "appointments" && (
                  <Appointments appointments={doctor?.appointments} />
                )}
                {tab === "settings" && (
                  <Profile
                    doctorData={doctor}
                    onProfileUpdate={handleRefresh}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default DoctorDashboard;
