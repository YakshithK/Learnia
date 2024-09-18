import React, { useState } from 'react';
import { Button } from '../components/button';
import { Container } from '../components/container';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/title';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import OpenAI from 'openai'


export const Learn = () => {
  const location = useLocation();
  const receivedData = location.state; // this is the data passed from HomePage

  return (
    <div>
      <h1>New Page</h1>
      <p>Data received: {receivedData?.message}</p>
    </div>
  );
}
