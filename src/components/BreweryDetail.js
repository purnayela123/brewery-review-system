import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddReview from './AddReview';

const BreweryDetail = ({ match }) => {
    const [brewery, setBrewery] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchBrewery = async () => {
            const response = await axios.get(`https://api.openbrewerydb.org/breweries/${match.params.id}`);
            setBrewery(response.data);
        };

        const fetchReviews = async () => {
            const response = await axios.get(`http://localhost:3000/api/reviews/${match.params.id}`);
            setReviews(response.data);
        };

        fetchBrewery();
        fetchReviews();
    }, [match.params.id]);

    return (
        <div>
            <h1>{brewery.name}</h1>
            <p>{brewery.street}, {brewery.city}, {brewery.state}</p>
            <p>{brewery.phone}</p>
            <p><a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>
            <h2>Reviews</h2>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <p>Rating: {review.rating}</p>
                        <p>{review.description}</p>
                    </li>
                ))}
            </ul>
            <AddReview breweryId={brewery.id} />
        </div>
    );
};

export default BreweryDetail;
