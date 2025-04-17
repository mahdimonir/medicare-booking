import { useContext, useEffect, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { authContext } from "../../context/AuthContext.jsx";

const navLinks = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

function Header() {
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();

    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    };
  }, []);

  const toggleMenu = () => {
    menuRef.current.classList.toggle("show_menu");
  };

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ==== logo === */}
          <div>
            <Link to="/">
              <img src={logo} alt="Medicare Logo" />
            </Link>
          </div>

          {/* ==== menu === */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ==== nav right ===== */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  {user.photo ? (
                    <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                      <img
                        src={user.photo}
                        className="w-full rounded-full"
                        alt="Profile"
                      />
                    </figure>
                  ) : (
                    <span className="text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor">
                      Profile
                    </span>
                  )}
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}
            {/* <div className="flex items-center gap-2"> */}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
            {/* </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
