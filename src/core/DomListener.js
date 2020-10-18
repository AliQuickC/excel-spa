import {capitalize} from "@core/utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }
    this.$root = $root
    this.listeners = listeners // массив событий, для текущего элемента
  }

  // добавляет для текущего DOM элемента, обработчики событий, из списка событий, в массиве this.listeners
  initDOMListeners() {
    this.listeners.forEach(listener => { // перебор массива со списком событий
      // внутри стрелочной ф-ции, контекст this сохраняется
      const method = getMethodName(listener) // формирование имени события

      if (!this[method]) {  // проверяем, что для события с именем method в объекте(DOM элемент),
                            //  есть метод, обработчик такого события
        const name = this.name || ''  // имя DOM элемента, если было указано в конструкторе, при создании
        throw new Error(
          `Method ${method} is not implemented in ${name} Component`
        )
      }

      this.[method] = this[method].bind(this) // привязка контекста this к методу
      this.$root.on(listener, this[method]) // добавляет обрвботчик this[method], для события listener,
                                            // DOM элементу(this.$root), обернутого объектом Dom
    })
  }

  // удаляет для текущего DOM элемента, обработчики событий, из списка событий, в массиве this.listeners
  removeDOMListeners() {
    this.listeners.forEach(listener => { // перебор массива со списком событий
      const method = getMethodName(listener) // формирование имени события

      this.$root.off(listener, this[method])  // удаляет обрвботчик this[method], для события listener,
                                              // DOM элементу(this.$root), обернутого объектом Dom
    })
  }
}

// формирует имя события
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}