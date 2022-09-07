import styled from "styled-components";
export const DropDownHeader = styled("div")`
margin-bottom: 0.6em;
padding: 0.6em 1em 0.4em 0em;

font-weight: 500;
font-size: 1.3rem;
// position:relative;
z-index: 1;

cursor: pointer;

font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 22px;


`;



export const DropDownList = styled("ul")`


 padding-left: 1em;

position:relative;
z-index: 5;

cursor: pointer;
font-size: 1.3rem;
font-weight: 500;
background: #FFFFFF;
border: 1px solid #DDDCDC;
box-sizing: border-box;
border-radius: 10px;
height: 8.1rem;


font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 22px;


&:first-child {
  padding-top: 0.9em;
}
`;

export const DropDownListSmena = styled("ul")`
position: relative;

 padding-left: 1em;
font-family: Montserrat;
cursor: pointer;
position: relative;
z-index: 5;
font-size: 1.3rem;
font-weight: 500;
background: #FFFFFF;
border: 1px solid #DDDCDC;
box-sizing: border-box;
border-radius: 10px;
height: 5.5rem;
font-size: 15px;
&:first-child {
  padding-top: 0.9em;
}
`;

export const DropDownListSalary = styled("ul")`

 padding-left: 1em;
 cursor: pointer;
font-size: 1.3rem;
font-weight: 500;
background: #FFFFFF;
border: 1px solid #DDDCDC;
box-sizing: border-box;
border-radius: 10px;
height: 14rem;

font-family: "Montserrat";
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 22px;

position:relative;
z-index: 5;

&:first-child {
  padding-top: 0.5em;
}
`;

export const ListItem = styled("li")`
cursor: pointer;
list-style: none;
margin-bottom: 0.7em;
position: relative;
z-index: 5;
padding-right: 5.5px;

`;


export const ListItemSmenaSalary = styled("li")`{
  font-family: "Montserrat";
font-style: normal;
font-weight: 400;
list-style: none;
font-size: 18px;
position: relative;
z-index: 5;
margin-bottom: 0.7em;
  padding-right: 5px;

  cursor: pointer;
}`

export const ListItemSmena = styled("li")`
list-style: none;
font-family: "Montserrat";
font-style: normal;
font-weight: 400;
position: relative;
z-index: 5;
list-style: none;
font-size: 18px;
 margin-bottom: -0.5em;
   padding-right: 5px;
   cursor: pointer;
`;