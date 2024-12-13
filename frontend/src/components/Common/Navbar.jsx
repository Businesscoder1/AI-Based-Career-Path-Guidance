import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light12.png"
import { NavbarLinks } from "../../data/navbar-links"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" className="h-12  rounded-lg" />
        </Link>
        
        {/* Desktop Navigation Links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                <Link to={link?.path}>
                  <p
                    className={`${matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                      }`}
                  >
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard (Desktop) */}
        <div className="hidden items-center gap-x-4 md:flex">
          {token === null ? (
            <>
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropdown />
          )}
        </div>

        {/* Hamburger Icon for Mobile */}
        <button onClick={toggleMobileMenu} className="mr-4 md:hidden">
          {isMobileMenuOpen ? (
            <AiOutlineClose fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-richblack-800 border-b border-richblack-700 p-4 md:hidden">
          <ul className="flex flex-col items-center gap-y-4 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index} onClick={() => setIsMobileMenuOpen(false)}>
                <Link to={link?.path}>
                  <p
                    className={`${matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                      }`}
                  >
                    {link.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col items-center gap-y-2">
            {token === null ? (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                    Sign up
                  </button>
                </Link>
              </>
            ) : (
              <ProfileDropdown />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
