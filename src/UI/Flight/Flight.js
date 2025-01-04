import React, { useState } from 'react';
import Map from './Map';
import SecondaryView from './SecondaryView';
import PrimaryView from './PrimaryView';
import { Button } from 'primereact/button';
import DetectionsSummary from './DetectionsSummary';
import DroneTelemetry from './DroneTelemetry';
import ModelOptions from './ModelOptions';
import axios from 'axios';

export default function Flight() {
    const [isMapPrimaryView, setIsMapPrimaryView] = useState(true);
    const model_types = ['Human', 'Heat']
    const [selectedModels, setSelectedModels] = useState(Array(model_types.length).fill(false));

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row'>
                <div className='w-full border-2 border-white'>
                    <PrimaryView view={isMapPrimaryView} />
                </div>

                <Button
                    icon="pi pi-arrow-right-arrow-left p-2 rounded-md h-1"
                    onClick={() => setIsMapPrimaryView(!isMapPrimaryView)}
                />

                <div className='p-2 w-1/4'>
                    <DetectionsSummary />
                </div>
            </div>

            <div className='flex flex-row w-full bg-space-between-border'>
                <div className='w-1/3 h-auto border-2 border-green-100'>
                    <SecondaryView view={isMapPrimaryView} />
                </div>
                <div className='w-2/3 ounded-md'>
                    <DroneTelemetry />
                </div>
                <div className='w-1/4 p-2'>
                    <ModelOptions
                        options={model_types}
                        selectedModels={selectedModels}
                        setSelectedModels={setSelectedModels}
                    />
                </div>
            </div>
        </div>
    );
}
