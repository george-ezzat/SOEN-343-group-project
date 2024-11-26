import React, { useState, useRef, useEffect }from 'react';
import { Autocomplete } from '@react-google-maps/api';

export default function AutocompleteInput({ placeholder, onPlaceSelected, locationType, initialValue }) {
    const locationRef = useRef(null);
    const [inputValue, setInputValue] = useState(initialValue || '');

    useEffect(() => {
        setInputValue(initialValue || '');
    }, [initialValue]);

    const handlePlaceChanged = () => {
        const place = locationRef.current.getPlace();
        const address = place.formatted_address;
        setInputValue(address);
        onPlaceSelected(locationType, address);
    };

    return (
        <div>
            <label>{placeholder}</label>
            <Autocomplete
                onLoad={(autocomplete) => { 
                locationRef.current = autocomplete;
                locationRef.current.setComponentRestrictions({ country: 'ca' });
                }}
                onPlaceChanged={handlePlaceChanged}
            >
                <input
                type="text"
                placeholder={placeholder}
                className="input-box"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                />
            </Autocomplete>
        </div>
    );
};