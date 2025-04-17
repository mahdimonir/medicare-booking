import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config.js";
// import { asyncHandler } from "../../utils/apiHandler";
import { convertTime } from "../../utils/formateDate";

function SidePanel({ doctor }) {
  const bookingHandler = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctor._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Unexpected response from the server. Please try again."
        );
      }

      const data = await res.json();
      console.error("RES: ", res);
      console.error("Data: ", data);

      if (!res.ok) {
        toast.error(data.message || "Something went wrong. Please try again.");
        return;
      }

      if (data.data.url) {
        window.location.href = data.data.url; // Redirect to the URL
      } else {
        throw new Error("No URL found in the response.");
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };

  return (
    <div className="shadow-2xl shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {doctor?.ticketPrice} BDT
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>

        <ul className="mt-3">
          {doctor?.timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day[0].toUpperCase(0) + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{" "}
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
        Book Appointment
      </button>
    </div>
  );
}

export default SidePanel;
