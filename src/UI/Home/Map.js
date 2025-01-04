
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import drone from '../images/drone.png';
import waypointpoint from '../images/pin.png';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { Toast } from 'primereact/toast';



export default function Map() {
    const [location, setLocation] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState(null);
    const [markers, setMarkers] = useState([]); // State to store multiple markers
    const circleCenter = userLocation || [33.6411, -117.8425]; // Set a default center if userLocation is not available
    const [selectedMarkerId, setSelectedMarkerId] = useState(null)
    const [confirmedWaypoints, setConfirmedWaypoints] = useState()
    const toast = useRef(null);

    const show = (message) => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: message });
    };


    useEffect(() => {
        console.log('confirmed', confirmedWaypoints)
    }, [confirmedWaypoints])

    const sendWaypoints = (waypoints) => {

        console.log('Waypoints to send:', waypoints);

        // Correctly set up the API endpoint and payload
        axios.post('http://localhost:4000/send-waypoints', waypoints)
            .then((res) => {
                console.log('Response from server:', res.data);
                show(res.data.message)
            })
            .catch((error) => {
                console.error('Error sending waypoints:', error);
                //show(error)
            });
    };


    useEffect(() => {
        // Check if geolocation is available in the browser
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    setUserLocation([latitude, longitude]);  // Set the user location
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    // Handle map click event to add markers
    const handleMapClick = (event) => {
        const { lat, lng } = event.latlng;
        console.log('Map clicked at:', lat, lng); // Debug log to check if the event is being fired
        setMarkers((prevMarkers) => [
            ...prevMarkers,
            { id: prevMarkers.length + 1, lat, lng }, // Assign a unique ID to each marker
        ]); // Add new marker to state
    };

    const markerIcon = new L.Icon({
        iconUrl: drone,  // Use the imported image as the icon URL
        iconSize: [32, 32],  // Customize the size of the icon
        iconAnchor: [16, 32],  // Anchor point of the icon
        popupAnchor: [0, -32],  // Popup anchor point
    });

    const waypointIcon = new L.Icon({
        iconUrl: waypointpoint,  // Use the imported image as the icon URL
        iconSize: [32, 32],  // Customize the size of the icon
        iconAnchor: [16, 32],  // Anchor point of the icon
        popupAnchor: [0, -32],  // Popup anchor point
    });

    const selectedWaypointIcon = new L.Icon({
        iconUrl: waypointpoint,  // Use the imported image as the icon URL
        iconSize: [40, 40],  // Customize the size of the icon
        iconAnchor: [16, 32],  // Anchor point of the icon
        popupAnchor: [0, -32],  // Popup anchor point
    });



    // Set the selected marker
    const handleMarkerClick = (markerId) => {
        setSelectedMarkerId(markerId);
        console.log(markers)
    };







    // Function to generate a random point within the circle's radius
    const generateRandomPointWithinCircle = (center, radius) => {
        const radiusInDegrees = radius / 111300; // Convert meters to degrees
        const angle = Math.random() * 2 * Math.PI; // Random angle
        const distance = Math.random() * radiusInDegrees; // Random distance within the circle

        // Calculate the latitude and longitude for the random point
        const lat = center[0] + distance * Math.cos(angle);
        const lng = center[1] + distance * Math.sin(angle);
        return [lat, lng];
    };

    // Restrict marker dragging to the circle's boundary
    const handleDragEnd = (event, index) => {
        const newLatLng = event.target.getLatLng();
        const distance = mapDistance(newLatLng, circleCenter);

        if (distance <= 1609.34) {

            // Update the marker position if it is within the circle
            setMarkers((prevMarkers) => {
                const updatedMarkers = [...prevMarkers];
                updatedMarkers[index] = { ...updatedMarkers[index], lat: newLatLng.lat, lng: newLatLng.lng };
                return updatedMarkers;
            });
            console.log('markers', markers);
        } else {


            // If out of bounds, revert to the old position (or handle as needed)
            event.target.setLatLng([markers[index].lat, markers[index].lng]);
        }
    };

    // Function to calculate the distance between two points (in meters)
    const mapDistance = (latlng1, latlng2) => {
        const R = 6371000; // Earth radius in meters
        const φ1 = latlng1.lat * Math.PI / 180;
        const φ2 = latlng2[0] * Math.PI / 180;
        const Δφ = (latlng2[0] - latlng1.lat) * Math.PI / 180;
        const Δλ = (latlng2[1] - latlng1.lng) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in meters
    };

    // Custom Button Control, clean this function up
    const CustomButton = () => {
        const map = useMap();  // Access the map instance
        useEffect(() => {
            const buttonControl = L.control({ position: 'topright' }); // Position the button at the top-right
            const removeWaypoint = L.control({ position: 'bottomright' })
            const confirmWaypoints = L.control({ position: 'bottomright' })


            removeWaypoint.onAdd = function () {
                const button = L.DomUtil.create('button', 'leaflet-bar');
                button.innerHTML = 'Remove waypoint';
                button.style.backgroundColor = '#0078AA';
                button.style.color = '#fff';
                button.style.padding = '10px';
                button.style.borderRadius = '5px';
                button.style.border = 'none';
                button.style.cursor = 'pointer';

                button.onclick = () => {

                    console.log('selected', selectedMarkerId)

                    const message = `Waypoint ${selectedMarkerId} removed from map.`
                    show(message)

                    setMarkers((prevMarkers) =>
                        prevMarkers.filter((marker) => marker.id !== selectedMarkerId)
                    );
                }

                const updatedMarkers = markers.map((marker, index) => ({
                    ...marker,
                    id: index + 1,
                }));

                //setMarkers(updatedMarkers)

                return button
            }

            confirmWaypoints.onAdd = function () {
                const button = L.DomUtil.create('button', 'leaflet-bar');
                button.innerHTML = 'Confirm waypoints';  // Button text
                button.style.backgroundColor = '#0078AA'; // Button color
                button.style.color = '#fff';  // Text color
                button.style.padding = '10px';
                button.style.borderRadius = '5px';
                button.style.border = 'none';
                button.style.cursor = 'pointer';


                button.onclick = () => {
                    const allButtons = document.querySelectorAll('button');
                    console.log('all buttons', allButtons)

                    setConfirmedWaypoints(markers)
                    sendWaypoints(markers)
                    //hide other buttons or disable them
                    //send the waypoints coordinates to drone by calling the /get-waypoints api route
                    //use a default 50ft altitude

                }

                return button
            }

            buttonControl.onAdd = function () {
                const button = L.DomUtil.create('button', 'leaflet-bar');
                button.innerHTML = 'Add waypoints';
                button.style.backgroundColor = '#0078AA'; // Button color
                button.style.color = '#fff';  // Text color
                button.style.padding = '10px';
                button.style.borderRadius = '5px';
                button.style.border = 'none';
                button.style.cursor = 'pointer';

                // Add an event listener to the button to add a pin marker within the circle
                button.onclick = () => {

                    const [lat, lng] = generateRandomPointWithinCircle(circleCenter, 1609.34); // 1609.34 meters = 1 mile radius
                    setMarkers((prevMarkers) => [
                        ...prevMarkers,
                        { id: prevMarkers.length + 1, lat, lng },
                    ]); //
                    console.log('Pin added at:', lat, lng);
                    console.log('markers added', markers)
                };

                return button;
            };

            buttonControl.addTo(map)
            if (markers.length > 0) {

                confirmWaypoints.addTo(map)
                removeWaypoint.addTo(map)
            }
            return () => {
                buttonControl.remove();
                confirmWaypoints.remove()
                removeWaypoint.remove()
            };
        }, [userLocation]);

        return null;
    };

    return (
        <div className='w-full'>
            <Toast ref={toast} />
            {
                userLocation ?
                    <MapContainer
                        style={{ height: "500px", width: "100%" }}
                        center={userLocation}
                        zoom={14}
                        scrollWheelZoom={false}
                        onClick={handleMapClick}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={userLocation} icon={markerIcon}>
                            <Popup>
                                Your Current location
                            </Popup>
                        </Marker>

                        {/* Adding the Circle */}
                        <Circle center={circleCenter} radius={1609.34} color="blue" fillColor="blue" fillOpacity={0.2} />

                        {/* Render all markers */}
                        {markers.map((marker, index) => (
                            <Marker
                                key={marker.id} // Use the marker ID as the key
                                position={[marker.lat, marker.lng]}
                                //icon={waypointIcon}
                                icon={marker.id === selectedMarkerId ? selectedWaypointIcon : waypointIcon}
                                draggable={true}
                                eventHandlers={{
                                    click: () => handleMarkerClick(marker.id),
                                    dragend: (e) => handleDragEnd(e, index),
                                }}
                            >
                                <Popup>
                                    Waypoint {marker.id}: {marker.lat}, {marker.lng}
                                </Popup>
                                <Tooltip permanent>
                                    {index + 1}
                                </Tooltip>
                            </Marker>
                        ))}
                        {markers.length > 1 && (
                            <Polyline positions={markers.map(marker => [marker.lat, marker.lng])} color="red" />
                        )}

                        <CustomButton />
                    </MapContainer>
                    :
                    <p className='p-2'>Loading drone location...</p>
            }
        </div>
    );
}

