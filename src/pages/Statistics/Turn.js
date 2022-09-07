import React from "react";
import style from './styles/Statistics.module.css';

function Book(props) {
  const { onClick, selectedChoice, name } = props;


  return (
    <div className={style.content__li}
      style={{
        background: selectedChoice && selectedChoice.id === name.id ? "#E73D53" : "",
        border: selectedChoice && selectedChoice.id === name.id ? "1px solid #E6334A" : "",
        color: selectedChoice && selectedChoice.id === name.id ? " #FFFFFF" : ""
      }}
      onClick={() => {
        onClick(name);
      }}

    >

      <li key={name.id} > {name.name} &nbsp;{name.surname}  </li>

    </div>
  );
}
export default Book;