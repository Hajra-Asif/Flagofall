import React, { useEffect, useState } from "react";
import {
    Users,
    MapPin,
    Globe,
    Clock,
    Landmark,
    Coins,
    Languages,
    Map,
    ArrowLeft,
    ExternalLink
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const CountryDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);

    useEffect(() => {
 
        const stored = localStorage.getItem("apiData");
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.cca3 === id) {
                setCountry(parsed);
                return;
            }
        }
        const fetchCountry = async () => {
            try {
                const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
                const data = await res.json();
                if (data && data[0]) setCountry(data[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCountry();
    }, [id]);

    if (!country) {
        return <div className="p-8 text-center">Loading country details...</div>;
    }
    
        const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
            country.maps.googleMaps
          )}&z=5&output=embed`;
    
    return (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 min-h-screen">
            {/* Header with flag and country name */}
            <header className="bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-600 text-white py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center mb-8 text-white/80 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        <span>Back to Countries</span>
                    </button>

                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                        {/* Flag Container */}
                        <div className="w-full lg:w-1/3 flex-shrink-0">
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-2 rounded-xl shadow-xl overflow-hidden">
                                <img
                                    src={country.flags?.png}
                                    alt={`Flag of ${country.name?.common}`}
                                    className="w-full rounded-lg object-cover"
                                />
                            </div>
                        </div>

                        {/* Country Info */}
                        <div className="w-full lg:w-2/3">
                            <div className="flex items-center mb-4">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                                    {country.name?.common}
                                </h1>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-6 text-black">
                                <Badge icon={<MapPin size={16} />} text={country.region} />
                                {country.subregion && <Badge icon={<Globe size={16} />} text={country.subregion} />}
                            </div>

                            <p className="text-lg md:text-xl mb-4 text-white/90">
                                {country.name?.common} is located in {country.subregion || country.region} with a population of{' '}
                                {country.population.toLocaleString()} people.
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <InfoCard icon={<Users size={24} />} title="Population" value={country.population.toLocaleString()} />
                        <InfoCard icon={<Landmark size={24} />} title="Capital" value={country.capital?.[0] || 'N/A'} />
                        <InfoCard icon={<Map size={24} />} title="Area" value={`${country.area.toLocaleString()} km²`} />
                        <InfoCard
                            icon={<Coins size={24} />}
                            title="Currency"
                            value={Object.values(country.currencies || {}).map(c => `${c.name} (${c.symbol})`).join(', ')}
                        />
                        <InfoCard icon={<Languages size={24} />} title="Languages" value={Object.values(country.languages || {}).join(', ')} />
                        <InfoCard icon={<Clock size={24} />} title="Timezones" value={country.timezones.join(', ')} />
                    </div>

                    {/* Borders Section */}
                    <div className="bg-white rounded-xl shadow-md p-6 mb-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <MapPin size={20} className="mr-2 text-purple-600" />
                            Bordering Countries
                        </h2>

                        {country.borders?.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {country.borders.map((border, idx) => (
                                    <BorderLink key={idx} code={border} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">Island nation with no land borders</p>
                        )}
                    </div>

                    {/* Map Preview Section */}
                    <div className="bg-whiterounded-xl shadow-md overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                <Globe size={20} className="mr-2 text-purple-600" />
                                Map Location
                            </h2>
                        </div>

                        <div className="h-96 bg-indigo-100 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <Globe size={64} className="mx-auto mb-4 text-indigo-500 opacity-50" />
                                    <iframe
                                        title="Country Map"
                                        width="100%"
                                        height="100%"
                                        className="absolute inset-0"
                                        frameBorder="0"
                                        // Google Maps embed URL with dynamic lat/lng and zoom=5
                                        src={mapSrc}
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Reusable InfoCard
const InfoCard = ({ icon, title, value }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start">
            <div className="mr-4 mt-1 text-purple-600">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-700 ">{value}</p>
            </div>
        </div>
    </div>
);

// Reusable Badge
const Badge = ({ icon, text }) => (
    <div className="px-4 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center space-x-1">
        {icon}
        <span>{text}</span>
    </div>
);

//  navigates to another country detail
const BorderLink = ({ code }) => {
    const navigate = useNavigate();
    const handle = () => navigate(`/country/${code}`);
    return (
        <button
            onClick={handle}
            className="px-4 py-2 bg-purple-100 text-purple-700  rounded-full hover:bg-purple-200  transition-colors flex items-center"
        >
            {code}
            <ExternalLink size={14} className="ml-1 opacity-60" />
        </button>
    );
};

export default CountryDetailPage;
