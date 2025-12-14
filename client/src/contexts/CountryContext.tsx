import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';

interface CountryContextType {
  country: 'IN' | 'SG';
  countryName: string;
  currency: string;
  currencySymbol: string;
  domain: string;
  basePath: string;
  setCountry: (country: 'IN' | 'SG') => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

const countryConfig = {
  IN: {
    countryName: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    domain: 'simplysetup.com',
    basePath: ''
  },
  SG: {
    countryName: 'Singapore', 
    currency: 'SGD',
    currencySymbol: 'S$',
    domain: 'simplysetup.com/sg',
    basePath: '/sg'
  }
};

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [country, setCountryState] = useState<'IN' | 'SG'>('IN');

  useEffect(() => {
    // Detect country from URL path
    if (location.startsWith('/sg')) {
      setCountryState('SG');
    } else {
      setCountryState('IN');
    }
  }, [location]);

  const setCountry = (newCountry: 'IN' | 'SG') => {
    setCountryState(newCountry);
    // Redirect to appropriate country site
    if (newCountry === 'SG' && !location.startsWith('/sg')) {
      window.location.href = '/sg';
    } else if (newCountry === 'IN' && location.startsWith('/sg')) {
      window.location.href = '/';
    }
  };

  const config = countryConfig[country];

  const value: CountryContextType = {
    country,
    countryName: config.countryName,
    currency: config.currency,
    currencySymbol: config.currencySymbol,
    domain: config.domain,
    basePath: config.basePath,
    setCountry
  };

  return (
    <CountryContext.Provider value={value}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}