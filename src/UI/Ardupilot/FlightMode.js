import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';

export default function FlightModes() {
    // Initialize state for all flight modes
    const [selectedFlightModes, setSelectedFlightModes] = useState(
        Array(6).fill(null)
    );
    const [checkedStates, setCheckedStates] = useState(Array(6).fill(false));

    const toast = useRef(null);

    const show = (message) => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: message });
    };


    const uploadFlightModes = (flightModes, checkedStates) => {
        axios.post('http://localhost:4000/upload-flightmodes', {
            flightModes: selectedFlightModes,
            checkedStates: checkedStates
        }).then((res) => {
            console.log(res.data);
            show(res.data.message)
        }).catch((error) => {
            console.log(error);
        });
    };


    // Flight modes array
    const flightModes = [
        { label: 'Manual', value: 'manual' },
        { label: 'Stabilize', value: 'stabilize' },
        { label: 'Acro', value: 'acro' },
        { label: 'Altitude Hold', value: 'altitude_hold' },
        { label: 'Loiter', value: 'loiter' },
        { label: 'RTL (Return to Launch)', value: 'rtl' },
    ];

    // Handle change in flight mode
    const onFlightModeChange = (e, index) => {
        const newSelectedFlightModes = [...selectedFlightModes];
        newSelectedFlightModes[index] = e.target.value;
        setSelectedFlightModes(newSelectedFlightModes);
    };

    const onCheckboxChange = (e, index) => {
        const newCheckedStates = [...checkedStates];
        newCheckedStates[index] = e.target.checked;
        setCheckedStates(newCheckedStates);
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className=''>
                {Array.from({ length: 6 }).map((_, index) => (
                    <div className='flex my-4' key={index}>
                        <h4 className='text-white'>Flight Mode {index + 1}</h4>
                        <select
                            className='mx-8 h-8 bg-banner-color border border-white text-white'
                            value={selectedFlightModes[index]}
                            onChange={(e) => onFlightModeChange(e, index)}
                        >
                            <option value="" disabled>
                                Select Flight Mode {index + 1}
                            </option>
                            {flightModes.map((mode) => (
                                <option key={mode.value} value={mode.value}>
                                    {mode.label}
                                </option>
                            ))}
                        </select>
                        <div>
                            <input
                                type="checkbox"
                                checked={checkedStates[index]}
                                onChange={(e) => onCheckboxChange(e, index)}
                                className="transform scale-150"
                            />
                            <span className='ml-2 text-white text-sm'>
                                Simple
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <span
                    className='border-2 bg-yellow-500 w-1/2 text-center hover:border-4 p-2'
                    onClick={() => uploadFlightModes(flightModes, checkedStates)}>
                    Save Modes
                </span>
            </div>
        </div>
    );
}
