import styled from 'styled-components';

export const Tab = styled.button`
padding-left: 0.6vw;
padding-right: 0.6vw;
border: 0;  

font-family: "Montserrat";
font-style: normal;
font-weight: 500;

font-size: 17px;
line-height: 22px;
background: #ffffff;


${({active}) =>

active && `border-bottom: 2px solid  #E73D53; line-height: 3em

`} `;




export const DropDownListSalary = styled("ul")`

  margin-top: -0.2em;
  font-size: 1.3rem;
  font-weight: 500;
  background: #FFFFFF;
border: 1px solid #DDDCDC;
box-sizing: border-box;
border-radius: 10px;
width: 26.2rem;
margin-left: 9px;
background: #FFFFFF;
position: relative;
z-index:3;

width: 95%;
 

 


  &:first-child {
    padding-top: 0.8em;
  }
`

export const ListItemSmenaSalary = styled("li") `{
    list-style: none;
    margin-bottom: 1.2em;
    // margin-bottom: 24px;
   
   font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 22px;
padding-left: 1em;
display: flex;
 justify-content: space-between;



color: #000000;

  
  }`
