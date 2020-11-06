import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles
}

export const initialState = storage('excel-state') ? // если значение в local store есть
  storage('excel-state') : //                        // вернуть это значение из local store
  defaultState //                                        // иначе вернуть объект инициализирующий state

