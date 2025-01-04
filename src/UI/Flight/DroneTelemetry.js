import React, { useState } from 'react';
import axios from 'axios';



export default function DroneTelemetry() {

  //state will be updated with api data
  const [telemetry, setTelemetry] = useState({
    Speed: { value: 12, unit: 'mph' },
    Altitude: { value: 400, unit: 'ft' },
    Distance: { value: 0.68, unit: 'mi' },
    waypoint: 2,
  });

  const toggleSpeedUnit = () => {
    setTelemetry((prev) => ({
      ...prev,
      Speed: prev.Speed.unit === 'mph'
        ? { value: (prev.Speed.value * 1.60934).toFixed(2), unit: 'km/h' }
        : { value: (prev.Speed.value / 1.60934).toFixed(2), unit: 'mph' },
    }));
  };

  const toggleAltitudeUnit = () => {
    setTelemetry((prev) => ({
      ...prev,
      Altitude: prev.Altitude.unit === 'ft'
        ? { value: (prev.Altitude.value * 0.3048).toFixed(2), unit: 'm' }
        : { value: (prev.Altitude.value / 0.3048).toFixed(2), unit: 'ft' },
    }));
  };

  const toggleDistanceUnit = () => {
    setTelemetry((prev) => ({
      ...prev,
      Distance: prev.Distance.unit === 'mi'
        ? { value: (prev.Distance.value * 1.60934).toFixed(2), unit: 'km' }
        : { value: (prev.Distance.value / 1.60934).toFixed(2), unit: 'mi' },
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full text-center font-bold text-white bg-space-between-border rounded-md mb-2 mt-2">
        Flight Telemetry and Status
      </div>
      <div className="rounded-md w-full h-auto text-white p-4">
        <div className="flex flex-wrap gap-4 justify-center">
          <span
            className="rounded-md p-2 bg-banner-color hover:border cursor-pointer"
            onClick={toggleSpeedUnit}
          >
            Speed: {telemetry.Speed.value} {telemetry.Speed.unit}
          </span>

          <span
            className="rounded-md p-2 bg-banner-color hover:border cursor-pointer"
            onClick={toggleAltitudeUnit}
          >
            Altitude: {telemetry.Altitude.value} {telemetry.Altitude.unit}
          </span>

          <span className="rounded-md p-2 bg-banner-color">
            Traveling to waypoint: {telemetry.waypoint}
          </span>

          <span
            className="rounded-md p-2 bg-banner-color hover:border cursor-pointer"
            onClick={toggleDistanceUnit}
          >
            Distance to Destination: {telemetry.Distance.value} {telemetry.Distance.unit}
          </span>
        </div>
      </div>
    </div>
  );
}
