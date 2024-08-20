import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle, FaCommentDots, FaEllipsisV } from 'react-icons/fa';
import Pal from './Pal';
import useAddInitialPals from '../../hooks/useAddInitialPals';

const Sidebar = ({startChat}) => {

    const pals = useSelector(store => store.pals);

    useAddInitialPals();

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

                {pals.map((item)=><Pal receiver={item.username} key={item._id} startChat={startChat} />)}

            </div>


        </div>
    );
};

export default Sidebar;
