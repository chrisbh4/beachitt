import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { fetchAddBooking } from "../../store/bookings"
import { getSingleUnit } from "../../store/rentalUnits"
import { formatPrice } from "../../utils/currency";
import './booking.css'

/*
    TODO
        - same date booking allows for duplicates
        - When doing same day booking then book a startDate === to the same dayBooking it allows for overBooking


        * Before conversion the selected date and the unit date that is turned into a new Date() are exactly the same
            1.need to convert the unit date with new Date()
            2.need to have the checkStart to have its orginal format with PST
            3.use valueOf() to be able to have the dates be converted into miliseconds
            4. compare if the values are the same if so then return and set error startDate can't be the same as endDate
*/

function BookingCal({ userId, unitId, unitBookings, onBookingSuccess, unitPrice }) {
    const dispatch = useDispatch();
    const [selectedRange, setSelectedRange] = useState(null);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [totalNights, setTotalNights] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showSummary, setShowSummary] = useState(false);

    // Convert existing bookings to date objects for calendar highlighting
    const bookedDates = unitBookings?.map(booking => ({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate)
    })) || [];

    // Format date to YYYY-MM-DD
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    // Check if a date is booked
    const isDateBooked = (date) => {
        return bookedDates.some(booking => 
            date >= booking.start && date <= booking.end
        );
    };

    // Calculate nights and total price
    useEffect(() => {
        if (selectedRange && Array.isArray(selectedRange) && selectedRange.length === 2) {
            const [startDate, endDate] = selectedRange;
            if (startDate && endDate) {
                const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                setTotalNights(nights);
                setTotalPrice(nights * (unitPrice || 0));
                setShowSummary(true);
            }
        } else {
            setTotalNights(0);
            setTotalPrice(0);
            setShowSummary(false);
        }
    }, [selectedRange, unitPrice]);

    // Handle calendar date selection
    const handleDateChange = (value) => {
        setErrors([]);
        
        if (Array.isArray(value) && value.length === 2) {
            const [startDate, endDate] = value;
            
            // Ensure we have valid dates
            if (!startDate || !endDate) {
                setSelectedRange(null);
                return;
            }
            
            // Check if any date in the range is already booked
            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                if (isDateBooked(currentDate)) {
                    setErrors(["Selected dates conflict with existing bookings. Please choose different dates."]);
                    setSelectedRange(null);
                    return;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            
            setSelectedRange(value);
        } else {
            setSelectedRange(null);
        }
    };

    // Validate booking dates
    const validateBooking = () => {
        if (!selectedRange || !Array.isArray(selectedRange) || selectedRange.length !== 2) {
            setErrors(["Please select check-in and check-out dates"]);
            return false;
        }

        const [startDate, endDate] = selectedRange;
        
        if (!startDate || !endDate) {
            setErrors(["Please select valid check-in and check-out dates"]);
            return false;
        }
        
        const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        
        if (nights < 1) {
            setErrors(["Check-out date must be after check-in date"]);
            return false;
        }

        if (nights > 30) {
            setErrors(["Maximum stay is 30 nights"]);
            return false;
        }

        return true;
    };

    // Handle booking submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateBooking()) return;
        
        setIsLoading(true);
        setErrors([]);

        try {
            const [startDate, endDate] = selectedRange;
            const payload = {
                startDate: formatDate(startDate),
                endDate: formatDate(endDate),
                userId,
                rentalUnitId: unitId
            };

            const data = await dispatch(fetchAddBooking(payload));

            if (data.errors) {
                setErrors(Array.isArray(data.errors) ? data.errors : [data.errors]);
            } else {
                // Success
                await dispatch(getSingleUnit(unitId));
                setSelectedRange(null);
                setShowSummary(false);
                
                // Call success callback with booking details
                if (onBookingSuccess) {
                    onBookingSuccess({
                        startDate: formatDate(startDate),
                        endDate: formatDate(endDate),
                        nights: totalNights,
                        totalPrice: formatPrice(totalPrice)
                    });
                }
            }
        } catch (error) {
            setErrors(["An error occurred while processing your booking. Please try again."]);
        } finally {
            setIsLoading(false);
        }
    };

    // Custom tile content for calendar
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const isBooked = isDateBooked(date);
            if (isBooked) {
                return <div className="booked-date-indicator"></div>;
            }
        }
        return null;
    };

    // Custom tile className for styling
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const isBooked = isDateBooked(date);
            if (isBooked) {
                return 'booked-date';
            }
        }
        return null;
    };

    return (
        <div className="modern-booking-calendar">
            {/* Calendar Header */}
            <div className="calendar-header">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select dates</h3>
                <p className="text-sm text-gray-600 mb-4">Choose your check-in and check-out dates</p>
            </div>

            {/* Calendar Component */}
            <div className="calendar-container">
                <Calendar
                    selectRange={true}
                    onChange={handleDateChange}
                    value={selectedRange}
                    minDate={new Date()}
                    maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
                    tileContent={tileContent}
                    tileClassName={tileClassName}
                    showNeighboringMonth={false}
                    prev2Label={null}
                    next2Label={null}
                />
            </div>

            {/* Date Selection Summary */}
            {selectedRange && Array.isArray(selectedRange) && selectedRange.length > 0 && (
                <div className="date-selection-summary">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <p className="text-xs text-gray-600 uppercase tracking-wide">Check-in</p>
                                    <p className="font-semibold text-gray-900">
                                        {selectedRange[0]?.toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                </div>
                                
                                {selectedRange[1] && (
                                    <>
                                        <div className="flex-1 border-t border-gray-300"></div>
                                        <div className="text-center">
                                            <p className="text-xs text-gray-600 uppercase tracking-wide">Check-out</p>
                                            <p className="font-semibold text-gray-900">
                                                {selectedRange[1]?.toLocaleDateString('en-US', { 
                                                    month: 'short', 
                                                    day: 'numeric' 
                                                })}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Summary */}
            {showSummary && (
                <div className="booking-summary">
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-3">Booking Summary</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">{formatPrice(unitPrice)} × {totalNights} night{totalNights !== 1 ? 's' : ''}</span>
                                <span className="font-medium">{formatPrice(totalPrice)}</span>
                            </div>
                            <hr className="border-gray-200" />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Messages */}
            {errors.length > 0 && (
                <div className="error-messages">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <div className="flex">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    {errors.length === 1 ? 'There was an error' : 'There were errors'} with your booking:
                                </h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <ul className="list-disc list-inside space-y-1">
                                        {errors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Actions */}
            <div className="booking-actions">
                {selectedRange && Array.isArray(selectedRange) && selectedRange.length === 2 ? (
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || errors.length > 0}
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                            isLoading || errors.length > 0
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                            </div>
                        ) : (
                            'Reserve'
                        )}
                    </button>
                ) : (
                    <button
                        disabled
                        className="w-full py-3 px-4 rounded-lg font-semibold text-gray-500 bg-gray-200 cursor-not-allowed"
                    >
                        Select dates to continue
                    </button>
                )}
            </div>

            {/* Legend */}
            <div className="calendar-legend">
                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span>Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Selected</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingCal;
