import logo from './logo.svg';
import './App.css';
import Banner from './UI/Banner';
import { useState, useEffect } from 'react';
import Home from './UI/Home/Home';
import Flight from './UI/Flight/Flight';
import DroneSetup from './UI/DroneSetup/DroneSetup';
import Ardupilot from './UI/Ardupilot/Ardupilot';
import { motion } from 'framer-motion';
import drone from './UI/images/drone.png'


const titles = ['Home', 'Flight', 'Configuration']



function App() {

  const [activePage, setActivePage] = useState([titles[0]])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const renderPage = () => {
    switch (activePage) {
      case 'Home':
        return <Home />;
      case 'Flight':
        return <Flight />;
      case 'Drone and Livefeed Connection':
        return <DroneSetup />
      case 'Configuration':
        return <Ardupilot />
      default:
        return <Home />;
    }
  };

  return (
    <div className='bg-banner-color h-auto'>

      {/*  <motion.div
          initial={{ x: '-100vw' }}
          animate={{ x: '100vw' }}
          transition={{
            type: 'spring',
            stiffness: 20,
            damping: 25,
            duration: 10,
          }}
          className="drone-container"
        >
          <h1 className='font-bold text-yellow-500 text-center'>
            HiloScope
          </h1>
          <img
            src={drone} // Put the drone image or SVG link here
            alt="Drone"
            className="drone"
          />
        </motion.div> */}

      <div className=''>
        <Banner titles={titles} active={activePage} setActive={setActivePage} Time={currentTime} />
      </div>

      <div className='w-full bg-banner-color h-auto'>
        {renderPage()}
      </div>
      <div className='text-white items-center justify-center justify-items-center mt-4'>
        <p>
          Copyright © 2025 hiloscope.com All rights reserved.
        </p>
        <p>
          contact: hiloscope@gmail.com
        </p>
      </div>
    </div>

  );
}

export default App;
