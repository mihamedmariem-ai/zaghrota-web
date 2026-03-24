import React from 'react';

import dress1 from '../assests/dresses/dress1.jpg.jpeg';
import dress2 from '../assests/dresses/dress2.jpg.jpeg';
import dress3 from '../assests/dresses/dress3.jpg.jpeg';
import dress4 from '../assests/dresses/dress4.jpg.jpeg';
import dress5 from '../assests/dresses/dress5.jpg.jpeg';
import dress6 from '../assests/dresses/dress6.jpg.jpeg';
import dress7 from '../assests/dresses/dress7.jpg.jpeg';
import dress8 from '../assests/dresses/dress8.jpg.jpeg';
import dress9 from '../assests/dresses/dress9.jpg.jpeg';

const dressesList = [
  { id: 1, image: dress1, name: "Wedding Dress 1" },
  { id: 2, image: dress2, name: "Wedding Dress 2" },
  { id: 3, image: dress3, name: "Wedding Dress 3" },
  { id: 4, image: dress4, name: "Wedding Dress 4" },
  { id: 5, image: dress5, name: "Wedding Dress 5" },
  { id: 6, image: dress6, name: "Wedding Dress 6" },
  { id: 7, image: dress7, name: "Wedding Dress 7" },
  { id: 8, image: dress8, name: "Wedding Dress 8" },
  { id: 9, image: dress9, name: "Wedding Dress 9" },
];

const Dresses = () => {
  return (
    <div className="dresses-container" style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Wedding Dresses</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {dressesList.map((dress) => (
          <div key={dress.id} className="dress-card" style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <img src={dress.image} alt={dress.name} style={{ width: '100%', height: '350px', objectFit: 'cover' }} />
            <div style={{ padding: '1rem', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{dress.name}</h3>
              <button style={{ backgroundColor: '#ff6b81', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dresses;
