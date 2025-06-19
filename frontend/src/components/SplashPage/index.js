import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRentalUnits } from '../../store/rentalUnits'

function SplashPage(){
    const dispatch = useDispatch();
    const history = useHistory();
    const rentalUnits = useSelector((state) => Object.values(state?.rentalUnit))

    useEffect(() => {
        dispatch(getRentalUnits())
    }, [dispatch])

    const handleExplore = () => {
        history.push('/units');
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-red-50 to-pink-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Not sure where to go?
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500">
                                Perfect.
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover the world's most luxurious beachfront rentals. From secluded villas to oceanfront estates, find your perfect getaway.
                        </p>
                        <button 
                            onClick={handleExplore}
                            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            I'm flexible
                        </button>
                    </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-20 left-10 text-6xl opacity-20">🏖️</div>
                <div className="absolute top-40 right-20 text-4xl opacity-20">🌊</div>
                <div className="absolute bottom-20 left-20 text-5xl opacity-20">🏝️</div>
            </div>

            {/* Featured Properties Section */}
            {rentalUnits.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Live anywhere</h2>
                        <p className="text-lg text-gray-600">Keep calm & travel on</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {rentalUnits.slice(0, 4).map((unit, index) => (
                            <div 
                                key={unit.id} 
                                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                                onClick={handleExplore}
                            >
                                <div className="relative overflow-hidden rounded-xl shadow-lg">
                                    <img
                                        src={unit.url}
                                        alt={unit.title}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="font-semibold">{unit.city}, {unit.state}</p>
                                        <p className="text-sm">{unit.distanceFromBeach} mile from beach</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Experience Categories */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Discover Beach Experiences</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative overflow-hidden rounded-xl shadow-lg group">
                            <div className="h-80 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-4">🏄‍♂️</div>
                                    <h3 className="text-2xl font-bold mb-2">Adventures</h3>
                                    <p className="text-lg opacity-90">Multi-day trips with meals and stays</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-xl shadow-lg group">
                            <div className="h-80 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-4">🌅</div>
                                    <h3 className="text-2xl font-bold mb-2">Experiences</h3>
                                    <p className="text-lg opacity-90">Activities hosted by locals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            {/* <div className="bg-gradient-to-r from-red-500 to-pink-500 py-16">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Try hosting</h2>
                    <p className="text-xl text-white/90 mb-8">
                        Earn extra income and unlock new opportunities by sharing your space.
                    </p>
                    <button 
                        onClick={() => history.push('/new')}
                        className="bg-white text-red-500 font-semibold py-3 px-8 rounded-full text-lg hover:bg-gray-50 transition-colors duration-300 shadow-lg"
                    >
                        Learn more
                    </button>
                </div>
            </div> */}

        </div>
    )
}

export default SplashPage;
