import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function SideBar() {

    const [active, setActive] = useState('Blurbs');
    const markActive = (link) => {
        setActive(link)
    }


    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "280px" ,height:"100vh"}}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
                    <img src="/fusionFLOW-logo.png" alt="" style={{width:"32px"}}/>
                    <span className="fs-4 fw-bold" style={{color:"#803bbf"}}>fusionFLOW</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/" className={`nav-link ${(active === 'Blurbs') ? 'active' : ''}`} aria-current="page" onClick={() => markActive('Blurbs')} style={{ color: (active != 'Blurbs') ? 'black' : 'white' }}>
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                            Blurbs
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/chat" className={`nav-link ${(active === 'Chat') ? 'active' : ''}`} aria-current="page" onClick={() => markActive('Chat')} style={{ color: (active != 'Chat') ? 'black' : 'white' }}>
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                            Chat
                        </Link>
                    </li>
                    <li>
                        <Link to="/expenses" className={`nav-link ${(active === 'Expenses') ? 'active' : ''}`} onClick={() => markActive('Expenses')} style={{ color: (active === 'Expenses') ? 'white' : 'black' }}>
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                            Expenses
                        </Link>
                    </li>
                    <li>
                        <Link to="/email" className={`nav-link ${(active === 'Email') ? 'active' : ''}`} onClick={() => markActive('Email')} style={{ color: (active === 'Email') ? 'white' : 'black' }}>
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                            Email
                        </Link>
                    </li>
                    <li>
                        <Link to="/spot" className={`nav-link ${(active === 'Spot') ? 'active' : ''}`} onClick={() => markActive('Spot')} style={{ color: (active === 'Spot') ? 'white' : 'black' }}>
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                            Spot
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>mdo</strong>
                    </a>
                    <ul className="dropdown-menu text-small shadow">
                        <li><a className="dropdown-item" href="#">New project...</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
