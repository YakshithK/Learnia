import React, { useState } from 'react';
import { Button } from '../components/button';
import { Container } from '../components/container';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/title';
import axios from 'axios'
import OpenAI from 'openai'

export const Home = () => {
  const navigate = useNavigate();

  // State to store the input value
  const [inputValue, setInputValue] = useState('');

  // Function to handle changes in the input field
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleNavigate = (data) => {
    navigate('/learn', { state: data });
  };
  // Function to handle button click
  const handleButtonClick = async () => {
    const input = {'input': inputValue}

    try {
        const response = await axios.post('http://localhost:5000/api/paths/', input)
        const data = {message: response.data.content}

        handleNavigate(data)
    } catch (error) {
        console.log(error)
    }

    
  };

  const containerStyle = {
    justifyContent: 'center',
    height: '100vh',
  };

  const titleStyle = {
    fontSize: 150,
    marginBottom: 50,
  };

  const buttonStyle = {
    WebkitTextStrokeColor: '#312A21',
    fontFamily: 'Viga',
    marginBottom: 160,
    padding: '10px 35px',
    fontWeight: '10px',
    fontSize: 35,
    color: '#fff',
    backgroundColor: '#908A27',
    cursor: 'pointer',
    textDecoration: 'none',
  };
  return (
    <Container style={containerStyle}>
      <Title className="welcome" style={titleStyle}>Welcome to Learnia</Title>
      <div>
        {/* Input field with onChange to update state */}
        <input 
          style={{ fontSize: 35, border: '4px solid black' }}
          value={inputValue}
          onChange={handleInputChange} // Update the input state
        />
        
        {/* Button with onClick handler */}
        <Button onClick={handleButtonClick}>Get Path</Button>
      </div>
    </Container>
  );
};
