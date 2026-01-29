import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const Hero = () => {
  const MotionLink = motion(Link);


  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }, []);

  return (
    
    <div className='relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 via-gray-800 to-purple-900 flex flex-col justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32'>
      
      {/* 3D Floating Icons for Cost Estimation */}
      <motion.div 
        className="absolute inset-0 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Search Icon */}
        <motion.img 
          src="https://cdn-icons-png.flaticon.com/512/751/751463.png" 
          alt="Search"
          className="absolute top-10 left-10 w-14 sm:w-16 md:w-20 opacity-70"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Price Tag */}
        <motion.img 
          src="https://cdn-icons-png.flaticon.com/512/3068/3068410.png" 
          alt="Price Tag"
          className="absolute top-20 right-10 w-12 sm:w-16 md:w-20 opacity-70"
          animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Graph for Cost Comparison */}
        <motion.img 
          src="https://cdn-icons-png.flaticon.com/512/3177/3177423.png" 
          alt="Cost Graph"
          className="absolute bottom-10 left-20 w-20 sm:w-24 md:w-28 opacity-70"
          animate={{ x: [0, -10, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
     

     <motion.img 
          src='../public/pie.png'
          alt="Pie Chart"
          className="absolute bottom-24 right-40 w-16 sm:w-20 md:w-24 opacity-80"
          animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: 'hue-rotate(240deg) saturate(150%) brightness(1.2)' }} // Adds a vibrant effect
        />
</motion.div>

      

      {/* Custom Cursor */}
       <div className="cursor fixed w-8 h-8 rounded-full bg-white opacity-20 pointer-events-none transition-transform duration-200 ease-out"></div> 
 
      {/* Logo */}
      <motion.img 
        className='relative z-10 w-32 mt-8 sm:w-20 md:w-24 lg:w-28'
        src='../public/logo.png'
        alt='Logo'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      />

      {/* Main Content Box (Now More Visible) */}
      <motion.div 
        className='relative z-10 bg-gradient-to-b from-gray-900 to-black bg-opacity-80 text-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl 
        px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-16 lg:py-12 rounded-md shadow-lg text-center md:text-left mx-auto backdrop-blur-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <h2 className='text-4xl sm:text-4xl md:text-5xl font-bold leading-none tracking-tighter'>Compare Prices & Services Instantly</h2>
        <p className="text-gray-300 mt-6 text-xs">
          Search for a product or service and get the best price comparisons from top websites in seconds!
        </p>
        <MotionLink 
          to="/login"
          className='flex items-center justify-center bg-blue-600 text-white w-full py-3 text-base rounded mt-5 transition-all hover:scale-105 hover:bg-blue-700'
          whileHover={{ scale: 1.05 }}
        >
          Start Comparing
          </MotionLink>
      </motion.div>

      <div className="mb-8"></div> {/* Space at bottom */}
    </div>
   
  );
};

export default Hero;
