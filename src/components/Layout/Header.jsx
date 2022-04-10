import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
// import Logo from "../../assets/svg/admin-logo.svg";
import AdminLogo from '../../assets/img/admin-logo.png'
import LogoSmall from "../../assets/img/audapp-logo-small.svg";
import Avatar from "../../assets/img/avatar.jpeg";
import HamburgerWhite from "../../assets/svg/hamburger-white.svg";
import { Dropdown } from "react-bootstrap";
import { resetData } from "../../store/auth";
import { useDispatch } from "react-redux";
import { loadState, logout } from "../../helpers/local_storage";

export const Header = () => {
  const location = useLocation();
  const user = loadState() && loadState().user;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(resetData());
    logout();
    history.push("/");
  };

  const handleToggle = () => {
    let mainWrapper = document.getElementById("main-wrapper");
    let sidebarOverlay = document.getElementById("sidebar-overlay");
    if (mainWrapper.classList.contains("slide-nav")) {
      mainWrapper.classList.remove("slide-nav");
      sidebarOverlay.classList.remove("opened");
    } else {
      mainWrapper.classList.add("slide-nav");
      sidebarOverlay.classList.add("opened");
    }

    sidebarOverlay.onclick = function changeContent() {
      mainWrapper.classList.remove("slide-nav");
      sidebarOverlay.classList.remove("opened");
    };
  };

  React.useEffect(() => {
    document.getElementById("main-wrapper").classList.remove("slide-nav");
    document.getElementById("sidebar-overlay").classList.remove("opened");
  }, [location]);

  return (
    <div className="header">
      <div className="header-left">
        <NavLink to="/dashboard" className="logo">
          <div style={{ display: 'flex' }}>
            <div>
              <img src={AdminLogo} alt="Logo" />
            </div>
            <div className="text-left ml-4">
              <div>Blast Off</div>
              <div style={{ fontWeight: 400 }}>Admin Portal</div>
            </div>
          </div>
        </NavLink>
        <NavLink to="/dashboard" className="logo logo-small">
          <img src={LogoSmall} alt="Logo" width="30" height="30" />
        </NavLink>
      </div>

      <span className="mobile_btn" id="mobile_btn" onClick={handleToggle}>
        <img src={HamburgerWhite} alt="hamburger" />
      </span>

      <ul
        className="nav user-menu"
        style={{ marginRight: "1rem", marginTop: ".6rem" }}
      >
        {/* <li className="nav-item dropdown has-arrow main-drop ml-md-3">
          <NavLink
            to="/dashboard"
            className="dropdown-toggle nav-link"
            data-toggle="dropdown"
          >
            <span className="user-img">
              <img src={Avatar} alt="avatr" />
              <span className="status online"></span>
            </span>
          </NavLink>
          <div className="dropdown-menu">
            <NavLink to="/dashboard" className="dropdown-item">
              <i className="feather-user"></i> My Profile
            </NavLink>
            <NavLink to="/dashboard" className="dropdown-item">
              <i className="feather-power"></i> Logout
            </NavLink>
          </div>
        </li> */}

        <li style={{ display: "flex", alignItems: "center" }}>
          <Dropdown>
            <Dropdown.Toggle
              style={{ background: "none" }}
              className="dropdown-toggle d-flex align-items-center nav-link border-0"
            >
              <div style={{ minWidth: "95px", color: '#053241' }}>
                {user?.firstname} {user?.lastname}...
              </div>
              <span className="user-img mr-3">
                <img src={Avatar} alt="avatr" />
                <span className="status online"></span>
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{ transform: "translate3d(-69px, 48px, 0px" }}
            >
              <Dropdown.Item eventKey="1">
                <div className="admin-profile-dropdown">
                  {/* <img src={Avatar} alt="avatr" /> */}
                  <div>
                    <div>
                      <div>
                        {user?.firstname} {user?.lastname}
                      </div>
                      <div className="admin-profile-dropdown--email">
                        {user?.email}
                      </div>
                    </div>
                    <div onClick={() => handleLogout()}>Logout</div>
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
};
