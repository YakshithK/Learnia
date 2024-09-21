import React, { useState, useEffect } from 'react';
import { Button } from '../components/button.js';
import { Container } from '../components/container.js';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/title.js';
import axios from 'axios';

export const Home = () => {
  const [inputValue, setInputValue] = useState(''); // State to store input value
  const [loading, setLoading] = useState(false); // State to track loading status for button click
  const [componentLoading, setComponentLoading] = useState(true); // State for component loading
  const navigate = useNavigate();

  // Function to capitalize the first letter of each word in the input string
  function capitalizeFirstLetter(strings) {
    const capitalizedStrings = [];
    for (let i of strings) {
      capitalizedStrings.push(i.charAt(0).toUpperCase() + i.slice(1));
    }
    return capitalizedStrings.join('');
  }

  // Simulate component loading (e.g., fetching data before the component is fully ready)
  useEffect(() => {
    // Simulate a delay before the component is ready
    setTimeout(() => {
      setComponentLoading(false); // After delay, set component loading to false
    }, 5000); // Set this to your desired delay or use real data fetching
  }, []);

  // Function to handle changes in the input field
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to navigate to the new page with the received data
  const handleNavigate = (data) => {
    navigate('/learn', { state: data });
  };

  // Function to handle button click and call the backend
  const handleButtonClick = async () => {
    const input = { input: inputValue };

    // Set loading to true when request starts
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/paths/', input);

      const title = 'Roadmap to Learn ' + capitalizeFirstLetter(input.input.split(' '));
      const data = { message: response.data.content, title: title };

      // Handle navigation with the received data
      handleNavigate(data);
    } catch (error) {
      console.log(error);
    } finally {
      // Set loading to false once request finishes (success or failure)
      setLoading(false);
    }
  };

  const containerStyle = {
    justifyContent: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const titleStyle = {
    fontSize: 100,
    marginBottom: 50,
  };

  const inputStyle = {
    fontSize: 35,
    border: '4px solid black',
    padding: '10px',
    marginBottom: '20px',
  };

  const buttonStyle = {
    WebkitTextStrokeColor: '#312A21',
    fontFamily: 'Viga',
    padding: '10px 35px',
    fontWeight: 'bold',
    fontSize: 35,
    color: '#fff',
    backgroundColor: '#908A27',
    cursor: 'pointer',
    textDecoration: 'none',
    border: 'none',
  };

  // If the component is still loading, show a spinner or loading message
  if (componentLoading) {
    return (
      <div style={{ ...containerStyle, fontSize: '30px' }}>
        <div>Loading the Home Page...</div>
      </div>
    );
  }

  return (
    <Container style={containerStyle}>
      <Title className="welcome" style={titleStyle}>
        Welcome to Learnia
      </Title>
      <div>
        {/* Input field with onChange to update state */}
        <input 
          style={inputStyle}
          value={inputValue}
          onChange={handleInputChange} // Update the input state
        />
        
        {/* Button with onClick handler */}
        <Button onClick={handleButtonClick}>
          {loading ? 'Loading...' : 'Get Path'} {/* Show 'Loading...' while waiting */}
        </Button>
      </div>
      
      {/* Show loading spinner or message when button action is in progress */}
      {loading && <div className="loading-spinner" style={{ fontSize: 20 }}>Fetching data...</div>}
    </Container>
  );
};
