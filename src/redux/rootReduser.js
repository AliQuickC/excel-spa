// Pure Function
import {TABLE_RESIZE, CHANGE_TEXT, APPLY_STYLE, CHANGE_STYLES} from './types'


export function rootReducer(state, action) {
  // let prevState
  // console.log('Action', action)
  let field
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      // prevState = state[field] || {} // предыдущее состояние state для столбца или колонки
      // prevState[action.data.id] = Math.round(action.data.value) // добавляем свойство объекту state.colState/state.rowState
      // console.log(value(state, field, action))

      // return {...state, [field]: prevState} // id, value, type
      return {...state, [field]: value(state, field, action)} // id, value, type
    case CHANGE_TEXT:
      field = 'dataState'
      // prevState = state[field] || {}
      // prevState[action.data.id] = action.data.value // добавляем свойство, объекту state.dataState
      // console.log(field)
      return {
        ...state,
        currentText: action.data.value, // меняет currentText
        // dataState: prevState // меняет dataState
        [field]: value(state, field, action)
      }
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
    default: return state
  }
}

function value(state, field, action) {
  const val = state[field] || {} // предыдущее состояние state для столбца или колонки
  val[action.data.id] = action.data.value // добавляем свойство объекту
  // Math.round()
  // console.log(action.data.value )
  return val
}
