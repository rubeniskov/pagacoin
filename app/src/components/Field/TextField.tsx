// Core
import styled from 'styled-components';


const TextField = styled.input`
  width: ${(({ fit }) => fit ? '100%' : 'auto')};
  border-radius: 5px;
  padding: 0.5rem;
  border: none;
  background: #efefef;
  font-family: 'Montserrat',sans-serif;
` 

export default TextField;
