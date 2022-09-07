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
cursor: pointer;

${({ active }) =>

    active && `border-bottom: 2px solid  #E73D53; line-height: 2.6em;  cursor: pointer;

`} `;


export const DropDownListSalary = styled("ul")`

  margin-top: 0.5em;
  font-size: 1.3rem;
  font-weight: 500;
 

  background: #FCFCFD;
border: 1px solid #DDDCDC;
box-sizing: border-box;
border-radius: 10px;
position: relative;
top:-1px;
 z-index: 1;
//  height: 15rem;

//  overflow-y: scroll;

//  overflow-x:hidden;

 padding-bottom: 1rem;


 ::-webkit-scrollbar {
  width: 0.5px;
  overflow: auto;
  z-index: 1;
}

::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  height: 2rem;
  border-radius: 4px;
  overflow: auto;
  z-index: 1;
}

::-webkit-scrollbar {
  width: 0.5px;
  overflow: auto;
  z-index: 1;
}

::-webkit-scrollbar-thumb {
  background: #c4c4c4;
  height: 2rem;
  border-radius: 4px;
  overflow: auto;
  z-index: 1;
}

 


  &:first-child {
    padding-top: 0.8em;
  }
`;


export const ListItemSmenaSalary = styled("li")`{
 
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

 z-index: 1;

color: #000000;

  
  }`
