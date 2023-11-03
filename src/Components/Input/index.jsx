import { useState } from "react";
import PropTypes from 'prop-types';
import styles from "./index.module.css";

function Input({setQuery}) {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleFormSubmit=(event)=>{
    event.preventDefault();
        setQuery(value);
  }
  return (
    <form className={styles["input-container"]} onSubmit={handleFormSubmit}>

      <input
        onChange={handleChange}
        className={styles.input}
        type="text"
        placeholder="Search for products"
        value={value}
        aria-label="Search input"
      />
      <button aria-label="Search button"  type="submit" >Search</button>
    </form>
  );
}
Input.propTypes = {
    setQuery: PropTypes.func.isRequired,
  };
export default Input;
