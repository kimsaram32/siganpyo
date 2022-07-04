import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import binggrae from './fonts/Binggrae.ttf'
import binggraeBold from './fonts/Binggrae-Bold.ttf'

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Binggrae';
    src: url(${binggrae}) format('truetype');
  }

  @font-face {
    font-family: 'Binggrae-Bold';
    src: url(${binggraeBold}) format('truetype');
  }

  h1, h2, input, label, button, div, select, option {
    box-sizing: border-box;
    font-family: 'Binggrae-Bold';
  }

  input, select {
    border-radius: 5px;
    border: 1px solid #888;
    padding: 3px 8px;
  }

  label input {
    margin-left: 5px;
  }

  .btn {
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: 10px 20px;
    font-size: 18px;
    background-color: #fff;
    transition: 0.3s;

    &:hover {
      background-color: #eee;
    }

    &.btn--primary {
      border: 1px solid #fff;
      background-color: ${({ theme }) => theme.main};
      color: #fff;

      &:hover {
        border: 1px solid ${({ theme }) => theme.main};
        background-color: #fff;
        color: ${({ theme }) => theme.main};
      }
    }

    &.btn--small {
      min-width: initial;
      border-radius: 10px;
      font-size: 16px;
      padding: 5px 10px;
    }

    @media (max-width: 320px) {
      padding: 5px 2px;
    }
  }
`

export default GlobalStyle
