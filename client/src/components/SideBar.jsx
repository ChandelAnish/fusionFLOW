import React, { useState } from 'react'
import { Link } from 'react-router-dom';


export default function SideBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [active, setActive] = useState('Blurbs');
    const markActive = (link) => {
        setActive(link)
    }

    const navLinkStyles = {
        color:"white",
        fontFamily: "Forum, serif",
        fontSize:"1.2rem"
    }

    const dropdownStyle = {
        position: 'relative',
        display: 'inline-block'
    };

    const dropdownMenuStyle = {
        display: isDropdownOpen ? 'block' : 'none',
        position: 'absolute',
        backgroundColor: '#fff',
        minWidth: '160px',
        boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
        padding: '8px 0',
        zIndex: 1,
        bottom: '100%',  // Position above the trigger
        left: 0,
        borderRadius: '4px',
        marginBottom: '8px'
    };

    
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('[data-dropdown]')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);


    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 " style={{ width: "200px", height: "100vh", backgroundColor: '#160d1c' }}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    {/* <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg> */}
                    <img src="/fusionFLOW-logo.png" alt="" style={{ width: "32px" }} />
                    <span className="fs-4 fw-bold" style={{ color: "#803bbf" }}>fusionFLOW</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/" className={`nav-link`} aria-current="page" onClick={() => markActive('Blurbs')} style={{...navLinkStyles, backgroundColor: active === 'Blurbs' ? '#FFD717' : 'transparent'}}>
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                            Blurbs
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/chat" className={`nav-link`} aria-current="page" onClick={() => markActive('Chat')} style={{...navLinkStyles, backgroundColor: active === 'Chat' ? '#FFD717' : 'transparent'}}>
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                            Chat
                        </Link>
                    </li>
                    <li>
                        <Link to="/expenses" className={`nav-link`} onClick={() => markActive('Expenses')} style={{...navLinkStyles, backgroundColor: active === 'Expenses' ? '#FFD717' : 'transparent'}}>
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                            Expenses
                        </Link>
                    </li>
                    <li>
                        <Link to="/email" className={`nav-link`} onClick={() => markActive('Email')} style={{...navLinkStyles, backgroundColor: active === 'Email' ? '#FFD717' : 'transparent'}}>
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                            Email
                        </Link>
                    </li>
                    <li>
                        <Link to="/spot" className={`nav-link`} onClick={() => markActive('Spot')} style={{...navLinkStyles, backgroundColor: active === 'Spot' ? '#FFD717' : 'transparent'}}>
                            <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                            Spot
                        </Link>
                    </li>
                </ul>
                <hr style={{color:"white"}} />
                {/* <div className="dropdown">
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
                </div> */}
                <div style={dropdownStyle} data-dropdown>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDropdownOpen(!isDropdownOpen);
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'white',
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            fontFamily: 'inherit'
                        }}
                    >
                        <img
                            src="https://github.com/mdo.png"
                            alt=""
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                marginRight: '8px'
                            }}
                        />
                        <strong>mdo</strong>
                        <svg
                            style={{
                                marginLeft: '8px',
                                transform: isDropdownOpen ? 'rotate(180deg)' : 'none',
                                transition: 'transform 0.2s ease'
                            }}
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                        >
                            <path
                                d="M6 8L2 4h8L6 8z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                    <ul style={dropdownMenuStyle}>
                        <li
                            style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                ':hover': { backgroundColor: '#f8f9fa' },
                                listStyle:"none"
                            }}
                        >
                            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>New project...</a>
                        </li>
                        <li
                            style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                ':hover': { backgroundColor: '#f8f9fa' },
                                listStyle:"none"
                            }}
                        >
                            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Settings</a>
                        </li>
                        <li
                            style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                ':hover': { backgroundColor: '#f8f9fa' },
                                listStyle:"none"
                            }}
                        >
                            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Profile</a>
                        </li>
                        <hr style={{ margin: '8px 0' }} />
                        <li
                            style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                ':hover': { backgroundColor: '#f8f9fa' },
                                listStyle:"none"
                            }}
                        >
                            <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Sign out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
