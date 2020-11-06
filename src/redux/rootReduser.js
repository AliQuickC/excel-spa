// Pure Function
import {TABLE_RESIZE, CHANGE_TEXT, APPLY_STYLE, CHANGE_STYLES, CHANGE_TITLE} from './types'

export function rootReducer(state, action) {
  // let prevState
  // console.log('Action', action)
  // console.log('state', state)
  let field // ключ state
  let val
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
        // dataState: prevState
        [field]: value(state, field, action) // меняет dataState
      }
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {} // state.stylesState
      action.data.ids.forEach(id => { // для каждого id, из массива выделенных ячеек
        val[id] = {...val[id], ...action.data.value} // считываем из state все стили выбранной ячейки,
        // state.stylesState[id] объект со всеми стилями, добавляем в него, меняемый стиль
      })
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value}
      }
    case CHANGE_TITLE:
      return {...state, title: action.data}
    default: return state
  }
}

// возвращает новое значение, части объекта state.
function value(state, field, action) {
  const val = state[field] || {} // часть объекта state, полученная по ключу field
  val[action.data.id] = action.data.value // добавляем свойство объекту
  // Math.round()
  // console.log(action.data.value )
  return val
}
