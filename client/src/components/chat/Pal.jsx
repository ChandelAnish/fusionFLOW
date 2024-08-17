import React from 'react'
import { FaUserCircle, FaCommentDots, FaEllipsisV } from 'react-icons/fa';

export default function Pal({reciver,startChat}) {
    return (
        <div className="d-flex p-2 align-items-center" style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={()=>startChat(reciver)}>
            <div>
                <FaUserCircle size="40" />
            </div>
            <div className="ms-2">
                <div className="fw-bold">{reciver}</div>
                {/* <div style={{ color: '#888' }}>+91 75948 06809 changed their profile photo</div> */}
            </div>
        </div>
    )
}
