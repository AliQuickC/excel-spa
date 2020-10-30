import {storage} from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: ''
}

export const initialState = storage('excel-state') ? // если значение в local store есть
  storage('excel-state') : // вернуть это значение из local store
  defaultState // иначе вернуть объект инициализирующий state

