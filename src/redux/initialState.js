import {storage} from '@core/utils'

const defaultState = {
  rowState: {},
  colState: {}
}

export const initialState = storage('excel-state') ? // если значение в local store есть
  storage('excel-state') : // вернуть это значение из local store
  defaultState // иначе вернуть объект инициализирующий state

