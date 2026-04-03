import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import LoginModal from '../components/LoginModal';
// Import your LoginModal here
// import LoginModal from './LoginModal';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="absolute w-full px-4 md:px-10 mt-4 md:mt-6 z-50">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-full py-2 md:py-4 px-6 md:px-10 flex justify-between items-center shadow-2xl border border-gray-100">
        
        {/* Logo Section */}
        <div className="text-teal-500 font-bold text-xl md:text-2xl tracking-tighter shrink-0 flex items-center">
          <span className="mr-2">⚕️</span> 
          <span>PHY<span className="text-[#1a2e2c]">SEO</span></span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 font-bold text-gray-500 text-xs uppercase tracking-widest">
          {['Home','About', 'Services', 'Contact'].map((item) => (
            <a
              key={item}
              href={item === 'Home' ? '#' : `#${item.toLowerCase()}-section`}
              className="hover:text-teal-500 transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Replace with your actual LoginModal component */}
            <LoginModal/>          
          

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-xl p-6 border border-gray-100 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <a href="#" className="font-bold text-teal-500">Home</a>
          <a href="#about" className="font-bold text-gray-600">About</a>
          <a href="#services" className="font-bold text-gray-600">Services</a>
          <a href="#contact" className="font-bold text-gray-600">Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;