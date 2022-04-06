import React, { useState, useEffect } from "react";
import { loadState, logout } from "../helpers/local_storage";
import { resetData } from "../store/auth";
import { getCategory } from "../store/category";
import { getEpisode } from "../store/episodes";
import { getPods } from "../store/podcast";
import { useDispatch } from "react-redux";
import { Dropdown } from "react-bootstrap";
import Notification from "../assets/svg/notification.svg"
import Cloud from "../assets/svg/cloud-interactive.svg"
import Time from "../assets/svg/time.svg"
import Calendar from "../assets/svg/calendar.svg"
import { Link, useHistory, Redirect } from "react-router-dom";
import moment from "moment";

const Header = (props) => {
    const dispatch = useDispatch();
    const user = loadState() && loadState().user;
    const userId = loadState() && loadState().userId;
    const lastFetch = loadState() && loadState().lastFetch;
    const lastLogin = moment(lastFetch).fromNow();
    const dateNow = moment(new Date()).format("DD-MM-YYYY");
    const history = useHistory()
    const [isLogout, SetLogout] = useState(false)

    const handleLogout = () => {
        logout()
        dispatch(resetData())
        SetLogout(true)
    }

    //grab the episodes when the header is loading
    useEffect(() => {
        if (isLogout) {
            window.location.href = "/#/";
        }
        if (userId) {
            dispatch(getPods(userId))
        }
    }, [dispatch, history, isLogout, userId])

    useEffect(() => {
        dispatch(getCategory())
    }, [dispatch])

    if (!user) return <Redirect to="/" />

    return (
        <div style={{ background: "white", border: "1px solid #E0E0E0" }}>
            <div className="d-flex justify-content-between py-3 px-4">
                <div className="d-flex align-items-center">
                    <span className="welcome mr-1">Welcome,</span><span className="name">{` ${user && user.firstname.charAt(0).toUpperCase()
                        + user.firstname.slice(1)} ${user && user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}`}</span>
                </div>
                <div className="d-flex flex-row">
                    <div className="d-flex align-items-center mr-5">
                        <div className="mr-4 time"><img src={Time} alt="time" className="mb-1 mr-2" />Last Login: {lastLogin}</div>
                        <div className="mr-4 time"><img src={Calendar} alt="calendar" className="mb-1 mr-2" />Today's Date: {dateNow}</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="mr-2"><img src={Notification} alt="notification" width="25" /></div>
                        <Dropdown >
                            <Dropdown.Toggle variant="light" className="px-2" id="cloud">
                                <img src={Cloud} alt="cloud" width="25" className="mr-2" />Settings
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="px-3">
                                <div className="pt-2">
                                    <Link className="dropdown-content" to="/setting">Account Settings</Link>
                                </div>
                                <div className="pt-1">
                                    <Link className="dropdown-content" to="/change-password">Change Password</Link>
                                </div>
                                <div className="pt-1 pb-2">
                                    <Link className="dropdown-content" onClick={() => handleLogout()}>Logout</Link>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Header;
