import { useEffect, useState } from 'react'
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css'
import FetchNews from './Components/FetchData/FetchNews'
import { Articles } from './Components/Articles/Articles'

import { Meals, SearchBar } from './Components/SearchBar/SearchBar'
import { Recipie } from './Components/Recipie/Recipie'
import { useLocation } from 'react-router-dom';
function App() {
  
  
  const [data, setData] = useState({ categories: [] })

  const [search, setSearch] = useState('');

  const [query,setQuery]=useState({meals: [] })
  const [index,setIndex]=useState()

  const Handle_data=(data)=>{
    setData(data)
   
            }    
 const SetQuery=(ser)=>{
   
   setSearch(ser)
   }    
   const HandleIndex=(idx)=>{
    setIndex(idx)
     }    
     console.log(query);
     
     
     
     const TriggerFetch = () => {
      console.log("search value at main"+search);
      console.log("Fetch Triggered from App");
      if (search.length>0) {
        console.log("Fetch Triggered from App");
        // Trigger the fetch in the SearchBar
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            localStorage.setItem('Meals', JSON.stringify(data));
            setQuery(data);
            
    // Update the state with the fetched data
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    };
           
    useEffect(()=>{
      TriggerFetch()
    
     },[search])
                      




  return (
    <>
    <Router>
      <div className={styles.wrapper}>
  <div className={styles.grid}>
  <FetchNews Fetch={Handle_data} />
    <div className={`${styles['grid-item']} ${styles['grid-item-1']}`}></div>
    <div className={`${styles['grid-item']} ${styles['grid-item-2']}`}>
   
   
    <SearchBar SetQuery={SetQuery} TriggerFetch={TriggerFetch}  />
      </div>
    {/* {hasIndex ?<Recipie   data={query} idx={index}/>:hasValue? <Meals HandleIndex={HandleIndex} data={query} />: 
       <Articles data={data} /> }     */}
    <div className={`${styles['grid-item']} ${styles['grid-item-3']}`}>
    
    <Routes>
  <Route path="/" element={<Articles data={data} />} />
  <Route path="/Meals" element={<Meals HandleIndex={HandleIndex} data={query} search={search} />} />
  <Route path="/Recipie" element={<Recipie data={query} idx={index}  />} />
</Routes>

     
         </div>
{   console.log("serch value"+query)}

     
    <div className={`${styles['grid-item']} ${styles['grid-item-5']}`}>
      Made By Parampreet with 💘 And ☕. 
      
    </div>
     
     
     
    
    </div>
      </div>
      </Router>
      
    </>
  )
}
const NavigateButton = () => {
  const navigate = useNavigate(); // Use useNavigate to handle navigation

  const handleClick = () => {
    navigate('/Meals'); // Navigate to the Meals component
  };

  return (
    <button onClick={handleClick}>Show Meals</button> // Button that triggers navigation
  );
};

export default App
