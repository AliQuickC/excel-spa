export class Emiter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // уведомляет слушателей если они есть
  emit(eventName, ...args) { // все args собираются в массив
    if (!Array.isArray(this.listeners[eventName])) {
      return false
    }
    this.listeners[eventName].forEach(listener => {
      listener(...args) // args разворачиваются из массива
    })
    return true
  }

  // on, listener
  // подписываемся на уведомление
  // Добавляем нового слушателя
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return () => { // ф-ция удаляет обработчик события
      this.listeners[eventName] =
      this.listeners[eventName].filter(listener => listener !== fn)
    }
  }
}

