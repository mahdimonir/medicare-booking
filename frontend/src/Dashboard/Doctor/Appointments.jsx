import { formateDate } from "../../utils/formateDate";

function Appointments({ appointments }) {
  return (
    <div>
      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Payment
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Booked on
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((item) => (
              <tr key={item._id} className="border-b">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
                >
                  <img
                    src={item.user.photo}
                    alt={item.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="pl-3">
                    <div className="text-base font-semibold">
                      {item.user.name}
                    </div>
                    <div className="text-normal text-gray-500">
                      {item.user.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{item.user.gender}</td>
                <td className="px-6 py-4">
                  {!item.isPaid && (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                      Unpaid
                    </div>
                  )}
                  {item.isPaid && (
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                      Paid
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">{item.ticketPrice}</td>
                <td className="px-6 py-4">{formateDate(item.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for smaller screens */}
      <div className="block sm:hidden">
        {appointments?.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 mb-4 shadow-sm bg-white"
          >
            <div className="flex items-center mb-4">
              <img
                src={item.user.photo}
                alt={item.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h3 className="text-base font-semibold">{item.user.name}</h3>
                <p className="text-sm text-gray-500">{item.user.email}</p>
              </div>
            </div>
            <p className="text-sm">
              <strong>Gender:</strong> {item.user.gender}
            </p>
            <p className="text-sm">
              <strong>Payment:</strong>{" "}
              {item.isPaid ? (
                <span className="text-green-500">Paid</span>
              ) : (
                <span className="text-red-500">Unpaid</span>
              )}
            </p>
            <p className="text-sm">
              <strong>Price:</strong> {item.ticketPrice}
            </p>
            <p className="text-sm">
              <strong>Booked on:</strong> {formateDate(item.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointments;
