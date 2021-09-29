import React from 'react'

const Alert = ({ type, noMargin, children }) => {
    return (
        <div className={`alert alert-${type}`} style={noMargin && { margin: "0px" }}>
            <p className="container">{children}</p>
        </div>
    )
}

export default Alert
