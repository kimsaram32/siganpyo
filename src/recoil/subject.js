import { atom, selectorFamily } from 'recoil'

export const subjectsState = atom({
  key: 'subjectsState',
  default: [
    {
      id: 0,
      color: '#cccccc',
      name: '과목'
    }
  ]
})

export const subjectState = selectorFamily({
  key: 'subjectState',
  get:
    (id) =>
    ({ get }) =>
      get(subjectsState).find((subject) => subject.id === id),
  set:
    (id) =>
    ({ set }, newSubject) =>
      set(subjectsState, (subjects) =>
        subjects.map((subject) => (subject.id === id ? newSubject : subject))
      )
})
