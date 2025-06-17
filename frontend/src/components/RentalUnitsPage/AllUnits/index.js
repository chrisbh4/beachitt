import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRentalUnits } from '../../../store/rentalUnits'
// import "../../RentalUnitsPage/UnitsPage.css"

function RentalUnitsPage() {
    const dispatch = useDispatch();
    const rentalUnits = useSelector((state) => Object.values(state?.rentalUnit))
    const userId = useSelector((state)=> state.session.user?.id)
    const [favorites, setFavorites] = useState(new Set());
    const [sortOrder, setSortOrder] = useState('default'); // 'default', 'highToLow', 'lowToHigh'

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

    const sortedRentalUnits = [...rentalUnits].sort((a, b) => {
        const priceA = parseInt(a.price) || 0;
        const priceB = parseInt(b.price) || 0;
        
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
                            {unit.city}, {unit.state}
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
                        ${unit.price || '150'}
                    </span>
                    <span className="text-gray-500 text-sm"> night</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Stays in Beach Destinations
                            </h1>
                            <p className="mt-2 text-gray-600">
                                {rentalUnits.length} stay{rentalUnits.length !== 1 ? 's' : ''} · Luxury beachfront rentals
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
                        <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RentalUnitsPage
