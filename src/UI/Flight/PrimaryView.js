import React from 'react'
import LiveFeed from './LiveFeed'
import Map from './Map'

export default function PrimaryView({ view }) {
    return (
        <div className='w-full'>
            {
                view ? <Map /> : <LiveFeed />
            }

        </div>
    )
}
