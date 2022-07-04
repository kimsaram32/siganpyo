import React, { useEffect, useRef } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styled from 'styled-components'
import { daysPeriodsState } from '../recoil/dayPeriods'
import { siganpyoRefState } from '../recoil/siganpyoRef'
import Day from './Day'

const dayNames = ['월', '화', '수', '목', '금']

const Container = styled.div`
  display: flex;
  width: 80%;

  @media (max-width: 630px) {
    width: 95%;
  }
`

const Days = () => {
  const [daysPeriods, setDaysPeriods] = useRecoilState(daysPeriodsState)
  const setSiganpyoRef = useSetRecoilState(siganpyoRefState)
  const siganpyoRef = useRef(null)

  useEffect(() => {
    setSiganpyoRef(siganpyoRef.current)
  }, [setSiganpyoRef])

  const onDragEnd = ({ destination: dest, source }) => {
    if (
      dest.droppableId === source.droppableId &&
      dest.index === source.index
    ) {
      return
    }

    const sourcePeriodsIndex = +source.droppableId.slice(-1)
    const destPeriodsIndex = +dest.droppableId.slice(-1)

    const sourcePeriods = [...daysPeriods[sourcePeriodsIndex]]
    const destPeriods = [...daysPeriods[destPeriodsIndex]]
    const [deleted] = sourcePeriods.splice(source.index, 1)
    destPeriods.splice(dest.index, 0, deleted)

    setDaysPeriods((prev) =>
      prev.map((periods, index) =>
        index === sourcePeriodsIndex
          ? sourcePeriods
          : index === destPeriodsIndex
          ? destPeriods
          : periods
      )
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container ref={siganpyoRef}>
        {dayNames.map((dayName, index) => (
          <Day key={index} index={index} dayName={dayName} />
        ))}
      </Container>
    </DragDropContext>
  )
}

export default Days
