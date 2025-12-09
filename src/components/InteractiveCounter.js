import React, { useState } from 'react';

const InteractiveCounter = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  return (
    <div style={{
      border: '2px solid #007acc',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <h3>Interactive Counter</h3>
      <p>Current count: <strong>{count}</strong></p>
      <div>
        <button 
          onClick={() => setCount(count - 1)}
          style={{
            margin: '5px',
            padding: '10px 15px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          -1
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{
            margin: '5px',
            padding: '10px 15px',
            backgroundColor: '#74c0fc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            margin: '5px',
            padding: '10px 15px',
            backgroundColor: '#51cf66',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          +1
        </button>
      </div>
    </div>
  );
};

export default InteractiveCounter;