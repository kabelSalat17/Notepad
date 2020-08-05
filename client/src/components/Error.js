import React from 'react'

export default function Error({error}) {
    return (
        <div className="mb-2">
            <h6 className="red-text alert-text">{error}</h6> 
        </div>
    )
}
