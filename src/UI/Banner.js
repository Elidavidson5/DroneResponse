import React from 'react'
import { Button } from 'primereact/button';
import HiloscopeLogo from './images/logo.png'
import Battery from './Battery';


export default function Banner({ titles, active, setActive, Time }) {

    return (
        <div className='bg-banner-color h-auto w-full grid grid-flow-col p-2'>

            <div className=' w-3/4 border border-black rounded-md bg-space-between-border p-2 grid grid-flow-col drop-shadow-md'>
                {titles.map((header, index) =>
                    <span className={`mx-2 bg-banner-color text-white content-center text-center rounded-md drop-shadow-md hover:bg-violet-600 ${active.includes(header) ? 'border-2 border-white' : ''}`}
                        onClick={() => {
                            setActive(header)
                        }}
                    >
                        {header}
                    </span>
                )}
            </div>

            <div className='p-2 text-white'>
                {Time.toLocaleTimeString()}
            </div>
            <div className='p-2 text-white'>
                <img
                    className='w-10 h-auto'
                    src={HiloscopeLogo}
                />
            </div>

            <div className='p-2 text-white'>
                Drone Battery Percentage: <Battery percentage={55} />
            </div>


        </div>
    )
}
