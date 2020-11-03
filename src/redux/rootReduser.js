// Pure Function
import {TABLE_RESIZE, CHANGE_TEXT} from './types'

export function rootReducer(state, action) {
  let prevState
  // console.log('Action', action)
  let field
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      // console.log(field)
      prevState = state[field] || {} // предыдущее состояние state для столбца или колонки
      prevState[action.data.id] = Math.round(action.data.value) // добавляем свойство объекту state.colState/state.rowState

      return {...state, [field]: prevState} // id, value, type
    case CHANGE_TEXT:
      // field = 'dataState'
      prevState = state['dataState'] || {}
      prevState[action.data.id] = action.data.value // добавляем свойство, объекту state.dataState
      // console.log(action.data.value)
      return {
        ...state,
        currentText: action.data.value,
        dataState: prevState} // меняет currentText и dataState
    default: return state
  }
}

// function value(state, field, action) {
//   // console.log(val)
//   const val = state[field] || {} // предыдущее состояние state для столбца или колонки
//   val[action.data.id] = Math.round(action.data.value) // добавляем свойство объекту
//   return val
// }
