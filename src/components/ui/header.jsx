import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import logo from "@/assets/resicareprologo.png";
import "@/css/header.css";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const profileRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedAuth = localStorage.getItem("resicareAuth");

        if (!storedAuth) {
          setCurrentUser(null);
          return;
        }

        const authData = JSON.parse(storedAuth);

        if (
          authData.expiresAt &&
          Date.now() >= Number(authData.expiresAt)
        ) {
          localStorage.removeItem("resicareAuth");
          setCurrentUser(null);
          return;
        }

        setCurrentUser(authData.user || null);
      } catch (error) {
        console.error("Unable to load user:", error);
        localStorage.removeItem("resicareAuth");
        setCurrentUser(null);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedDesktopProfile =
        profileRef.current?.contains(event.target);

      const clickedMobileProfile =
        mobileProfileRef.current?.contains(event.target);

      if (!clickedDesktopProfile && !clickedMobileProfile) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setProfileOpen(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setProfileOpen(false);
  };

  const handleNavigation = () => {
    setProfileOpen(false);
    setIsOpen(false);
  };

  const handleLogout = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    localStorage.removeItem("resicareAuth");
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("currentUser");

    setCurrentUser(null);
    setProfileOpen(false);
    setIsOpen(false);

    navigate("/login", { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  const getUserName = () => {
    return (
      currentUser?.fullName ||
      currentUser?.name ||
      currentUser?.username ||
      "User"
    );
  };

  const getUserEmail = () => {
    return currentUser?.email || "No email available";
  };

  const getInitials = () => {
    const name = getUserName();
    const words = name.trim().split(/\s+/);

    if (words.length >= 2) {
      return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
    }

    return name.charAt(0).toUpperCase();
  };

  const getProfileImage = () => {
    return (
      currentUser?.profileImage ||
      currentUser?.profilePic ||
      currentUser?.avatar ||
      currentUser?.image ||
      null
    );
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Link
          to="/home"
          className="header-brand"
          onClick={handleNavigation}
        >
          <img
            src={logo}
            alt="ResiCare Pro"
            className="header-logo"
          />
        </Link>

        <nav className="desktop-nav">
          <Link
            to="/home"
            className={isActive("/home") ? "active" : ""}
            onClick={handleNavigation}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={isActive("/services") ? "active" : ""}
            onClick={handleNavigation}
          >
            Services
          </Link>
          <Link
            to="/about"
            className={isActive("/about") ? "active" : ""}
            onClick={handleNavigation}
          >
            About
          </Link>
          <Link
            to="/projects"
            className={isActive("/projects") ? "active" : ""}
            onClick={handleNavigation}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className={isActive("/contact") ? "active" : ""}
            onClick={handleNavigation}
          >
            Contact
          </Link>
        </nav>

        <div className="header-actions">
          <div className="service-area-badge">
            <span className="service-area-label">SERVING</span>
            <span className="service-area-text">
              Islamabad & Nearby Areas
            </span>
          </div>

          <Link
            to="/request-service"
            className="request-service-link"
            onClick={handleNavigation}
          >
            <Button className="request-service-button">
              Request a Service
            </Button>
          </Link>

          {currentUser && (
            <div
              className="profile-container desktop-profile"
              ref={profileRef}
            >
              <button
                type="button"
                className={`profile-avatar-button ${
                  profileOpen ? "profile-active" : ""
                }`}
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-label="Open user profile"
                aria-expanded={profileOpen}
              >
                {getProfileImage() ? (
                  <img
                    src={getProfileImage()}
                    alt={getUserName()}
                    className="profile-avatar-image"
                  />
                ) : (
                  <span className="profile-avatar">
                    {getInitials()}
                  </span>
                )}
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-info">
                    <div className="profile-name">
                      {getUserName()}
                    </div>
                    <div className="profile-email">
                      {getUserEmail()}
                    </div>
                  </div>

                  <div className="profile-dropdown-divider"></div>

                  <button
                    type="button"
                    className="profile-logout-button"
                    onClick={handleLogout}
                  >
                    <LogOut
                      size={16}
                      className="logout-icon"
                    />
                    <span className="logout-text">
                      Logout
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            className={`hamburger-btn ${
              isOpen ? "active" : ""
            }`}
            onClick={toggleMenu}
            aria-label={
              isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div
        className={`mobile-sidebar-overlay ${
          isOpen ? "active" : ""
        }`}
        onClick={closeMenu}
      ></div>

      <aside
        className={`mobile-sidebar ${
          isOpen ? "active" : ""
        }`}
      >
        <div className="sidebar-header">
          <Link
            to="/home"
            className="sidebar-brand"
            onClick={handleNavigation}
          >
            <img
              src={logo}
              alt="ResiCare Pro"
            />
          </Link>

          <button
            type="button"
            className="close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {currentUser && (
          <div
            className="mobile-user-profile-wrapper"
            ref={mobileProfileRef}
          >
            <button
              type="button"
              className={`mobile-profile-toggle ${
                profileOpen ? "active" : ""
              }`}
              onClick={() =>
                setProfileOpen((prev) => !prev)
              }
              aria-expanded={profileOpen}
            >
              {getProfileImage() ? (
                <img
                  src={getProfileImage()}
                  alt={getUserName()}
                  className="mobile-user-avatar-image"
                />
              ) : (
                <div className="mobile-user-avatar">
                  {getInitials()}
                </div>
              )}

              <div className="mobile-user-details">
                <strong>{getUserName()}</strong>
              </div>

              <span
                className={`dropdown-arrow ${
                  profileOpen ? "open" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {profileOpen && (
              <div className="mobile-profile-dropdown">
                <div className="profile-dropdown-info">
                  <div className="profile-email">
                    {getUserEmail()}
                  </div>
                </div>

                <div className="profile-dropdown-divider"></div>

                <button
                  type="button"
                  className="profile-logout-button"
                  onClick={handleLogout}
                >
                  <LogOut
                    size={16}
                    className="logout-icon"
                  />
                  <span className="logout-text">
                    Logout
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        <nav className="sidebar-nav">
          <Link
            to="/home"
            className={isActive("/home") ? "active" : ""}
            onClick={handleNavigation}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={isActive("/services") ? "active" : ""}
            onClick={handleNavigation}
          >
            Services
          </Link>
          <Link
            to="/about"
            className={isActive("/about") ? "active" : ""}
            onClick={handleNavigation}
          >
            About
          </Link>
          <Link
            to="/projects"
            className={isActive("/projects") ? "active" : ""}
            onClick={handleNavigation}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className={isActive("/contact") ? "active" : ""}
            onClick={handleNavigation}
          >
            Contact
          </Link>
        </nav>

        <div className="sidebar-service-area">
          <span className="sidebar-service-label">
            SERVICE AREA
          </span>
          <span className="sidebar-service-text">
            Islamabad & Nearby Areas
          </span>
        </div>

        <div className="sidebar-actions">
          <Link
            to="/request-service"
            onClick={handleNavigation}
          >
            <Button className="sidebar-request-btn">
              Request a Service
            </Button>
          </Link>
        </div>
      </aside>
    </header>
  );
}