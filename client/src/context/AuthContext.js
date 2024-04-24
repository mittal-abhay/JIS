import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('isLoggedIn');
        if(user){
          const role = JSON.parse(user).role;
          if (role === 'registrar') navigate('/dashboard');
          else if (role === 'judge') navigate('/judges');
          else navigate('/lawyers');
        }
    },[])

  useEffect(() => {
    // Check local storage for login status when component mounts
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem('isLoggedIn', JSON.stringify(data.user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message); // Throw error message
      }
      const data = await response.json();
      console.log(data);
      localStorage.setItem('isLoggedIn', JSON.stringify(data.user));
    } catch (error) {
      throw new Error('An unexpected error occurred');
    }
  };


  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setIsLoggedIn(false); // Update local state to reflect logout
      localStorage.removeItem('isLoggedIn'); // Remove login status from local storage
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
