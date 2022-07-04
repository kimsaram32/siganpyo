import React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import styled from 'styled-components'
import Period from './Period'
import { dayPeriodsState } from '../recoil/dayPeriods'
import { periodNextIdState } from '../recoil/periodId'
import { Droppable } from 'react-beautiful-dnd'
import { downloadingState } from '../recoil/downloading'

const Container = styled.div`
  flex: 1 0 0;
  min-height: 500px;

  & + & {
    margin-left: 10px;
  }

  .dayTitle {
    padding-bottom: 25px;
    font-size: 24px;
  }

  .add {
    width: 100%;
  }
`

const Day = ({ index, dayName }) => {
  const [periods, setPeriods] = useRecoilState(dayPeriodsState(index))
  const [nextId, setNextId] = useRecoilState(periodNextIdState)
  const downloading = useRecoilValue(downloadingState)

  const onAddClick = () => {
    setPeriods((prevPeriods) => [...prevPeriods, nextId])
    setNextId((prevId) => prevId + 1)
  }

  return (
    <Droppable droppableId={`day${index}`}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          <h2 className="dayTitle">{dayName}</h2>
          {periods.map((id, dragIndex) => (
            <Period key={id} id={id} dayIndex={index} dragIndex={dragIndex} />
          ))}
          {provided.placeholder}
          {!downloading && <button className="btn add" onClick={onAddClick}>+</button>}
        </Container>
      )}
    </Droppable>
  )
}

export default React.memo(Day)
