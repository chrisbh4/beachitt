import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, Redirect } from 'react-router-dom';
import {getSingleUnit } from '../../../store/rentalUnits';
import { addToFavorites, removeFromFavorites, fetchUserFavorites } from '../../../store/favorites';
import MapContainer from '../../Maps';
import BookingCal from '../../Booking-Cal';
import EditUnitModal from '../../Modals/Units/EditModal';
import NewReviewModal from "../../Modals/Reviews/NewModal.js"
import EditReviewModal from '../../Modals/Reviews/EditModal';
import EditBookingModal from '../../Modals/Bookings/EditModal';
import { formatPrice } from '../../../utils/currency';

function GetSingleUnitPage() {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [activeTab, setActiveTab] = useState('reviews');
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [notification, setNotification] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const unit = useSelector(state => state?.rentalUnit)
    const user = useSelector(state => state?.session.user)
    const favorites = useSelector(state => state?.favorites)
    const userId = user?.id;
    const unitReviews = unit?.Reviews;
    const unitBookings = unit?.Bookings;

    const unitLat = unit?.lat;
    const unitLng = unit?.lng;

    // Create image gallery with just the main image
    const imageGallery = unit?.url ? [unit.url] : [];

    // Fallback image if no images are available
    const fallbackImage = 'https://beachitt-app.s3.us-west-1.amazonaws.com/No-Image-Available.png';

    useEffect(() => {
        dispatch(getSingleUnit(id))
    }, [dispatch, id])

    // Load user favorites and check if current unit is favorited
    useEffect(() => {
        if (userId && unit?.id) {
            dispatch(fetchUserFavorites(userId));
        }
    }, [dispatch, userId, unit?.id]);

    // Check if current unit is favorited
    useEffect(() => {
        if (favorites && unit?.id) {
            setIsFavorited(!!favorites[unit.id]);
        }
    }, [favorites, unit?.id]);

    // Notification system
    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    // Handle save/favorite toggle
    const handleSaveToggle = async () => {
        if (!userId) {
            showNotification('Please log in to save units', 'error');
            return;
        }

        setIsSaving(true);
        try {
            if (isFavorited) {
                await dispatch(removeFromFavorites(userId, unit.id));
                showNotification('Removed from saved units');
            } else {
                await dispatch(addToFavorites(userId, unit.id));
                showNotification('Added to saved units');
            }
        } catch (error) {
            showNotification('Error saving unit', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    // Image modal functions
    const openImageModal = (index) => {
        setSelectedImageIndex(index);
        setShowImageModal(true);
    };

    const closeImageModal = () => {
        setShowImageModal(false);
    };

    // Handle keyboard navigation in modal
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!showImageModal) return;
            if (e.key === 'Escape') closeImageModal();
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [showImageModal]);

    // Check if user is logged in
    if (!user) {
        return <Redirect to="/" />;
    }

    const bookOrEditUnit = () => {
        if (userId > 0 && userId === unit?.ownerId) {
            return (
                <div className="flex gap-4">
                    <EditUnitModal />
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
                    <button 
                        onClick={handleSaveToggle}
                        disabled={isSaving}
                        className={`px-6 py-4 border-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                            isFavorited 
                                ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100' 
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSaving ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        ) : (
                            <svg className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : ''}`} fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        )}
                        {isFavorited ? 'Saved' : 'Save'}
                    </button>
                </div>
            )
        }
    }

    const displayReviews = () => {
        if (!unitReviews || unitReviews.length === 0) {
            return (
                <div className="reviews-empty-state">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.993-.5L3 21l1.5-7.007A7.963 7.963 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                    </svg>
                    <h3>No reviews yet</h3>
                    <p>Be the first to share your experience!</p>
                </div>
            );
        }

        return unitReviews?.map((review, index) => {
            const reviewDate = new Date(review.createdAt || review.updatedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });

            const rating = review.rating || 5; // Default to 5 stars if no rating

            return (
                <div key={review.id || index} className="review-card">
                    <div className="flex items-start gap-4">
                        {/* Review Avatar */}
                        <div className="review-avatar">
                            {review.username?.charAt(0).toUpperCase() || 'U'}
                        </div>

                        {/* Review Content */}
                        <div className="review-content">
                            <div className="review-header">
                                <div>
                                    <h4 className="review-username">{review.username || 'Anonymous User'}</h4>
                                    <div className="review-date">{reviewDate}</div>
                                </div>

                                <div className="review-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            <p className="review-text">{review.comment}</p>

                            {/* Review Actions */}
                            {userId === review.userId && (
                                <div className="review-actions">
                                    <EditReviewModal reviewId={review.id} />
                                </div>
                            )}
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
            {showImageModal && imageGallery.length > 0 && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
                    <div className="relative max-w-4xl max-h-full mx-4">
                        <img
                            src={imageGallery[selectedImageIndex] || fallbackImage}
                            alt={`${unit?.title} - ${selectedImageIndex + 1}`}
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
                    </div>
                </div>
            )}

            {/* Single Image Display */}
            <div className="relative">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    {unit?.url ? (
                        <div className="relative group cursor-pointer" onClick={() => openImageModal(0)}>
                            <img
                                src={unit.url}
                                alt={unit?.title}
                                className="w-full h-96 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-xl"></div>
                        </div>
                    ) : (
                        /* Fallback for no images */
                        <div className="h-96 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                            <div className="text-center">
                                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-500">No images available</p>
                            </div>
                        </div>
                    )}

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
                                        <p className="font-semibold text-lg">{formatPrice(unit?.price)}</p>
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
                                        <div className="reviews-header">
                                            <div className="reviews-title">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-2.993-.5L3 21l1.5-7.007A7.963 7.963 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                                                </svg>
                                                Guest Reviews
                                                <span className="reviews-count">{unitReviews?.length || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {unitReviews?.length > 0 && (
                                                    <div className="reviews-average">
                                                        <span className="text-2xl font-bold">{averageRating}</span>
                                                        <div className="stars">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                <NewReviewModal />
                                            </div>
                                        </div>
                                        <div className="space-y-6">
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
                                        <span className="text-3xl font-bold text-gray-900">{formatPrice(unit?.price)}</span>
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
                                    <BookingCal
                                        userId={userId}
                                        unitId={unit?.id}
                                        unitBookings={unit?.Bookings}
                                        unitPrice={unit?.price}
                                        unitOwnerId={unit?.ownerId}
                                        onBookingSuccess={(bookingDetails) => {
                                            const isOwner = userId === unit?.ownerId;
                                            const message = isOwner 
                                                ? `Free booking confirmed! ${bookingDetails.nights} night${bookingDetails.nights !== 1 ? 's' : ''} as property owner.`
                                                : `Booking confirmed! ${bookingDetails.nights} night${bookingDetails.nights !== 1 ? 's' : ''} for ${bookingDetails.totalPrice}`;
                                            showNotification(message, 'success');
                                        }}
                                    />
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
