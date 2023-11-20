// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import './Header.css';

const Header = () => {
  const [greeting, setGreeting] = useState('');
  const [time, setTime] = useState(new Date());

  const calculateGreeting = () => {
    const currentHour = time.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(calculateGreeting());
    };


    setGreeting(calculateGreeting());

    const interval = setInterval(() => {
      setTime(new Date());
      updateGreeting();
    }, 60000); 

  
    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="header">
      <div className="left-side">
        <img src="	https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f44b.png"></img>
        <p>{greeting}</p>
      </div>
      <div className="right-side">
        <Avatar className="avatar"></Avatar>
      </div>
    </div>
  );
};

export default Header;






