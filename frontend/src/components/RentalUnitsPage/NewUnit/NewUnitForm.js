import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRentalUnit} from "../../../store/rentalUnits"

function NewUnitForm({submitModal}) {
    const dispatch = useDispatch();
    const ownerId = useSelector(state => state.session.user.id);

    const [formData, setFormData] = useState({
        title: "",
        city: "",
        state: "",
        zipcode: "",
        distanceFromBeach: "",
        rooms: 1,
        bathrooms: 1,
        pool: "",
        unitType: "",
        lat: "",
        lng: "",
        price: "",
        rentalUnitDescription: "",
        url: null
    });
    
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const updateField = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
        // Clear errors when user starts typing
        if (errors.length > 0) {
            setErrors([]);
        }
    };

    const validateStep = (step) => {
        const newErrors = [];
        
        if (step === 1) {
            if (!formData.title.trim()) newErrors.push("Property title is required");
            if (!formData.city.trim()) newErrors.push("City is required");
            if (!formData.state.trim()) newErrors.push("State is required");
            if (!formData.zipcode.trim()) newErrors.push("Zipcode is required");
        } else if (step === 2) {
            if (!formData.unitType) newErrors.push("Please select a unit type");
            if (!formData.rooms || formData.rooms < 1) newErrors.push("Number of rooms is required");
            if (!formData.bathrooms || formData.bathrooms < 1) newErrors.push("Number of bathrooms is required");
            if (!formData.pool) newErrors.push("Please specify if there's a pool");
        } else if (step === 3) {
            if (!formData.price.trim()) newErrors.push("Price per night is required");
            if (!formData.distanceFromBeach.trim()) newErrors.push("Distance from beach is required");
            if (!formData.rentalUnitDescription.trim()) newErrors.push("Property description is required");
        }
        
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        setErrors([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateStep(currentStep)) return;
        
        setIsLoading(true);
        
        const payload = {
            ...formData,
            ownerId,
            totalRentals: 0
        };

        try {
            const data = await dispatch(createRentalUnit(payload));

            if (data.errors) {
                setErrors(Array.isArray(data.errors) ? data.errors : [data.errors]);
            } else {
                submitModal(false);
            }
        } catch (error) {
            setErrors(["An error occurred while creating your listing. Please try again."]);
        } finally {
            setIsLoading(false);
        }
    };

    const stepTitles = [
        "Basic Information",
        "Property Details", 
        "Pricing & Description",
        "Location & Photos"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header with Logo */}
                <div className="text-center mb-8">
                    <img className="h-12 w-auto mx-auto mb-4" src="/logos/batteriesinc-logo.svg" alt="BeachItt" />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">List Your Beach Rental</h1>
                    <p className="text-lg text-gray-600">Share your space with travelers from around the world</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        {stepTitles.map((title, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    index + 1 <= currentStep 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-200 text-gray-500'
                                }`}>
                                    {index + 1}
                                </div>
                                {index < stepTitles.length - 1 && (
                                    <div className={`h-0.5 w-16 sm:w-24 mx-2 ${
                                        index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900">{stepTitles[currentStep - 1]}</h2>
                    </div>
                </div>

                {/* Main Form Container */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Error Display */}
                    {errors.length > 0 && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Please correct the following errors:
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
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Step 1: Basic Information */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Property Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => updateField('title', e.target.value)}
                                        placeholder="e.g., Stunning Ocean View Condo"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.city}
                                            onChange={(e) => updateField('city', e.target.value)}
                                            placeholder="Miami"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.state}
                                            onChange={(e) => updateField('state', e.target.value)}
                                            placeholder="FL"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Zipcode *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.zipcode}
                                            onChange={(e) => updateField('zipcode', e.target.value)}
                                            placeholder="33139"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Property Details */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        Property Type *
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { value: 'house', label: 'House', icon: '🏠' },
                                            { value: 'apartment', label: 'Apartment', icon: '🏢' },
                                            { value: 'single room', label: 'Single Room', icon: '🛏️' }
                                        ].map(({ value, label, icon }) => (
                                            <label key={value} className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                                                formData.unitType === value 
                                                    ? 'border-blue-500 bg-blue-50' 
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}>
                                                <input
                                                    type="radio"
                                                    name="unitType"
                                                    value={value}
                                                    checked={formData.unitType === value}
                                                    onChange={(e) => updateField('unitType', e.target.value)}
                                                    className="sr-only"
                                                />
                                                <span className="text-3xl mb-2">{icon}</span>
                                                <span className="text-sm font-medium text-gray-900">{label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Rooms *
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={formData.rooms}
                                            onChange={(e) => updateField('rooms', parseInt(e.target.value))}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Bathrooms *
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={formData.bathrooms}
                                            onChange={(e) => updateField('bathrooms', parseInt(e.target.value))}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-4">
                                        Does your property have a pool? *
                                    </label>
                                    <div className="flex space-x-4">
                                        {[
                                            { value: 'yes', label: 'Yes', icon: '🏊‍♂️' },
                                            { value: 'no', label: 'No', icon: '❌' }
                                        ].map(({ value, label, icon }) => (
                                            <label key={value} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                                                formData.pool === value 
                                                    ? 'border-blue-500 bg-blue-50' 
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}>
                                                <input
                                                    type="radio"
                                                    name="pool"
                                                    value={value}
                                                    checked={formData.pool === value}
                                                    onChange={(e) => updateField('pool', e.target.value)}
                                                    className="sr-only"
                                                />
                                                <span className="text-2xl mr-3">{icon}</span>
                                                <span className="text-sm font-medium text-gray-900">{label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Pricing & Description */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Price Per Night *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={(e) => updateField('price', e.target.value)}
                                                placeholder="150.00"
                                                className="w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Distance from Beach (miles) *
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            value={formData.distanceFromBeach}
                                            onChange={(e) => updateField('distanceFromBeach', e.target.value)}
                                            placeholder="0.5"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Property Description *
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={formData.rentalUnitDescription}
                                        onChange={(e) => updateField('rentalUnitDescription', e.target.value)}
                                        placeholder="Describe your property, its amenities, and what makes it special..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                                    />
                                    <p className="mt-2 text-sm text-gray-500">
                                        {formData.rentalUnitDescription.length}/500 characters
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Location & Photos */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Latitude
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lat}
                                            onChange={(e) => updateField('lat', e.target.value)}
                                            placeholder="25.7617"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Longitude
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lng}
                                            onChange={(e) => updateField('lng', e.target.value)}
                                            placeholder="-80.1918"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Property Photo
                                    </label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => updateField('url', e.target.files[0])}
                                            className="hidden"
                                            id="photo-upload"
                                        />
                                        <label htmlFor="photo-upload" className="cursor-pointer">
                                            <div className="space-y-2">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </label>
                                        {formData.url && (
                                            <p className="mt-2 text-sm text-green-600">✓ File selected: {formData.url.name}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                    currentStep === 1 
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Previous
                            </button>

                            {currentStep < 4 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                                        isLoading 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-green-600 hover:bg-green-700'
                                    } text-white`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating Listing...
                                        </div>
                                    ) : (
                                        'Create Listing'
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NewUnitForm;
