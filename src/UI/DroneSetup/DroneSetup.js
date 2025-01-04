import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Toast } from 'primereact/toast';

/* 
Do any drone and camera setup here
1. Button to connect to drone. Call the /connect API to connect to it
2. After the drone is connected, in the Home Tab, we can call the /get-drone-status to get the battery status
3. In here, display the connection status of camera and drone
 */

export default function DroneSetup() {
    const [droneConnected, setDroneConnected] = useState(false);
    const [cameraConnected, setCameraConnected] = useState(false)
    const [batteryStatus, setBatteryStatus] = useState(null);
    const toast = useRef(null);

    const show = (message) => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: message });
    };

    const Connect_drone = () => {
        axios.get('http://localhost:4000/connect-drone')
            .then((res) => {
                console.log(res.data.message);
                setDroneConnected(true);
                show(res.data.message);

                /* // After connecting the drone, get the battery status
                axios.get('http://localhost:4000/get-drone-status')
                    .then((res) => {
                        console.log('Battery Status:', res.data.battery_remaining);
                        setBatteryStatus(res.data.battery_remaining);
                    })
                    .catch((error) => {
                        console.log('Error fetching battery status:', error);
                        show('Error fetching battery status');
                    }); */
            })
            .catch((error) => {
                console.log(error);
                show(error.response ? error.response.data : 'Error connecting to drone');
            });
    };

    return (
        <div className="text-white">
            <Toast ref={toast} />
            <div className="w-full grid justify-end pr-4">
                <span>Drone</span>
                <Button
                    className="mt-2 bg-gray-500 drop-shadow-lg text-yellow-400 hover:bg-gray-600"
                    icon={`${droneConnected ? 'pi pi-lock' : 'pi pi-lock-open'}`}
                    rounded
                    outlined
                    disabled={droneConnected}
                    onClick={() => Connect_drone()} // Corrected the function call here
                    severity="success"
                    size={25}
                />
            </div>
            <div className="w-full grid justify-end pr-4 mt-8">
                <span>Camera</span>
                <Button
                    className="mt-2 bg-gray-500 drop-shadow-lg text-yellow-400 hover:bg-gray-600"
                    icon={`${'pi pi-camera'}`}
                    rounded
                    outlined
                    disabled={cameraConnected}
                    onClick={() => Connect_drone()} // Corrected the function call here
                    severity="success"
                    size={25}
                />
            </div>
            {droneConnected && batteryStatus !== null && (
                <div className="mt-4">
                    <span>Battery Status: {batteryStatus}%</span>
                </div>
            )}
        </div>
    );
}
