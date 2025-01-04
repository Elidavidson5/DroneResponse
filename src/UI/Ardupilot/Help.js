import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const Documentation = () => {

  const instructions = ['Turn on Drone',
    'Turn on Camera', 'Connect Drone',
    'Connect Camera',
    'Choose Autonomous Flight option in Home screen',
    'Use Add waypoints button to add waypoints. Drag and drop waypoints to designed coordinates',
    'Press Confirm waypoints',
    'After confirmation waypoints have been sent, press start mission'
  ]


  const [visibleDialog, setVisibleDialog] = useState(null);
  const buttonLabels = [
    { label: 'Getting Started', value: 'introduction' },
    { label: 'Key Flight Modes', value: 'keyFlightModes' },
    { label: 'Changing Flight Modes', value: 'changingModes' },
    { label: 'Safety Considerations', value: 'safety' },
    { label: 'Advanced Tips', value: 'advancedTips' },
  ]

  const openDialog = (topic) => {
    setVisibleDialog(topic);
  };

  const closeDialog = () => {
    setVisibleDialog(null);
  };

  return (
    <div className='flex items-center justify-center h-auto'>

      <div className='flex text-white items-center flex-col'>
        {
          buttonLabels.map((button) => (
            <Button
              label={button.label}
              onClick={() => openDialog(button.value)}
              className="p-mr-2 mb-4"
              icon="pi pi-external-link"
            />
          )
          )
        }
      </div>


      <Dialog
        header="Introduction to HiloScope Drone"
        visible={visibleDialog === 'introduction'}
        style={{ width: '50vw' }}
        onHide={closeDialog}
      >
        <p>Welcome to the HiloScope Drone User Interface.</p>

        <h3 className='font-bold my-2'>Purpose:</h3>
        <p>
          HiloScope aims to provide emergency responders with a cheaper alternative to helicopters and rapid response units by
          giving them a fleet of deployable drones. These situational awareness drones will use machine learning algorithms —
          such as OpenCV, PyTorch, and TensorFlow — for human, animal, and fire detection with the on-board Waveshare thermal
          camera. After detection, the drone will report the information to an online monitoring feed, allowing HiloScope drones
          to save lives, money, and precious time in emergency situations.
        </p>

        <h3 className='font-bold my-2'>Getting Started:</h3>
        <p>
          {
            instructions.map((x) => (
              <li>
                {x}
              </li>
            ))
          }
        </p>

        <h3 className='font-bold my-2'>Capabilities:</h3>
        <p>
          The HiloScope drone will be equipped with machine learning technology to detect human presence, measure body
          temperature, and monitor surface temperature, ultimately aiding and leading in human rescue operations.
        </p>

        <p className='my-2'>
          <ul>
            <li className='my-2'><strong>Detection of human</strong> presence and thermal signatures using the Waveshare thermal camera.</li>
            <li><strong>Real-time data transmission</strong> to monitoring feeds for immediate response actions.</li>
            <li>Ability to autonomously navigate disaster zones and assess hazards efficiently.</li>
          </ul>
        </p>
      </Dialog>


      <Dialog
        header="Key Flight Modes"
        visible={visibleDialog === 'keyFlightModes'}
        style={{ width: '50vw' }}
        onHide={closeDialog}
      >
        <ul>
          <li><strong>Stabilize:</strong> Provides manual control while stabilizing roll and pitch.</li>
          <li><strong>AltHold:</strong> Maintains altitude while allowing manual control of other axes.</li>
          <li><strong>Loiter:</strong> Holds position using GPS.</li>
          <li><strong>Auto:</strong> Executes pre-programmed missions.</li>
          <li><strong>GUIDED:</strong> Allows control via ground control station.</li>
        </ul>
      </Dialog>

      <Dialog
        header="How to Change Flight Modes"
        visible={visibleDialog === 'changingModes'}
        style={{ width: '50vw' }}
        onHide={closeDialog}
      >
        <ol>
          <li>Use a transmitter switch configured for flight modes.</li>
          <li>Change modes via a ground control station.</li>
          <li>Send commands programmatically using MAVLink tools.</li>
        </ol>
      </Dialog>

      <Dialog
        header="Safety Considerations"
        visible={visibleDialog === 'safety'}
        style={{ width: '50vw' }}
        onHide={closeDialog}
      >
        <ul>
          <li>Ensure GPS lock is available for GPS-dependent modes.</li>
          <li>Test each mode in a safe environment.</li>
          <li>Monitor battery levels and ensure sufficient power.</li>
        </ul>
      </Dialog>

      <Dialog
        header="Advanced Tips for ArduPilot Users"
        visible={visibleDialog === 'advancedTips'}
        style={{ width: '50vw' }}
        onHide={closeDialog}
      >
        <p>Explore advanced configurations, tuning parameters, and integrating custom scripts for enhanced flight performance...</p>
      </Dialog>
    </div>
  );
};

export default Documentation;
