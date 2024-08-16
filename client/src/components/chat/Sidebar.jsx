import React from 'react';
import { FaUserCircle, FaCommentDots, FaEllipsisV } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="d-flex flex-column" style={{ width: '30%', borderRight: '1px solid #e6e6e6' }}>
            <div className="d-flex justify-content-between p-2 border-bottom">
                <div>
                    <FaUserCircle size="40" />
                </div>
                <div className="d-flex gap-2">
                    <FaCommentDots size="20" />
                    <FaEllipsisV size="20" />
                </div>
            </div>
            <div className="p-2">
                <input type="text" className="form-control" placeholder="Search or start a new chat" />
            </div>
            <div className="flex-grow-1 overflow-auto">

                <div className="d-flex p-2 align-items-center" style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div>
                        <FaUserCircle size="40" />
                    </div>
                    <div className="ms-2">
                        <div className="fw-bold">GDSC CUSAT Community</div>
                        <div style={{ color: '#888' }}>+91 75948 06809 changed their profile photo</div>
                    </div>
                </div>

                <div className="d-flex p-2 align-items-center" style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div>
                        <FaUserCircle size="40" />
                    </div>
                    <div className="ms-2">
                        <div className="fw-bold">GDSC CUSAT Community</div>
                        <div style={{ color: '#888' }}>+91 75948 06809 changed their profile photo</div>
                    </div>
                </div>

                <div className="d-flex p-2 align-items-center" style={{ cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <div>
                        <FaUserCircle size="40" />
                    </div>
                    <div className="ms-2">
                        <div className="fw-bold">GDSC CUSAT Community</div>
                        <div style={{ color: '#888' }}>+91 75948 06809 changed their profile photo</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
