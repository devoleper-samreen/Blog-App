import React from 'react'
import logo from "../../public/logo.jpg"

function Logo({ width = "50px" }) {
    return (
        <div style={{ width: width }}>
            <img src={logo} />
        </div>
    )
}

export default Logo