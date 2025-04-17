import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";
import Loading from "../Loader/Loading";

function CheckoutStatus() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);
  const [isValidSession, setIsValidSession] = useState(null);

  useEffect(() => {
    console.log("Status:", status);
    console.log("Session ID:", sessionId);

    // Skip validateSession for testing
    if (sessionId) {
      setIsValidSession(true); // Assume session is valid for testing
    } else {
      setIsValidSession(false);
    }
  }, [sessionId, status]);

  useEffect(() => {
    if (status === "success" && sessionId && isValidSession) {
      const processedSessions =
        JSON.parse(localStorage.getItem("processedSessions")) || [];

      if (processedSessions.includes(sessionId)) {
        toast.info("This appoinment has already been processed.");
        return;
      }

      const saveBooking = async () => {
        try {
          const res = await fetch(`${BASE_URL}/bookings/save`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ sessionId }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || "Failed to save booking.");
          }

          if (data.message === "Booking already saved") {
            toast.info("This appoinment has already been processed.");
          } else {
            toast.success("Appointment booked successfully!");
            localStorage.setItem(
              "processedSessions",
              JSON.stringify([...processedSessions, sessionId])
            );
          }
        } catch (err) {
          console.error(err);
          toast.error(
            err.message || "An error occurred while saving the booking."
          );
        }
      };

      saveBooking();
    }
  }, [status, sessionId, isValidSession]);

  useEffect(() => {
    if (isValidSession !== null) {
      const timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isValidSession]);

  useEffect(() => {
    if (counter === 0) {
      if (status === "success") {
        navigate("/");
      } else {
        const doctorId = searchParams.get("doctorId") || "";
        navigate(`/doctors/${doctorId}`);
      }
    }
  }, [counter, status, navigate, searchParams]);

  if (isValidSession === null) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        {status === "success" && isValidSession ? (
          <>
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Successful!
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for completing your secure online payment.
              </p>
              <p>Redirecting to home in {counter} seconds...</p>
            </div>
          </>
        ) : (
          <>
            <svg
              viewBox="0 0 24 24"
              className="text-red-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Cancelled
              </h3>
              <p className="text-gray-600 my-2">
                Your payment process was cancelled. Please try again or contact
                support if needed.
              </p>
              <p>Redirecting to doctors in {counter} seconds...</p>
              <div className="py-10 text-center">
                <Link
                  to={`/doctors/${searchParams.get("doctorId") || ""}`}
                  className="ml-4 px-12 bg-gray-500 text-white font-semibold py-3"
                >
                  Retry Booking
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutStatus;
