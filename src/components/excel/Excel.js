import {$} from '@core/dom'
import {Emiter} from '@core/Emiter'
import {StoreSubscriber} from '@core/StoreSubscriber'

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector) // находит элемент '#app' со страници, оборачивает в объект класса Dom
    this.components = options.components || [] // массив (строк) DOM элементов(компонентов),
    // которые будут добавлены внутрь текущего элемента
    // после запуска getRoot() элементы массива превращаются в объекты

    this.store = options.store
    this.emitter = new Emiter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    //  $root - объект класса Dom, является оберткой для DOM элемента с class='excel'

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    this.components = this.components.map(Component => { // перебирает массив компонентов(массив классов, для создания элементов)
      // вместо массива классов, создает массив объектов

      const $el = $.create('div', Component.className) // $el - обертка класса Dom, с div внутри
      // заготовка для будующего элемента (компоненты)
      // с css классами Component.className, прописанными в классе DOM элемента (компоненты)
      // затем оборачивает DOM элемент в объект класса Dom
      const component = new Component($el, componentOptions)
      // в component - создает объект "Типа" на основе класса
      // передается объект $el класса Dom, с div внутри, конструктору элемента (компоненты)

      $el.html(component.toHTML()) // метод html класса Dom, внедряет в элемент div верстку элемента (компоненты),
      // верстку берет из метода toHTML, метод самого DOM элемента
      $root.append($el) // помещаем компоненту $el (элемент, обернутый объектом класса Dom)
      // в корневую компоненту $root (элемент, обернутый объектом класса Dom)
      return component // в массив записывается объект
    })
    return $root // компонент class="excel", обернутый в объект класса Dom
  }

  render() {
    // this.$el - '#app', this.getRoot() - Excel, обернутый в объект класса Dom
    this.$el.append(this.getRoot()) // вставляет DOM элемент Excel на страниуцу, в корневой элемент '#app',
    // меетодом append(объекта класса Dom)
    // предварительно компонент Excel заполняется дочерними компонентами

    this.subscriber.subscribeComponents(this.components) // подписываемся на изменение state компоненты

    this.components.forEach(component => component.init()) // перебор DOM элемнтов(компонентов),
    // запуск инициализации для каждого
    // добавляет для текущего DOM элемента, обработчики событий,
    // из списка событий, в массиве this.listeners, текущего DOM элемента
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
