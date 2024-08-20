import React from 'react'

export default function ErrorAlert({error}) {
    return (
        <div className="alert alert-danger w-100" role="alert">
            <span className='alert-link'>Some Error occurred</span> while fetching blurbs. : {error.message}
        </div>
    )
}
