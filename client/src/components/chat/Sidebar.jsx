import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle, FaCommentDots, FaEllipsisV } from 'react-icons/fa';
import store from '../../store';
import { palsSliceAction } from '../../store/Pals';
import Pal from './Pal';

const Sidebar = ({startChat}) => {

    const pals = useSelector(store => store.pals);
    const dispatch = useDispatch();

    useEffect(() => {
        const addInitialPals = async () => {
            try {
                const response = await fetch("http://localhost:5000/users", {
                    credentials: "include"
                });
                const initialPals = await response.json();
                if (initialPals.signin === false) {
                    window.open('/signin', '_parent')
                    return;
                }
                dispatch(palsSliceAction.addInitialPals(initialPals))
            } catch (error) {
                console.log("error occurred : ", error)
            }
        }
        addInitialPals()
    }, [])

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

                {pals.map((item)=><Pal reciver={item.username} key={item._id} startChat={startChat}/>)}

            </div>
        </div>
    );
};

export default Sidebar;
