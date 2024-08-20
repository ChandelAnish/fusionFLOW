import React from 'react'
import Blurb from '../components/BlurbsItem'
import { useSelector } from 'react-redux'
import useAddInitialBlurbs from '../hooks/useAddInitialBlurbs'
import LoadingSpinners from '../components/LoadingSpinners'
import ErrorAlert from '../components/ErrorAlert'


export default function Blurbs() {

    const blurbs = useSelector(store => store.blurbs)

    const [isLoading,error] = useAddInitialBlurbs();


    return (
        <>
            <div className="container overflow-auto" style={{ maxHeight: "88vh" }}>
                {(isLoading)?<LoadingSpinners/>:(error)? <ErrorAlert error={error} /> :blurbs.map((item) => {
                    return <Blurb key={item._id} blurb={item} />
                })}
            </div>
        </>
    )
}
