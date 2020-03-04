import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const requestData = async (url) => {
  try {
    let httpClient = axios.create();
    httpClient.defaults.timeout = 500;
    return await httpClient.get(url);
  } catch(err) {
    console.error(err);
  }
};

export const updateData = async ({url, property, value}) => {
  let parsedSum = value
  try {
    parsedSum = JSON.parse(value);
  } catch (err) {
    console.error(error);
  }
  const httpClient = axios.create();
  httpClient.defaults.timeout = 500;
  return await httpClient.put(url, { [property]: parsedSum });
};

const getWindowDimensions = () => {
  const { innerWidth } = window;
  const isMobile = innerWidth > 576 && innerWidth < 768;
  const isTablet = innerWidth > 768 && innerWidth < 992;
  return {
    isMobile,
    isTablet,
  };
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
     const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
