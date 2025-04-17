import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import avatarIcon from "../assets/images/avatar-icon.png";
import faqImg from "../assets/images/faq-img.png";
import featureImg from "../assets/images/feature-img.png";
import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import videoIcon from "../assets/images/video-icon.png";
import About from "../components/About/About";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/faq/FaqList";
import ServiceList from "../components/Services/ServiceList";
import Testimonial from "../components/Testimonial/Testimonial";
import { handleComingSoon } from "../utils/comingSoon";

function Home() {
  return (
    <>
      {/* === Hero Section === */}
      <section className="hero_section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* Hero Content */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  We help patients live a healthy, longer life.
                </h1>
                <p className="text_para">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Nihil accusantium eum perferendis quasi quae enim dignissimos
                  earum unde ratione, saepe sapiente voluptatum voluptate
                  molestias nesciunt.
                </p>
                <Link to="/appointment">
                  <button
                    className="btn"
                    onClick={(e) => {
                      handleComingSoon(e);
                    }}
                  >
                    Request an Appointment
                  </button>
                </Link>
              </div>

              {/* Hero Counter */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                {[
                  {
                    count: "30+",
                    label: "Years of Experience",
                    color: "yellowColor",
                  },
                  {
                    count: "15+",
                    label: "Clinic Locations",
                    color: "purpleColor",
                  },
                  {
                    count: "100%",
                    label: "Patient Satisfaction",
                    color: "irisBlueColor",
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                      {item.count}
                    </h2>
                    <span
                      className={`w-[100px] h-2 bg-${item.color} rounded-full block mt-[-14px]`}
                    ></span>
                    <p className="text_para">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Images */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img src={heroImg01} alt="Hero 1" className="w-full" />
              </div>
              <div className="mt-[30px]">
                <img
                  src={heroImg02}
                  alt="Hero 2"
                  className="w-full mb-[30px]"
                />
                <img src={heroImg03} alt="Hero 3" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === About Section === */}
      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto text-center">
            <h2 className="heading">Providing the best medical services</h2>
            <p className="text_para">
              We are a team of dedicated healthcare professionals who are
              committed to providing the best possible care for our patients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {[
              { icon: icon01, title: "Find a Doctor", link: "/doctors" },
              { icon: icon02, title: "Find Location", link: "/locations" },
              { icon: icon03, title: "Book Appointment", link: "/appointment" },
            ].map((item, index) => (
              <div key={index} className="py-[30px] px-5">
                <div className="flex items-center justify-center">
                  <img src={item.icon} alt={item.title} />
                </div>
                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    {item.title}
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    World-class care for everyone. Our health system offers
                    unmatched, expert health care. From the lab to the clinic.
                  </p>
                  <Link
                    to={item.link}
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    onClick={(e) => {
                      if (item.link !== "/doctors") {
                        handleComingSoon(e);
                      }
                    }}
                  >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === About Component === */}
      <About />

      {/* === Services Section === */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto text-center">
            <h2 className="heading">Our Medical Services</h2>
            <p className="text_para">
              World-class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>
          <ServiceList />
        </div>
      </section>

      {/* === Feature Section === */}
      <section>
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            {/* Feature Content */}
            <div className="xl:w-[670px]">
              <h2 className="heading">
                Get virtual treatment <br /> anytime.
              </h2>
              <ul>
                {[
                  "Schedule the appointment directly.",
                  "Search for your physician here, and contact their office.",
                  "View our physicians who are accepting new patients, use the online scheduling tool to select an appointment time.",
                ].map((text, index) => (
                  <li key={index} className="text_para">
                    {index + 1}. {text}
                  </li>
                ))}
              </ul>
              <Link to="/appointment" onClick={(e) => handleComingSoon(e)}>
                <button className="btn">Learn More</button>
              </Link>
            </div>

            {/* Feature Image */}
            <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
              <img src={featureImg} className="w-3/4" alt="Feature" />
              <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                      Tue, 24
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">
                      10:00AM
                    </p>
                  </div>
                  <span className="w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded-sm py-1 px-[6px] lg:py-3 lg:px-[9px]">
                    <img src={videoIcon} alt="Video" />
                  </span>
                </div>
                <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                  Consultation
                </div>
                <div className="flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} alt="Avatar" />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor">
                    Wayne Collins
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Doctors Section === */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto text-center">
            <h2 className="heading">Our Great Doctors</h2>
            <p className="text_para">
              World-class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>
          <DoctorList />
        </div>
      </section>

      {/* === FAQ Section === */}
      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="FAQ" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="heading">
                Most questions by our beloved patients
              </h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>

      {/* === Testimonial Section === */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto text-center">
            <h2 className="heading">What our patients say</h2>
            <p className="text_para">
              World-class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
}

export default Home;
