import { NavLink } from 'react-router-dom'
import UserAvatar2 from '../../assets/img/profiles/avatar-02.jpg'
import UserAvatar3 from '../../assets/img/profiles/avatar-03.jpg'
import UserAvatar4 from '../../assets/img/profiles/avatar-04.jpg'
import UserAvatar5 from '../../assets/img/profiles/avatar-05.jpg'
import UserAvatar6 from '../../assets/img/profiles/avatar-06.jpg'

export const Notifications = () => {

    return (
        <div className={`notifications`}>
            <div className="topnav-dropdown-header">
                <span className="notification-title">Notifications</span>
                <span className="clear-noti"> <i className="feather-x-circle"></i> </span>
            </div>
            <div className="noti-content">
                <ul className="notification-list">
                    <li className="notification-message">
                        <NavLink to="/">
                            <div className="media">
                                <span className="avatar">
                                    <img alt="imghere" src={UserAvatar2} className="rounded-circle" />
                                </span>
                                <div className="media-body">
                                    <p className="noti-details"><span className="noti-title">John Doe</span> added new task <span className="noti-title">Patient appointment booking</span></p>
                                    <p className="noti-time"><span className="notification-time">4 mins ago</span></p>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                    <li className="notification-message">
                        <NavLink to="/">
                            <div className="media">
                                <span className="avatar">
                                    <img alt="imghere" src={UserAvatar3} className="rounded-circle" />
                                </span>
                                <div className="media-body">
                                    <p className="noti-details"><span className="noti-title">Tarah Shropshire</span> changed the task name <span className="noti-title">Appointment booking with payment gateway</span></p>
                                    <p className="noti-time"><span className="notification-time">6 mins ago</span></p>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                    <li className="notification-message">
                        <NavLink to="/">
                            <div className="media">
                                <span className="avatar">
                                    <img alt="imghere" src={UserAvatar4} className="rounded-circle" />
                                </span>
                                <div className="media-body">
                                    <p className="noti-details"><span className="noti-title">Misty Tison</span> added <span className="noti-title">Domenic Houston</span> and <span className="noti-title">Claire Mapes</span> to project <span className="noti-title">Doctor available module</span></p>
                                    <p className="noti-time"><span className="notification-time">8 mins ago</span></p>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                    <li className="notification-message">
                        <NavLink to="/">
                            <div className="media">
                                <span className="avatar">
                                    <img alt="imghere" src={UserAvatar5} className="rounded-circle" />
                                </span>
                                <div className="media-body">
                                    <p className="noti-details"><span className="noti-title">Rolland Webber</span> completed task <span className="noti-title">Patient and Doctor video conferencing</span></p>
                                    <p className="noti-time"><span className="notification-time">12 mins ago</span></p>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                    <li className="notification-message">
                        <NavLink to="/">
                            <div className="media">
                                <span className="avatar">
                                    <img alt="imghere" src={UserAvatar6} className="rounded-circle" />
                                </span>
                                <div className="media-body">
                                    <p className="noti-details"><span className="noti-title">Bernardo Galaviz</span> added new task <span className="noti-title">Private chat module</span></p>
                                    <p className="noti-time"><span className="notification-time">2 days ago</span></p>
                                </div>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="topnav-dropdown-footer">
                <NavLink to="/">View all Notifications</NavLink>
            </div>
        </div>
    )
}
