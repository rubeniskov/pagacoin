// Core
import styled from 'styled-components';

export type TextFielProps = InputHTMLAttributes<{}> & {
  fit?: boolean
}

const TextField = styled.input<TextFielProps>`
  width: ${(({ fit }) => fit ? '100%' : 'auto')};
  border-radius: 5px;
  padding: 0.5rem;
  border: none;
  background: #efefef;
  font-family: 'Montserrat',sans-serif;
  :disabled {
    background: #c9c8c8;
    color:  #efefef;
    cursor: not-allowed;
  }
` 

export default TextField;
