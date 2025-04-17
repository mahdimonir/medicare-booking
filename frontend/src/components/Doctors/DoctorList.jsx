import DoctorCard from "./DoctorCard.jsx";

import Error from "../../components/Error/Error.jsx";
import Loading from "../../components/Loader/Loading.jsx";
import { BASE_URL } from "../../config.js";
import useFetchData from "./../../hooks/useFetchData.jsx";

function DoctorList() {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {doctors?.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
}

export default DoctorList;
