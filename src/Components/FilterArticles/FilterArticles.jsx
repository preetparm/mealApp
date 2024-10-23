import React from 'react'
import { useState } from 'react'
import styles from './FilterArticles.module.css'



export const SearchBar = () => {
    const [query,setQuery]=useState('')

    const handleSubmit= (e)=>{

    }
  return (
  <div >
    <form  className={styles.Search} onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Click me</button> {/* Optional search icon */}
    </form>
    </div>
  )
}

