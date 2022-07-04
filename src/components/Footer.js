import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #ddd;
  border-top: 1px solid #999;
  font-size: 18px;
`

const Footer = () => {
  return (
    <StyledFooter>
      <p>제작&#41; 김사람</p>
    </StyledFooter>
  )
}

export default Footer
