import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getRentalUnits } from '../../../store/rentalUnits'
import { formatPrice, parsePrice } from '../../../utils/currency';
import LoginFormPage from '../../LoginFormPage';
import SignupFormPage from '../../SignupFormPage';
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
    const [showSignInPopup, setShowSignInPopup] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);

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

    // Helper function to check if search query is a state
    const isStateSearch = (query) => {
        const stateCodes = Object.keys(STATE_MAPPING).filter(key => key.length === 2);
        return stateCodes.includes(query.toUpperCase());
    };

    // Helper function to get display name for search
    const getSearchDisplayName = (query) => {
        if (isStateSearch(query)) {
            return getStateDisplayName(query.toUpperCase());
        }
        return query;
    };

    // Filter units based on search query
    const filteredRentalUnits = rentalUnits.filter(unit => {
        if (!searchQuery) return true;
        
        const query = searchQuery.toLowerCase();
        const unitCity = unit.city?.toLowerCase() || '';
        const unitState = unit.state?.toLowerCase() || '';
        const unitStateFull = getStateDisplayName(unit.state)?.toLowerCase() || '';
        
        return unitCity.includes(query) || 
               unitState.includes(query) || 
               unitStateFull.includes(query);
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

    const handleUnitClick = (e) => {
        if (!userId) {
            e.preventDefault();
            setShowSignInPopup(true);
        }
    };

    const handleSignInClick = () => {
        setShowSignInPopup(false);
        setShowLoginModal(true);
    };

    const handleSignUpClick = () => {
        setShowSignInPopup(false);
        setShowSignupModal(true);
    };

    const PropertyCard = ({ unit }) => (
        <div className="group cursor-pointer">
            <div className="relative">
                <div 
                    className="relative overflow-hidden rounded-xl"
                    onClick={handleUnitClick}
                >
                    <img
                        src={unit.url}
                        alt={unit.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    {userId && (
                        <Link to={`/units/${unit?.id}`} className="absolute inset-0">
                            <span className="sr-only">View {unit.title}</span>
                        </Link>
                    )}
                </div>
                
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

    return (
        <div className="min-h-screen bg-white">
            {/* Log In Popup */}
            {showSignInPopup && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowSignInPopup(false)}></div>
                        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
                            <div className="text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Log in to view unit details
                                </h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Create an account or log in to see detailed information about this rental property.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSignInClick}
                                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={handleSignUpClick}
                                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <button
                                    onClick={() => setShowSignInPopup(false)}
                                    className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                                >
                                    Maybe later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <div className="relative w-full max-w-md bg-transparent">
                                <button
                                    onClick={() => setShowLoginModal(false)}
                                    className="absolute -top-2 -right-2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <LoginFormPage submitModal={setShowLoginModal} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Signup Modal */}
            {showSignupModal && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity">
                        <div className="flex min-h-full items-start justify-center p-4 pt-8 pb-8">
                            <div className="relative w-full max-w-md bg-transparent max-h-full overflow-y-auto">
                                <button
                                    onClick={() => setShowSignupModal(false)}
                                    className="absolute -top-2 -right-2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <SignupFormPage submitModal={setShowSignupModal} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                </svg>
                                Price {sortOrder === 'highToLow' ? 'High to Low' : sortOrder === 'lowToHigh' ? 'Low to High' : 'Sort'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Property Grid */}
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
