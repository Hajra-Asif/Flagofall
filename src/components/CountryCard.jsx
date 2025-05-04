import React, { useEffect, useState } from "react";
import { Users, MapPin, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CountryCard = ({ country }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("apiData", JSON.stringify(country));
    navigate(`/country/${country.cca3}`);
  };

  const formatPopulation = (pop) => {
    if (typeof pop === 'number') {
      return pop.toLocaleString();
    }
    return pop;
  };

  return (
    <div className="group overflow-hidden rounded-xl bg-gradient-to-b from-purple-100 to-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Flag Image Container */}
      <div className="relative overflow-hidden h-40 sm:h-48">
        {/* Continent Badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className="px-3 py-1 bg-indigo-600 bg-opacity-80 backdrop-blur-sm rounded-full flex items-center space-x-1 text-xs font-medium text-white">
            <MapPin size={12} />
            <span>{country.subregion}</span>
          </div>
        </div>

        {/* Flag Image */}
        <div className="w-full h-full overflow-hidden">
          <img
            src={country.flags?.png}
            alt={`Flag of ${country.name?.common}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      </div>

      {/* Content Container */}
      <div className="flex-grow flex flex-col p-4">
        {/* Country Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{country.name?.common}</h3>

        {/* Population Info */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Users size={16} className="mr-1 text-purple-600" />
          <span>Population: {formatPopulation(country.population)}</span>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* View Details Button */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <button
            onClick={handleClick}
            className="w-full flex items-center justify-between text-sm hover:cursor-pointer font-medium text-purple-600 hover:text-purple-800 transition-colors"
          >
            <span>View Details</span>
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const CountryCardGrid = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      console.log(data);
      

      const popularCountries = data.slice(186, 230); // 8 countries
      setCountries(popularCountries);
    };

    getCountries();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Popular Countries</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {countries.length > 0 &&
            countries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CountryCardGrid;
