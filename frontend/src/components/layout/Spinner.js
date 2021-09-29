import React from 'react'
import logo from './spinner.gif'

const Spinner = () => (
    <>
        <img src={logo}
            style={{ height: '75px', margin: 'auto', display: 'block' }}
            alt="Loading..."
        />
    </>
)

export default Spinner
