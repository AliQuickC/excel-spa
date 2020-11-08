import {isEqual} from '@core/utils'

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sub = null
    this.prevState = {}
  }

  subscribeComponents(components) { // подписка на изменение state, в компонентах components
    this.prevState = this.store.getState() // копия state

    this.sub = this.store.subscribe(state => { // добавляем подписку на изменение state
      Object.keys(state).forEach(key => { // список ключей объекта state (rowState, colState, dataState, currentText и т.д.)
        if (!isEqual(this.prevState[key], state[key])) { // сравниваем состояние state, предыдущее и сейчас,
          //                                             // если есть различия по ключу key
          components.forEach(component => { // перебираем массив объектов
            if (component.isWatching(key)) { // если ключ key, есть в массиве подписок this.subscribe у компоненты,
              //                         // передаваемом(параметр options.subscribe) в конструктор, объекта(компоненты),
              //                         // каждый элемент массива, название поля в объекте state
              const changes = {[key]: state[key]} // сохраняем новое значение state, для ключа key
              component.storeChanged(changes) //  // Отображаем в соответствии с новым state, компонент(объект "Типа")
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
