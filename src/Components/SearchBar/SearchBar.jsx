import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.css'
import { useNavigate } from 'react-router-dom';

export const SearchBar = ({ SetQuery,reset}) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [query, setQuery1] = useState(""); // Initial query
 const navigate=useNavigate();

 const handleSubmit = (e) => {
  e.preventDefault()
  navigate(`/Meals?search=${query}`);  
 }
const HandleHome=(e)=>{
  e.preventDefault()
  navigate('/');
}

  useEffect(() => {
    fetch(url + query) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        SetQuery(data,query);
        
        
        
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [query]); // Add query to dependencies

 
  return (
    <div >
    <form  className={styles.Search} onSubmit={(e)=>handleSubmit(e)}>
      <input className={styles.SearchField}
        type="text"
        value={query}
        onChange={(e) => setQuery1(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Find My Recipe</button> {/* Optional search icon */}
    </form>
    <button className={styles.Home}  onClick={(e)=>HandleHome(e)}>HOME🏡</button>
    </div>
  );
};



export const Meals = ({HandleIndex,data}) => {
  const navigate=useNavigate();

  console.log("here is data"+data);

  
const HandleRecepie=(e)=>{
    
console.log("consloing "+e);

HandleIndex(e)
navigate(`/recipie?index=${e}`);
e.preventDefault()

  }
 
  
  return (
    <div className={styles.cardContainer}>
    
      {data.meals && data.meals.map((meal, index) => (
             
    <div  key={index} className={styles.card}>
      <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: "100%" }} />
      <h1>{meal.strMeal}</h1>
      <p className="Category">{meal.strCategory}</p>
      {/* <p>{meal.strCategoryDescription}</p> */}
      <button onClick={(e)=>HandleRecepie(index+1)}>I wanna Try It!</button>
      
    </div>
    ))}

  </div>
  )
}

