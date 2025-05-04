import React from "react";
import { Globe, MapPin, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-600 text-white py-20 px-6 md:px-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-yellow-300"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-pink-400"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-teal-300"></div>
      </div>
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-3/5 text-center md:text-left">
          <div className="inline-block px-4 py-1 bg-white bg-opacity-20 rounded-full mb-4 backdrop-blur-sm">
            <span className="text-sm text-black font-medium flex items-center">
              <Globe size={16} className="mr-2" /> 
              Explore 195+ Countries
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
            Discover the World,
            <span className="block text-teal-300"> One Flag at a Time!</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-xl">
            Explore flags, facts, and fascinating cultural insights about every country on Earth. Your journey around the globe starts here!
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <button className="bg-teal-400 text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-teal-300 hover:cursor-pointer transition duration-300 flex items-center w-full sm:w-auto justify-center">
              Browse Countries
              <ArrowRight size={18} className="ml-2" />
            </button>
            
            <button className="bg-transparent border-2 border-white text-white font-medium px-6 py-3 rounded-full hover:cursor-pointer hover:bg-white hover:text-black hover:bg-opacity-10 transition duration-300 flex items-center w-full sm:w-auto justify-center">
              <MapPin size={18} className="mr-2" />
              Popular Destinations
            </button>
          </div>
        </div>
        
        <div className="mt-12 md:mt-0 md:w-2/5 relative">
          <div className="relative">
            {/* Placeholder image with styled container */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-800 p-1 rounded-2xl shadow-xl rotate-3 transform hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-700 p-6 rounded-xl overflow-hidden">
                <img
                  src="https://www.abirpothi.com/wp-content/uploads/2023/08/wp7860573.jpg"
                  alt="World Flags Collection"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl text-center"> <Globe size={50} className="mr-1" /> </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;