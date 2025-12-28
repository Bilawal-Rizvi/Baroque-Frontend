import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL)


  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true); // Loading start
        const response = await axios.get(`${BASE_URL}/api/images`);
        // console.log('Fetched images:', response.data);
        setImages(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError(err.message);
        // Agar backend nahi chal raha to empty array set karo
        setImages([]);
      } finally {
        setLoading(false); // Loading end (chahe success ho ya error)
      }
    };

    fetchImages();
  }, []); // Empty dependency array - sirf ek baar run hoga

  return (
    <ImageContext.Provider 
      value={{ 
        images, 
        setImages, 
        loading,   // ✅ Add kiya
        error,     // ✅ Add kiya
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook to use the context
export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within ImageProvider');
  }
  return context;
};