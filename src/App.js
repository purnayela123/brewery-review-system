import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';
import BreweryList from './components/BreweryList';
import BreweryDetail from './components/BreweryDetail';

const App = () => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [breweries, setBreweries] = useState([]);

    const handleLogout = () => {
        setAuthToken(null);
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">Home</Link>
                    {!authToken ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout}>Logout</button>
                    )}
                </nav>
                
                <Routes>
                    <Route path="/login" element={<Login setAuthToken={(token) => { setAuthToken(token); localStorage.setItem('token', token); }} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/brewery/:id" element={<BreweryDetail />} />
                    <Route path="/" element={
                        <>
                            <Search setBreweries={setBreweries} />
                            <BreweryList breweries={breweries} />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
