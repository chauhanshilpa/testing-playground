import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
    return (
        <>
            {/* image */}
            <img src={logo} alt="app-logo" />
            {/* app-heading */}
            <div className='app_heading'>
                <h1>Frontend Feature Lab: Testing Playground</h1>
                <h6>Experiment with UI features, built with advanced testing</h6>
            </div>
            {/* pill badge */}
            <div className='status_badge'>
                Tests: { }&nbsp;|&nbsp;Coverage: { }%
            </div>
        </>
    )
}

export default Header
