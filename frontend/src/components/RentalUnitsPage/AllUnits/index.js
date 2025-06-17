import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getRentalUnits } from '../../../store/rentalUnits'
import { formatPrice, parsePrice } from '../../../utils/currency';
// import "../../RentalUnitsPage/UnitsPage.css"

// State mapping for search functionality
const STATE_MAPPING = {
  'AL': 'Alabama', 'Alabama': 'AL',
  'AK': 'Alaska', 'Alaska': 'AK',
  'AZ': 'Arizona', 'Arizona': 'AZ',
  'AR': 'Arkansas', 'Arkansas': 'AR',
  'CA': 'California', 'California': 'CA',
  'CO': 'Colorado', 'Colorado': 'CO',
  'CT': 'Connecticut', 'Connecticut': 'CT',
  'DE': 'Delaware', 'Delaware': 'DE',
  'FL': 'Florida', 'Florida': 'FL',
  'GA': 'Georgia', 'Georgia': 'GA',
  'HI': 'Hawaii', 'Hawaii': 'HI',
  'ID': 'Idaho', 'Idaho': 'ID',
  'IL': 'Illinois', 'Illinois': 'IL',
  'IN': 'Indiana', 'Indiana': 'IN',
  'IA': 'Iowa', 'Iowa': 'IA',
  'KS': 'Kansas', 'Kansas': 'KS',
  'KY': 'Kentucky', 'Kentucky': 'KY',
  'LA': 'Louisiana', 'Louisiana': 'LA',
  'ME': 'Maine', 'Maine': 'ME',
  'MD': 'Maryland', 'Maryland': 'MD',
  'MA': 'Massachusetts', 'Massachusetts': 'MA',
  'MI': 'Michigan', 'Michigan': 'MI',
  'MN': 'Minnesota', 'Minnesota': 'MN',
  'MS': 'Mississippi', 'Mississippi': 'MS',
  'MO': 'Missouri', 'Missouri': 'MO',
  'MT': 'Montana', 'Montana': 'MT',
  'NE': 'Nebraska', 'Nebraska': 'NE',
  'NV': 'Nevada', 'Nevada': 'NV',
  'NH': 'New Hampshire', 'New Hampshire': 'NH',
  'NJ': 'New Jersey', 'New Jersey': 'NJ',
  'NM': 'New Mexico', 'New Mexico': 'NM',
  'NY': 'New York', 'New York': 'NY',
  'NC': 'North Carolina', 'North Carolina': 'NC',
  'ND': 'North Dakota', 'North Dakota': 'ND',
  'OH': 'Ohio', 'Ohio': 'OH',
  'OK': 'Oklahoma', 'Oklahoma': 'OK',
  'OR': 'Oregon', 'Oregon': 'OR',
  'PA': 'Pennsylvania', 'Pennsylvania': 'PA',
  'RI': 'Rhode Island', 'Rhode Island': 'RI',
  'SC': 'South Carolina', 'South Carolina': 'SC',
  'SD': 'South Dakota', 'South Dakota': 'SD',
  'TN': 'Tennessee', 'Tennessee': 'TN',
  'TX': 'Texas', 'Texas': 'TX',
  'UT': 'Utah', 'Utah': 'UT',
  'VT': 'Vermont', 'Vermont': 'VT',
  'VA': 'Virginia', 'Virginia': 'VA',
  'WA': 'Washington', 'Washington': 'WA',
  'WV': 'West Virginia', 'West Virginia': 'WV',
  'WI': 'Wisconsin', 'Wisconsin': 'WI',
  'WY': 'Wyoming', 'Wyoming': 'WY'
};

function RentalUnitsPage() {
    const dispatch = useDispatch();
    const location = useLocation();
    const rentalUnits = useSelector((state) => Object.values(state?.rentalUnit))
    const userId = useSelector((state)=> state.session.user?.id)
    const [favorites, setFavorites] = useState(new Set());
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'highToLow', 'lowToHigh'

    // Get search query from URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search') || '';

    useEffect(() => {
        dispatch(getRentalUnits())
    }, [dispatch])

    const toggleFavorite = (unitId) => {
        const newFavorites = new Set(favorites);
        if (newFavorites.has(unitId)) {
            newFavorites.delete(unitId);
        } else {
            newFavorites.add(unitId);
        }
        setFavorites(newFavorites);
    }

    const handlePriceSort = () => {
        if (sortOrder === 'default' || sortOrder === 'lowToHigh') {
            setSortOrder('highToLow');
        } else {
            setSortOrder('lowToHigh');
        }
    };

    // Helper function to get display name for state
    const getStateDisplayName = (stateCode) => {
        return STATE_MAPPING[stateCode] || stateCode;
    };

    // Helper function to check if search matches state or city
    const matchesSearch = (unit, searchTerm) => {
        if (!searchTerm || searchTerm.trim() === '') return true;
        
        const searchLower = searchTerm.toLowerCase().trim();
        const unitStateUpper = unit.state?.toUpperCase().trim() || '';
        const unitCityLower = unit.city?.toLowerCase().trim() || '';
        
        // Check if search matches city
        if (unitCityLower.includes(searchLower)) {
            return true;
        }
        
        // Check if search matches state abbreviation
        if (unitStateUpper === searchTerm.toUpperCase()) {
            return true;
        }
        
        // Check if search matches full state name
        if (STATE_MAPPING[searchTerm]) {
            const abbreviation = STATE_MAPPING[searchTerm];
            if (unitStateUpper === abbreviation) {
                return true;
            }
        }
        
        // Check if search is abbreviation and matches state
        if (searchTerm.length <= 2) {
            if (unitStateUpper === searchTerm.toUpperCase()) {
                return true;
            }
        }
        
        // Check partial match for full state names
        if (searchTerm.length > 2) {
            const unitFullName = STATE_MAPPING[unitStateUpper];
            if (unitFullName && unitFullName.toLowerCase().includes(searchLower)) {
                return true;
            }
        }
        
        return false;
    };

    // Filter rental units by search query (state or city)
    const filteredRentalUnits = rentalUnits.filter(unit => {
        return matchesSearch(unit, searchQuery);
    });

    const sortedRentalUnits = [...filteredRentalUnits].sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        
        if (sortOrder === 'highToLow') {
            return priceB - priceA;
        } else if (sortOrder === 'lowToHigh') {
            return priceA - priceB;
        }
        return 0; // default order
    });

    const PropertyCard = ({ unit }) => (
        <div className="group cursor-pointer">
            <div className="relative">
                {userId ? (
                    <Link to={`/units/${unit?.id}`}>
                        <div className="relative overflow-hidden rounded-xl">
                            <img
                                src={unit.url}
                                alt={unit.title}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                        </div>
                    </Link>
                ) : (
                    <div className="relative overflow-hidden rounded-xl">
                        <img
                            src={unit.url}
                            alt={unit.title}
                            className="w-full h-64 object-cover"
                        />
                    </div>
                )}
                
                {/* Heart icon */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(unit.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                >
                    <svg 
                        className={`w-5 h-5 ${favorites.has(unit.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`}
                        fill={favorites.has(unit.id) ? 'currentColor' : 'none'}
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            {/* Property details */}
            <div className="mt-3">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                            {unit.city}, {getStateDisplayName(unit.state)}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                            {unit.distanceFromBeach} mile{unit.distanceFromBeach !== 1 ? 's' : ''} from beach
                        </p>
                        <p className="text-gray-500 text-sm">
                            {unit.rooms} bedroom{unit.rooms !== 1 ? 's' : ''}
                        </p>
                    </div>
                    <div className="flex items-center ml-2">
                        <svg className="w-4 h-4 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600">4.9</span>
                    </div>
                </div>
                <div className="mt-2">
                    <span className="font-semibold text-gray-900">
                        {formatPrice(unit.price)}
                    </span>
                    <span className="text-gray-500 text-sm"> night</span>
                </div>
            </div>
        </div>
    );

    // Get display name for search query
    const getSearchDisplayName = (query) => {
        if (!query) return '';
        
        // If it's an abbreviation, get the full name
        if (query.length <= 2 && STATE_MAPPING[query.toUpperCase()]) {
            return STATE_MAPPING[query.toUpperCase()];
        }
        
        // If it's a full name, return as is
        if (STATE_MAPPING[query]) {
            return query;
        }
        
        // Otherwise return the query as is (could be a city)
        return query;
    };

    // Check if search is for a state or city
    const isStateSearch = (query) => {
        if (!query) return false;
        
        // Check if it's a state abbreviation
        if (query.length <= 2 && STATE_MAPPING[query.toUpperCase()]) {
            return true;
        }
        
        // Check if it's a full state name
        if (STATE_MAPPING[query]) {
            return true;
        }
        
        return false;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {searchQuery ? (
                                    isStateSearch(searchQuery) 
                                        ? `Stays in ${getSearchDisplayName(searchQuery)}`
                                        : `Stays in ${searchQuery}`
                                ) : 'Stays in Beach Destinations'}
                            </h1>
                            <p className="mt-2 text-gray-600">
                                {sortedRentalUnits.length} stay{sortedRentalUnits.length !== 1 ? 's' : ''} · Luxury beachfront rentals
                                {searchQuery && (
                                    <span className="ml-2 text-blue-600">
                                        · Filtered by {isStateSearch(searchQuery) ? getSearchDisplayName(searchQuery) : searchQuery}
                                    </span>
                                )}
                            </p>
                        </div>
                        
                        {/* Price Filter */}
                        <div className="mt-4 md:mt-0">
                            <button 
                                onClick={handlePriceSort}
                                className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                                Price
                                {sortOrder === 'highToLow' && (
                                    <span className="ml-1 text-xs text-gray-500">(High to Low)</span>
                                )}
                                {sortOrder === 'lowToHigh' && (
                                    <span className="ml-1 text-xs text-gray-500">(Low to High)</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {sortedRentalUnits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sortedRentalUnits.map((unit) => (
                            <PropertyCard key={unit.id} unit={unit} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🏖️</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {searchQuery ? (
                                isStateSearch(searchQuery) 
                                    ? `No properties found in ${getSearchDisplayName(searchQuery)}`
                                    : `No properties found in ${searchQuery}`
                            ) : 'No properties found'}
                        </h3>
                        <p className="text-gray-600">
                            {searchQuery 
                                ? `Try searching for a different city or state, or browse all properties.`
                                : 'Try adjusting your search or filters to find what you\'re looking for.'
                            }
                        </p>
                        {searchQuery && (
                            <div className="mt-6">
                                <Link
                                    to="/units"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    View all properties
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RentalUnitsPage
