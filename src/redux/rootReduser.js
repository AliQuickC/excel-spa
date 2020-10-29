// Pure Function
import {TABLE_RESIZE} from './types'

export function rootReducer(state, action) {
  let prevState
  // console.log(action.data)
  let field
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      // console.log(field)
      prevState = state[field] || {} // предыдущее состояние state
      prevState[action.data.id] = action.data.value // добавляем свойство объекту state.colState.id
      // return {...state, colState: prevState} // id, value, type
      return {...state, [field]: prevState} // id, value, type
    default: return state
  }
}
