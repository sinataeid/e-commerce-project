import logo from './logo.svg';
import { getCountries } from './HRAPIService';
import './App.css';
import { useCallback, useEffect, useState } from 'react';



function App() {

  const [countries, setCountries] = useState([]);

  async function fetchCountries(){
    const result = await getCountries("US");
    setCountries(result.recordset);
  }

  useEffect(() => {
    fetchCountries();
  }, [])

  return (
    <div className="App">

      {countries.length > 0 && 
        countries.map((country) => {
          return(
            <h1>{country.country_name}</h1>
          )
        })
      }
        
      
       
    </div>
  );

  
}


export default App;