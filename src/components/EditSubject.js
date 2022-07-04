import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { subjectsState } from '../recoil/subject'
import SubjectList from './SubjectList'

const Container = styled.div`
  .editTitle {
    padding: 30px 0;
    font-size: 24px;
  }

  .list {
    margin-bottom: 15px;
  }

  .editInput {
    margin-bottom: 10px;
  }

  .delete {
    margin-top: 30px;
  }
`

const EditSubject = () => {
  const [subjects, setSubjects] = useRecoilState(subjectsState)
  const [editingSubject, setEditingSubject] = useState(subjects[0])

  const onSubmit = (e) => {
    e.preventDefault()
    setSubjects((subjects) =>
      subjects.map((subject) =>
        subject.id === editingSubject.id ? editingSubject : subject
      )
    )
  }

  const onSubjectChange = (id) => {
    setEditingSubject(
      subjects.find((subject) => subject.id === id) ?? {
        id,
        name: '과목',
        color: '#cccccc'
      }
    )
  }

  const onNameChange = ({ target: { value } }) => {
    setEditingSubject((editing) => ({ ...editing, name: value }))
  }

  const onColorChange = ({ target: { value } }) => {
    setEditingSubject((editing) => ({ ...editing, color: value }))
  }

  const onDeleteClick = () => {
    setSubjects(subjects.filter((subject) => subject !== editingSubject))
  }

  return (
    <Container>
      <h2 className="editTitle">과목 편집</h2>
      <SubjectList className="list" value={editingSubject.id} onChange={onSubjectChange} />
      <form onSubmit={onSubmit}>
        <div className="editInput">
          <label>
            과목명
            <input
              type="text"
              value={editingSubject.name}
              onChange={onNameChange}
            />
          </label>
        </div>
        <div className="editInput">
          <label>
            과목 색상
            <input
              type="color"
              value={editingSubject.color}
              onChange={onColorChange}
            />
          </label>
        </div>
        <input className="btn" type="submit" value="변경" />
      </form>
      <button className="btn delete" onClick={onDeleteClick}>
        과목 삭제
      </button>
    </Container>
  )
}

export default React.memo(EditSubject)
