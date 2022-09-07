import styled from 'styled-components';

export const Tab = styled.button`

 padding-left: 0.7vw;
 padding-right: 0.7vw;
 border: 0;
 font-family: "Montserrat", "Roboto";
 font-style: normal;
 font-weight: 500;
//  color: black;
 
 font-size: 17px;
 line-height: 22px

 background: white;
 
 ${({ active }) =>

        active && `border-bottom: 2px solid  #E73D53; line-height: 3em

 `} `;

