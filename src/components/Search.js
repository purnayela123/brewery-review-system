import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ setBreweries }) => {
    const [city, setCity] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.openbrewerydb.org/breweries?by_city=${city}`);
            setBreweries(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            <button type="submit">Search</button>
        </form>
    );
};

export default Search;
