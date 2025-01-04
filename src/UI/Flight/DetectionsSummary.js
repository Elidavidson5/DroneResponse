import React from 'react'

export default function DetectionsSummary() {
    const latitudeCenter = 33.6411;
    const longitudeCenter = -117.8425;

    // Function to generate random variations in coordinates
    //will be replaced with actual api data
    function generateCoordinates(centerLat, centerLon, latVariationRange = 0.01, lonVariationRange = 0.01) {
        const latVariation = (Math.random() * (latVariationRange * 2)) - latVariationRange; 
        const lonVariation = (Math.random() * (lonVariationRange * 2)) - lonVariationRange;
        return [centerLat + latVariation, centerLon + lonVariation];
    }

    const detections = [
        { object: 'Car', coordinates: generateCoordinates(latitudeCenter, longitudeCenter) },
        { object: 'Person', coordinates: generateCoordinates(latitudeCenter, longitudeCenter) },
        { object: 'Dog', coordinates: generateCoordinates(latitudeCenter, longitudeCenter) },
        { object: 'Tree', coordinates: generateCoordinates(latitudeCenter, longitudeCenter) },
        { object: 'Cat', coordinates: generateCoordinates(latitudeCenter, longitudeCenter) }
    ];

    return (
        <div className='rounded-md bg-space-between-border p-2'>
            {
                detections.map((detection, index) => (
                    <div key={index} className='text-white p-2'>
                        <h3>{detection.object}</h3>
                        <p>{detection.coordinates[0]}, {detection.coordinates[1]}</p>
                    </div>
                ))
            }
        </div>
    );
}
