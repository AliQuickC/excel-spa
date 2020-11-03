import {isEqual} from '@core/utils'

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscribeComponents(components) { // подписка на компоненты
    this.prevState = this.store.getState() // предыдущий state

    this.sub = this.store.subscribe(state => { // подписка на изменение state
      Object.keys(state).forEach(key => { // список ключей объекта state (  rowState, colState, dataState, currentText)
        if (!isEqual(this.prevState[key], state[key])) { // сравниваем состояние state, предыдущее и сейчас,
          //                                             // если есть различия
          components.forEach(component => { // перебираем массив объектов
            if (component.isWatching(key)) { // если ключ объекта state, есть у объекта(компоненты),
              //                                       // в массиве параметров, передаваемых в конструктор this.subscribe
              //                                       // каждый элемент массива, название поля в объекте state
              const changes = {[key]: state[key]} // изменения state
              component.storeChanged(changes) //  // запуск обработки изменений
            }
          })
        }
      })
      this.prevState = this.store.getState() // обновляем состояние предидущего state
    })
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe()
  }
}
