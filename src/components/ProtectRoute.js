import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isEmpty } from "lodash";
import { loadState } from "../helpers/local_storage";
import { Sidebar, Header } from "../components";


const ProtectedRoute = ({ component: Component, render, ...rest }) => {

    return (
        <div className="d-flex flex-row page-container" >
            <div className="col-2 p-0 m-0">
                <Sidebar />
            </div>

            <div className="col-10 p-0 m-0" style={{ background: "#F9F9F9" }}>
                <Header />
                <Route
                    {...rest}
                    exact
                    render={props => {
                        if (isEmpty(loadState())) return <Redirect to={{
                            pathname: "/",
                            state: { from: props.location }
                        }} />;
                        return Component ? <Component  {...props} /> : render(props);
                    }}
                />
            </div>
        </div>
    )
};

export default ProtectedRoute;
