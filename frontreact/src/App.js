import React, { useState } from 'react';
import axios from 'axios';
import { Puff } from 'react-loader-spinner';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await axios.post('http://localhost:3000/predict', { question: question });
      setResponse(result.data.predictions[0].content);
    } catch (error) {
      console.error(error);
      setResponse('An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: 'Helvetica Neue, Arial, sans-serif',
      backgroundColor: '#282828', // Dark purple background
      color: '#FFFFFF', // White text color for contrast
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '80%',
        maxWidth: '600px',
        maxHeight: '90%',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#353535', // Slightly lighter dark purple for contrast
        textAlign: 'center',
        overflowY: 'auto'
      }}>
        <h1 style={{ marginBottom: '20px', color: '#007BFF', fontSize: '24px' }}>Avinash's Personal ChatBot</h1>
        <form onSubmit={handleSubmit}>
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} style={{
            marginBottom: '20px',
            padding: '15px',
            fontSize: '16px',
            border: '1px solid #666', // Darker border for contrast
            borderRadius: '5px',
            resize: 'vertical',
            transition: 'all 0.3s ease',
            flexGrow: 1
          }} placeholder="Ask your electronics engineering question here..." required />
          <button type="submit" disabled={isLoading} style={{
            padding: '12px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: isLoading? '#777' : '#007BFF', // Adjusted for dark purple theme
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}>Submit</button>
        </form>
        {isLoading && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <Puff color="#00C49F" height={100} width={100} timeout={3000} />
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Wait till your question is being answered!</span>
          </div>
        )}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          borderRadius: '5px',
          backgroundColor: '#333', // Darker background for contrast
          textAlign: 'left',
          whiteSpace: 'pre-wrap',
          overflowY: 'auto'
        }}>{response}</div>
      </div>
    </div>
  );
}

export default App;
