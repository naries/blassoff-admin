import React from 'react'

export const FluidContainer = (props) => {
    return (
        <div className="container-fluid">
            {props.children}
        </div>
    )
}
