import styled, { css } from 'styled-components'
import { ExampleButtonProps } from './Button'
import Color from 'color'

// Pass in props first
export const StyledButton = styled.button<ExampleButtonProps>`
  ${({ theme, variant, outline, size }) => css`
    font-family: 'Roboto', sans-serif;
    display: inline-block;
    border-radius: 999px;
    padding: ${size === 'small' ? '0.25rem 0.5rem' : '0.375rem 0.75rem'};
    font-size: ${size === 'small' ? '0.875rem' : '1rem'};
    font-weight: 500;
    user-select: none;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;

    border: 1px solid
      ${outline || variant === 'white' ? theme.colors[variant] : theme.colors.transparent};

    background-color: ${outline ? theme.colors.transparent : theme.colors[variant]};

    color: ${outline
      ? theme.colors[variant]
      : variant === 'secondary' || variant === 'white'
      ? theme.colors.black
      : theme.colors.white};

    &:hover {
      background-color: ${outline || variant === 'white'
        ? theme.colors[variant]
        : Color(theme.colors[variant]).darken(0.2).hex().toString()};

      color: ${variant === 'secondary' || variant === 'white'
        ? theme.colors.black
        : theme.colors.white};
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 0.2rem ${Color(theme.colors[variant]).alpha(0.5).toString()};
    }

    &:active {
      background-color: ${Color(theme.colors[variant]).darken(0.3).hex().toString()};

      color: ${variant === 'secondary' || variant === 'white'
        ? theme.colors.black
        : theme.colors.white};
    }

    &:not(:disabled) {
      cursor: pointer;
    }
  `}
`
