import React, { useEffect, useState } from 'react'
import styles  from './Recipie.module.css'
import { useLocation } from 'react-router-dom';

export const Recipie = ({data}) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = new URLSearchParams(location.search);
  const ser = params.get('search');
  const idex = params.get('index');
  const idx = idex ? parseInt(idex, 10) : null; 
  const [parsed,setdata]=useState({meals:[]})
  console.log("search value at rec"+ser);
    console.log("index value at rec"+idx);
  const TriggerFetch = () => {
    
    
    if (ser && ser.length > 0) {
      console.log("Fetch Triggered from App");
      // Trigger the fetch in the SearchBar
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ser}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          
          setdata(data);
          
  // Update the state with the fetched data
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  };
   
  useEffect(() => {
    if(ser && ser.length>0){

    TriggerFetch();
    console.log('Parsed search value:', ser);
    console.log('Parsed index value:', idx);
    }
  }, [ser, idx]);
  //  const savedData = localStorage.getItem('Meals');
  //  const parsed=JSON.parse(savedData)
  // console.log("data at rec"+parsed);
  
  //  console.log("from local"+parsed.meals[1].strMeasure2);
   
    const ingredients = [];
    if ( !parsed.meals[idx? idx:1]) {
      
      return <div>Loading...</div>;
    }
      console.log("i am at for loop"+idx);
     
      
      for (let i = 1; i <= 20; i++) {
        const ingredient = parsed.meals&& parsed.meals[idx? idx:1][`strIngredient${i}`];
        const measure = parsed.meals&& parsed.meals[idx? idx:1][`strMeasure${i}`];
      console.log(i);
      
      if (ingredient && measure) {
        ingredients.push({ ingredient, measure });
      }
    
    
}

let stringBreak=''
if(idx>0){
   stringBreak=parsed.meals[idx? idx:1].strInstructions.split('.')
}

return (
  <div className={styles.wrapper}>
  <div className={styles.cardCntainer}>      
      {ingredients && ingredients.map((item, index) => (
         <div key={index} className={styles.ingredientItem}>
            
            <p>
              <img  className={styles.Imageme}
                src={`https://www.themealdb.com/images/ingredients/${item.ingredient}.png`} 
                alt={item.ingredient} 
                style={{ width: "200px", height: "200px" }} // Adjust size as needed
              />
            </p>
            <p>{item.measure}<span><br/>{item.ingredient}</span></p>
            </div>          
        ))
}
    </div>
<div  >
  <img className={styles.mealImage} src={parsed.meals[idx? idx:1].strMealThumb} />

</div>
 
<div className={styles.Desc}>
   <div>
      {stringBreak.map((sentence, index) => (
        <React.Fragment key={index}>
          {/* Render the sentence if it's not empty */}
          {sentence && <span>{sentence.trim()}</span>}
          {/* Add a line break after each sentence except the last one */}
          {index < sentence.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
</div>

    </div>
      
  
);
};
