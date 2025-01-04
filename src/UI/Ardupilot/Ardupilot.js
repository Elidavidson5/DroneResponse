import React, { useState } from 'react';
import Help from './Help';
import AdvancedParams from './AdvancedParams';
import FullParameterList from './FullParameterList';
import StandardParams from './StandardParams';
import FlightMode from './FlightMode';
import DroneSetup from '../DroneSetup/DroneSetup';

export default function Ardupilot() {
  const configs = ['Flight Mode', 'Full Parameter List', 'Drone and LiveFeed Connection', 'Help'];
  const [selectedConfig, setSelectedConfig] = useState('Flight Mode');

  const renderPage = () => {
    switch (selectedConfig) { // Use selectedConfig directly
      case 'Flight Mode':
        return <FlightMode />;
      case 'Standard Params':
        return <FullParameterList param_type={'standard'} />;
      case 'Advanced Params':
        return <FullParameterList param_type={'advanced'} />;
      case 'Full Parameter List':
        return <FullParameterList param_type={'full'} />;
      case 'Drone and LiveFeed Connection':
        return <DroneSetup />
      case 'Help':
        return <Help />;
      default:
        return <FlightMode />;
    }
  };

  return (
    <div className="h-auto bg-banner-color flex">

      <div className="bg-black text-white w-auto border flex flex-col">
        {configs.map((x) => (
          <span
            key={x} // Add a key to prevent React warnings
            onClick={() => setSelectedConfig(x)} // Set the selected configuration
            className={`p-2 cursor-pointer hover:bg-red-400 ${selectedConfig === x ? 'font-bold bg-red-400' : ''}`} // Highlight selected
          >
            {x}
          </span>
        ))}
      </div>

      <div className="p-4">
        {renderPage()}
      </div>
    </div>
  );
}
