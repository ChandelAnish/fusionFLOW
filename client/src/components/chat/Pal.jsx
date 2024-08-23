import React from 'react'
import { FaUserCircle, FaCommentDots, FaEllipsisV } from 'react-icons/fa';

export default function Pal({receiver,startChat,online}) {
    return (
        <div className="d-flex p-2 align-items-center" style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'} onClick={()=>startChat(receiver)}>
            <div>
                <FaUserCircle size="40" />
            </div>
            <div className="ms-2">
                <div className="fw-bold">{receiver}</div>
                {/* <div style={{ color: '#888' }}>+91 75948 06809 changed their profile photo</div> */}
            </div>
            {(online) && <div className='rounded-circle' style={{width:"10px",height:"10px",marginLeft:"5px",backgroundColor:"rgb(215 94 253)"}}></div>}
        </div>
    )
}
