import React, { useEffect } from 'react'
import styles  from './Recipie.module.css'
import { useLocation } from 'react-router-dom';

export const Recipie = ({data}) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idex = params.get('index');
  const idx = idex ? parseInt(idex, 10) : null; 

  // Check for valid index and access ingredients safely
  



    console.log('i am from recipe'+idx);
    console.log('from the recie'+data.meals);
    const ingredients = [];
    if (idx !== null && data.meals) {
      console.log("i am at for loop"+idx);
      
    for (let i = 1; i <= 20; i++) {
        const ingredient = data.meals&& data.meals[idx][`strIngredient${i}`];
        const measure = data.meals&& data.meals[idx][`strMeasure${i}`];
      console.log(i);
      
      if (ingredient && measure) {
        ingredients.push({ ingredient, measure });
      }
    }
}
let stringBreak=''
if(idx>0){
   stringBreak=data.meals[idx].strInstructions.split('.')
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
  <img className={styles.mealImage} src={data.meals[idx].strMealThumb} />

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
