import { useEffect, useState } from 'react'
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css'
import FetchNews from './Components/FetchData/FetchNews'
import { Articles } from './Components/Articles/Articles'

import { Meals, SearchBar } from './Components/SearchBar/SearchBar'
import { Recipie } from './Components/Recipie/Recipie'

function App() {
  
  const [data, setData] = useState({ categories: [] })

  const [search, setSearch] = useState('');

  const [query,setQuery]=useState({meals: [] })
  const [index,setIndex]=useState()

  const Handle_data=(data)=>{
    setData(data)
   
            }    
 const SetQuery=(data,ser)=>{
   setQuery(data)
   setSearch(ser)
   }    
   const HandleIndex=(idx)=>{
    setIndex(idx)
    
    
    }    
          
      
      
      
             
                      const hasValue=search.length>0
                      console.log("from query"+hasValue);

const hasIndex=index>=0
   
console.log("from index"+hasValue);


  return (
    <>
    <Router>
      <div className={styles.wrapper}>
  <div className={styles.grid}>
  <FetchNews Fetch={Handle_data} />
    <div className={`${styles['grid-item']} ${styles['grid-item-1']}`}></div>
    <div className={`${styles['grid-item']} ${styles['grid-item-2']}`}>
   
   
    <SearchBar SetQuery={SetQuery} />
      </div>
    {/* {hasIndex ?<Recipie   data={query} idx={index}/>:hasValue? <Meals HandleIndex={HandleIndex} data={query} />: 
       <Articles data={data} /> }     */}
    <div className={`${styles['grid-item']} ${styles['grid-item-3']}`}>
    
    <Routes>
  <Route path="/" element={<Articles data={data} />} />
  <Route path="/Meals" element={<Meals HandleIndex={HandleIndex} data={query} />} />
  <Route path="/Recipie" element={<Recipie data={query} idx={index} />} />
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
