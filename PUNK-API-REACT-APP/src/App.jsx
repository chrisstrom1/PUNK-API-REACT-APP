import { useState, useEffect } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Beer component
const Beer = ({ beer, onLike }) => {
  const { name, tagline, description, image_url, likes } = beer;

  return (
    <div className="beer-card">
      <img src={image_url} alt={name} className="beer-image" />
      <h3>{name}</h3>
      <p>{tagline}</p>
      <p>{description}</p>
      <p>Likes: {likes}</p>
      <button onClick={onLike}>Like</button>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');
        setBeers(response.data.map((beer) => ({ ...beer, likes: 0 }))); // Add 'likes' property to each beer
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLike = (beerId) => {
    // Update the likes count for the selected beer
    setBeers((prevBeers) =>
      prevBeers.map((beer) =>
        beer.id === beerId ? { ...beer, likes: beer.likes + 1 } : beer
      )
    );
  };

  return (
    <>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Display the beer data using the Beer component */}
      <div className="beer-list">
        <h2>Beer List:</h2>
        {beers.map((beer) => (
          <Beer key={beer.id} beer={beer} onLike={() => handleLike(beer.id)} />
        ))}
      </div>
    </>
  );
}

export default App;
