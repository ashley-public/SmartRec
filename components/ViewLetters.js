import React, { useState, useEffect } from 'react';

function ViewLetters() {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/get-letters/');
        if (!response.ok) {
          throw new Error('Failed to fetch letters');
        }
        const data = await response.json();
        setLetters(data);
      } catch (error) {
        console.error('Error fetching letters:', error);
      }
    };

    fetchLetters();
  }, []);

  return (
    <div>
      <h2>Saved Recommendation Letters</h2>
      {letters.length === 0 ? (
        <p>No letters found.</p>
      ) : (
        letters.map((letter, index) => (
          <div key={index}>
            <h3>{letter.first_name} {letter.last_name}'s Letter</h3>
            <p>{letter.generated_letter}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ViewLetters;
