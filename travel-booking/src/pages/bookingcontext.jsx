import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [trip, setTrip] = useState({
    flight: null,
    hotel: null,
    activities: [],
    total: 0,
    travelers: 1,
  });

  // Listen for flight selection
  useEffect(() => {
    const handleFlightSelected = (event) => {
      setTrip(prev => ({ ...prev, flight: event.detail }));
    };
    window.addEventListener('flightSelected', handleFlightSelected);
    return () => window.removeEventListener('flightSelected', handleFlightSelected);
  }, []);

  // Listen for hotel selection
  useEffect(() => {
    const handleHotelSelected = (event) => {
      setTrip(prev => ({ ...prev, hotel: event.detail }));
    };
    window.addEventListener('hotelSelected', handleHotelSelected);
    return () => window.removeEventListener('hotelSelected', handleHotelSelected);
  }, []);

  const updateTravelers = (count) => {
    setTrip(prev => ({ ...prev, travelers: Math.max(1, Math.min(9, count)) }));
  };

  const toggleActivity = (activity) => {
    setTrip(prev => {
      const exists = prev.activities.find(a => a.id === activity.id);
      if (exists) {
        return {
          ...prev,
          activities: prev.activities.filter(a => a.id !== activity.id)
        };
      } else {
        return {
          ...prev,
          activities: [...prev.activities, activity]
        };
      }
    });
  };

  const clearSelection = (type) => {
    setTrip(prev => ({ ...prev, [type]: null }));
  };

  const value = {
    trip,
    updateTravelers,
    toggleActivity,
    clearSelection
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;