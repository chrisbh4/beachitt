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
                        
                        {/* Filters */}
                        <div className="mt-4 md:mt-0 flex space-x-4">
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                </svg>
                                Filters
                            </button>
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                Price
                            </button>
                            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                Type of place
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Properties Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {rentalUnits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {rentalUnits.map((unit) => (
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

            {/* Map toggle */}
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
                <button className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200 shadow-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Show map
                </button>
            </div>
        </div>
    )
}

export default RentalUnitsPage
