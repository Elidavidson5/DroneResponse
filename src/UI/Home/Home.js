import React from 'react'
import Map from './Map'
import SettingsPanel from './SettingsPanel';

export default function Home() {
    const options = ['Manual Mission', 'Autonomous Mission', 'Start Mission', 'Abort Mission'];
    const center = [33.6411, -117.8425]; // UCI Coordinates

    const ip_addresses = [
        '192.168.1.2', // Example telemetry IP
        '192.168.1.3', // Example GCS (Ground Control Station) IP
        '192.168.1.4'  // Example video streaming or secondary telemetry IP
    ];

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row'>

                <div className=' w-full'>
                    <Map />
                </div>

                <div className='  rounded-md w-1/4 text-white p-2 grid h-5'>
                    {
                        ip_addresses.map((x, index) =>
                            <span className=''>
                                Connected Device # {index + 1}: {x}
                            </span>
                        )
                    }

                </div>
            </div>

            <div className='w-full border-green-100'>
                <SettingsPanel options={options} />
            </div>
        </div>
    )
}

