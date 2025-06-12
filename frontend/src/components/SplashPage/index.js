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
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Discover Airbnb Experiences</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group">
                            <div className="h-80 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-4">🏄‍♂️</div>
                                    <h3 className="text-2xl font-bold mb-2">Adventures</h3>
                                    <p className="text-lg opacity-90">Multi-day trips with meals and stays</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group">
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
            <div className="bg-gradient-to-r from-red-500 to-pink-500 py-16">
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
            </div>

            {/* Footer */}
            <footer className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
                                <li><a href="#" className="hover:text-gray-900">Safety information</a></li>
                                <li><a href="#" className="hover:text-gray-900">Cancellation options</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="#" className="hover:text-gray-900">Diversity & Belonging</a></li>
                                <li><a href="#" className="hover:text-gray-900">Against Discrimination</a></li>
                                <li><a href="#" className="hover:text-gray-900">Accessibility</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="#" className="hover:text-gray-900">Try hosting</a></li>
                                <li><a href="#" className="hover:text-gray-900">Explore hosting resources</a></li>
                                <li><a href="#" className="hover:text-gray-900">Visit our community forum</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li><a href="#" className="hover:text-gray-900">Newsroom</a></li>
                                <li><a href="#" className="hover:text-gray-900">Learn about new features</a></li>
                                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <p className="text-gray-600">© 2024 BeachItt, Inc.</p>
                            <span className="text-gray-400">·</span>
                            <a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a>
                            <span className="text-gray-400">·</span>
                            <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            <p className="text-gray-600">Created by Christian Brown</p>
                            <div className="flex space-x-4">
                                <a href="https://www.linkedin.com/in/christian-brown-8770311ba/" className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="mailto:Chrismbh4@gmail.com" className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </a>
                                <a href="https://github.com/chrisbh4" className="text-gray-400 hover:text-gray-600">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default SplashPage;
