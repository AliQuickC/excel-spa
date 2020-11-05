export function createStore(rootReducer, initialState = {}) {
  // initialState оборачивваем в объект и разворачиваем, зачем ???
  let state = rootReducer({...initialState}, {type: '__INIT__'}) // передаем state, получаем state
  let listeners = [] // массив ф-ций, подписок

  return {
    subscribe(fn) { // подписка на событие, изменение state
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== fn)
        }
      }
    },
    dispatch(action) { // сработка события, изменение state
      state = rootReducer(state, action) // редюсер
      listeners.forEach(listeners => listeners(state))
      // отработка подписок на изменение state
    },
    getState() {
      return JSON.parse(JSON.stringify(state)) // клонируем объект, для избежания мутации
    }
  }
}
