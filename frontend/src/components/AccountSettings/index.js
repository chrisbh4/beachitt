import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { fetchUserBookings, fetchDeleteBooking } from '../../store/bookings';
import { formatPrice } from '../../utils/currency';
import NewReviewForm from '../Reviews/NewReviewForm';

function AccountSettings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  // Profile form state
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Get bookings from store
  const bookings = useSelector(state => state.bookings);
  const bookingsArray = Object.values(bookings);

  // Update profileData when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || ''
      });
    }
  }, [user]);

  // Load user bookings when component mounts
  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchUserBookings(user.id));
    }
  }, [dispatch, user]);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRentalUnitId, setSelectedRentalUnitId] = useState(null);
  const [tripFilter, setTripFilter] = useState('all'); // 'all', 'upcoming', 'completed'

  if (!user) {
    history.push('/');
    return null;
  }

  const clearMessages = () => {
    setErrors([]);
    setSuccessMessage('');
  };

  // Helper functions for booking management
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'current':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingStatus = (booking) => {
    const today = new Date();
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);
    
    if (startDate > today) {
      return 'upcoming';
    } else if (endDate < today) {
      return 'completed';
    } else {
      return 'current';
    }
  };

  const filteredBookings = bookingsArray.filter(booking => {
    if (tripFilter === 'all') return true;
    return getBookingStatus(booking) === tripFilter;
  });

  const handleCancelBooking = async (bookingId) => {
    try {
      await dispatch(fetchDeleteBooking(bookingId));
      setSuccessMessage('Booking cancelled successfully!');
      setShowBookingDetails(false);
      // Refresh the bookings data to update the UI
      if (user && user.id) {
        dispatch(fetchUserBookings(user.id));
      }
    } catch (error) {
      setErrors(['An error occurred while cancelling your booking.']);
    }
  };

  const handleWriteReview = (booking) => {
    // Show the review modal for this specific rental unit
    setSelectedRentalUnitId(booking.rentalUnitId);
    setShowReviewModal(true);
    setShowBookingDetails(false); // Close the booking details modal
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    clearMessages();
    setIsLoading(true);

    try {
      const data = await dispatch(sessionActions.updateUser(profileData));

      if (data.errors) {
        setErrors(Array.isArray(data.errors) ? data.errors : [data.errors]);
      } else {
        setSuccessMessage('Profile updated successfully!');
      }
    } catch (error) {
      setErrors(['An error occurred while updating your profile.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    clearMessages();
    setIsLoading(true);

    // Client-side validation
    const newErrors = [];
    if (!passwordData.currentPassword) newErrors.push('Current password is required');
    if (!passwordData.newPassword) newErrors.push('New password is required');
    if (passwordData.newPassword.length < 6) newErrors.push('New password must be at least 6 characters');
    if (passwordData.newPassword !== passwordData.confirmPassword) newErrors.push('New passwords do not match');

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const data = await dispatch(sessionActions.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }));

      if (data.errors) {
        setErrors(Array.isArray(data.errors) ? data.errors : [data.errors]);
      } else {
        setSuccessMessage('Password updated successfully!');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      setErrors(['An error occurred while updating your password.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // TODO: Implement account deletion API call
      // await dispatch(sessionActions.deleteAccount());

      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(sessionActions.logout());
      history.push('/');
    } catch (error) {
      setErrors(['An error occurred while deleting your account.']);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'trips', name: 'Booked Trips', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
    { id: 'security', name: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => history.goBack()}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <img className="h-8 w-auto mr-4" src="/logos/batteriesinc-logo.svg" alt="BeachItt" />
              <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white rounded-2xl shadow-sm p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    clearMessages();
                  }}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm">
              {/* Success/Error Messages */}
              {(errors.length > 0 || successMessage) && (
                <div className="p-6 border-b border-gray-200">
                  {errors.length > 0 && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex">
                        <svg className="h-5 w-5 text-red-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div className="ml-3">
                          <ul className="text-sm text-red-700 list-disc list-inside">
                            {errors.map((error, idx) => (
                              <li key={idx}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {successMessage && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex">
                        <svg className="h-5 w-5 text-green-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="ml-3 text-sm text-green-700">{successMessage}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Information</h2>
                    <p className="text-gray-600">Update your account profile information and email address.</p>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Username *
                        </label>
                        <input
                          type="text"
                          value={profileData.username}
                          onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                          isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        } text-white`}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </div>
                        ) : (
                          'Update Profile'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Booked Trips Tab */}
              {activeTab === 'trips' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Your Booked Trips</h2>
                    <p className="text-gray-600">Manage your upcoming and past bookings.</p>
                  </div>

                  {/* Filter Tabs */}
                  <div className="mb-6">
                    <div className="border-b border-gray-200">
                      <nav className="-mb-px flex space-x-8">
                        {[
                          { key: 'all', label: 'All Trips', count: bookingsArray.length },
                          { key: 'upcoming', label: 'Upcoming', count: bookingsArray.filter(b => getBookingStatus(b) === 'upcoming').length },
                          { key: 'completed', label: 'Completed', count: bookingsArray.filter(b => getBookingStatus(b) === 'completed').length }
                        ].map((filter) => (
                          <button
                            key={filter.key}
                            onClick={() => setTripFilter(filter.key)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                              tripFilter === filter.key
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                          >
                            {filter.label} ({filter.count})
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>

                  {/* Bookings List */}
                  {filteredBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No trips found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {tripFilter === 'all'
                          ? "You haven't booked any trips yet."
                          : `No ${tripFilter} trips found.`}
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={() => history.push('/units')}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Browse Properties
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredBookings.map((booking) => (
                        <div key={booking.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-6">
                            <div className="flex items-start space-x-4">
                              {/* Property Image */}
                              <div className="flex-shrink-0">
                                <img
                                  src={booking.RentalUnit?.url || "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                                  alt={booking.RentalUnit?.title || "Property"}
                                  className="w-24 h-24 rounded-lg object-cover"
                                />
                              </div>

                              {/* Booking Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="text-lg font-medium text-gray-900 truncate">
                                      {booking.RentalUnit?.title || "Property"}
                                    </h3>
                                    <p className="text-sm text-gray-500 flex items-center mt-1">
                                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      {booking.RentalUnit?.city}, {booking.RentalUnit?.state}
                                    </p>
                                  </div>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(getBookingStatus(booking))}`}>
                                    {getBookingStatus(booking).charAt(0).toUpperCase() + getBookingStatus(booking).slice(1)}
                                  </span>
                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <p className="text-gray-500">Check-in</p>
                                    <p className="font-medium text-gray-900">{formatDate(booking.startDate)}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Check-out</p>
                                    <p className="font-medium text-gray-900">{formatDate(booking.endDate)}</p>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Nights</p>
                                    <p className="font-medium text-gray-900">{booking.numberOfNights || calculateNights(booking.startDate, booking.endDate)} nights</p>
                                  </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Total Price
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                      {formatPrice(booking.totalPrice || (booking.RentalUnit?.price * calculateNights(booking.startDate, booking.endDate)))}
                                    </p>
                                  </div>
                                  <div className="flex space-x-3">
                                    <button
                                      onClick={() => {
                                        setSelectedBooking(booking);
                                        setShowBookingDetails(true);
                                      }}
                                      className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                    >
                                      View Details
                                    </button>
                                    {getBookingStatus(booking) === 'upcoming' && (
                                      <button
                                        onClick={() => handleCancelBooking(booking.id)}
                                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                      >
                                        Cancel
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Security Settings</h2>
                    <p className="text-gray-600">Manage your password and account security.</p>
                  </div>

                  <form onSubmit={handlePasswordUpdate} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password *
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password *
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password *
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex">
                        <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">Password Requirements</h3>
                          <div className="mt-1 text-sm text-blue-700">
                            <ul className="list-disc list-inside space-y-1">
                              <li>At least 6 characters long</li>
                              <li>Include uppercase and lowercase letters</li>
                              <li>Include at least one number</li>
                              <li>Include at least one special character</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                          isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                        } text-white`}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </div>
                        ) : (
                          'Update Password'
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Danger Zone */}
                  <div className="mt-12 pt-6 border-t border-gray-200">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-red-900 mb-2">Danger Zone</h3>
                      <p className="text-sm text-red-700 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showBookingDetails && selectedBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Booking Details
                </h3>
                <button
                  onClick={() => setShowBookingDetails(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* Property Information */}
                <div className="flex space-x-4">
                  <img
                    src={selectedBooking.RentalUnit?.url || "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"}
                    alt={selectedBooking.RentalUnit?.title || "Property"}
                    className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedBooking.RentalUnit?.title || "Property"}
                    </h4>
                    <p className="text-gray-600 flex items-center mb-2">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {selectedBooking.RentalUnit?.city}, {selectedBooking.RentalUnit?.state}
                    </p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(getBookingStatus(selectedBooking))}`}>
                      {getBookingStatus(selectedBooking).charAt(0).toUpperCase() + getBookingStatus(selectedBooking).slice(1)}
                    </span>
                  </div>
                </div>

                {/* Booking Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h5 className="font-medium text-gray-900">Trip Details</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Check-in:</span>
                        <span className="font-medium">{formatDate(selectedBooking.startDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Check-out:</span>
                        <span className="font-medium">{formatDate(selectedBooking.endDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Nights:</span>
                        <span className="font-medium">{selectedBooking.numberOfNights || calculateNights(selectedBooking.startDate, selectedBooking.endDate)} nights</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-medium text-gray-900">Property Details</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Property:</span>
                        <span className="font-medium">{selectedBooking.RentalUnit?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location:</span>
                        <span className="font-medium">{selectedBooking.RentalUnit?.city}, {selectedBooking.RentalUnit?.state}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Price per night:</span>
                        <span className="font-medium">{formatPrice(selectedBooking.pricePerNight || selectedBooking.RentalUnit?.price)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-gray-200 pt-6">
                  <h5 className="font-medium text-gray-900 mb-4">Pricing Details</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        {formatPrice(selectedBooking.pricePerNight || selectedBooking.RentalUnit?.price)} x {selectedBooking.numberOfNights || calculateNights(selectedBooking.startDate, selectedBooking.endDate)} nights
                      </span>
                      <span>{formatPrice(selectedBooking.totalPrice || (selectedBooking.RentalUnit?.price * calculateNights(selectedBooking.startDate, selectedBooking.endDate)))}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                      <span>Total</span>
                      <span>{formatPrice(selectedBooking.totalPrice || (selectedBooking.RentalUnit?.price * calculateNights(selectedBooking.startDate, selectedBooking.endDate)))}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowBookingDetails(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  {getBookingStatus(selectedBooking) === 'upcoming' && (
                    <button
                      onClick={() => handleCancelBooking(selectedBooking.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancel Booking
                    </button>
                  )}
                  {getBookingStatus(selectedBooking) === 'completed' && (
                    <button
                      onClick={() => handleWriteReview(selectedBooking)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Write Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete Account
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete your account? This action cannot be undone and you will lose all your data, including your rental listings, bookings, and reviews.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete Account
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedRentalUnitId && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6">
              <div className="flex items-start justify-between mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Write a Review
                </h3>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <NewReviewForm 
                submitModal={(close) => {
                  if (close === false) {
                    setShowReviewModal(false);
                    setSuccessMessage('Review submitted successfully!');
                  }
                }}
                rentalUnitId={selectedRentalUnitId}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSettings;
