import React from 'react'

const Alert = ({ type, noMargin, container, children }) => {
    return (
        <div className={`alert alert-${type} alert-dismissible fade show container`} role="alert" style={noMargin ? { margin: "0px" }: {marginTop: "2rem", marginBottom: '0px'}}>
            {children}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default Alert
