import React from "react";
import MTN from "../assets/svg/mtn.svg"
import { menu } from "../data";
import Menu from "./Menu"
import "../styles/Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="wrapper">
                <div className="row m-0 p-0">
                    <img src={MTN} alt="mtn_logo" className="mr-2" />
                    <div>
                        <div className="title">CREATOR</div>
                        <div className="sub-title">Studio</div>
                    </div>
                </div>
                <div className="mt-2 mb-4">
                    <hr style={{ border: "1px solid #FFC423" }} />
                </div>
                <div>
                    {menu.map((data, id) => (
                        <div key={id}>
                            <Menu data={data} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
