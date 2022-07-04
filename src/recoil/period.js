import { atomFamily, selectorFamily } from 'recoil'
import { subjectsState, subjectState } from './subject'

export const periodState = atomFamily({
  key: 'periodState',
  default: { subjectId: 0, day: 0 }
})

// 안쓰면 set은 지워라
export const periodSubjectState = selectorFamily({
  key: 'periodSubjectState',
  get:
    (id) =>
    ({ get }) => {
      const subjectId = get(periodState(id)).subjectId
      const subject = get(subjectState(subjectId))

      if (!subject) {
        return get(subjectsState)[0]
      }

      return subject
    },
  set:
    (id) =>
    ({ get, set }, newSubject) => {
      const subjectId = get(periodState(id)).subjectId
      set(subjectState(subjectId), newSubject)
    }
})
