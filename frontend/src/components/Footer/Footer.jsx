import React from "react";
import {
  AiFillGithub,
  AiFillYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";
import { RiLinkedinFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { handleComingSoon } from "../../utils/comingSoon";

const socialLinks = [
  {
    path: "#",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://github.com/mahdimonir",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "#",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "#",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
  },
];

const quickLinks01 = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/about",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "#",
    display: "Blog",
  },
];
const quickLinks02 = [
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "#",
    display: "Request an Appointment",
  },
  {
    path: "#",
    display: "Find Location",
  },
  {
    path: "#",
    display: "Get a Opinion",
  },
];
const quickLinks03 = [
  {
    path: "#",
    display: "Donate",
  },
  {
    path: "/contact",
    display: "Contact Us",
  },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-16 pt-16">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} alt="MediCare logo" />
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
              Copyright © {year} developed by Mahdi Moniruzzaman all right
              reserved.
            </p>

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  onClick={(e) => {
                    if (link.path === "#") {
                      handleComingSoon(e);
                    }
                  }}
                  className="w-9 h-9 border border-solid border-s-headingColor rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-700] mb-6 text-headingColor">
              Quick Links
            </h2>
            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      if (item.path === "#") {
                        handleComingSoon(e);
                      }
                    }}
                    className="text-[16px] left-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-700] mb-6 text-headingColor">
              I want to:
            </h2>
            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      if (item.path === "#") {
                        handleComingSoon(e);
                      }
                    }}
                    className="text-[16px] left-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-700] mb-6 text-headingColor">
              Support
            </h2>
            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      if (item.path === "#") {
                        handleComingSoon(e);
                      }
                    }}
                    className="text-[16px] left-7 font-[400] text-textColor"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
