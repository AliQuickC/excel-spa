import {defaultStyles, defaultTitle} from '@/constants'
import {clone} from '@core/utils';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON() // представление объекта Date в виде JSON
}

const normalize = state => ({
  ...state,
  currentStyle: defaultStyles,
  currentText: ''
})

// export const initialState = storage('excel-state') ? // если значение в local store есть
//   normalize(storage('excel-state')) : //                        // вернуть это значение из local store
//   defaultState //                                        // иначе вернуть объект инициализирующий state

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}

