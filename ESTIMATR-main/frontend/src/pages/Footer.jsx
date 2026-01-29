import React from 'react';
import { FaFacebook, FaInstagram , FaTwitter} from 'react-icons/fa';
import { px } from 'framer-motion';
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6  text-center animate-fadeInUp overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-white mb-5">Contact & Policy</h2>
          <p className="text-lg text-gray-200">For inquiries, email us at <span className="text-blue-400">support@costestimation.com</span></p>
      <div className="container mx-auto text-center space-y-4">
      <div className="flex justify-center space-x-6 text-2xl mt-6">
          <a href="#" className="text-blue-500 hover:text-blue-700"><FaFacebook /></a>
          <a href="#" className="text-pink-500 hover:text-pink-700"><FaInstagram /></a>
          <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter /></a>
          <a href="#" className="text-orange-500 hover:text-orange-600"><SiGmail/></a>
        </div>
        </div>
        <div className="flex justify-center space-x-5 text-gray-400 mt-3">
          <a href="#" className="hover:text-white hover:underline">Privacy Policy | </a>
          <a href="#" className="hover:text-white hover:underline">Terms of Service | </a>
          <a href="#" className="hover:text-white hover:underline">Contact</a>
        </div>
        </div>
        <div className="text-sm bg-black py-2 w-full mt-3 overflow-hidden">
          © 2024 cost-estimation. All rights reserved.
        </div>
      
    </footer>
  );
};

export default Footer;