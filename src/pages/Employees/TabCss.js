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
cursor: pointer;
background: white;


${({active}) =>

active && `border-bottom: 2px solid  #E73D53; line-height: 3em

`} `;