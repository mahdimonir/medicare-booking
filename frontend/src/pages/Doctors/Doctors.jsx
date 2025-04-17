import { useEffect, useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Error from "../../components/Error/Error.jsx";
import Loading from "../../components/Loader/Loading.jsx";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "../../config.js";
import useFetchData from "../../hooks/useFetchData";

function Doctors() {
  const [query, setQuery] = useState(""); // Search query
  const [debounceQuery, setDebounceQuery] = useState(""); // Debounced query for API calls

  // Fetch doctors based on the debounced query
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`, debounceQuery);

  // Debounce the search input to reduce API calls
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query.trim()); // Trim whitespace from the query
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timeout); // Clear timeout on cleanup
  }, [query]);

  return (
    <>
      {/* === Search Section === */}
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-hidden cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor by name or specialization"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={() => setDebounceQuery(query.trim())}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* === Doctors List Section === */}
      <section>
        <div className="container">
          {loading && <Loading />}
          {error && <Error errMessage={error} />}
          {!loading && !error && doctors && doctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          ) : (
            !loading &&
            !error && (
              <p className="text-center text-gray-500">
                No doctors found. Try a different search query.
              </p>
            )
          )}
        </div>
      </section>

      {/* === Testimonial Section === */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text_para text-center">
              World class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
}

export default Doctors;
