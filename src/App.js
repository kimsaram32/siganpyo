import React from 'react'
import styled from 'styled-components'
import Download from './components/Download'
import Footer from './components/Footer'
import Siganpyo from './components/Siganpyo'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1100px;
  margin: 0 auto;
  padding: 50px 0;
  text-align: center;

  .title {
    padding-bottom: 40px;

    h1 {
      font-size: 32px;
    }

    p {
      margin-top: 15px;
      font-size: 20px;
    }
  }

  @media screen and (max-width: 1200px) {
    width: 95%;
  }
`

const App = () => {
  return (
    <>
      <Container>
        <div className="title">
          <h1>시간표를 만들자</h1>
          <p>PC 기준으로 만든거라 폰에서는 제대로 안될수도 있음</p>
        </div>
        <Siganpyo />
        <Download />
      </Container>
      <Footer />
    </>
  )
}

export default App
