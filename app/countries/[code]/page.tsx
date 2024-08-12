
'use client';
import { useEffect, useState } from 'react';
import { DayAheadPriceTabs } from '../../../components/DayAheadPriceTabs';

function CountryDetail() {
    const [countries, setCountries] = useState({});

    useEffect(() => {
      const fetchCountries = async () => {
        const response = await fetch('/api/store-data');
        if (response.ok) {
          const result = await response.json();
          setCountries(result?.data[0]?.data);
        } else {
          console.error('Failed to fetch data');
        }
      };
  
      fetchCountries();
    }, []); 

  return <DayAheadPriceTabs prices={countries?.price} />;
}

export default CountryDetail;
