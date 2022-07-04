import { atom, selectorFamily } from 'recoil'

export const daysPeriodsState = atom({
  key: 'daysSubjectsState',
  default: [[], [], [], [], []]
})

export const dayPeriodsState = selectorFamily({
  key: 'dayPeriodsState',
  get:
    (dayIndex) =>
    ({ get }) =>
      get(daysPeriodsState)[dayIndex],
  set:
    (dayIndex) =>
    ({ get, set }, newDay) => {
      const newDays = get(daysPeriodsState).map((day, index) =>
        index === dayIndex ? newDay : day
      )
      set(daysPeriodsState, newDays)
    }
})
