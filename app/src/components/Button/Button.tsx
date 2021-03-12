import styled from 'styled-components';

export type ButtonProps = {
  fit?: boolean
}

const Button = styled.button<ButtonProps>`
  width: ${(({ fit }) => fit ? '100%' : 'auto')};
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.color.primary.darken};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: ${({ theme }) => theme.font.size};
  cursor: pointer;
  &:disabled {
    background-color: #a7a7a7;
    cursor: not-allowed;
  }
`

export default Button;
