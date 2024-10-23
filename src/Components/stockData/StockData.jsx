import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export const StockData = () => {
  const  apiKey='0ab259f558574475964808c3d0404146';
  const indices = ['NIFTY50EQUALWEIGHT','NIFTY200QUALTY30','IGSPX'];
   const api= 'https://api.marketdata.app/v1/stocks/quotes/SPY';
   const ind='https://api.marketdata.app/v1/indices/quotes/AS51/'
   const timeseries='https://api.twelvedata.com/time_series?symbol='
  const token ='VC1RT3c5YkdiTFZwN1Q5YWJtM3AxRDZKUkRKN2VyQzduNzQ2NXRmbDJmND0'
   const [index,setindcies]=useState({data:[]})

   useEffect( ()=>{
const response=  fetch(ind,
    {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
)
.then(response=>response.json())
    .then(data=>setindcies(data))

.catch(error=>{
    console.error(error);
    
})

   },[])
   
// const data2=index.data.filter((val)=>indices.includes(val.symbol))
  return (
    <div>StockData
        <ul><li>
        {index.symbol}
            <li>
            {index.last} </li></li>
            
            </ul>
   {console.log(index)}
   
   )
    </div> 
  )
}
