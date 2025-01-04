import React from 'react'
import Map from './Map'
import LiveFeed from './LiveFeed'

export default function ({ view }) {
    return (
        <div className='w-full'>

            {
                !view ? <Map /> : <LiveFeed />
            }

        </div>
    )
}
