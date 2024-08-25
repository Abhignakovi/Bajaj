import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://bfhl-backend.abhi1233.repl.co/bfhl', { data: JSON.parse(input) });
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSelect = (e) => {
    const { value, checked } = e.target;
    setSelected(prev =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  return (
    <main>
      <h1>BFHL Challenge</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON'
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <h2>Response:</h2>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleSelect}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleSelect}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_lowercase_alphabet"
              onChange={handleSelect}
            />
            Highest Lowercase Alphabet
          </label>

          <div>
            {selected.includes('numbers') && (
              <p>Numbers: {response.numbers.join(', ')}</p>
            )}
            {selected.includes('alphabets') && (
              <p>Alphabets: {response.alphabets.join(', ')}</p>
            )}
            {selected.includes('highest_lowercase_alphabet') && (
              <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
