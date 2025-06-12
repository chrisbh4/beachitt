import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReview, editReview, deleteReview } from '../../store/reviews';
import { getSingleUnit } from "../../store/rentalUnits"
import './Reviews.css'

function EditReviewForm({ id, submitModal }) {
    const dispatch = useDispatch();
    const review = useSelector((state) => state.reviews)

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [rentalUnitId, setRentalUnitId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        dispatch(getReview(id))
    }, [dispatch, id])

    // Update local state when review data loads
    useEffect(() => {
        if (review) {
            setComment(review.comment || '');
            setRating(review.rating || 0);
            setRentalUnitId(review.rentalUnitId);
            setUserId(review.userId);
            setUsername(review.username || '');
        }
    }, [review]);

    const updateComment = (e) => setComment(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
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
            rentalUnitId,
            userId,
            username
        };

        try {
            const data = await dispatch(editReview(payload, id));

            if (!data.errors) {
                await dispatch(getSingleUnit(rentalUnitId));
                submitModal(false);
                return data;
            } else {
                setErrors(Array.isArray(data.errors) ? data.errors : [data.errors]);
            }
        } catch (error) {
            setErrors(["An error occurred while updating your review. Please try again."]);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        setErrors([]);

        try {
            await dispatch(deleteReview(id));
            await dispatch(getSingleUnit(rentalUnitId));
            submitModal(false);
        } catch (error) {
            setErrors(["An error occurred while deleting your review. Please try again."]);
            setIsDeleting(false);
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
                    Click to update your rating
                </div>
            </div>
        );
    };

    const DeleteConfirmModal = () => {
        if (!showDeleteConfirm) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 max-w-md mx-4">
                    <div className="flex items-center gap-3 mb-4">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900">Delete Review</h3>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Are you sure you want to delete this review? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setShowDeleteConfirm(false)}
                            disabled={isDeleting}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium"
                        >
                            {isDeleting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Deleting...
                                </div>
                            ) : (
                                'Delete Review'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="modern-review-form">
                <div className="form-header">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Edit your review</h2>
                    <p className="text-gray-600 mb-6">Update your review to reflect your latest experience</p>
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
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors font-medium flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete Review
                            </button>

                            <div className="flex gap-3">
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
                                            Updating...
                                        </div>
                                    ) : (
                                        'Update Review'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <DeleteConfirmModal />
        </>
    );
}

export default EditReviewForm;
