import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''

    this.prepare()
  }

  prepare() {}

  // абстрактный метод, переопределяется в наследуемом классе(DOM элементе)
  toHTML() {
    return ''
  }

  // инициализация объекта DOM
  init() {
    this.initDOMListeners() // создание событий для DOM элемента
  }

  destroy() {
    this.removeDOMListeners() // удаление событий для DOM элемента
  }
}
