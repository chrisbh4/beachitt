import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { createRentalUnit} from "../../../store/rentalUnits"

function NewUnitForm({submitModal}) {
    const dispatch = useDispatch();
    const history = useHistory();
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
    const [fieldErrors, setFieldErrors] = useState({});
    const [validationAttempted, setValidationAttempted] = useState(false);
    const [explicitSubmit, setExplicitSubmit] = useState(false);

    const updateField = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
        
        // Clear step errors when user starts typing
        if (errors.length > 0) {
            setErrors([]);
        }
        
        // Clear field errors when user starts typing (don't show real-time validation)
        if (fieldErrors[field]) {
            setFieldErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    const validateStep = (step) => {
        const newErrors = [];
        const newFieldErrors = {};
        
        if (step === 1) {
            // Title validation
            if (!formData.title.trim()) {
                newErrors.push("Property title is required");
                newFieldErrors.title = "Property title is required";
            } else if (formData.title.trim().length < 10) {
                newErrors.push("Property title must be at least 10 characters long");
                newFieldErrors.title = "Property title must be at least 10 characters long";
            } else if (formData.title.trim().length > 100) {
                newErrors.push("Property title must be less than 100 characters");
                newFieldErrors.title = "Property title must be less than 100 characters";
            }
            
            // City validation
            if (!formData.city.trim()) {
                newErrors.push("City is required");
                newFieldErrors.city = "City is required";
            } else if (formData.city.trim().length < 2) {
                newErrors.push("City name must be at least 2 characters long");
                newFieldErrors.city = "City name must be at least 2 characters long";
            } else if (formData.city.trim().length > 50) {
                newErrors.push("City name must be less than 50 characters");
                newFieldErrors.city = "City name must be less than 50 characters";
            }
            
            // State validation
            if (!formData.state.trim()) {
                newErrors.push("State is required");
                newFieldErrors.state = "State is required";
            } else if (formData.state.trim().length !== 2) {
                newErrors.push("State must be a 2-letter abbreviation (e.g., CA, FL, NY)");
                newFieldErrors.state = "State must be a 2-letter abbreviation";
            }
            
            // Zipcode validation
            if (!formData.zipcode.trim()) {
                newErrors.push("Zipcode is required");
                newFieldErrors.zipcode = "Zipcode is required";
            } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipcode.trim())) {
                newErrors.push("Please enter a valid 5-digit zipcode (e.g., 12345 or 12345-6789)");
                newFieldErrors.zipcode = "Please enter a valid 5-digit zipcode";
            }
            
        } else if (step === 2) {
            // Unit type validation
            if (!formData.unitType) {
                newErrors.push("Please select a unit type");
                newFieldErrors.unitType = "Please select a unit type";
            }
            
            // Rooms validation
            if (!formData.rooms || formData.rooms < 1) {
                newErrors.push("Number of rooms is required");
                newFieldErrors.rooms = "Number of rooms is required";
            } else if (formData.rooms > 20) {
                newErrors.push("Number of rooms cannot exceed 20");
                newFieldErrors.rooms = "Number of rooms cannot exceed 20";
            }
            
            // Bathrooms validation
            if (!formData.bathrooms || formData.bathrooms < 1) {
                newErrors.push("Number of bathrooms is required");
                newFieldErrors.bathrooms = "Number of bathrooms is required";
            } else if (formData.bathrooms > 10) {
                newErrors.push("Number of bathrooms cannot exceed 10");
                newFieldErrors.bathrooms = "Number of bathrooms cannot exceed 10";
            }
            
            // Pool validation
            if (!formData.pool) {
                newErrors.push("Please specify if there's a pool");
                newFieldErrors.pool = "Please specify if there's a pool";
            }
            
        } else if (step === 3) {
            // Price validation
            if (!formData.price.trim()) {
                newErrors.push("Price per night is required");
                newFieldErrors.price = "Price per night is required";
            } else {
                const priceNum = parseFloat(formData.price.replace(/[$,]/g, ''));
                if (isNaN(priceNum) || priceNum <= 0) {
                    newErrors.push("Please enter a valid price greater than $0");
                    newFieldErrors.price = "Please enter a valid price greater than $0";
                } else if (priceNum > 10000) {
                    newErrors.push("Price cannot exceed $10,000 per night");
                    newFieldErrors.price = "Price cannot exceed $10,000 per night";
                }
            }
            
            // Distance from beach validation - updated to ≤5 miles with 2 decimal places
            if (!formData.distanceFromBeach.trim()) {
                newErrors.push("Distance from beach is required");
                newFieldErrors.distanceFromBeach = "Distance from beach is required";
            } else {
                // Check for valid decimal format (max 2 decimal places)
                if (!/^\d+(\.\d{1,2})?$/.test(formData.distanceFromBeach.trim())) {
                    newErrors.push("Distance must be a number with up to 2 decimal places (e.g., 4.99)");
                    newFieldErrors.distanceFromBeach = "Distance must be a number with up to 2 decimal places";
                } else {
                    const distanceNum = parseFloat(formData.distanceFromBeach);
                    if (isNaN(distanceNum) || distanceNum < 0) {
                        newErrors.push("Distance from beach must be a positive number");
                        newFieldErrors.distanceFromBeach = "Distance from beach must be a positive number";
                    } else if (distanceNum > 5) {
                        newErrors.push("Distance from beach cannot exceed 5 miles");
                        newFieldErrors.distanceFromBeach = "Distance from beach cannot exceed 5 miles";
                    }
                }
            }
            
            // Description validation - updated to 10 chars min
            if (!formData.rentalUnitDescription.trim()) {
                newErrors.push("Property description is required");
                newFieldErrors.rentalUnitDescription = "Property description is required";
            } else if (formData.rentalUnitDescription.trim().length < 10) {
                newErrors.push("Property description must be at least 10 characters long");
                newFieldErrors.rentalUnitDescription = "Property description must be at least 10 characters long";
            } else if (formData.rentalUnitDescription.trim().length > 2000) {
                newErrors.push("Property description must be less than 2000 characters");
                newFieldErrors.rentalUnitDescription = "Property description must be less than 2000 characters";
            }
            
        } else if (step === 4) {
            // Latitude validation
            if (!formData.lat.toString().trim()) {
                newErrors.push("Latitude is required");
                newFieldErrors.lat = "Latitude is required";
            } else if (formData.lat.toString().trim().length <= 4) {
                newErrors.push("Latitude must be longer than 4 digits");
                newFieldErrors.lat = "Latitude must be longer than 4 digits";
            } 
            else {
                const latNum = parseFloat(formData.lat.toString());
                if (isNaN(latNum) || latNum < -90 || latNum > 90) {
                    newErrors.push("Latitude must be between -90 and 90 degrees");
                    newFieldErrors.lat = "Latitude must be between -90 and 90 degrees";
                }
            }
            
            // Longitude validation
            if (!formData.lng.toString().trim()) {
                newErrors.push("Longitude is required");
                newFieldErrors.lng = "Longitude is required";
            }
            else if (formData.lng.toString().trim().length <= 5) {
                newErrors.push("Longitude must be longer than 4 digits");
                newFieldErrors.lng = "Longitude must be longer than 4 digits";
            }    
            else {
                const lngNum = parseFloat(formData.lng.toString());
                if (isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
                    newErrors.push("Longitude must be between -180 and 180 degrees");
                    newFieldErrors.lng = "Longitude must be between -180 and 180 degrees";
                }
            }
            
            // Image validation (optional but recommended)
            if (!formData.url) {
                newErrors.push("Please upload at least one image of your property");
                newFieldErrors.url = "Please upload at least one image of your property";
            }
        }
        
        setErrors(newErrors);
        setFieldErrors(prev => ({...prev, ...newFieldErrors}));
        return newErrors.length === 0;
    };

    const nextStep = () => {
        // Don't validate Step 4 when clicking Next - only validate on submit
        if (currentStep === 4) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
            return;
        }
        
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
            setExplicitSubmit(false); // Reset explicit submit when moving to next step
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        setErrors([]);
        setExplicitSubmit(false); // Reset explicit submit when moving to previous step
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prevent submission if we're not on the final step
        if (currentStep !== 4) {
            return;
        }
        
        // Set validationAttempted to true for all steps when submitting
        setValidationAttempted(true);
        
        // Validate all steps including Step 4 when submitting
        let allValid = true;
        for (let step = 1; step <= 4; step++) {
            if (!validateStep(step)) {
                allValid = false;
                setCurrentStep(step); // Set to the first step that fails
                break;
            }
        }
        
        if (!allValid) {
            return;
        }
        
        setIsLoading(true);
        setErrors([]); // Clear any previous errors
        
        const payload = {
            ...formData,
            ownerId,
            totalRentals: 0
        };

        try {
            const data = await dispatch(createRentalUnit(payload));

            // Check if the response has errors (backend validation errors)
            if (data && data.errors) {
                setErrors(Array.isArray(data.errors) ? data.errors : [data.errors]);
            } else if (data) {
                // Success - rental unit was created
                console.log('Success! Rental unit created:', data);
                setExplicitSubmit(false); // Reset explicit submit after successful submission
                setValidationAttempted(false); // Reset validation attempted
                setErrors([]); // Clear any errors
                setFieldErrors({}); // Clear field errors
                if (typeof submitModal === 'function') {
                    submitModal(false);
                }
                history.push('/units');

            } else {
                // Unexpected response format
                console.log('Unexpected response format:', data);
                setErrors(["An unexpected response was received. Please try again."]);
            }
        } catch (error) {
            console.error('Error creating rental unit:', error);
            // setErrors(["An error occurred while creating your listing. Please try again."]);
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

                    <form 
                        onSubmit={(e) => {
                            // Only allow submission if we're on Step 4 and user explicitly clicked submit
                            if (currentStep !== 4 || !explicitSubmit) {
                                e.preventDefault();
                                console.log('Form submission blocked - not on Step 4 or not explicit submit');
                                return;
                            }
                            handleSubmit(e);
                        }}
                        onKeyDown={(e) => {
                            // Prevent form submission on Enter key unless it's the submit button
                            if (e.key === 'Enter' && e.target.type !== 'submit') {
                                e.preventDefault();
                            }
                        }}
                        autoComplete="off"
                        noValidate
                        className="space-y-6"
                    >
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                            validationAttempted && fieldErrors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                    />
                                    {validationAttempted && fieldErrors.title && (
                                        <p className="mt-1 text-sm text-red-600 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {fieldErrors.title}
                                        </p>
                                    )}
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
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                validationAttempted && fieldErrors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        />
                                        {validationAttempted && fieldErrors.city && (
                                            <p className="mt-1 text-sm text-red-600">{fieldErrors.city}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.state}
                                            onChange={(e) => updateField('state', e.target.value.toUpperCase())}
                                            placeholder="FL"
                                            maxLength="2"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                validationAttempted && fieldErrors.state ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        />
                                        {validationAttempted && fieldErrors.state && (
                                            <p className="mt-1 text-sm text-red-600">{fieldErrors.state}</p>
                                        )}
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
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                validationAttempted && fieldErrors.zipcode ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        />
                                        {validationAttempted && fieldErrors.zipcode && (
                                            <p className="mt-1 text-sm text-red-600">{fieldErrors.zipcode}</p>
                                        )}
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
                                    {validationAttempted && fieldErrors.unitType && (
                                        <p className="mt-2 text-sm text-red-600">{fieldErrors.unitType}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Rooms *
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="20"
                                            value={formData.rooms}
                                            onChange={(e) => updateField('rooms', parseInt(e.target.value) || 0)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                validationAttempted && fieldErrors.rooms ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        />
                                        {validationAttempted && fieldErrors.rooms && (
                                            <p className="mt-1 text-sm text-red-600">{fieldErrors.rooms}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Bathrooms *
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={formData.bathrooms}
                                            onChange={(e) => updateField('bathrooms', parseInt(e.target.value) || 0)}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                validationAttempted && fieldErrors.bathrooms ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        />
                                        {validationAttempted && fieldErrors.bathrooms && (
                                            <p className="mt-1 text-sm text-red-600">{fieldErrors.bathrooms}</p>
                                        )}
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
                                                className={`w-full pl-7 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                    validationAttempted && fieldErrors.price ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                                }`}
                                            />
                                        </div>
                                        {validationAttempted && fieldErrors.price && (
                                            <p className="mt-1 text-sm text-red-600">{fieldErrors.price}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Distance from Beach (miles) *
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="5"
                                            step="0.01"
                                            value={formData.distanceFromBeach}
                                            onChange={(e) => updateField('distanceFromBeach', e.target.value)}
                                            placeholder="0.5"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                validationAttempted && fieldErrors.distanceFromBeach ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        />
                                        {validationAttempted && fieldErrors.distanceFromBeach && (
                                            <p className="mt-1 text-sm text-red-600">{fieldErrors.distanceFromBeach}</p>
                                        )}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                                            validationAttempted && fieldErrors.rentalUnitDescription ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        }`}
                                    />
                                    <p className="mt-2 text-sm text-gray-500">
                                        {formData.rentalUnitDescription.length}/500 characters
                                    </p>
                                    {validationAttempted && fieldErrors.rentalUnitDescription && (
                                        <p className="mt-1 text-sm text-red-600">{fieldErrors.rentalUnitDescription}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Location & Photos */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Latitude *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lat}
                                            onChange={(e) => updateField('lat', e.target.value)}
                                            placeholder="25.7617"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                validationAttempted && fieldErrors.lat ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        />
                                        {validationAttempted && fieldErrors.lat && (
                                            <p className="mt-1 text-sm text-red-600">{fieldErrors.lat}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Longitude *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.lng}
                                            onChange={(e) => updateField('lng', e.target.value)}
                                            placeholder="-80.1918"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                                validationAttempted && fieldErrors.lng ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                            }`}
                                        />
                                        {validationAttempted && fieldErrors.lng && (
                                            <p className="mt-1 text-sm text-red-600">{fieldErrors.lng}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Property Photo *
                                    </label>
                                    <div className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-gray-400 transition-colors ${
                                        validationAttempted && fieldErrors.url ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    }`}>
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
                                    {validationAttempted && fieldErrors.url && (
                                        <p className="mt-1 text-sm text-red-600">{fieldErrors.url}</p>
                                    )}
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
                                    onClick={() => setExplicitSubmit(true)}
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
