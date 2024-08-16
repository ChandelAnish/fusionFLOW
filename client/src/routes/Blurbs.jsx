import React, { useEffect } from 'react'
import Blurb from '../components/BlurbsItem'
import { useDispatch, useSelector } from 'react-redux'
import { blurbsSliceAction } from '../store/Blurbs'


export default function Blurbs() {

    const blurbs = useSelector(store => store.blurbs)
    const dispatch = useDispatch()

    useEffect(() => {
        const addInitialBlurbs = async () => {
            try {
                const response = await fetch("http://localhost:5000/blurb",{
                    credentials:"include"
                });
                const initialBlurbs = await response.json();
                if(initialBlurbs.signin===false)
                {
                    window.open('/signin', '_parent')
                }
                dispatch(blurbsSliceAction.addInitialBlurbs(initialBlurbs))
            } catch (error) {
                console.log("error occurred : ", error)
            }
        }
        addInitialBlurbs()
    }, [])


    return (
        <>
            <div className="container overflow-auto" style={{ maxHeight: "88vh" }}>
                {blurbs.map((item) => {
                    return <Blurb key={item._id} blurb={item} />
                })}
            </div>
        </>
    )
}
