import React from 'react'
import placeholder from '../images/placeholder.png'


//display the camera feed connected here
//const streamUrl = "http://<raspberry-pi-ip>:8080/stream"



export default function LiveFeed() {
    return (
        <div className='w-full'>
            <img
                src={placeholder}
            />
            {/*<video
                className="w-full"
                src={streamUrl}
                autoPlay
                controls
            /> */}

        </div>
    )
}
