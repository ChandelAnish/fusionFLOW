import React from 'react'

export default function Blurb({blurb}) {

    return (
        <>
            <div className="card my-3 mx-5">
                <img src={blurb.imageurl} className="card-img-top" alt="..."  style={{width:"7rem"}}/>
                <div className="card-body">
                    <h5 className="card-title">{blurb.title}</h5>
                    <p className="card-text">{blurb.description}</p>
                    <p className="card-text"><small className="text-body-secondary">Last updated {blurb.postedAt} mins ago</small></p>
                </div>
            </div>
        </>
    )
}