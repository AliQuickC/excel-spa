import {$} from '@core/dom'
import {Emiter} from '@core/Emiter'
import {StoreSubscriber} from '@core/StoreSubscriber'

export class Excel {
  constructor(options) {
    // this.$el = $(selector) // находит элемент '#app' со страници, оборачивает в объект класса Dom
    this.components = options.components || [] // массив классов элементов(компонентов),
    // которые будут добавлены внутрь текущего элемента
    // после запуска getRoot() элементы массива превращаются в объекты

    this.store = options.store // store
    this.emitter = new Emiter() // объект для добавления/вызова собственных событий, у компонентов
    this.subscriber = new StoreSubscriber(this.store) // объект для добавления события, изменение state
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    //  $root - объект класса Dom, указывает на для DOM элемента с class='excel'

    const componentOptions = {
      emitter: this.emitter, // управление подписками на события
      store: this.store // управление подпиской на изменение state
    }

    // console.log(this.components)
    this.components = this.components.map(Component => { // перебирает массив компонентов(массив классов, для создания элементов)
      // вместо массива классов, создает массив объектов
      const $el = $.create('div', Component.className) // Component.className - статическое свойство класса
      // $el - инстанс класса Dom, заготовка для будующего DOM элемента
      // указывает на DOM элемент (с div и css классами)

      const component = new Component($el, componentOptions)
      // в component - создает объект "Типа", на основе класса Component
      // передается: $el - инстанс класса Dom, componentOptions - объект с опциями

      $el.html(component.toHTML()) // метод html класса Dom, внедряет в элемент div($el хранит его в this.$el) верстку,
      // верстку берем из метода toHTML, метод самой объекта "Типа"

      $root.append($el) // помещаем DOM элемент, в корневой элемет 'excel' ($root хранит его в this.$el)
      //                // с помощью метода append, класса Dom

      return component // в массив записывается объект "Типа"
    })
    return $root // компонент class="excel", обернутый в объект класса Dom
  }

  init() {
    // вставляет DOM элемент Excel на страниуцу, в корневой элемент '#app'(this.$el),
    // this.$el.append(this.getRoot()) // this.getRoot() - возвращает Excel, обернутый в объект класса Dom
    // предварительно компонент Excel заполняется дочерними компонентами,
    // в this.components вместо строк сохраняются объекты "Типа"
    // append метод класса Dom

    this.subscriber.subscribeComponents(this.components) // подписываемся на изменение state компоненты

    this.components.forEach(component => component.init()) // перебор объектов (компонентов),
    // запуск инициализации для каждого
    // добавляет для текущего DOM элемента, обработчики событий,
    // из списка событий, в массиве this.listeners, текущего DOM элемента
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
