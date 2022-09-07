import styled from "styled-components";

export const DropDownHeader = styled("div")`
  margin-bottom: 0.6em;
  padding: 0.6em 1em 0.4em 0em;
  // box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  cursor: pointer;

  // padding-left: 1em; 
  
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 22px;
z-index: 4;
 
  
  

`;





export const DropDownList = styled("ul")`
  padding: 0;
  position: relative;
  top:0;
  left:0;
  z-index: 5;

  margin: 0;
  padding-left: 1em;
  font-family: Montserrat;
  cursor: pointer;
font-style: normal;
font-weight: normal;

line-height: 22px;




color: #000000;

  
  font-size: 1.2rem;
  font-weight: 500;
  background: #FFFFFF;
border: 1px solid #DDDCDC;
box-sizing: border-box;
border-radius: 10px;
  

  &:first-child {
    padding-top: 0.8em;
  }
`;

export const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  padding-right: 5px;
 
  cursor: pointer;
  background: #FFFFFF;
  position: relative;

  top:0;
  left:0;
  z-index: 5;
  

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  list-style: none;
  
`;

export const ListItemSmena = styled("li")`
  list-style: none;
  margin-bottom: -0.4em;
    padding-right: 5px;
    cursor: pointer;
    background: #FFFFFF;
    z-index: 4;
    font-family: "Montserrat";
font-style: normal;
font-weight: 400;
list-style: none;
  
`;