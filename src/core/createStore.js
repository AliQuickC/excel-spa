export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    subscribe(fn) { // подписка на изменение state
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== fn)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action) // редюсер
      listeners.forEach(listeners => listeners(state))
      // отработка подписок на изменение state
    },
    getState() {
      return state
    }
  }
}
