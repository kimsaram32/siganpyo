import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { toPng } from 'html-to-image'
import { siganpyoRefState } from '../recoil/siganpyoRef'
import { downloadingState } from '../recoil/downloading'
import styled from 'styled-components'

const Container = styled.div`
  padding-top: 40px;
  text-align: center;

  .downloadButton {
    margin-top: 20px;
  }

  .preview {
    margin-top: 40px;
    border: 1px solid #999;
    border-radius: 20px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      display: block;
      transition: 0.5s;
    }

    &:hover img {
      transform: scale(1.05);
    }

    .download {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(200, 200, 200, 0.5);
      opacity: 0;
      transition: 0.4s;

      a {
        text-decoration: none;
        color: #000;
      }
    }

    &:hover .download {
      opacity: 1;
    }
  }
`

const Download = () => {
  const siganpyoRef = useRecoilValue(siganpyoRefState)
  const setDownloading = useSetRecoilState(downloadingState)
  const [downloadURL, setDownloadURL] = useState('')
  const [ratio, setRatio] = useState(2)

  const onInputChange = ({ target: { value } }) => {
    setRatio(value)
  }

  const onDownloadClick = () => {
    setDownloading(true)

    setTimeout(async () => {
      try {
        const url = await toPng(siganpyoRef, { pixelRatio: +ratio })
        setDownloadURL(url)
        setDownloading(false)
      } catch (e) {
        window.alert(`에러: ${e.message}`)
      }
    }, 2000)
  }

  return (
    <Container>
      <label>
        배율:
        <input type="text" onChange={onInputChange} value={ratio} />
      </label>
      <div>
        <button
          className="downloadButton btn btn--primary"
          onClick={onDownloadClick}
        >
          이미지로 다운로드
        </button>
      </div>
      {downloadURL && (
        <div className="preview">
          <img src={downloadURL} alt="미리보기" />
          <div className="download">
            <a className="btn" href={downloadURL} download>
              다운로드
            </a>
          </div>
        </div>
      )}
    </Container>
  )
}

export default Download
