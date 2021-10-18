import React, {useState, useEffect } from 'react'

const Alert = ({ type, noMargin, container, children, dismissable }) => {
    const [ show, setShow ] = useState(true);

    useEffect(() => {
        if(dismissable){
            setTimeout(()=>{
                setShow(false)
            }, 3000)
        }
    }, [dismissable])

     // <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

    return (
        <>
        {
            show && (
                <div 
                    className={`alert alert-${type} alert-dismissible fade show container`} 
                    role="alert" 
                    style={noMargin ? { margin: "0px" }: {marginTop: "2rem", marginBottom: '0px'}}
                >
                {children}
            </div>
            )
        }
        </>
      
    )
}

export default Alert
