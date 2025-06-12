import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  useParams } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import {getSingleUnit } from "../../store/rentalUnits"
import "./Reviews.css"

function NewReviewForm ({ submitModal }) {
    const dispatch = useDispatch();
    const {id} = useParams();

    const userId = useSelector((state)=> state.session.user.id)
    const username = useSelector((state)=> state.session.user.username)
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateComment = (e) => setComment(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!comment.trim()) {
            setErrors(["Please write a comment for your review"]);
            return;
        }
        
        if (comment.trim().length < 10) {
            setErrors(["Comment must be at least 10 characters long"]);
            return;
        }
        
        if (rating === 0) {
            setErrors(["Please select a star rating"]);
            return;
        }

        setIsSubmitting(true);
        setErrors([]);

        const payload = {
            comment: comment.trim(),
            rating,
            rentalUnitId: id,
            userId,
            username
        };

        try {
            const data = await dispatch(createReview(payload));

            if (!data.errors) {
                await dispatch(getSingleUnit(id));
                submitModal(false);
                return data;
            } else {
                setErrors(Array.isArray(data.errors) ? data.errors : [data.errors]);
            }
        } catch (error) {
            setErrors(["An error occurred while submitting your review. Please try again."]);
        } finally {
            setIsSubmitting(false);
        }
    };

    const StarRating = () => {
        return (
            <div className="star-rating">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                        >
                            <svg
                                className={`w-8 h-8 transition-colors duration-150 ${
                                    star <= (hoveredRating || rating)
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                            </svg>
                        </button>
                    ))}
                    {rating > 0 && (
                        <span className="ml-2 text-sm text-gray-600">
                            {rating} star{rating !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>
                <div className="mt-1 text-xs text-gray-500">
                    Click to rate your experience
                </div>
            </div>
        );
    };

    return (
        <div className="modern-review-form">
            <div className="form-header">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Share your experience</h2>
                <p className="text-gray-600 mb-6">Help other travelers by sharing your honest review</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Messages */}
                {errors.length > 0 && (
                    <div className="error-container">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex">
                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Please fix the following {errors.length === 1 ? 'error' : 'errors'}:
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

                {/* Star Rating */}
                <StarRating />

                {/* Comment Field */}
                <div className="comment-field">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="comment"
                        rows={4}
                        value={comment}
                        onChange={updateComment}
                        placeholder="Share details about your stay, what you liked, any suggestions for improvement..."
                        className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors ${
                            errors.some(error => error.includes('comment') || error.includes('Comment'))
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300'
                        }`}
                        maxLength={500}
                    />
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                        <span>Minimum 10 characters</span>
                        <span>{comment.length}/500</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="form-actions">
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => submitModal(false)}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !comment.trim() || rating === 0}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                isSubmitting || !comment.trim() || rating === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Submitting...
                                </div>
                            ) : (
                                'Submit Review'
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {/* Review Guidelines */}
            <div className="review-guidelines">
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Review Guidelines</h4>
                    <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Be honest and specific about your experience</li>
                        <li>• Keep it relevant to other travelers</li>
                        <li>• Avoid personal or inappropriate content</li>
                        <li>• Focus on the property and amenities</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NewReviewForm;
