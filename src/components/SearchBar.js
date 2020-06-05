import React from 'react';

const SearchBar = (props) => (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input name='sort' type="radio" value="Alphabetically" onChange={event => props.handleRadio(event)}/>
        Alphabetically
      </label>
      <label>
        <input name='sort' type="radio" value="Price" onChange={event => props.handleRadio(event)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={event => props.handleChange(event)}>
          <option value=''>All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );


export default SearchBar;
