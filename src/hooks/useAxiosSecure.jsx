


import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'https://study-grantly-server.vercel.app/',
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Add the interceptor only once when user is available
    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Optional: clean up interceptor when component unmounts or user changes
    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, [user?.accessToken]);

  return axiosSecure;
};

export default useAxiosSecure;

