import { useContext, useEffect, useState } from "react";
import Error from "../../components/Error/Error.jsx";
import Loading from "../../components/Loader/Loading.jsx";
import { BASE_URL } from "../../config.js";
import { authContext } from "../../context/AuthContext";
import useFetchData from "../../hooks/useFetchData";
import MyBookings from "./MyBookings";
import Profile from "./Profile";

function UserDashboard() {
  const { token, dispatch } = useContext(authContext); // Get token from context
  const [tab, setTab] = useState("bookings");
  const [refresh, setRefresh] = useState(false); // State to trigger re-fetch

  // Fetch user data with refresh and token dependency
  const {
    data: userData,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/profile/me`, refresh);

  // Handle logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // Trigger re-fetch when token changes
  useEffect(() => {
    setRefresh((prev) => !prev);
  }, [token]);

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {/* Loading and Error States */}
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        {/* Main Content */}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            {/* Sidebar */}
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor overflow-hidden">
                  <img
                    src={userData?.photo}
                    alt="Profile"
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData?.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData?.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:{" "}
                  <span className="ml-2 text-headingColor text-[20px] leading-8">
                    {userData?.bloodType || "N/A"}
                  </span>
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px]">
                <button
                  onClick={handleLogout}
                  className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                >
                  Logout
                </button>
                <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                  Delete account
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-2 md:px-[30px]">
              {/* Tabs */}
              <div className="flex justify-center">
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 mr-5 px-2 sm:px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Booking
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings" &&
                    "bg-primaryColor text-white font-normal"
                  } p-2 px-2 sm:px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>

              {/* Tab Content */}
              {tab === "bookings" ? (
                <MyBookings />
              ) : (
                <Profile
                  user={userData}
                  onProfileUpdate={() => setRefresh((prev) => !prev)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default UserDashboard;
