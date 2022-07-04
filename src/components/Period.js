import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import styled, { css } from 'styled-components'
import SubjectList from './SubjectList'
import { dayPeriodsState } from '../recoil/dayPeriods'
import { periodState, periodSubjectState } from '../recoil/period'
import { downloadingState } from '../recoil/downloading'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  overflow: hidden;
  width: 100%;
  min-height: 50px;
  margin-bottom: 20px;
  padding: 20px 0;
  position: relative;

  border-radius: 15px;
  background-color: ${({ color }) => color};

  p {
    font-size: 18px;
  }

  .edit {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(100, 100, 100, 0.5);
    opacity: 0;
    transition: 0.4s;
  }

  .delete {
    margin-left: 5px;
  }

  ${({ useHover }) =>
    useHover &&
    css`
      &:hover .edit {
        opacity: 1;
      }
    `}
`

const Period = ({ id, dragIndex, dayIndex }) => {
  const setPeriods = useSetRecoilState(dayPeriodsState(dayIndex))
  const [period, setPeriod] = useRecoilState(periodState(id))
  const subject = useRecoilValue(periodSubjectState(id))
  const downloading = useRecoilValue(downloadingState)
  const [isEditing, setIsEditing] = useState(false)

  const toggleEditing = () => {
    setIsEditing((prev) => !prev)
  }

  const onDeleteClick = () => {
    setPeriods((periods) => periods.filter((period) => period !== id))
  }

  const onSubjectChange = (value) => {
    setPeriod((period) => ({ ...period, subjectId: value }))
    setIsEditing(false)
  }

  const onSubmitCancel = () => {
    setIsEditing(false)
  }

  return (
    <Draggable draggableId={`subject${id}`} index={dragIndex}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          color={subject.color}
          useHover={!downloading}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <>
              <div>
                <SubjectList
                  onChange={onSubjectChange}
                  onBlur={onSubmitCancel}
                  value={period.subjectId}
                />
              </div>
              <button onClick={onDeleteClick} className="btn btn--small delete">
                삭제
              </button>
            </>
          ) : (
            <>
              <p className>{subject.name}</p>
              <div className="edit">
                <div onClick={toggleEditing} className="btn btn--small">
                  편집
                </div>
              </div>
            </>
          )}
        </Container>
      )}
    </Draggable>
  )
}

export default React.memo(Period)
