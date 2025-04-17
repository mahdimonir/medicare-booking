import React from "react";
import { formateDate } from "../../utils/formateDate";

function DoctorAbout({ doctor }) {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of{" "}
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {doctor?.name}
          </span>
        </h3>
        <p className="text_para">{doctor?.about}</p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>
        <ul className="pt-4 md:p-5">
          {doctor?.qualifications.length !== 0 ? (
            doctor?.qualifications.map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 md:-[30px]"
              >
                <div>
                  <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                    {formateDate(item.startingDate)} -{" "}
                    {formateDate(item.endingDate)}
                  </span>
                  <p className="text-[16px] leading-6 font-medium text-textColor">
                    {item.degree}
                  </p>
                </div>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {item.university}
                </p>
              </li>
            ))
          ) : (
            <li className="flex">
              <h2 className="text-irisBlueColor bg-[#CCF0F3] p-3.5 rounded-sm text-[16px] text-center leading-6 font-semibold">
                Add Your Qualifications here
              </h2>
            </li>
          )}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {doctor?.experiences.length !== 0 ? (
            doctor?.experiences.map((item, index) => (
              <li key={index} className="p-4 rounded-sm bg-[#fff9ea]">
                <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                  {formateDate(item.startingDate)} -{" "}
                  {formateDate(item.endingDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {item.position}
                </p>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {item.hospital}
                </p>
              </li>
            ))
          ) : (
            <li className="flex">
              <h2 className="text-[16px] p-3.5 rounded-sm bg-[#fff9ea] text-center leading-6 font-semibold text-yellowColor">
                Add Your Experiences here
              </h2>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default DoctorAbout;
