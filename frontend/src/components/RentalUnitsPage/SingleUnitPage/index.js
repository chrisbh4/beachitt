import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {getSingleUnit } from '../../../store/rentalUnits';
import MapContainer from '../../Maps';
import BookingCal from '../../Booking-Cal';
import EditUnitModal from '../../Modals/Units/EditModal';
import NewReviewModal from "../../Modals/Reviews/NewModal.js"
import EditReviewModal from '../../Modals/Reviews/EditModal';
import EditBookingModal from '../../Modals/Bookings/EditModal';

function GetSingleUnitPage() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState('reviews');
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [notification, setNotification] = useState(null);

    const unit = useSelector(state => state?.rentalUnit)
    const userId = useSelector(state => state?.session.user.id)
    const unitReviews = unit?.Reviews;
    const unitBookings = unit?.Bookings;

    const unitLat = unit?.lat;
    const unitLng = unit?.lng;

    // Create image gallery (using main image + variations for demo)
    const imageGallery = unit?.url ? [
        unit.url,
        unit.url, // In a real app, these would be different images
        unit.url,
        unit.url,
        unit.url
    ] : [];

    useEffect(() => {
        dispatch(getSingleUnit(id))
    }, [dispatch, id])

    // Notification system
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    // Image modal functions
    const openImageModal = (index) => {
        setSelectedImageIndex(index);
        setShowImageModal(true);
    };

    const closeImageModal = () => {
        setShowImageModal(false);
    };

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % imageGallery.length);
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + imageGallery.length) % imageGallery.length);
    };

    // Handle keyboard navigation in modal
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!showImageModal) return;
            if (e.key === 'Escape') closeImageModal();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [showImageModal]);

    const bookOrEditUnit = () => {
        if (userId > 0 && userId === unit?.ownerId) {
            return (
                <div className="flex gap-4">
                    <EditUnitModal />
                    <button className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                        Manage Property
                    </button>
                </div>
            )
        } else {
            return (
                <div className="flex gap-4">
                    <button 
                        onClick={() => showNotification('Booking request sent! The host will respond within 24 hours.')}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <a href={'#booking'} className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Book Now
                        </a>
                    </button>
                    <button className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium">
                        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Save
                    </button>
                </div>
            )
        }
    }

    const displayReviews = () => {
        if (!unitReviews || unitReviews.length === 0) {
            return (
                <div className="text-center py-12 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.993-.5L3 21l1.5-7.007A7.963 7.963 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                    </svg>
                    <p className="text-lg">No reviews yet</p>
                    <p className="text-sm">Be the first to share your experience!</p>
                </div>
            );
        }

        return unitReviews?.map((review, index) => {
            return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {review.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900">{review.username}</h4>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                                {userId === review.userId && (
                                    <div className="ml-4">
                                        <EditReviewModal reviewId={review.id} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    };

    const displayBookings = () => {
        if (!unitBookings || unitBookings.length === 0) {
            return (
                <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>No bookings yet</p>
                </div>
            );
        }

        return unitBookings?.map((booking, index) => {
            const splitStartDate = booking.startDate.split('-')
            const startDate = `${splitStartDate[1]}/${splitStartDate[2]}/${splitStartDate[0]}`
            const splitEndDate = booking.endDate.split('-')
            const endDate = `${splitEndDate[1]}/${splitEndDate[2]}/${splitEndDate[0]}`

            return (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="text-sm">
                                <div className="flex items-center gap-2 text-gray-600 mb-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Check-in
                                </div>
                                <p className="font-semibold text-gray-900">{startDate}</p>
                            </div>
                            <div className="text-gray-400">→</div>
                            <div className="text-sm">
                                <div className="flex items-center gap-2 text-gray-600 mb-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Check-out
                                </div>
                                <p className="font-semibold text-gray-900">{endDate}</p>
                            </div>
                        </div>
                        {userId === booking.userId && (
                            <EditBookingModal bookingId={booking.id} unitBookings={unitBookings} />
                        )}
                    </div>
                </div>
            )
        })
    };

    const averageRating = unitReviews?.length ? (unitReviews.reduce((acc, review) => acc + (review.rating || 5), 0) / unitReviews.length).toFixed(1) : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
                    notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                    <div className="flex items-center gap-3">
                        {notification.type === 'success' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                        <span>{notification.message}</span>
                        <button 
                            onClick={() => setNotification(null)}
                            className="ml-4 hover:text-gray-200"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
                    <div className="relative max-w-4xl max-h-full mx-4">
                        <img 
                            src={imageGallery[selectedImageIndex]} 
                            alt={`${unit?.title} - Image ${selectedImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain"
                        />
                        
                        {/* Close button */}
                        <button 
                            onClick={closeImageModal}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Navigation arrows */}
                        {imageGallery.length > 1 && (
                            <>
                                <button 
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 rounded-full p-2"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
                            {selectedImageIndex + 1} / {imageGallery.length}
                        </div>
                    </div>
                </div>
            )}

            {/* Airbnb-style Image Gallery */}
            <div className="relative">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="grid grid-cols-4 gap-2 h-96 rounded-xl overflow-hidden">
                        {/* Main large image - left side */}
                        <div className="col-span-2 row-span-2 relative group cursor-pointer" onClick={() => openImageModal(0)}>
                            <img 
                                src={imageGallery[0]} 
                                alt={unit?.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                        </div>
                        
                        {/* Grid of smaller images - right side */}
                        {imageGallery.slice(1, 5).map((image, index) => (
                            <div 
                                key={index + 1} 
                                className="relative group cursor-pointer"
                                onClick={() => openImageModal(index + 1)}
                            >
                                <img 
                                    src={image} 
                                    alt={`${unit?.title} - ${index + 2}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                                
                                {/* Show all photos button on last image */}
                                {index === 3 && imageGallery.length > 5 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openImageModal(0);
                                            }}
                                            className="px-4 py-2 bg-white rounded-lg font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                                        >
                                            Show all photos
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Back button and rating overlay */}
                    <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
                        <Link to='/units' className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-90 rounded-lg hover:bg-opacity-100 transition-all shadow-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Listings
                        </Link>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-90 rounded-lg shadow-lg">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-semibold">{averageRating}</span>
                            <span className="text-gray-600">({unitReviews?.length || 0} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Property Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Property Header */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{unit?.title}</h1>
                            <div className="flex items-center gap-4 text-gray-600 mb-6">
                                <div className="flex items-center gap-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{unit?.city}, {unit?.state} {unit?.zipcode}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                                    </svg>
                                    <span>{unit?.distanceFromBeach} miles from beach</span>
                                </div>
                            </div>

                            {/* Property Features */}
                            <div className="grid md:grid-cols-3 gap-6 mb-8">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Bedrooms</p>
                                        <p className="font-semibold text-lg">{unit?.rooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Bathrooms</p>
                                        <p className="font-semibold text-lg">{unit?.bathrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Per Night</p>
                                        <p className="font-semibold text-lg">${unit?.price}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">About this place</h3>
                                <p className="text-gray-700 leading-relaxed">{unit?.rentalUnitDescription}</p>
                            </div>
                        </div>

                        {/* Map Section */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">Location</h3>
                            <div className="rounded-xl overflow-hidden">
                                <MapContainer lat={unitLat} lng={unitLng} />
                            </div>
                        </div>

                        {/* Reviews & Bookings Tabs */}
                        <div className="bg-white rounded-2xl shadow-sm">
                            <div className="border-b border-gray-200">
                                <nav className="flex">
                                    <button
                                        onClick={() => setActiveTab('reviews')}
                                        className={`py-4 px-8 text-sm font-medium border-b-2 transition-colors ${
                                            activeTab === 'reviews'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Reviews ({unitReviews?.length || 0})
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('bookings')}
                                        className={`py-4 px-8 text-sm font-medium border-b-2 transition-colors ${
                                            activeTab === 'bookings'
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                    >
                                        Bookings ({unitBookings?.length || 0})
                                    </button>
                                </nav>
                            </div>
                            
                            <div className="p-8">
                                {activeTab === 'reviews' && (
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-semibold text-gray-900">Guest Reviews</h3>
                                            <NewReviewModal />
                                        </div>
                                        <div className="space-y-4">
                                            {displayReviews()}
                                        </div>
                                    </div>
                                )}
                                
                                {activeTab === 'bookings' && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-6">Current Bookings</h3>
                                        <div className="space-y-4">
                                            {displayBookings()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-3xl font-bold text-gray-900">${unit?.price}</span>
                                        <span className="text-gray-600">per night</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-medium">{averageRating}</span>
                                        <span>({unitReviews?.length || 0} reviews)</span>
                                    </div>
                                </div>

                                <div id="booking" className="mb-6">
                                    <BookingCal userId={userId} unitId={unit?.id} unitBookings={unit?.Bookings} />
                                </div>

                                <div className="space-y-4">
                                    {bookOrEditUnit()}
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-center text-sm text-gray-500">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        You won't be charged yet
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetSingleUnitPage;
