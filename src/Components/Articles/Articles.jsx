import React from 'react'
import styles from './Articles.module.css'

import { useState } from 'react';



export const Articles = ({ data }) => {
 return (
  
   <div className={styles.cardContainer}>
    
      {data.categories.map((article, index) => (
             
    <div  key={index} className={styles.card}>
      <img src={article.strCategoryThumb} alt={article.strCategory} style={{ width: "100%" }} />
      <h1>{article.strCategory}</h1>
      
      {/* <p>{article.strCategoryDescription}</p> */}
      
    </div>
    ))}

  </div>


      
    
  );
};
