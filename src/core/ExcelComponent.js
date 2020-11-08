import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  // настраивает компонент до init()
  prepare() {}

  // абстрактный метод, переопределяется в наследуемом классе(DOM элементе)
  toHTML() {
    return ''
  }

  // вызов события
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // добавить обработчик события event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Сюда приходят изменения только по тем полям, на которые мы подписались
  storeChanged() {

  }

  // при изменение state, проверяем наличие подписки в this.subscribe, у компоненты для ключа key
  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // инициализация объекта DOM
  // добавляет слушателей
  init() {
    this.initDOMListeners() // создание событий для DOM элемента
  }

  // удаляет коммпонент
  // удаляет слушателей
  destroy() {
    this.removeDOMListeners() // удаление событий для DOM элемента
    this.unsubscribers.forEach(unsub => unsub())
  }
}
