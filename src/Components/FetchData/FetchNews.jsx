import React, { useEffect, useState } from 'react';

function FetchNews({ Fetch,filter }) {
const apikey = '515fcfcc9aa3f9f731307ab1c15dbc33';

const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';
const  cat='https://www.themealdb.com/api/json/v1/1/categories.php'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const string='https://gnews.io/api/v4/search?q=example&apikey=515fcfcc9aa3f9f731307ab1c15dbc33'
  useEffect(() => {
    
const Fetch_data=async ()=>{
  try{
    const response= await fetch(cat)
    if(!response.ok){
      throw new  Error(`Error ${response.status}`)
    }
    const data= await response.json()
    Fetch(data)
  }
    catch (err) {
      setError(err.message);
    } finally {
      
    }
}
Fetch_data()

  }, [filter]);

  return null;  // No UI is rendered here, we just pass the data
}

export default FetchNews
