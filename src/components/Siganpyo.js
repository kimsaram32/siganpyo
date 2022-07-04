import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import Days from './Days'
import EditSubject from './EditSubject'
import { downloadingState } from '../recoil/downloading'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  position: relative;
  background-color: #eee;
  border: 1px solid #999;
  border-radius: 15px;
`

const DownloadAlert = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: white;
  z-index: 1;
  background-color: rgba(100, 100, 100, 0.5);
  font-size: 25px;
`

const Siganpyo = () => {
  const downloading = useRecoilValue(downloadingState)
  return (
    <Container>
      {downloading && <DownloadAlert>다운로드중</DownloadAlert>}
      <Days />
      <EditSubject />
    </Container>
  )
}

export default Siganpyo
