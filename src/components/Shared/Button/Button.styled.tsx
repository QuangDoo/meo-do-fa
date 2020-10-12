import styled from 'styled-components'
import { ButtonProps } from './Button'

export const StyledButton = styled.button<ButtonProps>`
  font-family: 'Roboto', sans-serif;
  display: inline-block;
  border-radius: 999px;
  background-color: ${({ theme, variant }) => theme.colors[variant]};
  color: ${({ theme, variant }) =>
    variant === 'secondary' ? theme.colors.black : theme.colors.white};
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  user-select: none;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`
