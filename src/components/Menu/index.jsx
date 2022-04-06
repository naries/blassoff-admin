import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { isEmpty } from "lodash";
import Arrow from "../../assets/svg/arrow.svg";
import Polygon from "../../assets/svg/polygon-right.svg";
import "../../styles/Sidebar.css";
import './style.css';

const Menu = ({ data }) => {
    const { label, route, icon, submenu } = data;
    const [subMenu, setSubMenu] = useState(false)
    let location = useLocation();

    return (
        isEmpty(submenu) ? (
            <Link
                to={route}
                className="menu-item"
            >
                <div className={`${location.pathname === route ? "menu--active" : "menu"} p-3 mb-2`}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <img src={icon} alt="icon" className="mr-3" />
                            {label}
                        </div>
                    </div>
                </div>
            </Link>
        ) : (
            <div className="mb-2">
                <div
                    className="menu-item sidebar"
                    onClick={() => setSubMenu(!subMenu)}
                >
                    <div className="menu p-3">
                        <div className="d-flex justify-content-between">
                            <div>
                                <img src={icon} alt="icon" className="mr-3" />
                                {label}
                            </div>
                            <div onClick={() => setSubMenu(!subMenu)}>
                                <img src={Arrow} alt="icon" className={subMenu ? "arrow" : ""} />
                            </div>
                        </div>
                    </div>
                </div>
                {subMenu && submenu.map((menu, id) => (
                    <Link to={menu.route} className="menu-item">
                        <div className="menu-item submenu-item py-3 px-3" style={{ marginBottom: "1px" }} key={id}>
                            <span className="ml-4">{menu.label}</span>
                        </div>
                    </Link>
                ))}
            </div>
        )

    );
};

export default Menu;
