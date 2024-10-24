import React, { useEffect, useState } from 'react';
import styles from './Recipie.module.css';
import { useLocation } from 'react-router-dom';

export const Recipie = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ser = params.get('search');
  const idex = params.get('index');
  const idx = idex ? parseInt(idex, 10) : 0; // Default to 0 if no index is provided
  const [parsed, setData] = useState({ meals: [] });

  const TriggerFetch = () => {
    if (ser && ser.length > 0) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ser}`)
        .then(response => response.json())
        .then(data => {
          setData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  };

  useEffect(() => {
    if (ser && ser.length > 0) {
      TriggerFetch();
    }
  }, [ser, idx]);

  if (!parsed.meals || parsed.meals.length === 0) {
    return <div>Loading...</div>;
  }

  const meal = parsed.meals[idx] || parsed.meals[0]; // Default to the first meal if idx is out of range or null
  const ingredients = [];

  // Extracting ingredients and measures
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() && measure && measure.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  const instructions = meal.strInstructions ? meal.strInstructions.split('.') : [];

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardContainer}>
        {ingredients.map((item, index) => (
          <div key={index} className={styles.ingredientItem}>
            <img
              className={styles.Imageme}
              src={`https://www.themealdb.com/images/ingredients/${item.ingredient}.png`}
              alt={item.ingredient}
              style={{ width: '200px', height: '200px' }}
            />
            <p>{item.measure}<br /><span>{item.ingredient}</span></p>
          </div>
        ))}
      </div>

      <div>
        <img className={styles.mealImage} src={meal.strMealThumb} alt={meal.strMeal} />
      </div>

      <div className={styles.Desc}>
        <div>
          {instructions.map((sentence, index) => (
            <React.Fragment key={index}>
              {sentence && <span>{sentence.trim()}</span>}
              {index < instructions.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
