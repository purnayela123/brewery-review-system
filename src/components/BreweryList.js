import React from 'react';
import { Link } from 'react-router-dom';

const BreweryList = ({ breweries }) => {
    return (
        <ul>
            {breweries.map((brewery) => (
                <li key={brewery.id}>
                    <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
                    <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
                    <p>{brewery.phone}</p>
                    <p><a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
                    <p>Rating: {brewery.rating || 'N/A'}</p>
                </li>
            ))}
        </ul>
    );
};

export default BreweryList;
