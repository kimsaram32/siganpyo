import React from 'react'
import { useRecoilState } from 'recoil'
import { subjectsState } from '../recoil/subject'
import { subjectNextIdState } from '../recoil/subjectId'

const SubjectList = ({
  onChange: onChangeParent,
  ...selectArgs
}) => {
  const [subjects, setSubjects] = useRecoilState(subjectsState)
  const [nextId, setNextId] = useRecoilState(subjectNextIdState)

  const onChange = ({ target: { value } }) => {
    if (value === 'new') {
      value = nextId
      setSubjects((subjects) => [
        ...subjects,
        { id: nextId, color: '#cccccc', name: '과목' }
      ])
      setNextId((next) => next + 1)
    } else {
      value = +value
    }
    onChangeParent(value)
  }

  return (
    <div>
      <select onChange={onChange} {...selectArgs}>
        {subjects.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
        <option value="new">새 과목</option>
      </select>
    </div>
  )
}

export default React.memo(SubjectList)
