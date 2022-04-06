import React from 'react'
import { NavLink } from 'react-router-dom'

export const PageHeader = () => {
    return (
        <div className="page-header">
            <div className="row align-items-center">
                <div className="col-md-12">
                    <div className="d-flex align-items-center">
                        <h5 className="page-title">Dashboard</h5>
                        <ul className="breadcrumb ml-2">
                            <li className="breadcrumb-item"><NavLink to="/"><i className="fas fa-home"></i></NavLink></li>
                            <li className="breadcrumb-item"><NavLink to="/">Dashboard</NavLink></li>
                            <li className="breadcrumb-item active">Inbox</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
