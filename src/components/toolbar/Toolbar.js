import {createToolbar} from '@/components/toolbar/toolbar.template'
import {$} from '@core/dom'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {defaultStyles} from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'], // подписка на изменение state
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles) // инициализируем локальный state
  }

  get template() { // формирует HTML код для вывода
    return createToolbar(this.state)
  }

  toHTML() { // вывод верстки тулбара с кнопками
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
    // console.log(changes)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') { // если data-type === "button"
      const value = JSON.parse($target.data.value) // data-value хранит css свойство, за которое отвечает кнопка,
      //                                           // считываем его, преобразуем в объект
      // console.log(value)
      this.$emit('toolbar: applyStyle', value) // сработка события, изменить стиль в таблице

      // const key = Object.keys(value)[0] // считываем у свойства с индексом 0, название ключа(имя css свойства)
      // this.setState({[key]: value[key]}) // меняем state, записываем в объект ключ и значение(css свойство и значение)
      // console.log(this.state)
    }
  }
}

